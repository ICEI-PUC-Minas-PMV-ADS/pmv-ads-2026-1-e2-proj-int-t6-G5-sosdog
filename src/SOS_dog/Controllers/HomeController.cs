using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using SosDog.Models; 
using System.Diagnostics;
using System.Security.Claims;
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

        public IActionResult Index()
        {
            var listaOcorrencias = _context.Ocorrencias.ToList();

            var listaFavoritosIds = new List<int>();
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userIdClaim != null)
            {
                int idUsuario = int.Parse(userIdClaim);
                listaFavoritosIds = _context.Favoritos
                    .Where(f => f.IdUsuario == idUsuario)
                    .Select(f => f.IdOcorrencia)
                    .ToList();
            }

            ViewBag.FavoritosIds = listaFavoritosIds; 

            return View(listaOcorrencias);
        }

        public IActionResult Feed()
        {
            try
            {
                var listaOcorrencias = _context.Ocorrencias.ToList();
                
                var listaFavoritosIds = new List<int>();
                var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (userIdClaim != null)
                {
                    int idUsuario = int.Parse(userIdClaim);
                    listaFavoritosIds = _context.Favoritos
                        .Where(f => f.IdUsuario == idUsuario)
                        .Select(f => f.IdOcorrencia)
                        .ToList();
                }

                ViewBag.FavoritosIds = listaFavoritosIds;

                return View(listaOcorrencias);
            }
            catch (System.Exception)
            {
                ViewBag.FavoritosIds = new List<int>();
                return View(new List<Ocorrencia>());
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