namespace Petuno.Application.DTOs.Medical;

public class MedicalRecordResponse
{
    public Guid Id { get; set; }
    public Guid PetId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public DateOnly? DateAdministered { get; set; }
    public DateOnly? DateDue { get; set; }
    public string? Notes { get; set; }
}
