using Petuno.Application.DTOs.Privacy;

namespace Petuno.Application.Services;

public interface IPrivacyService
{
    Task<PrivacySettingsResponse> GetByPetIdAsync(Guid petId);
    Task<PrivacySettingsResponse> UpdateByPetIdAsync(Guid petId, PrivacySettingsRequest request, Guid userId, string role);
}
