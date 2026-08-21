using Petuno.Application.DTOs.ModuleConfig;
using Petuno.Core.Entities;
using Petuno.Core.Enums;
using Petuno.Core.Interfaces;

namespace Petuno.Application.Services;

public class ModuleConfigService : IModuleConfigService
{
    private readonly IRepository<ModuleConfig> _repository;

    public ModuleConfigService(IRepository<ModuleConfig> repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<ModuleConfigResponse>> GetActiveModulesByRoleAsync(UserRole role)
    {
        var all = await _repository.GetAllAsync();

        return all.Select(m => new ModuleConfigResponse
        {
            ModuleName = m.ModuleName,
            Enabled = role switch
            {
                UserRole.Admin => m.EnabledForAdmin,
                UserRole.Foundation => m.EnabledForFoundation,
                UserRole.Owner or _ => m.EnabledForOwner
            }
        });
    }

    public async Task<IEnumerable<ModuleConfig>> GetAllConfigurationsAsync()
    {
        return await _repository.GetAllAsync();
    }

    public async Task UpdateModuleVisibilityAsync(Guid id, bool enabledForOwner, bool enabledForFoundation, bool enabledForAdmin)
    {
        var config = await _repository.GetByIdAsync(id);
        if (config == null)
        {
            throw new Exception("Módulo no encontrado.");
        }

        config.EnabledForOwner = enabledForOwner;
        config.EnabledForFoundation = enabledForFoundation;
        config.EnabledForAdmin = enabledForAdmin;

        await _repository.UpdateAsync(config);
        await _repository.SaveChangesAsync();
    }
}
