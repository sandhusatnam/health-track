using api.Contracts;
using System;

namespace api.Models.Log
{
    public class PhysicalActivityLog : ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        public DateTime timestamp { get; set; }
        public string type { get; set; } = "activity";
        public LogDetails details { get; set; }

        public PhysicalActivityLog(string _userId, double duration)
        {
            id = "pa" + Guid.NewGuid().ToString();
            userId = _userId;

            details = new LogDetails();
            details.duration = duration;
            details.calories = CalculateCaloriesBurned();
        }

        public double CalculateCaloriesBurned()
        {
            // Sample calculation: calories burned per minute * duration in minutes
            double caloriesPerMinute = 10;
            return caloriesPerMinute * details.duration;
        }
    }
}