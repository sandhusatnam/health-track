using api.Contracts;
using api.Models.Log;
using api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Cosmos;
using System.ComponentModel;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Description("Connecting to Nutritionix API.")]
    public class FoodController : ControllerBase
    {
        private readonly IFoodApiAdapter _foodApiAdapter;

        public FoodController(IFoodApiAdapter foodApiAdapter)
        {
            _foodApiAdapter = foodApiAdapter;
        }

        /// <summary>
        /// Fetch food nutrition information based on what user logged
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<ActionResult<Food>> GetFoodNutrition([FromQuery] string food)
        {
            if(!string.IsNullOrEmpty(food))
            {
                var nutrition = await _foodApiAdapter.GetFoodDetails(food);
                return Ok(nutrition);
            }
            
            return BadRequest("Please provide a food item to get nutrition information.");
        }
    }
}
