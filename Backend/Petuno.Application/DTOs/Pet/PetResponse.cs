namespace Petuno.Application.DTOs.Pet;

public class PetResponse
{
    public Guid Id { get; set; }
    public Guid? OwnerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Species { get; set; } = string.Empty;
    public string? Breed { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string? Age { get; set; }
    public DateOnly? BirthDate { get; set; }
    public string? Color { get; set; }
    public string Status { get; set; } = string.Empty;
    public string PetunoId { get; set; } = string.Empty;
    public string? PhotoUrl { get; set; }
    public string? Microchip { get; set; }
    public string? Characteristics { get; set; }
    public string? Story { get; set; }
    public DateTime CreatedAt { get; set; }
}
