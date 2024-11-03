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

        public async Task CreateItemAsync<T>(string containerName, T item)
        {
            var container = await GetContainerAsync(containerName);
            await container.CreateItemAsync(item);
        }

        public async Task<T> ReadItemAsync<T>(string containerName, string id)
        {
            var container = await GetContainerAsync(containerName);
            var response = await container.ReadItemAsync<T>(id, new PartitionKey(id));
            return response.Resource;
        }

        public async Task UpdateItemAsync<T>(string containerName, string id, T item)
        {
            var container = await GetContainerAsync(containerName);
            await container.ReplaceItemAsync(item, id, new PartitionKey(id));
        }

        public async Task DeleteItemAsync<T>(string containerName, string id)
        {
            var container = await GetContainerAsync(containerName);
            await container.DeleteItemAsync<T>(id, new PartitionKey(id));
        }
    }
}
