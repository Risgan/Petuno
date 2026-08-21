using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangePetAgeToBirthDate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "age",
                table: "pets");

            migrationBuilder.AddColumn<DateOnly>(
                name: "birth_date",
                table: "pets",
                type: "date",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "birth_date",
                table: "pets");

            migrationBuilder.AddColumn<string>(
                name: "age",
                table: "pets",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
