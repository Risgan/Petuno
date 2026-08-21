using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Adoption;

public class AdoptionPetCreateRequest
{
    [Required]
    public Guid FoundationId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    public Guid? PetId { get; set; }

    [Required]
    public PetSpecies Species { get; set; }

    [MaxLength(100)]
    public string? Breed { get; set; }

    [MaxLength(50)]
    public string? Age { get; set; }

    [Required]
    public PetGender Gender { get; set; }

    [Required]
    public AdoptionPetSize Size { get; set; }

    public bool SpecialNeeds { get; set; }

    [MaxLength(1000)]
    public string? SpecialNeedsDescription { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }

    [MaxLength(3000)]
    public string? Story { get; set; }

    [Required]
    public AdoptionPetStatus Status { get; set; } = AdoptionPetStatus.Available;

    [MaxLength(500)]
    public string? PhotoUrl { get; set; }
}
