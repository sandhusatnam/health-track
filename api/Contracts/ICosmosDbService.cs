using Microsoft.Azure.Cosmos;

namespace api.Contracts
{
    public interface ICosmosDbService
    {
        Task CreateItemAsync<T>(string containerName, T item);
        Task DeleteItemAsync<T>(string containerName, string id);
        Task<Container> GetContainerAsync(string containerName);
        Task<T> ReadItemAsync<T>(string containerName, string id);
        Task UpdateItemAsync<T>(string containerName, string id, T item);
        Task<IEnumerable<T>> QueryItemsAsync<T>(string containerName, QueryDefinition queryDefinition);
    }
}