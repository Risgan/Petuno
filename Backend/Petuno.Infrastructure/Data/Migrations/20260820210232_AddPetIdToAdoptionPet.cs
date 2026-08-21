using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPetIdToAdoptionPet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "pet_id",
                table: "adoption_pets",
                type: "uuid",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "pet_id",
                table: "adoption_pets");
        }
    }
}
