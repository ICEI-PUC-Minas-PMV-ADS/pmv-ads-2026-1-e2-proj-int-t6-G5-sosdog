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

        // ========================================================
        // 1. MÉTODO NOVO PARA O MAPA (AJAX)
        // ========================================================
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Alternar(int idOcorrencia)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            
            int idUsuario = int.Parse(userId);

            // Procura se esse usuário já curtiu esse cachorro
            var favorito = _context.Favoritos
                .FirstOrDefault(f => f.IdUsuario == idUsuario && f.IdOcorrencia == idOcorrencia);

            bool isFavoritado;

            if (favorito != null)
            {
                // Se achou, significa que já estava favoritado. Então a gente remove.
                _context.Favoritos.Remove(favorito);
                isFavoritado = false;
            }
            else
            {
                // Se não achou, a gente cria o favorito.
                var novoFavorito = new Favorito
                {
                    IdUsuario = idUsuario,
                    IdOcorrencia = idOcorrencia
                };
                _context.Favoritos.Add(novoFavorito);
                isFavoritado = true;
            }

            await _context.SaveChangesAsync();

            // Responde para o JavaScript com um JSON simples, sem recarregar a página
            return Json(new { favoritado = isFavoritado });
        }


        // ========================================================
        // 2. MÉTODOS ORIGINAIS DA EQUIPE (Mantidos para não quebrar)
        // ========================================================
        
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