using Microsoft.AspNetCore.Mvc;
using SOS_dog.Models;
using SosDog.Models;
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
            // Buscamos a lista de ocorrências do banco
            // Se quiser os dados do usuário junto, use: _context.Ocorrencias.Include(o => o.Usuario).ToList();
            var listaOcorrencias = _context.Ocorrencias.ToList();

            // Passamos a lista para a View
            return View(listaOcorrencias);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }

}
