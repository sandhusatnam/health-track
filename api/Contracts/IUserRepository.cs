using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace api.Contracts
{
    public interface IUserRepository
    {
        Task<bool> CreateUser([FromBody] CreateUserDTO user);
        Task<bool> DeleteUser([FromRoute] string userId);
        Task<AppUser> GetUserById([FromRoute] string userId);
        Task<IEnumerable<AppUser>> GetUsers();
        Task<AppUser> GetUserByEmail(string email);
    }
}