namespace Petuno.Application.DTOs.Foundation;

public class FoundationResponse
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Nit { get; set; }
    public string? Location { get; set; }
    public string? ContactPhone { get; set; }
    public string? Description { get; set; }
    public bool IsVerified { get; set; }
}
