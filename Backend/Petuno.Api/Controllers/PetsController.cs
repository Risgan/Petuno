using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Pet;
using Petuno.Application.Services;
using Petuno.Core.Interfaces;
using Petuno.Infrastructure.Data;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PetsController : ControllerBase
{
    private readonly IPetService _petService;

    public PetsController(IPetService petService)
    {
        _petService = petService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] bool all = false)
    {
        Guid? ownerId = null;
        
        // If not requested explicitly to see all (e.g. SOS listings), filter by logged user
        if (!all && User.Identity?.IsAuthenticated == true)
        {
            var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (Guid.TryParse(userIdString, out var parsedId))
            {
                ownerId = parsedId;
            }
        }

        var pets = await _petService.GetAllPetsAsync(ownerId);
        return Ok(pets);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var pet = await _petService.GetPetByIdAsync(id);
        if (pet == null)
        {
            return NotFound(new { message = "Mascota no encontrada." });
        }
        return Ok(pet);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] PetCreateRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        var pet = await _petService.CreatePetAsync(request, userId);
        return CreatedAtAction(nameof(GetById), new { id = pet.Id }, pet);
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(Guid id, [FromBody] PetUpdateRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            // If user is Admin, we pass null as owner constraint, bypassing the ownership check
            Guid? ownerCheckId = role == "Admin" ? null : userId;
            var updatedPet = await _petService.UpdatePetAsync(id, request, ownerCheckId);
            return Ok(updatedPet);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            Guid? ownerCheckId = role == "Admin" ? null : userId;
            await _petService.DeletePetAsync(id, ownerCheckId);
            return NoContent();
        }
        catch (UnauthorizedAccessException ex)
        {
            return Forbid(ex.Message);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpGet("metadata")]
    public async Task<IActionResult> GetMetadata([FromServices] PetunoDbContext db, [FromServices] IStorageService storageService)
    {
        // Dynamically initialize public policy for the pets-photos bucket upon metadata access (guarantees public read for generic images)
        try
        {
            using var ms = new System.IO.MemoryStream(System.Text.Encoding.UTF8.GetBytes("policy_init"));
            await storageService.UploadFileAsync(ms, "policy_init.txt", "text/plain", "pets-photos");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al inicializar política de MinIO: {ex.Message}");
        }

        var species = db.PetSpecies.OrderBy(s => s.Name).Select(s => s.Name).ToList();
        var genders = new string[] { "Macho", "Hembra" };
        return Ok(new { species, genders });
    }

    [HttpPost("species")]
    [Authorize]
    public async Task<IActionResult> AddSpecies([FromBody] AddSpeciesRequest request, [FromServices] PetunoDbContext db)
    {
        if (request == null || string.IsNullOrWhiteSpace(request.Name))
        {
            return BadRequest(new { message = "El nombre de la especie no puede estar vacío." });
        }

        var normalized = request.Name.Trim();
        var exists = db.PetSpecies.Any(s => s.Name.ToLower() == normalized.ToLower());
        if (exists)
        {
            return BadRequest(new { message = "La especie ya existe." });
        }

        var newSpecies = new Petuno.Core.Entities.PetSpecies
        {
            Id = Guid.NewGuid(),
            Name = normalized
        };

        db.PetSpecies.Add(newSpecies);
        await db.SaveChangesAsync();

        return Ok(newSpecies);
    }
}

public class AddSpeciesRequest
{
    public string Name { get; set; } = string.Empty;
}
