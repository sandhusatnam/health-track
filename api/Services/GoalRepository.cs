using api.Contracts;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;

namespace api.Services
{
    public class GoalRepository : IGoalRepository
    {
        private readonly string GOALS_CONTAINER = "Goals";

        private readonly ICosmosDbService _cosmosDbService;

        public GoalRepository(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        public async Task SaveGoal(GoalDTO goalDTO)
        {
            var existingGoals = await GetGoals(goalDTO.userId);
            var existingGoal = existingGoals.FirstOrDefault(g => g.type == goalDTO.type);

            if (existingGoal != null)
            {
                await DeleteGoal(existingGoal.id);
            }

            //goalDTO.timestamp = DateTime.Parse(goalDTO.timestamp.ToString(AppConstants.DATE_FORMAT));
            goalDTO.id = "go" + Guid.NewGuid().ToString();
            await _cosmosDbService.CreateItemAsync(GOALS_CONTAINER, goalDTO);
        }

        public async Task<IEnumerable<GoalDTO>> GetGoals(string userId)
        {
            var query = new QueryDefinition("SELECT * FROM c WHERE c.userId = @userId")
               .WithParameter("@userId", userId);
            return await _cosmosDbService.QueryItemsAsync<GoalDTO>(GOALS_CONTAINER, query);
        }

        public async Task<bool> DeleteGoal(string id)
        {
            try
            {
                await _cosmosDbService.DeleteItemAsync<AppUser>(GOALS_CONTAINER, id);
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }
        }
    }
}
