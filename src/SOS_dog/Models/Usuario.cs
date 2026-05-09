using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SosDog.Models
{
    public class Usuario
    {
        // ALTERAÇÃO: ID_Usuario → IdUsuario (padrão C# / compatível com Ocorrencia)
        [Key]
        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        [StringLength(100)]
        // ALTERAÇÃO: inicializado para evitar warning de nullable
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "Formato de e-mail inválido.")]
        // ALTERAÇÃO: inicializado para evitar warning
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "A senha é obrigatória.")]
        // ALTERAÇÃO: inicializado para evitar warning
        public string SenhaHash { get; set; } = string.Empty;

        // ALTERAÇÃO: Foto_Perfil → FotoPerfil (padrão PascalCase)
        [Column(TypeName = "nvarchar(max)")]
        public string? FotoPerfil { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório.")]
        [Phone(ErrorMessage = "Formato de telefone inválido.")]
        // ALTERAÇÃO: inicializado para evitar warning
        public string Telefone { get; set; } = string.Empty;

        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiracao { get; set; }

        public bool EmailConfirmado { get; set; } = false;
        public string? TokenConfirmacaoEmail { get; set; }
        public DateTime? TokenConfirmacaoEmailExpiracao { get; set; }

        public int TentativasLoginInvalidas { get; set; } = 0;
        public DateTime? BloqueadoAte { get; set; }

        public virtual ICollection<Ocorrencia> OcorrenciasRegistradas { get; set; } = new List<Ocorrencia>();

        public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();
        public virtual ICollection<Favorito> Favoritos { get; set; } = new List<Favorito>();
    }
}