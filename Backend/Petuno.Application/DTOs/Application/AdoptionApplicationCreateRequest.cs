using System.ComponentModel.DataAnnotations;

namespace Petuno.Application.DTOs.Application;

public class AdoptionApplicationCreateRequest
{
    [Required]
    public Guid AdoptionPetId { get; set; }

    [MaxLength(2000)]
    public string? ApplicantNotes { get; set; }
}
