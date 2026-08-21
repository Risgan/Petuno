using Petuno.Application.DTOs.Device;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class DeviceService : IDeviceService
{
    private readonly IRepository<Device> _deviceRepository;
    private readonly IRepository<Pet> _petRepository;

    public DeviceService(IRepository<Device> deviceRepository, IRepository<Pet> petRepository)
    {
        _deviceRepository = deviceRepository;
        _petRepository = petRepository;
    }

    public async Task<DeviceResponse> AddDeviceAsync(DeviceCreateRequest request, Guid userId, string role)
    {
        var pet = await _petRepository.GetByIdAsync(request.PetId);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        if (role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para agregar dispositivos a esta mascota.");
        }

        var device = new Device
        {
            Id = Guid.NewGuid(),
            PetId = request.PetId,
            Type = request.Type,
            Status = Core.Enums.DeviceStatus.Active,
            Identifier = request.Identifier,
            BatteryLevel = 100,
            LastConnection = DateTime.UtcNow
        };

        await _deviceRepository.AddAsync(device);
        await _deviceRepository.SaveChangesAsync();

        return MapToResponse(device);
    }

    public async Task<IEnumerable<DeviceResponse>> GetDevicesByPetIdAsync(Guid petId, Guid userId, string role)
    {
        var pet = await _petRepository.GetByIdAsync(petId);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        if (role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para ver los dispositivos de esta mascota.");
        }

        var devices = await _deviceRepository.FindAsync(d => d.PetId == petId);
        return devices.Select(MapToResponse);
    }

    public async Task<DeviceResponse> UpdateDeviceTelemetryAsync(Guid id, DeviceUpdateRequest request)
    {
        var device = await _deviceRepository.GetByIdAsync(id);
        if (device == null)
        {
            throw new Exception("Dispositivo no encontrado.");
        }

        device.Status = request.Status;
        if (request.BatteryLevel.HasValue)
        {
            device.BatteryLevel = request.BatteryLevel.Value;
        }
        device.LastConnection = DateTime.UtcNow;

        await _deviceRepository.UpdateAsync(device);
        await _deviceRepository.SaveChangesAsync();

        return MapToResponse(device);
    }

    public async Task RemoveDeviceAsync(Guid id, Guid userId, string role)
    {
        var device = await _deviceRepository.GetByIdAsync(id);
        if (device == null)
        {
            throw new Exception("Dispositivo no encontrado.");
        }

        var pet = await _petRepository.GetByIdAsync(device.PetId);
        if (pet != null && role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para remover este dispositivo.");
        }

        await _deviceRepository.DeleteAsync(device);
        await _deviceRepository.SaveChangesAsync();
    }

    private static DeviceResponse MapToResponse(Device d)
    {
        return new DeviceResponse
        {
            Id = d.Id,
            PetId = d.PetId,
            Type = d.Type.ToString(),
            Status = d.Status.ToString(),
            Identifier = d.Identifier,
            BatteryLevel = d.BatteryLevel,
            LastConnection = d.LastConnection
        };
    }
}
