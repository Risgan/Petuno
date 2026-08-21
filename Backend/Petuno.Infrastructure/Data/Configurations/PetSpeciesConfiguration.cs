using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class PetSpeciesConfiguration : IEntityTypeConfiguration<PetSpecies>
{
    public void Configure(EntityTypeBuilder<PetSpecies> builder)
    {
        builder.Property(s => s.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.HasIndex(s => s.Name).IsUnique();

        builder.HasData(
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555551"), Name = "Perro" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555552"), Name = "Gato" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555553"), Name = "Ave" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555554"), Name = "Conejo" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555555"), Name = "Caballo" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555556"), Name = "Vaca" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555557"), Name = "Cerdo" },
            new PetSpecies { Id = Guid.Parse("11111111-2222-3333-4444-555555555558"), Name = "Otro" }
        );
    }
}
