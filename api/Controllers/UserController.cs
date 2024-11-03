using Microsoft.AspNetCore.Mvc;
using api.Services;

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
           
            return new List();
        }
    }
}
