using System.ComponentModel.DataAnnotations;
using Petuno.Core.Enums;

namespace Petuno.Application.DTOs.Auth;

public class RegisterRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Phone { get; set; }
    public string? City { get; set; }
    public UserRole Role { get; set; } = UserRole.Owner;
}
