using Petuno.Application.DTOs.Device;

namespace Petuno.Application.Services;

public interface IDeviceService
{
    Task<DeviceResponse> AddDeviceAsync(DeviceCreateRequest request, Guid userId, string role);
    Task<IEnumerable<DeviceResponse>> GetDevicesByPetIdAsync(Guid petId, Guid userId, string role);
    Task<DeviceResponse> UpdateDeviceTelemetryAsync(Guid id, DeviceUpdateRequest request);
    Task RemoveDeviceAsync(Guid id, Guid userId, string role);
}
