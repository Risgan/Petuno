using Petuno.Application.DTOs.Application;
using Petuno.Core.Entities;
using Petuno.Core.Enums;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class AdoptionApplicationService : IAdoptionApplicationService
{
    private readonly IRepository<AdoptionApplication> _applicationRepository;
    private readonly IRepository<AdoptionPet> _petRepository;
    private readonly IRepository<Foundation> _foundationRepository;
    private readonly IRepository<Pet> _realPetRepository;

    public AdoptionApplicationService(
        IRepository<AdoptionApplication> applicationRepository,
        IRepository<AdoptionPet> petRepository,
        IRepository<Foundation> foundationRepository,
        IRepository<Pet> realPetRepository)
    {
        _applicationRepository = applicationRepository;
        _petRepository = petRepository;
        _foundationRepository = foundationRepository;
        _realPetRepository = realPetRepository;
    }

    public async Task<AdoptionApplicationResponse> CreateApplicationAsync(AdoptionApplicationCreateRequest request, Guid applicantId)
    {
        var pet = await _petRepository.GetByIdAsync(request.AdoptionPetId);
        if (pet == null)
        {
            throw new Exception("Mascota en adopción no encontrada.");
        }

        var existing = await _applicationRepository.FindAsync(a => a.AdoptionPetId == request.AdoptionPetId && a.ApplicantId == applicantId);
        if (existing.Any())
        {
            throw new Exception("Ya has enviado una solicitud de adopción para esta mascota.");
        }

        var app = new AdoptionApplication
        {
            Id = Guid.NewGuid(),
            AdoptionPetId = request.AdoptionPetId,
            ApplicantId = applicantId,
            Status = ApplicationStatus.Pending,
            ApplicantNotes = request.ApplicantNotes,
            CreatedAt = DateTime.UtcNow
        };

        await _applicationRepository.AddAsync(app);
        await _applicationRepository.SaveChangesAsync();

        return MapToResponse(app);
    }

    public async Task<AdoptionApplicationResponse?> GetApplicationByIdAsync(Guid id, Guid userId, string role)
    {
        var app = await _applicationRepository.GetByIdAsync(id);
        if (app == null) return null;

        var pet = await _petRepository.GetByIdAsync(app.AdoptionPetId);
        var foundation = pet != null ? await _foundationRepository.GetByIdAsync(pet.FoundationId) : null;

        // Verify if user is applicant, foundation owner, or admin
        if (role != "Admin" && app.ApplicantId != userId && (foundation == null || foundation.UserId != userId))
        {
            throw new UnauthorizedAccessException("No tienes permisos para ver esta solicitud.");
        }

        return MapToResponse(app);
    }

    public async Task<IEnumerable<AdoptionApplicationResponse>> GetApplicationsByApplicantIdAsync(Guid applicantId)
    {
        var list = await _applicationRepository.FindAsync(a => a.ApplicantId == applicantId);
        return list.Select(MapToResponse);
    }

    public async Task<IEnumerable<AdoptionApplicationResponse>> GetApplicationsForFoundationAsync(Guid foundationUserId)
    {
        var founds = await _foundationRepository.FindAsync(f => f.UserId == foundationUserId);
        var f = founds.FirstOrDefault();
        if (f == null)
        {
            return Enumerable.Empty<AdoptionApplicationResponse>();
        }

        var pets = await _petRepository.FindAsync(p => p.FoundationId == f.Id);
        var petIds = pets.Select(p => p.Id).ToList();

        var apps = await _applicationRepository.FindAsync(a => petIds.Contains(a.AdoptionPetId));
        return apps.Select(MapToResponse);
    }

    public async Task<AdoptionApplicationResponse> UpdateApplicationStatusAsync(Guid id, ApplicationStatus status, Guid userId, string role)
    {
        var app = await _applicationRepository.GetByIdAsync(id);
        if (app == null)
        {
            throw new Exception("Solicitud no encontrada.");
        }

        var pet = await _petRepository.GetByIdAsync(app.AdoptionPetId);
        var foundation = pet != null ? await _foundationRepository.GetByIdAsync(pet.FoundationId) : null;

        if (role != "Admin" && (foundation == null || foundation.UserId != userId))
        {
            throw new UnauthorizedAccessException("No tienes permisos para actualizar el estado de esta solicitud.");
        }

        app.Status = status;

        // If adoption is approved and the publication is linked to a real Pet, execute the transfer of ownership
        if (status == ApplicationStatus.Approved && pet != null)
        {
            pet.Status = AdoptionPetStatus.Adopted;
            await _petRepository.UpdateAsync(pet);

            if (pet.PetId.HasValue)
            {
                var realPet = await _realPetRepository.GetByIdAsync(pet.PetId.Value);
                if (realPet != null)
                {
                    realPet.OwnerId = app.ApplicantId; // Transfer ownership to adopter
                    realPet.Status = PetStatus.Protected; // Change status back to Protected
                    await _realPetRepository.UpdateAsync(realPet);
                    await _realPetRepository.SaveChangesAsync();
                }
            }
        }

        await _applicationRepository.UpdateAsync(app);
        await _applicationRepository.SaveChangesAsync();

        return MapToResponse(app);
    }

    private static AdoptionApplicationResponse MapToResponse(AdoptionApplication aa)
    {
        return new AdoptionApplicationResponse
        {
            Id = aa.Id,
            AdoptionPetId = aa.AdoptionPetId,
            ApplicantId = aa.ApplicantId,
            Status = aa.Status.ToString(),
            ApplicantNotes = aa.ApplicantNotes,
            CreatedAt = aa.CreatedAt
        };
    }
}
