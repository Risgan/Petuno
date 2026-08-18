using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class AdoptionPetConfiguration : IEntityTypeConfiguration<AdoptionPet>
{
    public void Configure(EntityTypeBuilder<AdoptionPet> builder)
    {
        builder.Property(ap => ap.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(ap => ap.Species).HasConversion<string>();
        builder.Property(ap => ap.Gender).HasConversion<string>();
        builder.Property(ap => ap.Size).HasConversion<string>();
        builder.Property(ap => ap.Status).HasConversion<string>();

        builder.HasOne(ap => ap.Foundation)
            .WithMany(f => f.AdoptionPets)
            .HasForeignKey(ap => ap.FoundationId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
