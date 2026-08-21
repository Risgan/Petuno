using Petuno.Application.DTOs.Sighting;

namespace Petuno.Application.Services;

public interface ISightingService
{
    Task<SightingResponse> CreateSightingAsync(SightingCreateRequest request);
    Task<IEnumerable<SightingResponse>> GetAllSightingsAsync();
    Task<IEnumerable<SightingResponse>> GetSightingsByPetIdAsync(Guid petId);
}
