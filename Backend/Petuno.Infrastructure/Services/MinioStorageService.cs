using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Minio;
using Minio.DataModel.Args;
using Petuno.Core.Interfaces;

namespace Petuno.Infrastructure.Services;

public class MinioStorageService : IStorageService
{
    private readonly IMinioClient _minioClient;
    private readonly string _endpoint;
    private readonly string _publicUrl;

    public MinioStorageService(IConfiguration configuration)
    {
        var endpoint = configuration["Minio:Endpoint"] ?? "localhost:9000";
        var accessKey = configuration["Minio:AccessKey"] ?? "admin";
        var secretKey = configuration["Minio:SecretKey"] ?? "admin123";
        
        // Windows/external client connects to localhost:9000, but in Docker it's minio:9000.
        // We'll read endpoints dynamically:
        _endpoint = endpoint;
        _publicUrl = configuration["Minio:PublicUrl"] ?? "http://localhost:9000";

        // Initialize MinioClient using builders pattern (MinIO v7.0.0+)
        _minioClient = new MinioClient()
            .WithEndpoint(_endpoint)
            .WithCredentials(accessKey, secretKey)
            .WithSSL(false)
            .Build();
    }

    public async Task<string> UploadFileAsync(Stream fileStream, string fileName, string contentType, string bucketName)
    {
        // 1. Ensure bucket exists
        var bucketExists = await _minioClient.BucketExistsAsync(new BucketExistsArgs().WithBucket(bucketName));
        if (!bucketExists)
        {
            await _minioClient.MakeBucketAsync(new MakeBucketArgs().WithBucket(bucketName));
        }

        // Set bucket policy to public read for static resources on every upload/check
        var policyJson = $@"{{
            ""Version"": ""2012-10-17"",
            ""Statement"": [
                {{
                    ""Effect"": ""Allow"",
                    ""Principal"": ""*"",
                    ""Action"": [""s3:GetObject""],
                    ""Resource"": [""arn:aws:s3:::{bucketName}/*""]
                }}
            ]
        }}";
        await _minioClient.SetPolicyAsync(new SetPolicyArgs().WithBucket(bucketName).WithPolicy(policyJson));

        // 2. Upload file
        var putObjectArgs = new PutObjectArgs()
            .WithBucket(bucketName)
            .WithObject(fileName)
            .WithStreamData(fileStream)
            .WithObjectSize(fileStream.Length)
            .WithContentType(contentType);

        await _minioClient.PutObjectAsync(putObjectArgs);

        // 3. Return public URL resolving from client perspective
        return $"{_publicUrl}/{bucketName}/{fileName}";
    }
}
