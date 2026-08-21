using Petuno.Application.DTOs.Adoption;

namespace Petuno.Application.Services;

public interface IAdoptionPetService
{
    Task<AdoptionPetResponse> CreateAdoptionPetAsync(AdoptionPetCreateRequest request, Guid userId, string role);
    Task<AdoptionPetResponse?> GetAdoptionPetByIdAsync(Guid id);
    Task<IEnumerable<AdoptionPetResponse>> GetAllAdoptionPetsAsync();
    Task<IEnumerable<AdoptionPetResponse>> GetAdoptionPetsByFoundationIdAsync(Guid foundationId);
    Task<AdoptionPetResponse> UpdateAdoptionPetAsync(Guid id, AdoptionPetCreateRequest request, Guid userId, string role);
    Task DeleteAdoptionPetAsync(Guid id, Guid userId, string role);
}
