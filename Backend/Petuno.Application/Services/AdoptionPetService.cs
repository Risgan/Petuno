using Petuno.Application.DTOs.Adoption;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class AdoptionPetService : IAdoptionPetService
{
    private readonly IRepository<AdoptionPet> _adoptionPetRepository;
    private readonly IRepository<Foundation> _foundationRepository;

    public AdoptionPetService(IRepository<AdoptionPet> adoptionPetRepository, IRepository<Foundation> foundationRepository)
    {
        _adoptionPetRepository = adoptionPetRepository;
        _foundationRepository = foundationRepository;
    }

    public async Task<AdoptionPetResponse> CreateAdoptionPetAsync(AdoptionPetCreateRequest request, Guid userId, string role)
    {
        var foundation = await _foundationRepository.GetByIdAsync(request.FoundationId);
        if (foundation == null)
        {
            throw new Exception("Fundación no encontrada.");
        }

        if (role != "Admin" && foundation.UserId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos sobre esta fundación.");
        }

        var pet = new AdoptionPet
        {
            Id = Guid.NewGuid(),
            FoundationId = request.FoundationId,
            PetId = request.PetId,
            Name = request.Name,
            Species = request.Species,
            Breed = request.Breed,
            Age = request.Age,
            Gender = request.Gender,
            Size = request.Size,
            SpecialNeeds = request.SpecialNeeds,
            SpecialNeedsDescription = request.SpecialNeedsDescription,
            Description = request.Description,
            Story = request.Story,
            Status = request.Status,
            PhotoUrl = request.PhotoUrl
        };

        await _adoptionPetRepository.AddAsync(pet);
        await _adoptionPetRepository.SaveChangesAsync();

        return MapToResponse(pet);
    }

    public async Task<AdoptionPetResponse?> GetAdoptionPetByIdAsync(Guid id)
    {
        var pet = await _adoptionPetRepository.GetByIdAsync(id);
        return pet == null ? null : MapToResponse(pet);
    }

    public async Task<IEnumerable<AdoptionPetResponse>> GetAllAdoptionPetsAsync()
    {
        var pets = await _adoptionPetRepository.GetAllAsync();
        return pets.Select(MapToResponse);
    }

    public async Task<IEnumerable<AdoptionPetResponse>> GetAdoptionPetsByFoundationIdAsync(Guid foundationId)
    {
        var pets = await _adoptionPetRepository.FindAsync(ap => ap.FoundationId == foundationId);
        return pets.Select(MapToResponse);
    }

    public async Task<AdoptionPetResponse> UpdateAdoptionPetAsync(Guid id, AdoptionPetCreateRequest request, Guid userId, string role)
    {
        var pet = await _adoptionPetRepository.GetByIdAsync(id);
        if (pet == null)
        {
            throw new Exception("Publicación de mascota no encontrada.");
        }

        var foundation = await _foundationRepository.GetByIdAsync(pet.FoundationId);
        if (foundation != null && role != "Admin" && foundation.UserId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para modificar este perfil de adopción.");
        }

        pet.Name = request.Name;
        pet.PetId = request.PetId;
        pet.Species = request.Species;
        pet.Breed = request.Breed;
        pet.Age = request.Age;
        pet.Gender = request.Gender;
        pet.Size = request.Size;
        pet.SpecialNeeds = request.SpecialNeeds;
        pet.SpecialNeedsDescription = request.SpecialNeedsDescription;
        pet.Description = request.Description;
        pet.Story = request.Story;
        pet.Status = request.Status;
        pet.PhotoUrl = request.PhotoUrl;

        await _adoptionPetRepository.UpdateAsync(pet);
        await _adoptionPetRepository.SaveChangesAsync();

        return MapToResponse(pet);
    }

    public async Task DeleteAdoptionPetAsync(Guid id, Guid userId, string role)
    {
        var pet = await _adoptionPetRepository.GetByIdAsync(id);
        if (pet == null)
        {
            throw new Exception("Publicación de mascota no encontrada.");
        }

        var foundation = await _foundationRepository.GetByIdAsync(pet.FoundationId);
        if (foundation != null && role != "Admin" && foundation.UserId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para eliminar este perfil de adopción.");
        }

        await _adoptionPetRepository.DeleteAsync(pet);
        await _adoptionPetRepository.SaveChangesAsync();
    }

    private static AdoptionPetResponse MapToResponse(AdoptionPet ap)
    {
        return new AdoptionPetResponse
        {
            Id = ap.Id,
            FoundationId = ap.FoundationId,
            PetId = ap.PetId,
            Name = ap.Name,
            Species = ap.Species.ToString(),
            Breed = ap.Breed,
            Age = ap.Age,
            Gender = ap.Gender.ToString(),
            Size = ap.Size.ToString(),
            SpecialNeeds = ap.SpecialNeeds,
            SpecialNeedsDescription = ap.SpecialNeedsDescription,
            Description = ap.Description,
            Story = ap.Story,
            Status = ap.Status.ToString(),
            PhotoUrl = ap.PhotoUrl
        };
    }
}
