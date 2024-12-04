using api.Models;
using api.Models.DTO;
using System.Threading.Tasks;

namespace api.Contracts
{
    public interface IFoodApiAdapter
    {
        Task<FoodDTO> GetFoodDetails(string query);
    }
}