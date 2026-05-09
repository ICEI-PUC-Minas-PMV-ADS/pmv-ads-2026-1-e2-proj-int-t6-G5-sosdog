using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SOS_dog.Migrations
{
    /// <inheritdoc />
    public partial class AddConfirmacaoEmailUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmado",
                table: "Usuarios",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "TokenConfirmacaoEmail",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TokenConfirmacaoEmailExpiracao",
                table: "Usuarios",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailConfirmado",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "TokenConfirmacaoEmail",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "TokenConfirmacaoEmailExpiracao",
                table: "Usuarios");
        }
    }
}
