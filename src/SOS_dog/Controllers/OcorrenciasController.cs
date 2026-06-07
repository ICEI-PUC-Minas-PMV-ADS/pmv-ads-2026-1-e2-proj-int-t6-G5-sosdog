using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SosDog.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json.Serialization;
using System.Threading.Tasks;


namespace SosDog.Controllers
{
    public class OcorrenciasController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpClientFactory _httpClientFactory;
        public OcorrenciasController(AppDbContext context, IWebHostEnvironment webHostEnvironment, IHttpClientFactory httpClientFactory)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _httpClientFactory = httpClientFactory;
        }

        // GET: Ocorrencias
        public async Task<IActionResult> Index()
        {
            var appDbContext = _context.Ocorrencias.Include(o => o.Usuario);
            return View(await appDbContext.ToListAsync());
        }

        // GET: Ocorrencias/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var ocorrencia = await _context.Ocorrencias
                .Include(o => o.Usuario)
                .FirstOrDefaultAsync(m => m.IdOcorrencia == id);

            if (ocorrencia == null)
            {
                return NotFound();
            }

            return View(ocorrencia);
        }

        // GET: Ocorrencias/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create([Bind("TipoOcorrencia,EstadoSaude,Descricao,Latitude,Longitude,Sexo,CorPelagem,Porte,FaixaEtaria,Endereco,RecebeuAgua,RecebeuComida")] Ocorrencia ocorrencia, IFormFile FotoAnimal)
        {
            // 1. VALIDAÇÃO DA IMAGEM
            if (FotoAnimal != null && FotoAnimal.Length > 0)
            {
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                var extensao = Path.GetExtension(FotoAnimal.FileName).ToLower();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    TempData["Erro"] = "Formato de imagem inválido.";
                    return RedirectToAction("Index", "Home");
                }

                if (FotoAnimal.Length > 5 * 1024 * 1024)
                {
                    TempData["Erro"] = "A imagem é muito grande (máximo 5MB).";
                    return RedirectToAction("Index", "Home");
                }
            }

            // 2. LIMPEZA DO MODELSTATE
            ModelState.Remove("Usuario");
            ModelState.Remove("FotoAnimal");
            ModelState.Remove("CodigoCachorro");

            if (ModelState.IsValid)
            {
                // 3. VINCULAR USUÁRIO LOGADO
                if (!int.TryParse(User.FindFirstValue(ClaimTypes.NameIdentifier), out int idUsuario))
                    return Unauthorized();
                ocorrencia.IdUsuario = idUsuario;

                // 4. GEOCODIFICAÇÃO
                if (!string.IsNullOrEmpty(ocorrencia.Endereco))
                {
                    try
                    {
                        var client = _httpClientFactory.CreateClient();
                        client.DefaultRequestHeaders.Add("User-Agent", "SoSDogApp_PUC_Minas");
                        var url = $"https://nominatim.openstreetmap.org/search?format=json&q={Uri.EscapeDataString(ocorrencia.Endereco)}";
                        var response = await client.GetStringAsync(url);
                        var data = JsonConvert.DeserializeObject<dynamic>(response);

                        if (data != null && data.Count > 0)
                        {
                            ocorrencia.Latitude = (double)data[0].lat;
                            ocorrencia.Longitude = (double)data[0].lon;
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Erro ao buscar coordenadas: " + ex.Message);
                    }
                }

                // 5. CONFIGURAÇÕES AUTOMÁTICAS
                ocorrencia.DataRegistro = DateTime.UtcNow;
                ocorrencia.CodigoCachorro = "DOG-" + Guid.NewGuid().ToString("N")[..6].ToUpper();

                // 6. UPLOAD DA FOTO (Convertendo para Base64)
                if (FotoAnimal != null && FotoAnimal.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        await FotoAnimal.CopyToAsync(ms);
                        byte[] fileBytes = ms.ToArray();
                        // Formata a string Base64 para ser lida diretamente na tag <img> do HTML
                        ocorrencia.FotoAnimal = $"data:{FotoAnimal.ContentType};base64,{Convert.ToBase64String(fileBytes)}";
                    }
                }

                _context.Add(ocorrencia);
                await _context.SaveChangesAsync();

                TempData["Sucesso"] = "Ocorrência registrada com sucesso!";
                return RedirectToAction("Index", "Home");
            }

            TempData["Erro"] = "Não foi possível registrar a ocorrência. Verifique os campos obrigatórios.";
            return RedirectToAction("Index", "Home");
        }

        // GET: Ocorrencias/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var ocorrencia = await _context.Ocorrencias.FindAsync(id);
            if (ocorrencia == null) return NotFound();

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (ocorrencia.IdUsuario.ToString() != userIdString) return Forbid();

            return PartialView("_EditarOcorrenciaModal", ocorrencia);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, Ocorrencia ocorrencia, IFormFile NovaFoto)
        {
            if (id != ocorrencia.IdOcorrencia) return NotFound();

            // 1. Busca a ocorrência original no banco
            var ocorrenciaDb = await _context.Ocorrencias.FindAsync(id);
            if (ocorrenciaDb == null) return NotFound();

            // 2. Segurança: Verifica se o usuário logado é o dono da postagem
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (ocorrenciaDb.IdUsuario.ToString() != userIdString)
            {
                TempData["Erro"] = "Você não tem permissão para editar esta ocorrência.";
                return RedirectToAction("Index", "Home");
            }

            // 3. Validação da nova imagem (se enviada)
            if (NovaFoto != null && NovaFoto.Length > 0)
            {
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                var extensao = Path.GetExtension(NovaFoto.FileName).ToLower();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    TempData["Erro"] = "Formato de imagem inválido. Use .jpg ou .png.";
                    return RedirectToAction("Index", "Home");
                }

                if (NovaFoto.Length > 5 * 1024 * 1024)
                {
                    TempData["Erro"] = "A imagem deve ter no máximo 5MB.";
                    return RedirectToAction("Index", "Home");
                }
            }

            ModelState.Remove("Usuario");
            ModelState.Remove("FotoAnimal");
            ModelState.Remove("IdUsuario");
            ModelState.Remove("NovaFoto");

            if (ModelState.IsValid)
            {
                try
                {
                    // 4. Atualiza apenas os campos permitidos
                    ocorrenciaDb.TipoOcorrencia = ocorrencia.TipoOcorrencia;
                    ocorrenciaDb.EstadoSaude = ocorrencia.EstadoSaude;
                    ocorrenciaDb.Descricao = ocorrencia.Descricao;
                    ocorrenciaDb.Sexo = ocorrencia.Sexo;
                    ocorrenciaDb.CorPelagem = ocorrencia.CorPelagem;
                    ocorrenciaDb.Porte = ocorrencia.Porte;
                    ocorrenciaDb.FaixaEtaria = ocorrencia.FaixaEtaria;
                    ocorrenciaDb.Endereco = ocorrencia.Endereco;

                    // 5. Processamento da Foto (Convertendo para Base64)
                    if (NovaFoto != null && NovaFoto.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            await NovaFoto.CopyToAsync(ms);
                            byte[] fileBytes = ms.ToArray();
                            // Substitui o valor da string antiga pela nova imagem em Base64
                            ocorrenciaDb.FotoAnimal = $"data:{NovaFoto.ContentType};base64,{Convert.ToBase64String(fileBytes)}";
                        }
                    }

                    // 6. Salva as alterações
                    _context.Update(ocorrenciaDb);
                    await _context.SaveChangesAsync();

                    TempData["Sucesso"] = "Ocorrência atualizada com sucesso!";
                    return RedirectToAction("Index", "Home");
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Ocorrencias.Any(e => e.IdOcorrencia == id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }

            TempData["Erro"] = "Erro ao validar os dados. Verifique os campos.";
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> RegistrarAcao(int id, string tipoAcao)
        {
            var ocorrencia = await _context.Ocorrencias.FindAsync(id);
            if (ocorrencia == null) return Json(new { success = false, message = "Ocorrência não encontrada" });

            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userIdString)) return Json(new { success = false, message = "Usuário não identificado" });

            var usuario = await _context.Usuarios.FindAsync(int.Parse(userIdString));
            if (usuario == null) return Json(new { success = false, message = "Usuário não encontrado" });

            string dataFormatada = "";

            if (tipoAcao == "agua")
            {
                ocorrencia.RecebeuAgua = true;
                ocorrencia.DataUltimaAgua = DateTime.Now;
                dataFormatada = ocorrencia.DataUltimaAgua.Value.ToString("dd/MM/yyyy HH:mm");
            }
            else if (tipoAcao == "comida")
            {
                ocorrencia.RecebeuComida = true;
                ocorrencia.DataUltimaComida = DateTime.Now;
                dataFormatada = ocorrencia.DataUltimaComida.Value.ToString("dd/MM/yyyy HH:mm");
            }

            ocorrencia.NomeUsuarioUltimaAcao = usuario.Nome;

            _context.Update(ocorrencia);
            await _context.SaveChangesAsync();

            return Json(new
            {
                success = true,
                dataStr = dataFormatada,
                nomeUsuario = usuario.Nome,
                tipo = tipoAcao
            });
        }

        // GET: Ocorrencias/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var ocorrencia = await _context.Ocorrencias
                .Include(o => o.Usuario)
                .FirstOrDefaultAsync(m => m.IdOcorrencia == id);

            if (ocorrencia == null) return NotFound();

            return View(ocorrencia);
        }

        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            // 1. Buscar a ocorrência no banco
            var ocorrencia = await _context.Ocorrencias.FindAsync(id);
            if (ocorrencia == null)
                return NotFound();

            // 2. Verificar permissão de forma segura (Tipagem forte)
            var claimId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!int.TryParse(claimId, out int usuarioLogadoId) || ocorrencia.IdUsuario != usuarioLogadoId)
            {
                return Forbid();
            }

            // 3. Limpar dependentes PRIMEIRO (Evita o erro de FK enquanto você não altera o banco)
            var favoritos = _context.Favoritos.Where(f => f.IdOcorrencia == id);
            _context.Favoritos.RemoveRange(favoritos);

            var comentarios = _context.Comentarios.Where(c => c.IdOcorrencia == id);
            _context.Comentarios.RemoveRange(comentarios);

            // 4. Deletar do banco e salvar
            _context.Ocorrencias.Remove(ocorrencia);
            await _context.SaveChangesAsync(); // Se der erro aqui, ele para e não deleta a foto à toa.

            // 5. Deletar foto do servidor apenas se a exclusão no banco for um sucesso
            RemoverFotoDoServidor(ocorrencia.FotoAnimal);

            // 6. Retornar feedback ao usuário
            TempData["Sucesso"] = "Ocorrência removida com sucesso!";
            return RedirectToAction("Index", "Home");
        }

        // GET: Ocorrencias/Cartaz/5
        public async Task<IActionResult> Cartaz(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            // Busca a ocorrência trazendo os dados do usuário anexados (Eager Loading)
            var ocorrencia = await _context.Ocorrencias
                .Include(o => o.Usuario)
                .FirstOrDefaultAsync(m => m.IdOcorrencia == id);

            if (ocorrencia == null)
            {
                return NotFound();
            }

            // Retorna a view especializada do cartaz
            return View(ocorrencia);
        }

        // ==========================================
        // MÉTODOS AUXILIARES
        // ==========================================

        /// <summary>
        /// Apaga o arquivo físico da imagem do servidor para economizar espaço
        /// </summary>
        private void RemoverFotoDoServidor(string caminhoFoto)
        {
            if (string.IsNullOrEmpty(caminhoFoto)) return;

            try
            {
                var imagePath = Path.Combine(_webHostEnvironment.WebRootPath, caminhoFoto.TrimStart('/'));
                if (System.IO.File.Exists(imagePath))
                {
                    System.IO.File.Delete(imagePath);
                }
            }
            catch (Exception ex)
            {
                // Em um ambiente de produção real, você usaria o ILogger aqui.
                Console.WriteLine($"Aviso: Não foi possível deletar a imagem do disco. Erro: {ex.Message}");
            }
        }


        private bool OcorrenciaExists(int id)
        {
            return _context.Ocorrencias.Any(e => e.IdOcorrencia == id);
        }
    }
}