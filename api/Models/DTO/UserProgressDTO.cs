namespace api.Models.DTO
{
    public class UserProgressDTO
    {
        public string type { get; set; }
        public string name { get; set; }
        public double value { get; set; }
        public double target { get; set; }
        public string unit { get; set; }
        public double percentage { get; set; }
    }
}
