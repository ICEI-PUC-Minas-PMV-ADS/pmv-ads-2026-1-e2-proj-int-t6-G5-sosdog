using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SosDog.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SosDog.Controllers
{
    public class UsuariosController : Controller
    {
        private readonly AppDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IConfiguration _configuration;

        public UsuariosController(AppDbContext context, IWebHostEnvironment webHostEnvironment, IConfiguration configuration)
        {
            _context = context;
            _webHostEnvironment = webHostEnvironment;
            _configuration = configuration;
        }

        // GET: Usuarios
        public async Task<IActionResult> Index()
        {
            return View(await _context.Usuarios.ToListAsync());
        }

        // POST: Usuarios/Login
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string email, string senha)
        {
            // 1. Busca o usuário pelo E-mail
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            // 2. Verifica se o usuário existe e se a senha (pure) bate com o SenhaHash
            if (usuario == null || !BCrypt.Net.BCrypt.Verify(senha, usuario.SenhaHash))
            {
                TempData["ErroLogin"] = "E-mail ou senha inválidos.";
                TempData["AbrirModalLogin"] = true;
                return RedirectToAction("Index", "Home");
            }

            // 3. Cria as "Claims" usando os novos nomes de propriedades
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            // 4. Autentica
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return RedirectToAction("Index", "Home");
        }

        // POST: Usuarios/Logout
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        // GET: Usuarios/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null) return NotFound();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.IdUsuario == id);

            if (usuario == null) return NotFound();

            return View(usuario);
        }

        // GET: Usuarios/Create
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Nome,Email,SenhaHash,Telefone")] Usuario usuario, string ConfirmarSenha, IFormFile FotoUpload)
        {
            // 1. Validação de Foto (Tamanho e Formato)
            if (FotoUpload != null && FotoUpload.Length > 0)
            {
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                var extensao = Path.GetExtension(FotoUpload.FileName).ToLower();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    TempData["ErroCadastro"] = "Formato de imagem inválido. Use .jpg ou .png.";
                    TempData["AbrirModalCadastro"] = true;
                    return RedirectToAction("Index", "Home");
                }

                if (FotoUpload.Length > 5 * 1024 * 1024) // 5MB
                {
                    TempData["ErroCadastro"] = "A foto de perfil deve ter no máximo 5MB.";
                    TempData["AbrirModalCadastro"] = true;
                    return RedirectToAction("Index", "Home");
                }
            }
            else
            {
                TempData["ErroCadastro"] = "A foto de perfil é obrigatória.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }

            // 2. Validações de Modelo e Negócio
            ModelState.Remove("FotoPerfil"); // Removido pois preencheremos após o upload bem-sucedido

            if (!ModelState.IsValid)
            {
                TempData["ErroCadastro"] = "Preencha todos os campos corretamente.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }

            if (usuario.SenhaHash != ConfirmarSenha)
            {
                TempData["ErroCadastro"] = "As senhas não coincidem.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }

            var emailExiste = await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email);
            if (emailExiste)
            {
                TempData["ErroCadastro"] = "Este e-mail já está cadastrado.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }

            // 3. Processamento do Upload
            try
            {
                string pastaDestino = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "usuarios");
                if (!Directory.Exists(pastaDestino)) Directory.CreateDirectory(pastaDestino);

                // Uso do Guid para evitar conflito de nomes de arquivos
                string nomeArquivo = Guid.NewGuid().ToString() + Path.GetExtension(FotoUpload.FileName);
                string caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

                using (var stream = new FileStream(caminhoCompleto, FileMode.Create))
                {
                    await FotoUpload.CopyToAsync(stream);
                }

                usuario.FotoPerfil = nomeArquivo;

                // 4. Hash da Senha e Salvamento
                usuario.SenhaHash = BCrypt.Net.BCrypt.HashPassword(usuario.SenhaHash);

                _context.Add(usuario);
                await _context.SaveChangesAsync();

                TempData["Sucesso"] = "Conta criada com sucesso! Faça seu login.";
                return RedirectToAction("Index", "Home");
            }
            catch (Exception)
            {
                TempData["ErroCadastro"] = "Ocorreu um erro interno ao processar seu cadastro.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }
        }

        // POST: Usuarios/SolicitarReset
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> SolicitarReset(string emailRecuperacao)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == emailRecuperacao);
            if (usuario == null)
            {
                TempData["SucessoReset"] = "Se o e-mail existir, um token foi enviado para ele.";
                return RedirectToAction("Index", "Home");
            }

            Random random = new Random();
            string token = random.Next(100000, 999999).ToString();

            usuario.ResetToken = token;
            usuario.ResetTokenExpiracao = DateTime.Now.AddMinutes(15);
            await _context.SaveChangesAsync();

            try
            {
                var emailSettings = _configuration.GetSection("EmailSettings");

                var smtpClient = new SmtpClient(emailSettings["SmtpServer"])
                {
                    Port = int.Parse(emailSettings["Port"]),
                    Credentials = new NetworkCredential(emailSettings["SenderEmail"], emailSettings["SenderPassword"]),
                    EnableSsl = true,
                };

                var mailMessage = new MailMessage
                {
                    From = new MailAddress(emailSettings["SenderEmail"]), // Usa o e-mail do config
                    Subject = "SoSDog - Recuperação de Senha",
                    Body = $"Seu código de recuperação é: <b>{token}</b>. Ele expira em 15 minutos.",
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(emailRecuperacao);
                await smtpClient.SendMailAsync(mailMessage);
            }
            catch (Exception)
            {
                TempData["ErroLogin"] = "Erro ao enviar o e-mail de recuperação.";
                return RedirectToAction("Index", "Home");
            }

            TempData["EmailRecuperacao"] = emailRecuperacao;
            TempData["AbrirModalToken"] = "true";
            return RedirectToAction("Index", "Home");
        }

        // POST: Usuarios/ConfirmarReset
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ConfirmarReset(string email, string token, string novaSenha, string confirmarNovaSenha)
        {
            if (novaSenha != confirmarNovaSenha)
            {
                TempData["ErroReset"] = "As senhas não coincidem.";
                return RedirectToAction("Index", "Home");
            }

            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email && u.ResetToken == token);

            if (usuario == null || usuario.ResetTokenExpiracao < DateTime.Now)
            {
                TempData["ErroReset"] = "Token inválido ou expirado.";
                return RedirectToAction("Index", "Home");
            }

            usuario.SenhaHash = BCrypt.Net.BCrypt.HashPassword(novaSenha);
            usuario.ResetToken = null;
            usuario.ResetTokenExpiracao = null;

            await _context.SaveChangesAsync();

            TempData["Sucesso"] = "Senha alterada com sucesso!";
            return RedirectToAction("Index", "Home");
        }

        // GET: Usuarios/Edit/5
        [Authorize]
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null) return NotFound();

            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null) return NotFound();

            return View(usuario);
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("IdUsuario,Nome,Email,Telefone")] Usuario usuario, IFormFile NovaFoto)
        {
            if (id != usuario.IdUsuario) return NotFound();

            // 1. Buscar o usuário atual do banco (sem rastreamento para não conflitar com o Update depois)
            var usuarioNoBanco = await _context.Usuarios.AsNoTracking().FirstOrDefaultAsync(u => u.IdUsuario == id);
            if (usuarioNoBanco == null) return NotFound();

            // 2. Validação de Imagem (Tamanho e Formato)
            if (NovaFoto != null && NovaFoto.Length > 0)
            {
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                var extensao = Path.GetExtension(NovaFoto.FileName).ToLower();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    ModelState.AddModelError("FotoPerfil", "Apenas imagens .jpg, .jpeg ou .png são permitidas.");
                }
                else if (NovaFoto.Length > 5 * 1024 * 1024) // 5MB
                {
                    ModelState.AddModelError("FotoPerfil", "A imagem deve ter no máximo 5MB.");
                }
                else
                {
                    // Se válida, salvar o arquivo
                    string wwwRootPath = _webHostEnvironment.WebRootPath;
                    string nomeArquivo = Guid.NewGuid().ToString() + extensao;
                    string pastaDestino = Path.Combine(wwwRootPath, "uploads/usuarios");

                    if (!Directory.Exists(pastaDestino)) Directory.CreateDirectory(pastaDestino);

                    string caminhoCompleto = Path.Combine(pastaDestino, nomeArquivo);

                    using (var fileStream = new FileStream(caminhoCompleto, FileMode.Create))
                    {
                        await NovaFoto.CopyToAsync(fileStream);
                    }

                    // Atualiza o caminho da foto no objeto
                    usuario.FotoPerfil = nomeArquivo;
                }
            }
            else
            {
                // Se não enviou foto nova, mantém a que já estava no banco
                usuario.FotoPerfil = usuarioNoBanco.FotoPerfil;
            }

            // 3. Preservar dados que não estão no formulário de edição simples
            usuario.SenhaHash = usuarioNoBanco.SenhaHash;
            usuario.TentativasLoginInvalidas = usuarioNoBanco.TentativasLoginInvalidas;
            usuario.BloqueadoAte = usuarioNoBanco.BloqueadoAte;

            // Remover validação de campos que não vêm do formulário (como Senha)
            ModelState.Remove("SenhaHash");
            ModelState.Remove("NovaFoto");

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(usuario);
                    await _context.SaveChangesAsync();
                    TempData["Sucesso"] = "Perfil atualizado com sucesso!";
                    return RedirectToAction("Details", new { id = usuario.IdUsuario });
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UsuarioExists(usuario.IdUsuario)) return NotFound();
                    else throw;
                }
            }

            return View(usuario);
        }

        // GET: Usuarios/Delete/5
        [Authorize]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.IdUsuario == id);

            if (usuario == null) return NotFound();

            return View(usuario);
        }

        // POST: Usuarios/Delete/5
        [Authorize]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario != null)
            {
                _context.Usuarios.Remove(usuario);
            }

            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.IdUsuario == id);
        }
    }
}