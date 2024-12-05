using api.Contracts;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;

namespace api.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly string USER_CONTAINER = "Users";

        private readonly ICosmosDbService _cosmosDbService;

        public UserRepository(ICosmosDbService cosmosDbService)
        {
            _cosmosDbService = cosmosDbService;
        }

        public async Task<IEnumerable<AppUser>> GetUsers()
        {
            var query = new QueryDefinition("SELECT * FROM c");
            return await _cosmosDbService.QueryItemsAsync<AppUser>(USER_CONTAINER, query);
        }

        public async Task<AppUser> GetUserById([FromRoute] string userId)
        {
            try
            {
                var response = await _cosmosDbService.ReadItemAsync<AppUser>(USER_CONTAINER, userId);
                return response;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }
        
        public async Task<AppUser> GetUserByEmail(string email)
        {
            try
            {
                var query = new QueryDefinition("SELECT * FROM c WHERE c.email = @email")
                    .WithParameter("@email", email);

                var users = await _cosmosDbService.QueryItemsAsync<AppUser>(USER_CONTAINER, query);

                return users.FirstOrDefault();
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return null;
            }
        }

        public async Task<bool> CreateUser(CreateUserDTO user)
        {
            try
            {
                var appUser = new AppUser
                {
                    id = Guid.NewGuid().ToString(),
                    email = user.email
                };

                await _cosmosDbService.CreateItemAsync(USER_CONTAINER, appUser);
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }
        }

        public async Task<bool> DeleteUser(string userId)
        {
            try
            {
                await _cosmosDbService.DeleteItemAsync<AppUser>(USER_CONTAINER, userId);
                return true;
            }
            catch (CosmosException ex) when (ex.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                return false;
            }
        }
    }
}
