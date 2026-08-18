using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data.Configurations;

public class AdoptionApplicationConfiguration : IEntityTypeConfiguration<AdoptionApplication>
{
    public void Configure(EntityTypeBuilder<AdoptionApplication> builder)
    {
        builder.Property(aa => aa.Id).HasDefaultValueSql("gen_random_uuid()");
        builder.Property(aa => aa.Status).HasConversion<string>();
        builder.Property(aa => aa.CreatedAt).HasDefaultValueSql("now()");

        builder.HasOne(aa => aa.AdoptionPet)
            .WithMany(ap => ap.Applications)
            .HasForeignKey(aa => aa.AdoptionPetId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(aa => aa.Applicant)
            .WithMany(u => u.AdoptionApplications)
            .HasForeignKey(aa => aa.ApplicantId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
