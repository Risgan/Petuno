using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Adoption;
using Petuno.Application.Services;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AdoptionPetsController : ControllerBase
{
    private readonly IAdoptionPetService _adoptionPetService;

    public AdoptionPetsController(IAdoptionPetService adoptionPetService)
    {
        _adoptionPetService = adoptionPetService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var pets = await _adoptionPetService.GetAllAdoptionPetsAsync();
        return Ok(pets);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var pet = await _adoptionPetService.GetAdoptionPetByIdAsync(id);
        if (pet == null)
        {
            return NotFound();
        }
        return Ok(pet);
    }

    [HttpGet("foundation/{foundationId}")]
    public async Task<IActionResult> GetByFoundationId(Guid foundationId)
    {
        var pets = await _adoptionPetService.GetAdoptionPetsByFoundationIdAsync(foundationId);
        return Ok(pets);
    }

    [HttpPost]
    [Authorize(Roles = "Foundation,Admin")]
    public async Task<IActionResult> Create([FromBody] AdoptionPetCreateRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            var result = await _adoptionPetService.CreateAdoptionPetAsync(request, userId, role);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
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

    [HttpPut("{id}")]
    [Authorize(Roles = "Foundation,Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] AdoptionPetCreateRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            var result = await _adoptionPetService.UpdateAdoptionPetAsync(id, request, userId, role);
            return Ok(result);
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
    [Authorize(Roles = "Foundation,Admin")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            await _adoptionPetService.DeleteAdoptionPetAsync(id, userId, role);
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
}
