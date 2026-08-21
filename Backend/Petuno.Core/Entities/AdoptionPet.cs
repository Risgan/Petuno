using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("adoption_pets")]
public class AdoptionPet
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("foundation_id")]
    public Guid FoundationId { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("pet_id")]
    public Guid? PetId { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("species")]
    public Petuno.Core.Enums.PetSpecies Species { get; set; }

    [MaxLength(100)]
    [Column("breed")]
    public string? Breed { get; set; }

    [MaxLength(50)]
    [Column("age")]
    public string? Age { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("gender")]
    public PetGender Gender { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("size")]
    public AdoptionPetSize Size { get; set; }

    [Column("special_needs")]
    public bool SpecialNeeds { get; set; }

    [MaxLength(1000)]
    [Column("special_needs_description")]
    public string? SpecialNeedsDescription { get; set; }

    [MaxLength(2000)]
    [Column("description")]
    public string? Description { get; set; }

    [MaxLength(3000)]
    [Column("story")]
    public string? Story { get; set; }

    [Required]
    [MaxLength(15)]
    [Column("status")]
    public AdoptionPetStatus Status { get; set; } = AdoptionPetStatus.Available;

    [MaxLength(500)]
    [Column("photo_url")]
    public string? PhotoUrl { get; set; }

    // Navigation properties
    [ForeignKey("FoundationId")]
    public Foundation Foundation { get; set; } = null!;
    public ICollection<AdoptionApplication> Applications { get; set; } = [];
}
