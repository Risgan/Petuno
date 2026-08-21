using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModuleSeeds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "module_configs",
                columns: new[] { "id", "enabled_for_admin", "enabled_for_foundation", "enabled_for_owner", "module_name" },
                values: new object[,]
                {
                    { new Guid("77777777-7777-7777-7777-777777777777"), true, true, true, "Dashboard" },
                    { new Guid("88888888-8888-8888-8888-888888888888"), true, true, true, "Mis Mascotas" },
                    { new Guid("99999999-9999-9999-9999-999999999999"), true, true, true, "Notificaciones" },
                    { new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), true, true, true, "Configuracion" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "module_configs",
                keyColumn: "id",
                keyValue: new Guid("77777777-7777-7777-7777-777777777777"));

            migrationBuilder.DeleteData(
                table: "module_configs",
                keyColumn: "id",
                keyValue: new Guid("88888888-8888-8888-8888-888888888888"));

            migrationBuilder.DeleteData(
                table: "module_configs",
                keyColumn: "id",
                keyValue: new Guid("99999999-9999-9999-9999-999999999999"));

            migrationBuilder.DeleteData(
                table: "module_configs",
                keyColumn: "id",
                keyValue: new Guid("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"));
        }
    }
}
