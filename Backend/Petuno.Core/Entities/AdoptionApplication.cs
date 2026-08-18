using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("adoption_applications")]
public class AdoptionApplication
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("adoption_pet_id")]
    public Guid AdoptionPetId { get; set; }

    [Required]
    [Column("applicant_id")]
    public Guid ApplicantId { get; set; }

    [Required]
    [MaxLength(15)]
    [Column("status")]
    public ApplicationStatus Status { get; set; } = ApplicationStatus.Pending;

    [MaxLength(2000)]
    [Column("applicant_notes")]
    public string? ApplicantNotes { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey("AdoptionPetId")]
    public AdoptionPet AdoptionPet { get; set; } = null!;

    [ForeignKey("ApplicantId")]
    public User Applicant { get; set; } = null!;
}
