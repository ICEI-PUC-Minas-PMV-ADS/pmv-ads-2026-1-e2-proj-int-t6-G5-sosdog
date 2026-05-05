using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SosDog.Models;
using System;
using System.Collections.Generic;
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

        public async Task<IActionResult> Index()
        {
            return View(await _context.Usuarios.ToListAsync());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string email, string senha)
        {
            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email);

            if (usuario == null || !BCrypt.Net.BCrypt.Verify(senha, usuario.SenhaHash))
            {
                TempData["ErroLogin"] = "E-mail ou senha inválidos.";
                TempData["AbrirModalLogin"] = true;
                return RedirectToAction("Index", "Home");
            }

            if (!usuario.EmailConfirmado)
            {
                TempData["ErroLogin"] = "Confirme seu e-mail antes de fazer login.";
                TempData["AbrirModalLogin"] = true;
                return RedirectToAction("Index", "Home");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.IdUsuario.ToString()),
                new Claim(ClaimTypes.Name, usuario.Nome),
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);

            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id == null) return NotFound();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.IdUsuario == id);

            if (usuario == null) return NotFound();

            return View(usuario);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Nome,Email,SenhaHash,Telefone")] Usuario usuario, string ConfirmarSenha, IFormFile FotoUpload)
        {
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

                if (FotoUpload.Length > 2 * 1024 * 1024)
                {
                    TempData["ErroCadastro"] = "A foto de perfil deve ter no máximo 2MB para armazenamento em banco.";
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

            ModelState.Remove("FotoPerfil");

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

            var emailNormalizado = usuario.Email.Trim().ToLower();

            var emailExiste = await _context.Usuarios
                .AnyAsync(u => u.Email.ToLower() == emailNormalizado);

            usuario.Email = emailNormalizado;

            if (emailExiste)
            {
                TempData["ErroCadastro"] = "Este e-mail já está cadastrado.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }

            try
            {
                using (var ms = new MemoryStream())
                {
                    await FotoUpload.CopyToAsync(ms);
                    byte[] fileBytes = ms.ToArray();

                    string base64String = Convert.ToBase64String(fileBytes);
                    usuario.FotoPerfil = $"data:{FotoUpload.ContentType};base64,{base64String}";
                }

                usuario.SenhaHash = BCrypt.Net.BCrypt.HashPassword(usuario.SenhaHash);

                usuario.EmailConfirmado = false;
                usuario.TokenConfirmacaoEmail = Guid.NewGuid().ToString();
                usuario.TokenConfirmacaoEmailExpiracao = DateTime.Now.AddHours(24);

                _context.Add(usuario);
                await _context.SaveChangesAsync();

                var linkConfirmacao = Url.Action(
                    "ConfirmarEmail",
                    "Usuarios",
                    new { token = usuario.TokenConfirmacaoEmail },
                    Request.Scheme
                );

                try
                {
                    var emailSettings = _configuration.GetSection("EmailSettings");

                    var smtpClient = new SmtpClient(emailSettings["SmtpServer"])
                    {
                        Port = int.Parse(emailSettings["Port"]),
                        Credentials = new NetworkCredential(
                            emailSettings["SenderEmail"],
                            emailSettings["SenderPassword"]
                        ),
                        EnableSsl = true,
                    };

                    var mailMessage = new MailMessage
                    {
                        From = new MailAddress(emailSettings["SenderEmail"]),
                        Subject = "SoSDog - Confirmação de E-mail",
                        Body = $@"
                            <h2>Bem-vindo ao SoSDog!</h2>
                            <p>Olá, {usuario.Nome}.</p>
                            <p>Para ativar sua conta, clique no link abaixo:</p>
                            <p><a href='{linkConfirmacao}'>Confirmar meu e-mail</a></p>
                            <p>Este link expira em 24 horas.</p>
                        ",
                        IsBodyHtml = true,
                    };

                    mailMessage.To.Add(usuario.Email);

                    await smtpClient.SendMailAsync(mailMessage);

                    TempData["Sucesso"] = "Conta criada com sucesso! Enviamos um link de confirmação para seu e-mail.";
                }
                catch (Exception ex)
                {
                    TempData["ErroCadastro"] = "Conta criada, mas erro ao enviar e-mail: " + ex.Message;
                }

                return RedirectToAction("Index", "Home");
            }
            catch (Exception)
            {
                TempData["ErroCadastro"] = "Ocorreu um erro interno ao processar seu cadastro.";
                TempData["AbrirModalCadastro"] = true;
                return RedirectToAction("Index", "Home");
            }
        }

        public async Task<IActionResult> ConfirmarEmail(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                TempData["ErroLogin"] = "Token de confirmação inválido.";
                return RedirectToAction("Index", "Home");
            }

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.TokenConfirmacaoEmail == token);

            if (usuario == null || usuario.TokenConfirmacaoEmailExpiracao < DateTime.Now)
            {
                TempData["ErroLogin"] = "Token de confirmação inválido ou expirado.";
                return RedirectToAction("Index", "Home");
            }

            usuario.EmailConfirmado = true;
            usuario.TokenConfirmacaoEmail = null;
            usuario.TokenConfirmacaoEmailExpiracao = null;

            await _context.SaveChangesAsync();

            TempData["Sucesso"] = "E-mail confirmado com sucesso! Agora você pode fazer login.";
            TempData["AbrirModalLogin"] = true;

            return RedirectToAction("Index", "Home");
        }

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
                    From = new MailAddress(emailSettings["SenderEmail"]),
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ConfirmarReset(string email, string token, string novaSenha, string confirmarNovaSenha)
        {
            if (novaSenha != confirmarNovaSenha)
            {
                TempData["ErroReset"] = "As senhas não coincidem.";
                return RedirectToAction("Index", "Home");
            }

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email == email && u.ResetToken == token);

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

            var usuarioNoBanco = await _context.Usuarios
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.IdUsuario == id);

            if (usuarioNoBanco == null) return NotFound();

            if (NovaFoto != null && NovaFoto.Length > 0)
            {
                var extensoesPermitidas = new[] { ".jpg", ".jpeg", ".png" };
                var extensao = Path.GetExtension(NovaFoto.FileName).ToLower();

                if (!extensoesPermitidas.Contains(extensao))
                {
                    ModelState.AddModelError("FotoPerfil", "Apenas imagens .jpg, .jpeg ou .png são permitidas.");
                }
                else if (NovaFoto.Length > 5 * 1024 * 1024)
                {
                    ModelState.AddModelError("FotoPerfil", "A imagem deve ter no máximo 5MB.");
                }
                else
                {
                    using (var ms = new MemoryStream())
                    {
                        await NovaFoto.CopyToAsync(ms);
                        byte[] fileBytes = ms.ToArray();
                        usuario.FotoPerfil = $"data:{NovaFoto.ContentType};base64,{Convert.ToBase64String(fileBytes)}";
                    }
                }
            }
            else
            {
                usuario.FotoPerfil = usuarioNoBanco.FotoPerfil;
            }

            usuario.SenhaHash = usuarioNoBanco.SenhaHash;
            usuario.ResetToken = usuarioNoBanco.ResetToken;
            usuario.ResetTokenExpiracao = usuarioNoBanco.ResetTokenExpiracao;

            usuario.EmailConfirmado = usuarioNoBanco.EmailConfirmado;
            usuario.TokenConfirmacaoEmail = usuarioNoBanco.TokenConfirmacaoEmail;
            usuario.TokenConfirmacaoEmailExpiracao = usuarioNoBanco.TokenConfirmacaoEmailExpiracao;

            usuario.TentativasLoginInvalidas = usuarioNoBanco.TentativasLoginInvalidas;
            usuario.BloqueadoAte = usuarioNoBanco.BloqueadoAte;

            ModelState.Remove("SenhaHash");
            ModelState.Remove("NovaFoto");
            ModelState.Remove("FotoPerfil");

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

        [Authorize]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null) return NotFound();

            var usuario = await _context.Usuarios
                .FirstOrDefaultAsync(m => m.IdUsuario == id);

            if (usuario == null) return NotFound();

            return View(usuario);
        }

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