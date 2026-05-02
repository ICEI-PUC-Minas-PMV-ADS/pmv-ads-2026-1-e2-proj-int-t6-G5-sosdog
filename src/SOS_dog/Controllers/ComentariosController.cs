using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SosDog.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

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
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null) return Unauthorized();
            int idUsuario = int.Parse(userId);

            var comentario = new Comentario
            {
                Texto = texto,
                DataHora = DateTime.Now,
                IdOcorrencia = idOcorrencia,
                IdUsuario = idUsuario
            };

            _context.Comentarios.Add(comentario);
            await _context.SaveChangesAsync();

            if (Request.Headers["X-Requested-With"] == "XMLHttpRequest" || Request.Headers["Accept"].ToString().Contains("json"))
            {
                return Ok();
            }

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

        [HttpGet]
        public async Task<IActionResult> ListarPorOcorrencia(int ocorrenciaId)
        {
            var comentarios = await _context.Comentarios
                .Include(c => c.Usuario)
                .Where(c => c.IdOcorrencia == ocorrenciaId) // Nome corrigido para Projeto 2
                .OrderByDescending(c => c.DataHora)        // Nome corrigido para Projeto 2
                .Select(c => new {
                    usuarioNome = c.Usuario.Nome,
                    usuarioFoto = c.Usuario.FotoPerfil ?? "/images/default-avatar.png", // Fallback para foto
                    texto = c.Texto,
                    data = c.DataHora.ToString("dd/MM HH:mm")
                })
                .ToListAsync();

            return Json(comentarios);
        }

        private bool ComentarioExists(int id)
        {
            return _context.Comentarios.Any(e => e.IdComentario == id);
        }
    }
}