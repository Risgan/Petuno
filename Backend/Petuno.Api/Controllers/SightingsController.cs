using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Sighting;
using Petuno.Application.Services;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SightingsController : ControllerBase
{
    private readonly ISightingService _sightingService;

    public SightingsController(ISightingService sightingService)
    {
        _sightingService = sightingService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var sightings = await _sightingService.GetAllSightingsAsync();
        return Ok(sightings);
    }

    [HttpGet("pet/{petId}")]
    public async Task<IActionResult> GetByPetId(Guid petId)
    {
        var sightings = await _sightingService.GetSightingsByPetIdAsync(petId);
        return Ok(sightings);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] SightingCreateRequest request)
    {
        try
        {
            var sighting = await _sightingService.CreateSightingAsync(request);
            return CreatedAtAction(nameof(GetAll), new { id = sighting.Id }, sighting);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
