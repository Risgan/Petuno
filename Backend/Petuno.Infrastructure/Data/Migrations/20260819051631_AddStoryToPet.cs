using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddStoryToPet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "story",
                table: "pets",
                type: "character varying(3000)",
                maxLength: 3000,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "story",
                table: "pets");
        }
    }
}
