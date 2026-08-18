using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class MedicalRecordConfiguration : IEntityTypeConfiguration<MedicalRecord>
{
    public void Configure(EntityTypeBuilder<MedicalRecord> builder)
    {
        builder.Property(mr => mr.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(mr => mr.Type).HasConversion<string>();

        builder.HasOne(mr => mr.Pet)
            .WithMany(p => p.MedicalRecords)
            .HasForeignKey(mr => mr.PetId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
