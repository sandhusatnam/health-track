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

        /// <summary>
        /// Create health goal for a user
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Get saved goals for a user
        /// </summary>
        /// <returns></returns>
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

        /// <summary>
        /// Remove a goal
        /// </summary>
        /// <returns></returns>
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
