using Petuno.Application.DTOs.Application;
using Petuno.Core.Enums;

namespace Petuno.Application.Services;

public interface IAdoptionApplicationService
{
    Task<AdoptionApplicationResponse> CreateApplicationAsync(AdoptionApplicationCreateRequest request, Guid applicantId);
    Task<AdoptionApplicationResponse?> GetApplicationByIdAsync(Guid id, Guid userId, string role);
    Task<IEnumerable<AdoptionApplicationResponse>> GetApplicationsByApplicantIdAsync(Guid applicantId);
    Task<IEnumerable<AdoptionApplicationResponse>> GetApplicationsForFoundationAsync(Guid foundationUserId);
    Task<AdoptionApplicationResponse> UpdateApplicationStatusAsync(Guid id, ApplicationStatus status, Guid userId, string role);
}
