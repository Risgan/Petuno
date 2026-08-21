using Petuno.Application.DTOs.Sighting;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class SightingService : ISightingService
{
    private readonly IRepository<Sighting> _sightingRepository;

    public SightingService(IRepository<Sighting> sightingRepository)
    {
        _sightingRepository = sightingRepository;
    }

    public async Task<SightingResponse> CreateSightingAsync(SightingCreateRequest request)
    {
        var sighting = new Sighting
        {
            Id = Guid.NewGuid(),
            PetId = request.PetId,
            Location = request.Location,
            City = request.City,
            Description = request.Description,
            PhotoUrl = request.PhotoUrl,
            ReporterContact = request.ReporterContact,
            Timestamp = DateTime.UtcNow
        };

        await _sightingRepository.AddAsync(sighting);
        await _sightingRepository.SaveChangesAsync();

        return MapToResponse(sighting);
    }

    public async Task<IEnumerable<SightingResponse>> GetAllSightingsAsync()
    {
        var sightings = await _sightingRepository.GetAllAsync();
        return sightings.Select(MapToResponse);
    }

    public async Task<IEnumerable<SightingResponse>> GetSightingsByPetIdAsync(Guid petId)
    {
        var sightings = await _sightingRepository.FindAsync(s => s.PetId == petId);
        return sightings.Select(MapToResponse);
    }

    private static SightingResponse MapToResponse(Sighting sighting)
    {
        return new SightingResponse
        {
            Id = sighting.Id,
            PetId = sighting.PetId,
            Location = sighting.Location,
            City = sighting.City,
            Description = sighting.Description,
            PhotoUrl = sighting.PhotoUrl,
            ReporterContact = sighting.ReporterContact,
            Timestamp = sighting.Timestamp
        };
    }
}
