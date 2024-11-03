using Microsoft.AspNetCore.Mvc;
using api.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;
        private readonly CosmosDbService _cosmosDbService;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, CosmosDbService cosmosDbService)
        {
            _logger = logger;
            _cosmosDbService = cosmosDbService;
        }

        [HttpGet]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {
            var container = await _cosmosDbService.GetContainerAsync("WeatherForecasts");
            var query = new QueryDefinition("SELECT * FROM c");
            var iterator = container.GetItemQueryIterator<WeatherForecast>(query);
            var results = new List<WeatherForecast>();

            while (iterator.HasMoreResults)
            {
                var response = await iterator.ReadNextAsync();
                results.AddRange(response);
            }

            return results;
        }

        public class WeatherForecast
        {
            public string Id { get; set; }
            public DateOnly Date { get; set; }
            public int TemperatureC { get; set; }
            public string? Summary { get; set; }

            public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
        }
    }
}
