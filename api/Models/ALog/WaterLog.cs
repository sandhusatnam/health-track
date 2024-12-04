using api.Contracts;

namespace api.Models.Log
{
    public class WaterLog : ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        //public DateTime timestamp { get; set; }
        public string type { get; set; } = "water";
        public LogDetails details { get; set; }

        public WaterLog(string _userId, double waterIntake)
        {
            id = "wi" + Guid.NewGuid().ToString();
            userId = _userId;

            details = new LogDetails();
            details.waterIntake = waterIntake;
            details.value = waterIntake;
        }
    }
}
