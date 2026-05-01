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

namespace Dev_PUC_SoSDog.Controllers
{
    public class OcorrenciasController : Controller
    {
        private readonly AppDbContext _context;

        public OcorrenciasController(AppDbContext context)
        {
            _context = context;
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
            // Ajustado para IdUsuario e Email
            ViewData["IdUsuario"] = new SelectList(_context.Usuarios, "IdUsuario", "Email");
            return View();
        }

        // POST: Ocorrencias/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Create([Bind("TipoOcorrencia,EstadoSaude,Descricao,Latitude,Longitude,Sexo,CorPelagem,Porte,FaixaEtaria,Endereco,RecebeuAgua,RecebeuComida")] Ocorrencia ocorrencia, IFormFile FotoAnimal)
        {
            // Removendo validações de campos preenchidos automaticamente ou via Upload
            ModelState.Remove("Usuario");
            ModelState.Remove("FotoAnimal");
            ModelState.Remove("CodigoCachorro");

            if (ModelState.IsValid)
            {
                // 1. Vincular o usuário logado
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (userId == null) return Unauthorized();
                ocorrencia.IdUsuario = int.Parse(userId);

                // --- LÓGICA DE GEOCODIFICAÇÃO ---
                if (!string.IsNullOrEmpty(ocorrencia.Endereco))
                {
                    try
                    {
                        using (var client = new HttpClient())
                        {
                            client.DefaultRequestHeaders.Add("User-Agent", "SoSDogApp_PUC_Minas");
                            var url = $"https://nominatim.openstreetmap.org/search?format=json&q={Uri.EscapeDataString(ocorrencia.Endereco)}";
                            var response = await client.GetStringAsync(url);
                            var data = JsonConvert.DeserializeObject<dynamic>(response);

                            if (data != null && data.Count > 0)
                            {
                                ocorrencia.Latitude = (float)data[0].lat;
                                ocorrencia.Longitude = (float)data[0].lon;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Erro ao buscar coordenadas: " + ex.Message);
                    }
                }

                // 2. Configurações automáticas
                ocorrencia.DataRegistro = DateTime.UtcNow;
                ocorrencia.CodigoCachorro = "DOG-" + new Random().Next(1000, 9999).ToString();

                // 3. Processar Upload da Foto
                if (FotoAnimal != null && FotoAnimal.Length > 0)
                {
                    string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/ocorrencias");
                    if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                    string fileName = Guid.NewGuid().ToString() + "_" + FotoAnimal.FileName;
                    string filePath = Path.Combine(folder, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await FotoAnimal.CopyToAsync(stream);
                    }

                    ocorrencia.FotoAnimal = "/images/ocorrencias/" + fileName;
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

        // POST: Ocorrencias/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize]
        public async Task<IActionResult> Edit(int id, Ocorrencia ocorrencia, IFormFile NovaFoto)
        {
            if (id != ocorrencia.IdOcorrencia)
            {
                return NotFound();
            }

            ModelState.Remove("Usuario");
            ModelState.Remove("Comentarios");
            ModelState.Remove("FavoritadosPor");
            ModelState.Remove("FotoAnimal");

            if (ModelState.IsValid)
            {
                try
                {
                    if (NovaFoto != null && NovaFoto.Length > 0)
                    {
                        string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/ocorrencias");
                        if (!Directory.Exists(folder)) Directory.CreateDirectory(folder);

                        string fileName = Guid.NewGuid().ToString() + "_" + NovaFoto.FileName;
                        string filePath = Path.Combine(folder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await NovaFoto.CopyToAsync(stream);
                        }

                        ocorrencia.FotoAnimal = "/images/ocorrencias/" + fileName;
                    }

                    _context.Update(ocorrencia);
                    await _context.SaveChangesAsync();

                    TempData["Sucesso"] = "Ocorrência atualizada com sucesso!";
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!OcorrenciaExists(ocorrencia.IdOcorrencia))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index", "Home");
            }

            TempData["Erro"] = "Não foi possível salvar as alterações.";
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [Authorize]
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
            var ocorrencia = await _context.Ocorrencias
                .Include(o => o.Comentarios)
                .Include(o => o.FavoritadosPor)
                .FirstOrDefaultAsync(m => m.IdOcorrencia == id);

            if (ocorrencia == null) return NotFound();

            var usuarioLogadoId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (ocorrencia.IdUsuario.ToString() != usuarioLogadoId) return Forbid();

            // Limpar dependências
            if (ocorrencia.Comentarios != null && ocorrencia.Comentarios.Any())
                _context.Comentarios.RemoveRange(ocorrencia.Comentarios);

            if (ocorrencia.FavoritadosPor != null && ocorrencia.FavoritadosPor.Any())
                _context.Favoritos.RemoveRange(ocorrencia.FavoritadosPor);

            _context.Ocorrencias.Remove(ocorrencia);
            await _context.SaveChangesAsync();

            return RedirectToAction("Index", "Home");
        }

        private bool OcorrenciaExists(int id)
        {
            return _context.Ocorrencias.Any(e => e.IdOcorrencia == id);
        }
    }
}