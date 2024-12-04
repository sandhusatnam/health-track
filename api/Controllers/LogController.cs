using api.Contracts;
using api.Models;
using api.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;
using System.Linq;
using api.Services;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        private readonly ILogFactory _activityLogFactory;
        private readonly ILogRepository _activityLogRepository;
        private readonly IGoalRepository _goalRepository;

        public LogController(ILogFactory activityLogFactory, ILogRepository activityLogRepository, IGoalRepository goalRepository)
        {
            _activityLogFactory = activityLogFactory;
            _activityLogRepository = activityLogRepository;
            _goalRepository = goalRepository;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> CreateActivityLog([FromBody] LogDTO payload)
        {
            var activityLog = _activityLogFactory.CreateActivityLog(payload);
            if (activityLog == null)
            {
                return BadRequest("Invalid activity log type.");
            }

            await _activityLogRepository.SaveActivityLogAsync(activityLog);
            return Ok(activityLog);
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<ILog>>> GetActivityLogs([FromQuery] string userId, [FromQuery] DateTime? date)
        {
            var logs = await _activityLogRepository.GetActivityLogsAsync(userId, date);
            return Ok(logs);
        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> DeleteLog([FromQuery] string logId)
        {
            bool result = await _activityLogRepository.DeleteLog(logId);

            if (result)
            {
                return NoContent();
            }

            return NotFound();
        }

        [HttpGet("[action]")]
        public async Task<ActionResult<List<UserProgressDTO>>> GetUserProgress([FromQuery] string userId, [FromQuery] DateTime? date)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                var logs = await _activityLogRepository.GetActivityLogsAsync(userId, date);
                var goals = await _goalRepository.GetGoals(userId);

                var progress = goals.Select(goal =>
                {
                    var log = logs.FirstOrDefault(l => l.type == goal.type);
                    var achieved = logs.Where(l => l.type == goal.type).Sum(l => l.details.value);
                    var percentage = Math.Min((achieved / goal.target) * 100, 100);

                    var displayProperties = goal.type.ToLower() switch
                    {
                        "meal" => new { Name = "Calories", Unit = "kcal", Type = "meal" },
                        "water" => new { Name = "Water", Unit = "L", Type = "water" },
                        "activity" => new { Name = "Activity", Unit = "min", Type = "activity" },
                        "sleep" => new { Name = "Sleep", Unit = "hrs", Type = "sleep" },
                        _ => new { Name = goal.type, Unit = "", Type = "" }
                    };

                    return new UserProgressDTO
                    {
                        type = goal.type,
                        name = displayProperties.Name,
                        value = achieved,
                        target = goal.target,
                        unit = displayProperties.Unit,
                        percentage = percentage
                    };
                });

                return Ok(progress);
            }


            return BadRequest("User id is required");
        }
    }
}