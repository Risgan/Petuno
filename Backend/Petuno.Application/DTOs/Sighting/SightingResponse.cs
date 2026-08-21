namespace Petuno.Application.DTOs.Sighting;

public class SightingResponse
{
    public Guid Id { get; set; }
    public Guid? PetId { get; set; }
    public string Location { get; set; } = string.Empty;
    public string? City { get; set; }
    public string? Description { get; set; }
    public string? PhotoUrl { get; set; }
    public string? ReporterContact { get; set; }
    public DateTime Timestamp { get; set; }
}
