using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Necessário para o ToListAsync se for usar
using SosDog.Models; // Usando o namespace que vimos no seu Ocorrencia.cs
using System.Diagnostics;

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
            return View(listaOcorrencias);
        }

        // ADICIONE ESTE MÉTODO EXPLICITAMENTE:
        public IActionResult Feed()
        {
            try
            {
                // Tenta buscar do banco
                var listaOcorrencias = _context.Ocorrencias.ToList();
                return View(listaOcorrencias);
            }
            catch (Exception)
            {
                // Se o banco der erro (como o erro de login que vimos), 
                // ele retorna uma lista vazia para a página NÃO dar 404 nem tela preta.
                return View(new List<Ocorrencia>());
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