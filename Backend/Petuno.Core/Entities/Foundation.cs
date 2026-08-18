using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Petuno.Core.Entities;

[Table("foundations")]
public class Foundation
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("user_id")]
    public Guid UserId { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [MaxLength(50)]
    [Column("nit")]
    public string? Nit { get; set; }

    [MaxLength(300)]
    [Column("location")]
    public string? Location { get; set; }

    [MaxLength(20)]
    [Column("contact_phone")]
    public string? ContactPhone { get; set; }

    [MaxLength(2000)]
    [Column("description")]
    public string? Description { get; set; }

    [Column("is_verified")]
    public bool IsVerified { get; set; }

    // Navigation properties
    [ForeignKey("UserId")]
    public User User { get; set; } = null!;
    public ICollection<AdoptionPet> AdoptionPets { get; set; } = [];
}
