using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Medical;

public class MedicalRecordCreateRequest
{
    [Required]
    public Guid PetId { get; set; }

    [Required]
    public MedicalRecordType Type { get; set; }

    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    public DateOnly? DateAdministered { get; set; }
    public DateOnly? DateDue { get; set; }

    [MaxLength(1000)]
    public string? Notes { get; set; }
}
