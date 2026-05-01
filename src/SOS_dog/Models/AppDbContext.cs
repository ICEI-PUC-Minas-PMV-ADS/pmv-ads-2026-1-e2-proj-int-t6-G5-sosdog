using Microsoft.EntityFrameworkCore;

namespace SosDog.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Ocorrencia> Ocorrencias { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
        public DbSet<Favorito> Favoritos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Evitando problemas de "Multiple Cascade Paths" (múltiplos caminhos de exclusão em cascata)
            // As exclusões automáticas foram restringidas para evitar perda de dados e conflitos entre relacionamentos.
            modelBuilder.Entity<Comentario>()
                .HasOne(c => c.Ocorrencia)
                .WithMany(o => o.Comentarios)
                .HasForeignKey(c => c.IdOcorrencia) // ALTERAÇÃO
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.Ocorrencia)
                .WithMany(o => o.FavoritadosPor)
                .HasForeignKey(f => f.IdOcorrencia) // ALTERAÇÃO
                .OnDelete(DeleteBehavior.Restrict);

            // Definindo que uma ocorrência pertence a um usuário e um usuário pode registrar várias ocorrências
            modelBuilder.Entity<Ocorrencia>()
                .HasOne(o => o.Usuario)
                .WithMany(u => u.OcorrenciasRegistradas)
                .HasForeignKey(o => o.IdUsuario) // ALTERAÇÃO
                .OnDelete(DeleteBehavior.Restrict);

            // Definindo que um comentário pertence a um usuário e um usuário pode fazer vários comentários
            modelBuilder.Entity<Comentario>()
                .HasOne(c => c.Usuario)
                .WithMany(u => u.Comentarios)
                .HasForeignKey(c => c.IdUsuario) // ALTERAÇÃO
                .OnDelete(DeleteBehavior.Restrict);

            // Definindo que um favorito pertence a um usuário e um usuário pode ter vários favoritos
            modelBuilder.Entity<Favorito>()
                .HasOne(f => f.Usuario)
                .WithMany(u => u.Favoritos)
                .HasForeignKey(f => f.IdUsuario) // ALTERAÇÃO
                .OnDelete(DeleteBehavior.Restrict);

            // Garantindo que um usuário não possa favoritar a mesma ocorrência mais de uma vez
            modelBuilder.Entity<Favorito>()
                .HasIndex(f => new { f.IdUsuario, f.IdOcorrencia }) // ALTERAÇÃO
                .IsUnique();

            // Garantindo que o e-mail do usuário seja único no sistema
            // Isso evita dois cadastros usando o mesmo e-mail de login.
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}