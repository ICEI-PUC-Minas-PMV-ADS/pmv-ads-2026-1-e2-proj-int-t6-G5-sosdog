using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; 
using SosDog.Models; 
using System.Diagnostics;
using System.Security.Claims; // ADICIONADO: Para identificar o usuário logado
using System.Linq; // ADICIONADO: Para trabalhar com as listas
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

            // --- INÍCIO DA LÓGICA DE FAVORITOS ---
            var listaFavoritosIds = new List<int>();
            var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userIdClaim != null) // Se tem alguém logado
            {
                int idUsuario = int.Parse(userIdClaim);
                // Busca no banco apenas as ocorrências que ESSE usuário favoritou
                listaFavoritosIds = _context.Favoritos
                    .Where(f => f.IdUsuario == idUsuario)
                    .Select(f => f.IdOcorrencia)
                    .ToList();
            }

            // Envia a lista para a View acender os corações
            ViewBag.FavoritosIds = listaFavoritosIds; 
            // --- FIM DA LÓGICA DE FAVORITOS ---

            return View(listaOcorrencias);
        }

        public IActionResult Feed()
        {
            try
            {
                var listaOcorrencias = _context.Ocorrencias.ToList();
<<<<<<< HEAD
                
                // Repetindo a lógica de favoritos aqui para a tela de Feed também acender os corações
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
            catch (Exception)
            {
                ViewBag.FavoritosIds = new List<int>(); // Retorna lista vazia se der erro no banco
                return View(new List<Ocorrencia>());
=======
                return View("Index", listaOcorrencias);
            }
            catch (Exception)
            {
                // Se o banco der erro (como o erro de login que vimos), 
                // ele retorna uma lista vazia para a página NÃO dar 404 nem tela preta.
                return View("Index", new List<Ocorrencia>());
>>>>>>> 33fa1901d8d6c9dc476ada0030bbd2cb45ce3bdb
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
    }
}