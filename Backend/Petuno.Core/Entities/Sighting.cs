using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Petuno.Core.Entities;

[Table("sightings")]
public class Sighting
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("pet_id")]
    public Guid? PetId { get; set; }

    [Required]
    [MaxLength(500)]
    [Column("location")]
    public string Location { get; set; } = string.Empty;

    [MaxLength(100)]
    [Column("city")]
    public string? City { get; set; }

    [MaxLength(2000)]
    [Column("description")]
    public string? Description { get; set; }

    [MaxLength(500)]
    [Column("photo_url")]
    public string? PhotoUrl { get; set; }

    [MaxLength(150)]
    [Column("reporter_contact")]
    public string? ReporterContact { get; set; }

    [Column("timestamp")]
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("PetId")]
    public Pet? Pet { get; set; }
}
