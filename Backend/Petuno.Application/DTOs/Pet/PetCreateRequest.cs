using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Pet;

public class PetCreateRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public PetSpecies Species { get; set; }

    public string? Breed { get; set; }

    [Required]
    public PetGender Gender { get; set; }

    public DateOnly? BirthDate { get; set; }
    public string? Color { get; set; }
    public PetStatus Status { get; set; } = PetStatus.Protected;
    public string? PhotoUrl { get; set; }
    public string? Microchip { get; set; }
    [MaxLength(1000)]
    public string? Characteristics { get; set; }

    [MaxLength(3000)]
    public string? Story { get; set; }
}
