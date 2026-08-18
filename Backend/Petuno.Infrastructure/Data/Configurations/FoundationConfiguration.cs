using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class FoundationConfiguration : IEntityTypeConfiguration<Foundation>
{
    public void Configure(EntityTypeBuilder<Foundation> builder)
    {
        builder.Property(f => f.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.HasIndex(f => f.Nit).IsUnique().HasFilter("nit IS NOT NULL");
        builder.HasIndex(f => f.UserId).IsUnique();

        builder.HasOne(f => f.User)
            .WithOne(u => u.Foundation)
            .HasForeignKey<Foundation>(f => f.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
