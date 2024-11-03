using Microsoft.Azure.Cosmos;

namespace api.Services
{
    public class CosmosDbService
    {
        private readonly CosmosClient _cosmosClient;
        private readonly Database _database;

        public CosmosDbService(CosmosDbSettings settings)
        {
            _cosmosClient = new CosmosClient(settings.Account, settings.Key);
            _database = _cosmosClient.GetDatabase(settings.DatabaseName);
        }

        public async Task<Container> GetContainerAsync(string containerName)
        {
            return await _database.CreateContainerIfNotExistsAsync(containerName, "/userid");
        }
    }
}
