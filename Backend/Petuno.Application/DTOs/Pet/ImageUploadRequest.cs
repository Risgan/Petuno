using System;
using System.ComponentModel.DataAnnotations;

namespace Petuno.Application.DTOs.Pet;

public class ImageUploadRequest
{
    [Required]
    public string Base64Image { get; set; } = string.Empty; // data:image/png;base64,iVBORw0KGgoAAA...
    
    [Required]
    public string FileName { get; set; } = string.Empty;
}
