namespace Petuno.Application.DTOs.Adoption;

public class AdoptionPetResponse
{
    public Guid Id { get; set; }
    public Guid FoundationId { get; set; }
    public Guid? PetId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string? Breed { get; set; }
    public string? Age { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public bool SpecialNeeds { get; set; }
    public string? SpecialNeedsDescription { get; set; }
    public string? Description { get; set; }
    public string? Story { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
}
