using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SosDog.Models
{
    public class Favorito
    {
        // ALTERAÇÃO: ID_Favorito → IdFavorito
        [Key]
        public int IdFavorito { get; set; }

        // Chave Estrangeira - Quem favoritou

        // ALTERAÇÃO: ID_Usuario → IdUsuario
        [Required]
        public int IdUsuario { get; set; }

        // ALTERAÇÃO: ajustado nome da ForeignKey
        [ForeignKey("IdUsuario")]
        public virtual Usuario Usuario { get; set; }

        // Chave Estrangeira - O que foi favoritado

        // ALTERAÇÃO: ID_Ocorrencia → IdOcorrencia
        [Required]
        public int IdOcorrencia { get; set; }

        // ALTERAÇÃO: ajustado nome da ForeignKey
        [ForeignKey("IdOcorrencia")]
        public virtual Ocorrencia Ocorrencia { get; set; }
    }
}