using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class ModuleConfigConfiguration : IEntityTypeConfiguration<ModuleConfig>
{
    public void Configure(EntityTypeBuilder<ModuleConfig> builder)
    {
        builder.Property(m => m.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.HasIndex(m => m.ModuleName).IsUnique();

        // Seed data for Petuno modules
        builder.HasData(
            new ModuleConfig { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), ModuleName = "SOS", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), ModuleName = "Adopciones", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("33333333-3333-3333-3333-333333333333"), ModuleName = "Mascotas Perdidas", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("44444444-4444-4444-4444-444444444444"), ModuleName = "Dispositivos", EnabledForOwner = true, EnabledForFoundation = false, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("55555555-5555-5555-5555-555555555555"), ModuleName = "Veterinarias", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("66666666-6666-6666-6666-666666666666"), ModuleName = "Comunidad", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("77777777-7777-7777-7777-777777777777"), ModuleName = "Dashboard", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("88888888-8888-8888-8888-888888888888"), ModuleName = "Mis Mascotas", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("99999999-9999-9999-9999-999999999999"), ModuleName = "Notificaciones", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true },
            new ModuleConfig { Id = Guid.Parse("aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"), ModuleName = "Configuracion", EnabledForOwner = true, EnabledForFoundation = true, EnabledForAdmin = true }
        );
    }
}
