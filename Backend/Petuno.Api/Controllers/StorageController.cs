using System;
using System.IO;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Petuno.Application.DTOs.Pet;
using Petuno.Core.Interfaces;

namespace Petuno.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StorageController : ControllerBase
{
    private readonly IStorageService _storageService;

    public StorageController(IStorageService storageService)
    {
        _storageService = storageService;
    }

    [HttpPost("upload")]
    [Authorize]
    public async Task<IActionResult> UploadImage([FromBody] ImageUploadRequest request)
    {
        if (string.IsNullOrEmpty(request.Base64Image))
        {
            return BadRequest(new { message = "La imagen base64 es requerida." });
        }

        try
        {
            // Parse base64 string
            var base64Parts = request.Base64Image.Split(',');
            var base64Data = base64Parts.Length > 1 ? base64Parts[1] : base64Parts[0];
            
            // Extract contentType from header (default to image/png if not found)
            var contentType = "image/png";
            if (base64Parts.Length > 1)
            {
                var header = base64Parts[0];
                var start = header.IndexOf(':') + 1;
                var end = header.IndexOf(';');
                if (start > 0 && end > start)
                {
                    contentType = header.Substring(start, end - start);
                }
            }

            var fileBytes = Convert.FromBase64String(base64Data);
            using var memoryStream = new MemoryStream(fileBytes);

            // Generate unique filename to avoid duplicates in MinIO
            var uniqueFileName = $"{Guid.NewGuid()}_{request.FileName}";
            var publicUrl = await _storageService.UploadFileAsync(memoryStream, uniqueFileName, contentType, "pets-photos");

            return Ok(new { url = publicUrl });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = $"Error al cargar la imagen a MinIO: {ex.Message}" });
        }
    }
}
