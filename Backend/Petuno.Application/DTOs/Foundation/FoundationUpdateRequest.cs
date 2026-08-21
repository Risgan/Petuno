using System.ComponentModel.DataAnnotations;

namespace Petuno.Application.DTOs.Foundation;

public class FoundationUpdateRequest
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(50)]
    public string? Nit { get; set; }

    [MaxLength(300)]
    public string? Location { get; set; }

    [MaxLength(20)]
    public string? ContactPhone { get; set; }

    [MaxLength(2000)]
    public string? Description { get; set; }
}
