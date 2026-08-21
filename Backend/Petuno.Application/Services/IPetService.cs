using Petuno.Application.DTOs.Pet;

namespace Petuno.Application.Services;

public interface IPetService
{
    Task<PetResponse> CreatePetAsync(PetCreateRequest request, Guid? ownerId);
    Task<PetResponse?> GetPetByIdAsync(Guid id);
    Task<IEnumerable<PetResponse>> GetAllPetsAsync(Guid? ownerId);
    Task<PetResponse> UpdatePetAsync(Guid id, PetUpdateRequest request, Guid? ownerId);
    Task DeletePetAsync(Guid id, Guid? ownerId);
}
