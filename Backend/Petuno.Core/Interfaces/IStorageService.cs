using System.IO;
using System.Threading.Tasks;

namespace Petuno.Core.Interfaces;

public interface IStorageService
{
    Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string bucketName);
}
