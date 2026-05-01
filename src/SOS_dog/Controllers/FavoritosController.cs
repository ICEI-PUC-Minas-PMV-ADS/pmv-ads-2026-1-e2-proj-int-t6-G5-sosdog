using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SosDog.Models;
using System.Security.Claims; // Necessário para usar Claims
using Microsoft.AspNetCore.Authorization; // Necessário para [Authorize]

namespace SosDog.Controllers
{
    [Authorize] // Garante que o usuário esteja logado para qualquer ação neste Controller
    public class FavoritosController : Controller
    {
        private readonly AppDbContext _context;

        public FavoritosController(AppDbContext context)
        {
            _context = context;
        }

        // POST: Favoritar
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Add(int idOcorrencia)
        {
            // RECUPERANDO O ID DO USUÁRIO LOGADO
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            int idUsuario = int.Parse(userId);

            // Verifica se já existe para evitar duplicados no banco
            var existe = _context.Favoritos
                .Any(f => f.IdUsuario == idUsuario && f.IdOcorrencia == idOcorrencia);

            if (!existe)
            {
                var favorito = new Favorito
                {
                    IdUsuario = idUsuario,
                    IdOcorrencia = idOcorrencia,
                };

                _context.Favoritos.Add(favorito);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Details", "Ocorrencias", new { id = idOcorrencia });
        }

        // POST: Remover favorito
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Remove(int idOcorrencia)
        {
            // RECUPERANDO O ID DO USUÁRIO LOGADO
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            int idUsuario = int.Parse(userId);

            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.IdUsuario == idUsuario && f.IdOcorrencia == idOcorrencia);

            if (favorito != null)
            {
                _context.Favoritos.Remove(favorito);
                await _context.SaveChangesAsync();
            }

            return RedirectToAction("Details", "Ocorrencias", new { id = idOcorrencia });
        }
    }
}