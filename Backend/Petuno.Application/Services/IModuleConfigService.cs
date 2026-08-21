using Petuno.Application.DTOs.ModuleConfig;
using Petuno.Core.Enums;

namespace Petuno.Application.Services;

public interface IModuleConfigService
{
    Task<IEnumerable<ModuleConfigResponse>> GetActiveModulesByRoleAsync(UserRole role);
    Task<IEnumerable<Core.Entities.ModuleConfig>> GetAllConfigurationsAsync();
    Task UpdateModuleVisibilityAsync(Guid id, bool enabledForOwner, bool enabledForFoundation, bool enabledForAdmin);
}
