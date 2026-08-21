using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPetSpecies : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pet_species",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_pet_species", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "pet_species",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { new Guid("11111111-2222-3333-4444-555555555551"), "Perro" },
                    { new Guid("11111111-2222-3333-4444-555555555552"), "Gato" },
                    { new Guid("11111111-2222-3333-4444-555555555553"), "Ave" },
                    { new Guid("11111111-2222-3333-4444-555555555554"), "Conejo" },
                    { new Guid("11111111-2222-3333-4444-555555555555"), "Caballo" },
                    { new Guid("11111111-2222-3333-4444-555555555556"), "Vaca" },
                    { new Guid("11111111-2222-3333-4444-555555555557"), "Cerdo" },
                    { new Guid("11111111-2222-3333-4444-555555555558"), "Otro" }
                });

            migrationBuilder.CreateIndex(
                name: "ix_pet_species_name",
                table: "pet_species",
                column: "name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pet_species");
        }
    }
}
