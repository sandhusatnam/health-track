using api.Models.Log;

namespace api.Models.DTO
{
    public class GoalDTO
    {
        public string? id { get; set; }
        public string userId { get; set; }
        //public DateTime timestamp { get; set; }
        public string type { get; set; }
        public double target { get; set; }
    }
}
