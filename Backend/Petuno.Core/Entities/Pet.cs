using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("pets")]
public class Pet
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("owner_id")]
    public Guid? OwnerId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(10)]
    [Column("species")]
    public PetSpecies Species { get; set; }

    [MaxLength(100)]
    [Column("breed")]
    public string? Breed { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("gender")]
    public PetGender Gender { get; set; }

    [MaxLength(50)]
    [Column("age")]
    public string? Age { get; set; }

    [MaxLength(50)]
    [Column("color")]
    public string? Color { get; set; }

    [Required]
    [MaxLength(15)]
    [Column("status")]
    public PetStatus Status { get; set; } = PetStatus.Protected;

    [Required]
    [MaxLength(20)]
    [Column("petuno_id")]
    public string PetunoId { get; set; } = string.Empty;

    [MaxLength(500)]
    [Column("photo_url")]
    public string? PhotoUrl { get; set; }

    [MaxLength(50)]
    [Column("microchip")]
    public string? Microchip { get; set; }

    [MaxLength(1000)]
    [Column("characteristics")]
    public string? Characteristics { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("OwnerId")]
    public User? Owner { get; set; }
    public PrivacySettings? PrivacySettings { get; set; }
    public ICollection<Device> Devices { get; set; } = [];
    public ICollection<MedicalRecord> MedicalRecords { get; set; } = [];
    public ICollection<Sighting> Sightings { get; set; } = [];
}
