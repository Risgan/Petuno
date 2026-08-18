using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("devices")]
public class Device
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("pet_id")]
    public Guid PetId { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("type")]
    public DeviceType Type { get; set; }

    [Required]
    [MaxLength(10)]
    [Column("status")]
    public DeviceStatus Status { get; set; } = DeviceStatus.Active;

    [Required]
    [MaxLength(100)]
    [Column("identifier")]
    public string Identifier { get; set; } = string.Empty;

    [Column("battery_level")]
    public int? BatteryLevel { get; set; }

    [Column("last_connection")]
    public DateTime? LastConnection { get; set; }

    // Navigation properties
    [ForeignKey("PetId")]
    public Pet Pet { get; set; } = null!;
}
