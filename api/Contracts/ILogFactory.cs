using api.Models.DTO;

namespace api.Contracts
{
    public interface ILogFactory
    {
        ILog CreateActivityLog(LogDTO payload);
    }
}