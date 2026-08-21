using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Privacy;
using Petuno.Application.Services;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PrivacySettingsController : ControllerBase
{
    private readonly IPrivacyService _privacyService;

    public PrivacySettingsController(IPrivacyService privacyService)
    {
        _privacyService = privacyService;
    }

    [HttpGet("pet/{petId}")]
    public async Task<IActionResult> GetByPetId(Guid petId)
    {
        try
        {
            var result = await _privacyService.GetByPetIdAsync(petId);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("pet/{petId}")]
    [Authorize]
    public async Task<IActionResult> UpdateByPetId(Guid petId, [FromBody] PrivacySettingsRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            var result = await _privacyService.UpdateByPetIdAsync(petId, request, userId, role);
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
}
