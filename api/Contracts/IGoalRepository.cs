using api.Models.DTO;

namespace api.Contracts
{
    public interface IGoalRepository
    {
        Task SaveGoal(GoalDTO goalDTO);
        Task<IEnumerable<GoalDTO>> GetGoals(string userId);
        Task<bool> DeleteGoal(string id);
    }
}
