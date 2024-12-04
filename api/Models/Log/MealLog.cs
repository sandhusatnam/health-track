using api.Contracts;

namespace api.Models.Log
{

    public class MealLog : ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        public DateTime timestamp { get; set; }
        public string type { get; set; } = "swimming";
        public LogDetails details { get; set; }

        public MealLog(string _userId, string foodName, IFoodApiAdapter thirdPartyApiService)
        {
            id = "fo" + Guid.NewGuid().ToString();
            userId = _userId;

            details = new LogDetails();
            details.foodName = foodName;
            details.calories = CalculateCalories(thirdPartyApiService);
        }

        public double CalculateCalories(IFoodApiAdapter thirdPartyApiService)
        {
            var foodDetails = thirdPartyApiService.GetFoodDetails(details.foodName).Result.Foods.FirstOrDefault();

            return foodDetails.Calories;
        }
    }
}
