using api.Constants;
using api.Contracts;
using api.Models.DTO;
using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace api.Services
{
    public class LogRepository : ILogRepository
    {
        private readonly string ACTIVITY_CONTAINER = "ActivityLogs";

        private readonly ICosmosDbService _cosmosDbService;

        public LogRepository(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        public async Task SaveActivityLogAsync(ILog activityLog)
        {
            await _cosmosDbService.CreateItemAsync(ACTIVITY_CONTAINER, activityLog);
        }

        public async Task<IEnumerable<ILog>> GetActivityLogsAsync(string userId, DateTime? date)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.userId = @userId")
                .WithParameter("@userId", userId);

            return await _cosmosDbService.QueryItemsAsync<LogDTO>(ACTIVITY_CONTAINER, query);
        }

        public async Task<bool> DeleteLog(string id)
        {
            try
            {
                await _cosmosDbService.DeleteItemAsync <LogDTO>(ACTIVITY_CONTAINER, id);
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }
        }
    }
}
