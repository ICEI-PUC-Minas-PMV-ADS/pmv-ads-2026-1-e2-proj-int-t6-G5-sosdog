using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Necessário para o ToListAsync se for usar
using SosDog.Models; // Usando o namespace que vimos no seu Ocorrencia.cs
using System.Diagnostics;
using System.Security.Claims;

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
            var listaOcorrencias = _context.Ocorrencias
                 .Include(o => o.Usuario) 
                 .ToList();

            CarregarFavoritosNaViewBag();

            return View(listaOcorrencias);
        }

        public IActionResult Feed()
        {
            try
            {
                var listaOcorrencias = _context.Ocorrencias
                     .Include(o => o.Usuario) // <--- Garante o carregamento no Feed também
                     .ToList();

                CarregarFavoritosNaViewBag();

                return View("Index", listaOcorrencias);
            }
            catch (Exception)
            {
                return View("Index", new List<Ocorrencia>());
            }
        }

        // Rota para carregar a página informativa de contatos de emergência
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

        private void CarregarFavoritosNaViewBag()
        {
            var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var favoritosIds = new List<int>();

            if (!string.IsNullOrEmpty(userIdString) && int.TryParse(userIdString, out int idUsuario))
            {
                // Busca na tabela de Favoritos os IDs das ocorrências favoritadas pelo usuário logado
                favoritosIds = _context.Favoritos
                    .Where(f => f.IdUsuario == idUsuario)
                    .Select(f => f.IdOcorrencia)
                    .ToList();
            }

            ViewBag.FavoritosIds = favoritosIds;
        }
    }

}