using api.Contracts;
using api.Models;
using api.Models.DTO;
using Microsoft.OpenApi.Validations;
using Newtonsoft.Json;
using System.Text;

namespace api.Services
{
    public class ThirdPartyApiService : IFoodApiAdapter
    {
        private readonly HttpClient _httpClient;
        private const string FETCH_FOOD_RECOMMENDATIONS = "natural/nutrients";
        private const string JSON_CONTENT_TYPE = "application/json";

        public ThirdPartyApiService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient(nameof(ThirdPartyApiService));
        }

        public async Task<FoodDTO> GetFoodDetails(string query)
        {
            var content = new StringContent(JsonConvert.SerializeObject(new { query = query }), Encoding.UTF8, JSON_CONTENT_TYPE);
            var response = await _httpClient.PostAsync(FETCH_FOOD_RECOMMENDATIONS, content);

            var result = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode && !string.IsNullOrEmpty(result))
            {
                return JsonConvert.DeserializeObject<FoodDTO>(result);
            }

            return new FoodDTO();
        }
    }
}