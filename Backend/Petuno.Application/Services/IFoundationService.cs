using Petuno.Application.DTOs.Foundation;

namespace Petuno.Application.Services;

public interface IFoundationService
{
    Task<FoundationResponse> RegisterFoundationAsync(FoundationRegisterRequest request, Guid userId);
    Task<FoundationResponse?> GetFoundationByIdAsync(Guid id);
    Task<FoundationResponse?> GetFoundationByUserIdAsync(Guid userId);
    Task<IEnumerable<FoundationResponse>> GetAllFoundationsAsync();
    Task<FoundationResponse> UpdateFoundationAsync(Guid id, FoundationUpdateRequest request, Guid userId, string role);
    Task VerifyFoundationAsync(Guid id);
}
