using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Petuno.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddModuleConfigs : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_adoption_applications_adoption_pets_adoption_pet_id",
                table: "adoption_applications");

            migrationBuilder.DropForeignKey(
                name: "FK_adoption_applications_users_applicant_id",
                table: "adoption_applications");

            migrationBuilder.DropForeignKey(
                name: "FK_adoption_pets_foundations_foundation_id",
                table: "adoption_pets");

            migrationBuilder.DropForeignKey(
                name: "FK_devices_pets_pet_id",
                table: "devices");

            migrationBuilder.DropForeignKey(
                name: "FK_foundations_users_user_id",
                table: "foundations");

            migrationBuilder.DropForeignKey(
                name: "FK_medical_records_pets_pet_id",
                table: "medical_records");

            migrationBuilder.DropForeignKey(
                name: "FK_pets_users_owner_id",
                table: "pets");

            migrationBuilder.DropForeignKey(
                name: "FK_privacy_settings_pets_pet_id",
                table: "privacy_settings");

            migrationBuilder.DropForeignKey(
                name: "FK_sightings_pets_pet_id",
                table: "sightings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_sightings",
                table: "sightings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_privacy_settings",
                table: "privacy_settings");

            migrationBuilder.DropPrimaryKey(
                name: "PK_pets",
                table: "pets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_medical_records",
                table: "medical_records");

            migrationBuilder.DropPrimaryKey(
                name: "PK_foundations",
                table: "foundations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_devices",
                table: "devices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_adoption_pets",
                table: "adoption_pets");

            migrationBuilder.DropPrimaryKey(
                name: "PK_adoption_applications",
                table: "adoption_applications");

            migrationBuilder.RenameIndex(
                name: "IX_users_email",
                table: "users",
                newName: "ix_users_email");

            migrationBuilder.RenameIndex(
                name: "IX_sightings_pet_id",
                table: "sightings",
                newName: "ix_sightings_pet_id");

            migrationBuilder.RenameIndex(
                name: "IX_privacy_settings_pet_id",
                table: "privacy_settings",
                newName: "ix_privacy_settings_pet_id");

            migrationBuilder.RenameIndex(
                name: "IX_pets_petuno_id",
                table: "pets",
                newName: "ix_pets_petuno_id");

            migrationBuilder.RenameIndex(
                name: "IX_pets_owner_id",
                table: "pets",
                newName: "ix_pets_owner_id");

            migrationBuilder.RenameIndex(
                name: "IX_medical_records_pet_id",
                table: "medical_records",
                newName: "ix_medical_records_pet_id");

            migrationBuilder.RenameIndex(
                name: "IX_foundations_user_id",
                table: "foundations",
                newName: "ix_foundations_user_id");

            migrationBuilder.RenameIndex(
                name: "IX_foundations_nit",
                table: "foundations",
                newName: "ix_foundations_nit");

            migrationBuilder.RenameIndex(
                name: "IX_devices_pet_id",
                table: "devices",
                newName: "ix_devices_pet_id");

            migrationBuilder.RenameIndex(
                name: "IX_adoption_pets_foundation_id",
                table: "adoption_pets",
                newName: "ix_adoption_pets_foundation_id");

            migrationBuilder.RenameIndex(
                name: "IX_adoption_applications_applicant_id",
                table: "adoption_applications",
                newName: "ix_adoption_applications_applicant_id");

            migrationBuilder.RenameIndex(
                name: "IX_adoption_applications_adoption_pet_id",
                table: "adoption_applications",
                newName: "ix_adoption_applications_adoption_pet_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_sightings",
                table: "sightings",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_privacy_settings",
                table: "privacy_settings",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_pets",
                table: "pets",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_medical_records",
                table: "medical_records",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_foundations",
                table: "foundations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_devices",
                table: "devices",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_adoption_pets",
                table: "adoption_pets",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_adoption_applications",
                table: "adoption_applications",
                column: "id");

            migrationBuilder.CreateTable(
                name: "module_configs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    module_name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    enabled_for_owner = table.Column<bool>(type: "boolean", nullable: false),
                    enabled_for_foundation = table.Column<bool>(type: "boolean", nullable: false),
                    enabled_for_admin = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_module_configs", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "module_configs",
                columns: new[] { "id", "enabled_for_admin", "enabled_for_foundation", "enabled_for_owner", "module_name" },
                values: new object[,]
                {
                    { new Guid("11111111-1111-1111-1111-111111111111"), true, true, true, "SOS" },
                    { new Guid("22222222-2222-2222-2222-222222222222"), true, true, true, "Adopciones" },
                    { new Guid("33333333-3333-3333-3333-333333333333"), true, true, true, "Mascotas Perdidas" },
                    { new Guid("44444444-4444-4444-4444-444444444444"), true, false, true, "Dispositivos" },
                    { new Guid("55555555-5555-5555-5555-555555555555"), true, true, true, "Veterinarias" },
                    { new Guid("66666666-6666-6666-6666-666666666666"), true, true, true, "Comunidad" }
                });

            migrationBuilder.CreateIndex(
                name: "ix_module_configs_module_name",
                table: "module_configs",
                column: "module_name",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_adoption_applications_adoption_pets_adoption_pet_id",
                table: "adoption_applications",
                column: "adoption_pet_id",
                principalTable: "adoption_pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_adoption_applications_users_applicant_id",
                table: "adoption_applications",
                column: "applicant_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_adoption_pets_foundations_foundation_id",
                table: "adoption_pets",
                column: "foundation_id",
                principalTable: "foundations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_devices_pets_pet_id",
                table: "devices",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_foundations_users_user_id",
                table: "foundations",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_medical_records_pets_pet_id",
                table: "medical_records",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_pets_users_owner_id",
                table: "pets",
                column: "owner_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_privacy_settings_pets_pet_id",
                table: "privacy_settings",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_sightings_pets_pet_id",
                table: "sightings",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_adoption_applications_adoption_pets_adoption_pet_id",
                table: "adoption_applications");

            migrationBuilder.DropForeignKey(
                name: "fk_adoption_applications_users_applicant_id",
                table: "adoption_applications");

            migrationBuilder.DropForeignKey(
                name: "fk_adoption_pets_foundations_foundation_id",
                table: "adoption_pets");

            migrationBuilder.DropForeignKey(
                name: "fk_devices_pets_pet_id",
                table: "devices");

            migrationBuilder.DropForeignKey(
                name: "fk_foundations_users_user_id",
                table: "foundations");

            migrationBuilder.DropForeignKey(
                name: "fk_medical_records_pets_pet_id",
                table: "medical_records");

            migrationBuilder.DropForeignKey(
                name: "fk_pets_users_owner_id",
                table: "pets");

            migrationBuilder.DropForeignKey(
                name: "fk_privacy_settings_pets_pet_id",
                table: "privacy_settings");

            migrationBuilder.DropForeignKey(
                name: "fk_sightings_pets_pet_id",
                table: "sightings");

            migrationBuilder.DropTable(
                name: "module_configs");

            migrationBuilder.DropPrimaryKey(
                name: "pk_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "pk_sightings",
                table: "sightings");

            migrationBuilder.DropPrimaryKey(
                name: "pk_privacy_settings",
                table: "privacy_settings");

            migrationBuilder.DropPrimaryKey(
                name: "pk_pets",
                table: "pets");

            migrationBuilder.DropPrimaryKey(
                name: "pk_medical_records",
                table: "medical_records");

            migrationBuilder.DropPrimaryKey(
                name: "pk_foundations",
                table: "foundations");

            migrationBuilder.DropPrimaryKey(
                name: "pk_devices",
                table: "devices");

            migrationBuilder.DropPrimaryKey(
                name: "pk_adoption_pets",
                table: "adoption_pets");

            migrationBuilder.DropPrimaryKey(
                name: "pk_adoption_applications",
                table: "adoption_applications");

            migrationBuilder.RenameIndex(
                name: "ix_users_email",
                table: "users",
                newName: "IX_users_email");

            migrationBuilder.RenameIndex(
                name: "ix_sightings_pet_id",
                table: "sightings",
                newName: "IX_sightings_pet_id");

            migrationBuilder.RenameIndex(
                name: "ix_privacy_settings_pet_id",
                table: "privacy_settings",
                newName: "IX_privacy_settings_pet_id");

            migrationBuilder.RenameIndex(
                name: "ix_pets_petuno_id",
                table: "pets",
                newName: "IX_pets_petuno_id");

            migrationBuilder.RenameIndex(
                name: "ix_pets_owner_id",
                table: "pets",
                newName: "IX_pets_owner_id");

            migrationBuilder.RenameIndex(
                name: "ix_medical_records_pet_id",
                table: "medical_records",
                newName: "IX_medical_records_pet_id");

            migrationBuilder.RenameIndex(
                name: "ix_foundations_user_id",
                table: "foundations",
                newName: "IX_foundations_user_id");

            migrationBuilder.RenameIndex(
                name: "ix_foundations_nit",
                table: "foundations",
                newName: "IX_foundations_nit");

            migrationBuilder.RenameIndex(
                name: "ix_devices_pet_id",
                table: "devices",
                newName: "IX_devices_pet_id");

            migrationBuilder.RenameIndex(
                name: "ix_adoption_pets_foundation_id",
                table: "adoption_pets",
                newName: "IX_adoption_pets_foundation_id");

            migrationBuilder.RenameIndex(
                name: "ix_adoption_applications_applicant_id",
                table: "adoption_applications",
                newName: "IX_adoption_applications_applicant_id");

            migrationBuilder.RenameIndex(
                name: "ix_adoption_applications_adoption_pet_id",
                table: "adoption_applications",
                newName: "IX_adoption_applications_adoption_pet_id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_sightings",
                table: "sightings",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_privacy_settings",
                table: "privacy_settings",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_pets",
                table: "pets",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_medical_records",
                table: "medical_records",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_foundations",
                table: "foundations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_devices",
                table: "devices",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_adoption_pets",
                table: "adoption_pets",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_adoption_applications",
                table: "adoption_applications",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_adoption_applications_adoption_pets_adoption_pet_id",
                table: "adoption_applications",
                column: "adoption_pet_id",
                principalTable: "adoption_pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_adoption_applications_users_applicant_id",
                table: "adoption_applications",
                column: "applicant_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_adoption_pets_foundations_foundation_id",
                table: "adoption_pets",
                column: "foundation_id",
                principalTable: "foundations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_devices_pets_pet_id",
                table: "devices",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_foundations_users_user_id",
                table: "foundations",
                column: "user_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_medical_records_pets_pet_id",
                table: "medical_records",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_pets_users_owner_id",
                table: "pets",
                column: "owner_id",
                principalTable: "users",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_privacy_settings_pets_pet_id",
                table: "privacy_settings",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_sightings_pets_pet_id",
                table: "sightings",
                column: "pet_id",
                principalTable: "pets",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
