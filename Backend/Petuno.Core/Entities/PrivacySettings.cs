using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Petuno.Core.Entities;

[Table("privacy_settings")]
public class PrivacySettings
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("pet_id")]
    public Guid PetId { get; set; }

    [Column("show_name")]
    public bool ShowName { get; set; } = true;

    [Column("show_breed")]
    public bool ShowBreed { get; set; } = true;

    [Column("show_age")]
    public bool ShowAge { get; set; } = true;

    [Column("show_location")]
    public bool ShowLocation { get; set; } = true;

    [Column("show_medical")]
    public bool ShowMedical { get; set; } = false;

    [Column("allow_anonymous_contact")]
    public bool AllowAnonymousContact { get; set; } = true;

    [Column("allow_sightings")]
    public bool AllowSightings { get; set; } = true;

    // Navigation properties
    [ForeignKey("PetId")]
    public Pet Pet { get; set; } = null!;
}
