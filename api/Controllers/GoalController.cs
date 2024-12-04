using api.Contracts;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GoalController : ControllerBase
    {
        private readonly IGoalRepository _goalRepository;

        public GoalController(IGoalRepository goalRepository)
        {
            _goalRepository = goalRepository;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateGoal([FromBody] GoalDTO payload)
        {
            if (payload == null)
            {
                return BadRequest("Invalid goal");
            }

            await _goalRepository.SaveGoal(payload);
            return Ok(payload);
        }

        [HttpGet("[action]")]
        public async Task<IActionResult> GetUserGoals([FromQuery] string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                var logs = await _goalRepository.GetGoals(userId);
                return Ok(logs);
            }

            return BadRequest("UserId is required");
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteGoal([FromQuery] string id)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest("Id is required");
            }

            var result = await _goalRepository.DeleteGoal(id);
          
            if (result)
            {
                return NoContent();
            }

            return NotFound("Goal not found");
        }
    }
}
