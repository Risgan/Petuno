using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Foundation;
using Petuno.Application.Services;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FoundationsController : ControllerBase
{
    private readonly IFoundationService _foundationService;

    public FoundationsController(IFoundationService foundationService)
    {
        _foundationService = foundationService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _foundationService.GetAllFoundationsAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var f = await _foundationService.GetFoundationByIdAsync(id);
        if (f == null)
        {
            return NotFound();
        }
        return Ok(f);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Register([FromBody] FoundationRegisterRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            var result = await _foundationService.RegisterFoundationAsync(request, userId);
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> Update(Guid id, [FromBody] FoundationUpdateRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var role = User.FindFirst(ClaimTypes.Role)?.Value ?? string.Empty;

        if (string.IsNullOrEmpty(userIdString) || !Guid.TryParse(userIdString, out var userId))
        {
            return Unauthorized();
        }

        try
        {
            var result = await _foundationService.UpdateFoundationAsync(id, request, userId, role);
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

    [HttpPut("{id}/verify")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Verify(Guid id)
    {
        try
        {
            await _foundationService.VerifyFoundationAsync(id);
            return Ok(new { message = "Fundación verificada correctamente." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
