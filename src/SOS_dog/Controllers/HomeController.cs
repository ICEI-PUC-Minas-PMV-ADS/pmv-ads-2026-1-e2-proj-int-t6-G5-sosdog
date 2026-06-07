using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using SosDog.Models; 
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using System.Linq;
using System.Collections.Generic;

namespace SOS_dog.Controllers
{
    public class HomeController : Controller
    {
        private readonly AppDbContext _context;

        public HomeController(AppDbContext context)
        {
            _context = context;
        }

        private async Task PrepareViewDataAsync()
        {
            var listaFavoritosIds = new List<int>();
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (int.TryParse(userIdClaim, out int idUsuario))
            {
                listaFavoritosIds = await _context.Favoritos
                    .Where(f => f.IdUsuario == idUsuario)
                    .Select(f => f.IdOcorrencia)
                    .ToListAsync();
            }

            ViewBag.FavoritosIds = listaFavoritosIds;
        }

        public async Task<IActionResult> Index()
        {
            var listaOcorrencias = await _context.Ocorrencias
                 .Include(o => o.Usuario)
                 .ToListAsync();

            await PrepareViewDataAsync();
            return View(listaOcorrencias);
        }

        public async Task<IActionResult> Feed()
        {
            try
            {
                var listaOcorrencias = await _context.Ocorrencias
                     .Include(o => o.Usuario)
                     .ToListAsync();

                await PrepareViewDataAsync();
                return View("Index", listaOcorrencias);
            }
            catch (Exception ex)
            {
                // Em uma aplicação real, é uma boa prática registrar o erro.
                Console.WriteLine($"Erro ao carregar o feed: {ex.Message}");
                ViewBag.FavoritosIds = new List<int>();
                return View("Index", new List<Ocorrencia>());
            }
        }

        public IActionResult Emergencia()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new SOS_dog.Models.ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}