using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SosDog.Models
{
    public class Comentario
    {
        // ALTERAÇÃO: ID_Comentario → IdComentario
        [Key]
        public int IdComentario { get; set; }

        [Required]
        public string Texto { get; set; }

        public DateTime DataHora { get; set; } = DateTime.Now;

        // Chave Estrangeira - Autor do comentário

        // ALTERAÇÃO: ID_Usuario → IdUsuario
        [Required]
        public int IdUsuario { get; set; }

        // ALTERAÇÃO: ajustado nome da ForeignKey
        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }

        // Chave Estrangeira - Onde o comentário foi feito

        // ALTERAÇÃO: ID_Ocorrencia → IdOcorrencia
        [Required]
        public int IdOcorrencia { get; set; }

        // ALTERAÇÃO: ajustado nome da ForeignKey
        [ForeignKey("IdOcorrencia")]
        public virtual Ocorrencia Ocorrencia { get; set; }
    }
}