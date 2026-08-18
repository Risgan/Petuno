using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("users")]
public class User
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [MaxLength(256)]
    [Column("email")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [Column("password_hash")]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(150)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(20)]
    [Column("phone")]
    public string? Phone { get; set; }

    [MaxLength(100)]
    [Column("city")]
    public string? City { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("role")]
    public UserRole Role { get; set; } = UserRole.Owner;

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public Foundation? Foundation { get; set; }
    public ICollection<Pet> Pets { get; set; } = [];
    public ICollection<AdoptionApplication> AdoptionApplications { get; set; } = [];
}
