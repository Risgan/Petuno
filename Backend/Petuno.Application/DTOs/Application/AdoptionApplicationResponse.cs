using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Application;

public class AdoptionApplicationResponse
{
    public Guid Id { get; set; }
    public Guid AdoptionPetId { get; set; }
    public Guid ApplicantId { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? ApplicantNotes { get; set; }
    public DateTime CreatedAt { get; set; }
}
