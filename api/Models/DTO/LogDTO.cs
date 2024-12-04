using api.Contracts;
using api.Models.Log;
using System.Diagnostics.CodeAnalysis;

namespace api.Models.DTO
{
    public class LogDTO: ILog
    {
        public string? id { get; set; }
        public string userId { get; set; }
        //public DateTime timestamp { get; set; }
        public string type { get; set; }
        public LogDetails details { get; set; }

        public LogDTO()
        {
            details = new LogDetails();
        }
    }
}
