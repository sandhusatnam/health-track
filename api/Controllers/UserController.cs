using Microsoft.AspNetCore.Mvc;
using api.Services;
using Microsoft.Azure.Cosmos;

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
        public async Task<IEnumerable<User>> GetUser()
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            var query = new QueryDefinition("SELECT * FROM c");
            var iterator = container.GetItemQueryIterator<User>(query);
            var results = new List<User>();

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                results.AddRange(response);
            }

            return results;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<User>> GetUserById(string userId)
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            try
            {
                var response = await container.ReadItemAsync<User>(userId, new PartitionKey(userId));
                return Ok(response.Resource);
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<ActionResult<User>> CreateUser([FromBody] User user)
        {
            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            user.Id = Guid.NewGuid().ToString();
            await container.CreateItemAsync(user, new PartitionKey(user.Id));
            return CreatedAtAction(nameof(GetUserById), new { userId = user.Id }, user);
        }

        [HttpPut("{userId}")]
        public async Task<IActionResult> UpdateUser(string userId, [FromBody] User user)
        {
            if (userId != user.Id)
            {
                return BadRequest();
            }

            var container = await _cosmosDbService.GetContainerAsync(USER_CONTAINER);
            try
            {
                await container.ReplaceItemAsync(user, userId, new PartitionKey(userId));
                return NoContent();
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return NotFound();
            }
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
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

    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
