using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Device;

public class DeviceUpdateRequest
{
    [Required]
    public DeviceStatus Status { get; set; }

    [Range(0, 100)]
    public int? BatteryLevel { get; set; }
}
