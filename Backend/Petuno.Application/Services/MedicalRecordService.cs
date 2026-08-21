using Petuno.Application.DTOs.Medical;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class MedicalRecordService : IMedicalRecordService
{
    private readonly IRepository<MedicalRecord> _recordRepository;
    private readonly IRepository<Pet> _petRepository;

    public MedicalRecordService(IRepository<MedicalRecord> recordRepository, IRepository<Pet> petRepository)
    {
        _recordRepository = recordRepository;
        _petRepository = petRepository;
    }

    public async Task<MedicalRecordResponse> AddRecordAsync(MedicalRecordCreateRequest request, Guid userId, string role)
    {
        var pet = await _petRepository.GetByIdAsync(request.PetId);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        if (role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para modificar el historial médico de esta mascota.");
        }

        var record = new MedicalRecord
        {
            Id = Guid.NewGuid(),
            PetId = request.PetId,
            Type = request.Type,
            Name = request.Name,
            DateAdministered = request.DateAdministered,
            DateDue = request.DateDue,
            Notes = request.Notes
        };

        await _recordRepository.AddAsync(record);
        await _recordRepository.SaveChangesAsync();

        return MapToResponse(record);
    }

    public async Task<IEnumerable<MedicalRecordResponse>> GetRecordsByPetIdAsync(Guid petId, Guid userId, string role)
    {
        var pet = await _petRepository.GetByIdAsync(petId);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        // Checks if owner OR public visibility permits medical reading (but for owners/admins we allow always)
        if (role != "Admin" && pet.OwnerId != userId)
        {
            // Here you could check PrivacySettings if public, but for now we require owner check
            throw new UnauthorizedAccessException("No tienes permisos para ver el historial clínico de esta mascota.");
        }

        var records = await _recordRepository.FindAsync(r => r.PetId == petId);
        return records.Select(MapToResponse);
    }

    public async Task RemoveRecordAsync(Guid id, Guid userId, string role)
    {
        var record = await _recordRepository.GetByIdAsync(id);
        if (record == null)
        {
            throw new Exception("Registro médico no encontrado.");
        }

        var pet = await _petRepository.GetByIdAsync(record.PetId);
        if (pet != null && role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para remover este historial clínico.");
        }

        await _recordRepository.DeleteAsync(record);
        await _recordRepository.SaveChangesAsync();
    }

    private static MedicalRecordResponse MapToResponse(MedicalRecord mr)
    {
        return new MedicalRecordResponse
        {
            Id = mr.Id,
            PetId = mr.PetId,
            Type = mr.Type.ToString(),
            Name = mr.Name,
            DateAdministered = mr.DateAdministered,
            DateDue = mr.DateDue,
            Notes = mr.Notes
        };
    }
}
