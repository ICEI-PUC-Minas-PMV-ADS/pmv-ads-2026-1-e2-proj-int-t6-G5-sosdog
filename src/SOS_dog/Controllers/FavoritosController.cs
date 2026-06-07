using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SosDog.Models;
using System.Security.Claims; 
using Microsoft.AspNetCore.Authorization; 

namespace SosDog.Controllers
{
    [Authorize] 
    public class FavoritosController : Controller
    {
        private readonly AppDbContext _context;

        public FavoritosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Alternar(int idOcorrencia)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            
            int idUsuario = int.Parse(userId);

            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.IdUsuario == idUsuario && f.IdOcorrencia == idOcorrencia);

            bool isFavoritado;

            if (favorito != null)
            {
                _context.Favoritos.Remove(favorito);
                isFavoritado = false;
            }
            else
            {
                var novoFavorito = new Favorito
                {
                    IdUsuario = idUsuario,
                    IdOcorrencia = idOcorrencia
                };
                _context.Favoritos.Add(novoFavorito);
                isFavoritado = true;
            }

            await _context.SaveChangesAsync();
            return Json(new { favoritado = isFavoritado });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Add(int idOcorrencia)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            int idUsuario = int.Parse(userId);

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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Remove(int idOcorrencia)
        {
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