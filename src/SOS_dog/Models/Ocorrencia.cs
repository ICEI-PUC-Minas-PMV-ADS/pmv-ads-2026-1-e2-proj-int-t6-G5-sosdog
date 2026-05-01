using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SosDog.Models
{
    public class Ocorrencia
    {
        // ALTERAÇÃO: ID_Ocorrencia → IdOcorrencia (padrão C#)
        [Key]
        public int IdOcorrencia { get; set; }

        // ==========================================
        // PERFIL DO ANIMAL (OPCIONAIS)
        // ==========================================

        // ALTERAÇÃO: removido underscore (padrão PascalCase)
        public string? CodigoCachorro { get; set; }

        public string? Sexo { get; set; }

        // ALTERAÇÃO: Cor_Pelagem → CorPelagem
        public string? CorPelagem { get; set; }

        public string? Porte { get; set; }

        // ALTERAÇÃO: Faixa_Etaria → FaixaEtaria
        public string? FaixaEtaria { get; set; }

        [Required(ErrorMessage = "O endereço é obrigatório")]
        public string Endereco { get; set; }

        // ==========================================
        // REGISTRO DE AÇÕES (CUIDADOS BÁSICOS)
        // ==========================================

        // ALTERAÇÃO: Recebeu_Agua → RecebeuAgua
        public bool RecebeuAgua { get; set; } = false;

        // ALTERAÇÃO: Recebeu_Comida → RecebeuComida
        public bool RecebeuComida { get; set; } = false;

        // ALTERAÇÃO: Data_Ultima_Agua → DataUltimaAgua
        public DateTime? DataUltimaAgua { get; set; }

        // ALTERAÇÃO: Data_Ultima_Comida → DataUltimaComida
        public DateTime? DataUltimaComida { get; set; }

        // ALTERAÇÃO: Nome_Usuario_Ultima_Acao → NomeUsuarioUltimaAcao
        public string? NomeUsuarioUltimaAcao { get; set; }

        // ==========================================
        // CAMPOS PRINCIPAIS
        // ==========================================

        [Required(ErrorMessage = "O tipo é obrigatório")]
        public string TipoOcorrencia { get; set; }

        [Required(ErrorMessage = "O estado de saúde é obrigatório")]
        public string EstadoSaude { get; set; }

        // ALTERAÇÃO: Foto_Animal → FotoAnimal
        [Required(ErrorMessage = "A foto do animal é obrigatória")]
        public string FotoAnimal { get; set; }

        [Required(ErrorMessage = "A descrição é obrigatória")]
        public string Descricao { get; set; }

        [Required(ErrorMessage = "A latitude é obrigatória")]
        public double Latitude { get; set; }

        [Required(ErrorMessage = "A longitude é obrigatória")]
        public double Longitude { get; set; }

        // ALTERAÇÃO: Data_Registro → DataRegistro
        [Required]
        public DateTime DataRegistro { get; set; } = DateTime.UtcNow;

        // ALTERAÇÃO: ID_Usuario → IdUsuario
        [Required]
        public int IdUsuario { get; set; }

        // ALTERAÇÃO: ajustado nome da FK
        [ForeignKey("IdUsuario")]
        public virtual Usuario? Usuario { get; set; }

        public virtual ICollection<Comentario> Comentarios { get; set; } = new List<Comentario>();

        // ALTERAÇÃO: FavoritadosPor mantido (nome ok)
        public virtual ICollection<Favorito> FavoritadosPor { get; set; } = new List<Favorito>();
    }
}