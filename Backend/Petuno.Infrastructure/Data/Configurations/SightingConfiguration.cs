using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class SightingConfiguration : IEntityTypeConfiguration<Sighting>
{
    public void Configure(EntityTypeBuilder<Sighting> builder)
    {
        builder.Property(s => s.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(s => s.Timestamp).HasDefaultValueSql("now()");

        builder.HasOne(s => s.Pet)
            .WithMany(p => p.Sightings)
            .HasForeignKey(s => s.PetId)
            .OnDelete(DeleteBehavior.SetNull);
    }
}
