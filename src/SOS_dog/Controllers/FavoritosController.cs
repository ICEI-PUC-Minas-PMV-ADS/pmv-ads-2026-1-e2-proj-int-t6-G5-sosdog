using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SosDog.Models;

namespace SosDog.Controllers
{
    public class FavoritosController : Controller
    {
        private readonly AppDbContext _context;

        public FavoritosController(AppDbContext context)
        {
            _context = context;
        }

        // ALTERAÇÃO: Controller simplificado
        // Motivo: favorito é uma ação (toggle), não um CRUD completo

        // POST: Favoritar
        [HttpPost]
        public async Task<IActionResult> Add(int idOcorrencia)
        {
            // ALTERAÇÃO: usuário fixo (protótipo)
            // Depois deve vir do login
            int idUsuario = 1;

            // Verifica se já existe (evita duplicado)
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
        public async Task<IActionResult> Remove(int idOcorrencia)
        {
            int idUsuario = 1;

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