namespace Petuno.Application.DTOs.Privacy;

public class PrivacySettingsRequest
{
    public bool ShowName { get; set; }
    public bool ShowBreed { get; set; }
    public bool ShowAge { get; set; }
    public bool ShowLocation { get; set; }
    public bool ShowMedical { get; set; }
    public bool AllowAnonymousContact { get; set; }
    public bool AllowSightings { get; set; }
}
