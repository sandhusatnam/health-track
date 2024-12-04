using api.Models.DTO;
using System.Threading.Tasks;

namespace api.Contracts
{
    public interface ILogRepository
    {
        Task SaveActivityLogAsync(ILog activityLog);
        Task<IEnumerable<ILog>> GetActivityLogsAsync(string userId, DateTime? date);
        Task<bool> DeleteLog(string id);
    }
}