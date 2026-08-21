using Petuno.Application.DTOs.Pet;
using Petuno.Core.Entities;
using Petuno.Core.Enums;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class PetService : IPetService
{
    private readonly IRepository<Pet> _petRepository;

    public PetService(IRepository<Pet> petRepository)
    {
        _petRepository = petRepository;
    }

    public async Task<PetResponse> CreatePetAsync(PetCreateRequest request, Guid? ownerId)
    {
        var randomSuffix = Guid.NewGuid().ToString("N").Substring(0, 6).ToUpper();
        var petunoId = $"PTO-{randomSuffix}";

        var pet = new Pet
        {
            Id = Guid.NewGuid(),
            OwnerId = ownerId,
            Name = request.Name,
            Species = request.Species,
            Breed = request.Breed,
            Gender = request.Gender,
            BirthDate = request.BirthDate,
            Color = request.Color,
            Status = request.Status,
            PetunoId = petunoId,
            PhotoUrl = request.PhotoUrl,
            Microchip = request.Microchip,
            Characteristics = request.Characteristics,
            Story = request.Story,
            CreatedAt = DateTime.UtcNow
        };

        await _petRepository.AddAsync(pet);
        await _petRepository.SaveChangesAsync();

        return MapToResponse(pet);
    }

    public async Task<PetResponse?> GetPetByIdAsync(Guid id)
    {
        var pet = await _petRepository.GetByIdAsync(id);
        return pet == null ? null : MapToResponse(pet);
    }

    public async Task<IEnumerable<PetResponse>> GetAllPetsAsync(Guid? ownerId)
    {
        var pets = ownerId.HasValue 
            ? await _petRepository.FindAsync(p => p.OwnerId == ownerId.Value)
            : await _petRepository.GetAllAsync();
            
        return pets.Select(MapToResponse);
    }

    public async Task<PetResponse> UpdatePetAsync(Guid id, PetUpdateRequest request, Guid? ownerId)
    {
        var pet = await _petRepository.GetByIdAsync(id);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        // Validate ownership (ownerId is null if user is admin)
        if (ownerId.HasValue && pet.OwnerId != ownerId.Value)
        {
            throw new UnauthorizedAccessException("No tienes permisos para modificar esta mascota.");
        }

        pet.Name = request.Name;
        pet.Species = request.Species;
        pet.Breed = request.Breed;
        pet.Gender = request.Gender;
        pet.BirthDate = request.BirthDate;
        pet.Color = request.Color;
        pet.Status = request.Status;
        pet.PhotoUrl = request.PhotoUrl;
        pet.Microchip = request.Microchip;
        pet.Characteristics = request.Characteristics;
        pet.Story = request.Story;

        await _petRepository.UpdateAsync(pet);
        await _petRepository.SaveChangesAsync();

        return MapToResponse(pet);
    }

    public async Task DeletePetAsync(Guid id, Guid? ownerId)
    {
        var pet = await _petRepository.GetByIdAsync(id);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        if (ownerId.HasValue && pet.OwnerId != ownerId.Value)
        {
            throw new UnauthorizedAccessException("No tienes permisos para eliminar esta mascota.");
        }

        await _petRepository.DeleteAsync(pet);
        await _petRepository.SaveChangesAsync();
    }

    private static PetResponse MapToResponse(Pet pet)
    {
        return new PetResponse
        {
            Id = pet.Id,
            OwnerId = pet.OwnerId,
            Name = pet.Name,
            Species = pet.Species.ToString(),
            Breed = pet.Breed,
            Gender = pet.Gender.ToString(),
            Age = CalculateAge(pet.BirthDate),
            BirthDate = pet.BirthDate,
            Color = pet.Color,
            Status = pet.Status.ToString(),
            PetunoId = pet.PetunoId,
            PhotoUrl = pet.PhotoUrl,
            Microchip = pet.Microchip,
            Characteristics = pet.Characteristics,
            Story = pet.Story,
            CreatedAt = pet.CreatedAt
        };
    }

    private static string CalculateAge(DateOnly? birthDate)
    {
        if (!birthDate.HasValue) return "No especificada";
        var today = DateOnly.FromDateTime(DateTime.Today);
        var years = today.Year - birthDate.Value.Year;
        var months = today.Month - birthDate.Value.Month;
        if (today.Day < birthDate.Value.Day)
        {
            months--;
        }
        if (months < 0)
        {
            years--;
            months += 12;
        }

        if (years > 0)
        {
            return $"{years} {(years == 1 ? "año" : "años")}";
        }
        return $"{months} {(months == 1 ? "mes" : "meses")}";
    }
}
