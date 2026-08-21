using Microsoft.EntityFrameworkCore;
using Petuno.Core.Entities;

namespace Petuno.Infrastructure.Data;

public class PetunoDbContext : DbContext
{
    public PetunoDbContext(DbContextOptions<PetunoDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Foundation> Foundations => Set<Foundation>();
    public DbSet<Pet> Pets => Set<Pet>();
    public DbSet<Device> Devices => Set<Device>();
    public DbSet<PrivacySettings> PrivacySettings => Set<PrivacySettings>();
    public DbSet<MedicalRecord> MedicalRecords => Set<MedicalRecord>();
    public DbSet<Sighting> Sightings => Set<Sighting>();
    public DbSet<AdoptionPet> AdoptionPets => Set<AdoptionPet>();
    public DbSet<AdoptionApplication> AdoptionApplications => Set<AdoptionApplication>();
    public DbSet<ModuleConfig> ModuleConfigs => Set<ModuleConfig>();
    public DbSet<PetSpecies> PetSpecies => Set<PetSpecies>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all IEntityTypeConfiguration<T> from this assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PetunoDbContext).Assembly);
    }
}
