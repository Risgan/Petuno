using Petuno.Core.Entities;

namespace Petuno.Application.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}
