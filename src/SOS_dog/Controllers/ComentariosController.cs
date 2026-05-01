using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using SosDog.Models;

namespace SosDog.Controllers
{
    public class ComentariosController : Controller
    {
        private readonly AppDbContext _context;

        public ComentariosController(AppDbContext context)
        {
            _context = context;
        }

        // ALTERAÇÃO: Controller simplificado para o fluxo real do sistema.
        // Motivo: comentário deve ser criado dentro da página da ocorrência, não em um CRUD separado.

        // POST: Comentarios/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(int idOcorrencia, string texto)
        {
            if (string.IsNullOrWhiteSpace(texto))
            {
                return RedirectToAction("Details", "Ocorrencias", new { id = idOcorrencia });
            }

            // ALTERAÇÃO: usuário fixo apenas para protótipo.
            // Depois deve ser substituído pelo ID do usuário logado.
            int idUsuario = 1;

            var comentario = new Comentario
            {
                Texto = texto,
                DataHora = DateTime.Now,
                IdOcorrencia = idOcorrencia,
                IdUsuario = idUsuario
            };

            _context.Comentarios.Add(comentario);
            await _context.SaveChangesAsync();

            return RedirectToAction("Details", "Ocorrencias", new { id = idOcorrencia });
        }

        // POST: Comentarios/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Delete(int id)
        {
            var comentario = await _context.Comentarios.FindAsync(id);

            if (comentario == null)
            {
                return NotFound();
            }

            int idOcorrencia = comentario.IdOcorrencia;

            _context.Comentarios.Remove(comentario);
            await _context.SaveChangesAsync();

            return RedirectToAction("Details", "Ocorrencias", new { id = idOcorrencia });
        }

        private bool ComentarioExists(int id)
        {
            return _context.Comentarios.Any(e => e.IdComentario == id);
        }
    }
}