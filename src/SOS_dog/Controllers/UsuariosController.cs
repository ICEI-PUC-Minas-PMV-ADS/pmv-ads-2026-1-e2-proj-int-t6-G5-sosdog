using Microsoft.AspNetCore.Mvc;
using SosDog.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore; // <-- ESSA LINHA É A MÁGICA PARA O BANCO DE DADOS FUNCIONAR!

namespace SosDog.Controllers
{
    public class UsuariosController : Controller
    {
        private readonly AppDbContext _contexto;

        public UsuariosController(AppDbContext contexto)
        {
            _contexto = contexto;
        }

        public IActionResult Cadastrar()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Cadastrar(Usuario novoUsuario)
        {
            if (ModelState.IsValid)
            {
                _contexto.Usuarios.Add(novoUsuario); 
                _contexto.SaveChanges(); 
                return RedirectToAction("Index", "Home"); 
            }
            return View(novoUsuario); 
        }

        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(string email, string senha)
        {
            var usuario = await _contexto.Usuarios.FirstOrDefaultAsync(u => u.Email == email && u.Senha == senha);

            if (usuario != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, usuario.Email),
                    new Claim(ClaimTypes.Name, usuario.Nome) // <-- O NOME ESTÁ AQUI!
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));

                return RedirectToAction("Index", "Home");
            }

            ViewBag.Erro = "E-mail ou senha incorretos.";
            return View();
        }

        // --- AÇÃO PARA DESLOGAR O USUÁRIO ---
        public async Task<IActionResult> Sair()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Index", "Home");
        }

        public IActionResult RecuperarSenha()
        {
            return View();
        }
    } 
}