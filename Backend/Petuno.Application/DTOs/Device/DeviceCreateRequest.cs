using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Device;

public class DeviceCreateRequest
{
    [Required]
    public Guid PetId { get; set; }

    [Required]
    public DeviceType Type { get; set; }

    [Required]
    [MaxLength(100)]
    public string Identifier { get; set; } = string.Empty;
}
