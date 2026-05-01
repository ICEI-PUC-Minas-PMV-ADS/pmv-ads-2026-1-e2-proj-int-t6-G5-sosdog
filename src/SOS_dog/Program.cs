using Dev_PUC_SoSDog.Models; // Importante para achar o AppDbContext
using Microsoft.EntityFrameworkCore;
using SosDog.Models; // Importante para o UseSqlServer

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;

namespace Dev_PUC_SoSDog
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

            // =======================================================
            // CONFIGURAÇÃO DO BANCO DE DADOS (ENTITY FRAMEWORK CORE)
            // =======================================================
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/Home/Index"; // Onde o usuário é redirecionado se não estiver logado
                    options.AccessDeniedPath = "/Home/Index";
                    options.Cookie.Name = "SoSDogAuth"; // Nome do cookie
                });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapStaticAssets();
            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}")
                .WithStaticAssets();

            app.Run();
        }
    }
}