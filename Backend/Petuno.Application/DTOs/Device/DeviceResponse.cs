namespace Petuno.Application.DTOs.Device;

public class DeviceResponse
{
    public Guid Id { get; set; }
    public Guid PetId { get; set; }
    public string Type { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public string Identifier { get; set; } = string.Empty;
    public int? BatteryLevel { get; set; }
    public DateTime? LastConnection { get; set; }
}
