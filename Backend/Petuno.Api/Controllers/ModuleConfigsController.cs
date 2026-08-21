using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Core.Enums;
using Petuno.Application.Services;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ModuleConfigsController : ControllerBase
{
    private readonly IModuleConfigService _service;

    public ModuleConfigsController(IModuleConfigService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyModules()
    {
        var roleString = User.FindFirst(ClaimTypes.Role)?.Value;

        // Default role is Owner if not authenticated (allows public customization)
        UserRole userRole = UserRole.Owner;
        if (!string.IsNullOrEmpty(roleString) && Enum.TryParse<UserRole>(roleString, out var parsedRole))
        {
            userRole = parsedRole;
        }

        var modules = await _service.GetActiveModulesByRoleAsync(userRole);
        return Ok(modules);
    }

    [HttpGet("all")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> GetAll()
    {
        var all = await _service.GetAllConfigurationsAsync();
        return Ok(all);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Update(Guid id, [FromBody] ModuleVisibilityUpdateRequest request)
    {
        try
        {
            await _service.UpdateModuleVisibilityAsync(id, request.EnabledForOwner, request.EnabledForFoundation, request.EnabledForAdmin);
            return Ok(new { message = "Configuración de módulo actualizada." });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}

public class ModuleVisibilityUpdateRequest
{
    public bool EnabledForOwner { get; set; }
    public bool EnabledForFoundation { get; set; }
    public bool EnabledForAdmin { get; set; }
}
