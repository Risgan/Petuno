using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Petuno.Core.Enums;

namespace Petuno.Core.Entities;

[Table("medical_records")]
public class MedicalRecord
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("pet_id")]
    public Guid PetId { get; set; }

    [Required]
    [MaxLength(20)]
    [Column("type")]
    public MedicalRecordType Type { get; set; }

    [Required]
    [MaxLength(200)]
    [Column("name")]
    public string Name { get; set; } = string.Empty;

    [Column("date_administered")]
    public DateOnly? DateAdministered { get; set; }

    [Column("date_due")]
    public DateOnly? DateDue { get; set; }

    [MaxLength(1000)]
    [Column("notes")]
    public string? Notes { get; set; }

    // Navigation properties
    [ForeignKey("PetId")]
    public Pet Pet { get; set; } = null!;
}
