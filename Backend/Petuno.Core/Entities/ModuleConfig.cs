using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Petuno.Core.Entities;

[Table("module_configs")]
public class ModuleConfig
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(100)]
    [Column("module_name")]
    public string ModuleName { get; set; } = string.Empty;

    [Column("enabled_for_owner")]
    public bool EnabledForOwner { get; set; } = true;

    [Column("enabled_for_foundation")]
    public bool EnabledForFoundation { get; set; } = true;

    [Column("enabled_for_admin")]
    public bool EnabledForAdmin { get; set; } = true;
}
