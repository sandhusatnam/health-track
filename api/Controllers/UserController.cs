using Microsoft.AspNetCore.Mvc;
using api.Services;
using Microsoft.Azure.Cosmos;
using api.Models;
using api.Models.DTO;
using api.Contracts;
using Microsoft.Azure.Cosmos.Linq;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        /// <summary>
        /// Fetch all the registered users
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }

        /// <summary>
        /// Get a user by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<AppUser>> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userRepository.GetUserByEmail(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>
        /// Get a user by id
        /// </summary>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<ActionResult<AppUser>> GetUserById([FromQuery] string userId)
        {
            var user = await _userRepository.GetUserById(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        /// <summary>
        /// Create a user with the given email
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<ActionResult<AppUser>> CreateUser([FromBody] CreateUserDTO user)
        {
            if (user != null && !string.IsNullOrEmpty(user.email))
            {
                await _userRepository.CreateUser(user);

                var appUser = await _userRepository.GetUserByEmail(user.email);

                return Ok(appUser);
            }

            return BadRequest("Email is required");
        }

        /// <summary>
        /// Delete a user by id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteUser([FromQuery] string userId)
        {
           bool result = await _userRepository.DeleteUser(userId);

            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}
