using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class DeviceConfiguration : IEntityTypeConfiguration<Device>
{
    public void Configure(EntityTypeBuilder<Device> builder)
    {
        builder.Property(d => d.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(d => d.Type).HasConversion<string>();
        builder.Property(d => d.Status).HasConversion<string>();

        builder.HasOne(d => d.Pet)
            .WithMany(p => p.Devices)
            .HasForeignKey(d => d.PetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
