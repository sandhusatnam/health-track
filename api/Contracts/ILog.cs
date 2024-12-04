using api.Models.Log;
using System;

namespace api.Contracts
{
    public interface ILog
    {
        string id { get; set; }
        string userId { get; set; }
        //DateTime timestamp { get; set; }
        string type { get; set; }
        LogDetails details { get; set; }
    }
}