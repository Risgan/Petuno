using System.ComponentModel.DataAnnotations;

namespace Petuno.Application.DTOs.Sighting;

public class SightingCreateRequest
{
    public Guid? PetId { get; set; }

    [Required]
    [MaxLength(500)]
    public string Location { get; set; } = string.Empty;

    [MaxLength(100)]
    public string? City { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }

    [MaxLength(500)]
    public string? PhotoUrl { get; set; }

    [MaxLength(150)]
    public string? ReporterContact { get; set; }
}
