using Petuno.Application.DTOs.Privacy;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class PrivacyService : IPrivacyService
{
    private readonly IRepository<PrivacySettings> _privacyRepository;
    private readonly IRepository<Pet> _petRepository;

    public PrivacyService(IRepository<PrivacySettings> privacyRepository, IRepository<Pet> petRepository)
    {
        _privacyRepository = privacyRepository;
        _petRepository = petRepository;
    }

    public async Task<PrivacySettingsResponse> GetByPetIdAsync(Guid petId)
    {
        var settingsList = await _privacyRepository.FindAsync(p => p.PetId == petId);
        var settings = settingsList.FirstOrDefault();

        // If not initialized yet, create default settings
        if (settings == null)
        {
            settings = new PrivacySettings
            {
                Id = Guid.NewGuid(),
                PetId = petId,
                ShowName = true,
                ShowBreed = true,
                ShowAge = true,
                ShowLocation = true,
                ShowMedical = false,
                AllowAnonymousContact = true,
                AllowSightings = true
            };
            await _privacyRepository.AddAsync(settings);
            await _privacyRepository.SaveChangesAsync();
        }

        return MapToResponse(settings);
    }

    public async Task<PrivacySettingsResponse> UpdateByPetIdAsync(Guid petId, PrivacySettingsRequest request, Guid userId, string role)
    {
        var pet = await _petRepository.GetByIdAsync(petId);
        if (pet == null)
        {
            throw new Exception("Mascota no encontrada.");
        }

        if (role != "Admin" && pet.OwnerId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos para modificar la privacidad de esta mascota.");
        }

        var settingsList = await _privacyRepository.FindAsync(p => p.PetId == petId);
        var settings = settingsList.FirstOrDefault();

        if (settings == null)
        {
            settings = new PrivacySettings { Id = Guid.NewGuid(), PetId = petId };
        }

        settings.ShowName = request.ShowName;
        settings.ShowBreed = request.ShowBreed;
        settings.ShowAge = request.ShowAge;
        settings.ShowLocation = request.ShowLocation;
        settings.ShowMedical = request.ShowMedical;
        settings.AllowAnonymousContact = request.AllowAnonymousContact;
        settings.AllowSightings = request.AllowSightings;

        if (settingsList.Any())
        {
            await _privacyRepository.UpdateAsync(settings);
        }
        else
        {
            await _privacyRepository.AddAsync(settings);
        }

        await _privacyRepository.SaveChangesAsync();

        return MapToResponse(settings);
    }

    private static PrivacySettingsResponse MapToResponse(PrivacySettings p)
    {
        return new PrivacySettingsResponse
        {
            Id = p.Id,
            PetId = p.PetId,
            ShowName = p.ShowName,
            ShowBreed = p.ShowBreed,
            ShowAge = p.ShowAge,
            ShowLocation = p.ShowLocation,
            ShowMedical = p.ShowMedical,
            AllowAnonymousContact = p.AllowAnonymousContact,
            AllowSightings = p.AllowSightings
        };
    }
}
