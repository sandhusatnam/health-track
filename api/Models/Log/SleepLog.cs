using api.Contracts;

namespace api.Models.Log
{
    public class SleepLog : ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        public DateTime timestamp { get; set; }
        public string type { get; set; } = "swimming";
        public LogDetails details { get; set; }

        public SleepLog(string _userId, double sleepDuration)
        {
            id = "sl" + Guid.NewGuid().ToString();
            userId = _userId;

            details = new LogDetails();
            details.duration = sleepDuration;
        }
    }
}
