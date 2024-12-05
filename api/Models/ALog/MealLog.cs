using api.Contracts;

namespace api.Models.Log
{

    public class MealLog : ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        public string type { get; set; } = "meal";
        public LogDetails details { get; set; }

        public MealLog(string _userId, double calories, string foodName, IFoodApiAdapter thirdPartyApiService)
        {
            id = "fo" + Guid.NewGuid().ToString();
            userId = _userId;

            details = new LogDetails();
            details.foodName = foodName;
            double calcCalories = calories > 0 ? calories : CalculateCalories(thirdPartyApiService);
            details.calories = calcCalories;
            details.value = calcCalories;
        }

        public double CalculateCalories(IFoodApiAdapter thirdPartyApiService)
        {
            var foodDetails = thirdPartyApiService.GetFoodDetails(details.foodName).Result.Foods.FirstOrDefault();

            return foodDetails.Calories;
        }
    }
}
