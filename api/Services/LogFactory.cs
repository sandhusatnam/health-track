using api.Contracts;
using api.Controllers;
using api.Models;
using api.Models.DTO;
using api.Models.Log;

namespace api.Services
{
    public abstract class LogFactory : ILogFactory
    {
        public abstract ILog CreateActivityLog(LogDTO payload);
    }

    public class ConcreteActivityLogFactory : LogFactory
    {
        private readonly IFoodApiAdapter _thirdPartyApiService;

        public ConcreteActivityLogFactory(IFoodApiAdapter thirdPartyApiService)
        {
            _thirdPartyApiService = thirdPartyApiService;
        }

        public override ILog CreateActivityLog(LogDTO payload)
        {
            return payload.type.ToLower() switch
            {
                "activity" => new PhysicalActivityLog(payload.userId, payload.details.duration),
                "meal" => new MealLog(payload.userId, payload.details.calories, payload.details.foodName, _thirdPartyApiService),
                "water" => new WaterLog(payload.userId, payload.details.waterIntake),
                "sleep" => new SleepLog(payload.userId, payload.details.duration),
                // Add more cases for other activity types
                _ => null,
            };
        }
    }
}
