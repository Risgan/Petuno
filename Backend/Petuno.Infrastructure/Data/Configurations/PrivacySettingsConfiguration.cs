using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class PrivacySettingsConfiguration : IEntityTypeConfiguration<PrivacySettings>
{
    public void Configure(EntityTypeBuilder<PrivacySettings> builder)
    {
        builder.Property(ps => ps.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.HasIndex(ps => ps.PetId).IsUnique();

        builder.HasOne(ps => ps.Pet)
            .WithOne(p => p.PrivacySettings)
            .HasForeignKey<PrivacySettings>(ps => ps.PetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
