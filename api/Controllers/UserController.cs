using Microsoft.AspNetCore.Mvc;
using api.Services;
using Microsoft.Azure.Cosmos;
using api.Models;
using api.Models.DTO;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly string USER_CONTAINER = "Users";

        private readonly ILogger<UserController> _logger;
        private readonly CosmosDbService _cosmosDbService;

        public UserController(ILogger<UserController> logger, CosmosDbService cosmosDbService)
        {
            _logger = logger;
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet]
        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            var query = new QueryDefinition("SELECT * FROM c");
            var iterator = container.GetItemQueryIterator<AppUser>(query);
            var results = new List<AppUser>();

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                results.AddRange(response);
            }

            return results;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<AppUser>> GetUserById([FromRoute] string userId)
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            try
            {
                var response = await container.ReadItemAsync<AppUser>(userId, new PartitionKey(userId));
                return Ok(response.Resource);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser([FromBody] CreateUserDTO user)
        {
            if (user != null && !string.IsNullOrEmpty(user.email))
            {
                var appUser = new AppUser
                {
                    id = Guid.NewGuid().ToString(),
                    email = user.email
                };

                await _cosmosDbService.CreateItemAsync(USER_CONTAINER, appUser);

                return CreatedAtAction(nameof(GetUserById), new
                {
                    userId = appUser.id
                }, appUser);
            }

            return BadRequest("Email is required");
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser([FromRoute] string userId)
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            try
            {
                await container.DeleteItemAsync<User>(userId, new PartitionKey(userId));
                return NoContent();
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound();
            }
        }
    }
}