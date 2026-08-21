namespace Petuno.Application.DTOs.Privacy;

public class PrivacySettingsResponse
{
    public Guid Id { get; set; }
    public Guid PetId { get; set; }
    public bool ShowName { get; set; }
    public bool ShowBreed { get; set; }
    public bool ShowAge { get; set; }
    public bool ShowLocation { get; set; }
    public bool ShowMedical { get; set; }
    public bool AllowAnonymousContact { get; set; }
    public bool AllowSightings { get; set; }
}
