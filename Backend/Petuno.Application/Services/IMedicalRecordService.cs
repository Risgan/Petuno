using Petuno.Application.DTOs.Medical;

namespace Petuno.Application.Services;

public interface IMedicalRecordService
{
    Task<MedicalRecordResponse> AddRecordAsync(MedicalRecordCreateRequest request, Guid userId, string role);
    Task<IEnumerable<MedicalRecordResponse>> GetRecordsByPetIdAsync(Guid petId, Guid userId, string role);
    Task RemoveRecordAsync(Guid id, Guid userId, string role);
}
