using Petuno.Application.DTOs.Foundation;
using Petuno.Core.Entities;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class FoundationService : IFoundationService
{
    private readonly IRepository<Foundation> _foundationRepository;
    private readonly IRepository<User> _userRepository;

    public FoundationService(IRepository<Foundation> foundationRepository, IRepository<User> userRepository)
    {
        _foundationRepository = foundationRepository;
        _userRepository = userRepository;
    }

    public async Task<FoundationResponse> RegisterFoundationAsync(FoundationRegisterRequest request, Guid userId)
    {
        var existing = await _foundationRepository.FindAsync(f => f.UserId == userId);
        if (existing.Any())
        {
            throw new Exception("El usuario ya tiene una fundación registrada.");
        }

        var foundation = new Foundation
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            Name = request.Name,
            Nit = request.Nit,
            Location = request.Location,
            ContactPhone = request.ContactPhone,
            Description = request.Description,
            IsVerified = false
        };

        await _foundationRepository.AddAsync(foundation);

        // Update user's role to Foundation
        var user = await _userRepository.GetByIdAsync(userId);
        if (user != null)
        {
            user.Role = Core.Enums.UserRole.Foundation;
            await _userRepository.UpdateAsync(user);
        }

        await _foundationRepository.SaveChangesAsync();

        return MapToResponse(foundation);
    }

    public async Task<FoundationResponse?> GetFoundationByIdAsync(Guid id)
    {
        var f = await _foundationRepository.GetByIdAsync(id);
        return f == null ? null : MapToResponse(f);
    }

    public async Task<FoundationResponse?> GetFoundationByUserIdAsync(Guid userId)
    {
        var founds = await _foundationRepository.FindAsync(f => f.UserId == userId);
        var f = founds.FirstOrDefault();
        return f == null ? null : MapToResponse(f);
    }

    public async Task<IEnumerable<FoundationResponse>> GetAllFoundationsAsync()
    {
        var list = await _foundationRepository.GetAllAsync();
        return list.Select(MapToResponse);
    }

    public async Task<FoundationResponse> UpdateFoundationAsync(Guid id, FoundationUpdateRequest request, Guid userId, string role)
    {
        var foundation = await _foundationRepository.GetByIdAsync(id);
        if (foundation == null)
        {
            throw new Exception("Fundación no encontrada.");
        }

        if (role != "Admin" && foundation.UserId != userId)
        {
            throw new UnauthorizedAccessException("No tienes permisos sobre esta fundación.");
        }

        foundation.Name = request.Name;
        foundation.Nit = request.Nit;
        foundation.Location = request.Location;
        foundation.ContactPhone = request.ContactPhone;
        foundation.Description = request.Description;

        await _foundationRepository.UpdateAsync(foundation);
        await _foundationRepository.SaveChangesAsync();

        return MapToResponse(foundation);
    }

    public async Task VerifyFoundationAsync(Guid id)
    {
        var foundation = await _foundationRepository.GetByIdAsync(id);
        if (foundation == null)
        {
            throw new Exception("Fundación no encontrada.");
        }

        foundation.IsVerified = true;
        await _foundationRepository.UpdateAsync(foundation);
        await _foundationRepository.SaveChangesAsync();
    }

    private static FoundationResponse MapToResponse(Foundation f)
    {
        return new FoundationResponse
        {
            Id = f.Id,
            UserId = f.UserId,
            Name = f.Name,
            Nit = f.Nit,
            Location = f.Location,
            ContactPhone = f.ContactPhone,
            Description = f.Description,
            IsVerified = f.IsVerified
        };
    }
}
