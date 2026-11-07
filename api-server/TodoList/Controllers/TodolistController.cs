using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TodoList.DTO;
using TodoList.Domain;
using TodoList.Service;
using TodoList.Util;

namespace TodoList.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api")]
    public class TodoListController : ControllerBase
    {
        private readonly TodoListService _TodoListService;

        public TodoListController(TodoListService TodoListService)
        {
            _TodoListService = TodoListService;
        }

        [HttpGet("TodoList")]
        public async Task<ActionResult<List<TodoDto>>> GetTodoListByUserIdAsync()
        {
            try
            {
               int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
               List<TodoDto> TodoListDto = await _TodoListService.GetTodoListByUserIdAsync(userId);
               return Ok(TodoListDto);
            }
            catch (Exception ex)
            {
                 var errorData = new
                {
                    message = "サーバー内部でエラーが発生しました。",
                    error = ex.Message,
                    statusCode = "500"
                };
                return StatusCode(500, errorData);
            }
        }

        [HttpGet("todo/{todoId}")]
        public async Task<ActionResult<TodoDto>> GetTodoByTodoId(int todoId)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                TodoDto todoDto = await _TodoListService.GetTodoByTodoIdAndUserIdAsync(userId, todoId);
                return Ok(todoDto);
            }
            catch (Exception ex)
            {
                var errorData = new
                {
                    message = "サーバー内部でエラーが発生しました。",
                    error = ex.Message,
                    statusCode = "500"
                };
                return StatusCode(500, errorData);
            }
        }

        [HttpPost("todo")]
        public async Task<IActionResult> CreateTodo([FromBody] TodoDto todoDto)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                await _TodoListService.CreateTodoAsync(userId, todoDto);
                return Ok(todoDto);
            }
            catch (Exception ex)
            {
                var errorData = new
                {
                    message = "サーバー内部でエラーが発生しました。",
                    error = ex.Message,
                    statusCode = "500"
                };
                return StatusCode(500, errorData);
            }
        }

        [HttpPatch("todo/{TodoListId}")]
        public async Task<ActionResult<TodoDto>> UpdateTodo([FromBody] TodoDto todoDto)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                await _TodoListService.UpdateTodoAsync(userId, todoDto);
                return Ok(todoDto);
            }
            catch (Exception ex)
            {
                var errorData = new
                {
                    message = "サーバー内部でエラーが発生しました。",
                    error = ex.Message,
                    statusCode = "500"
                };
                return StatusCode(500, errorData);
            }
        }

        [HttpDelete("todo/{TodoListId}")]
        public async Task<IActionResult> DeleteTodo(int TodoListId)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
                await _TodoListService.DeleteTodoAsync(userId, TodoListId);
                return Ok();
            }
            catch (Exception ex)
            {
                var errorData = new
                {
                    message = "サーバー内部でエラーが発生しました。",
                    error = ex.Message,
                    statusCode = "500"
                };
                return StatusCode(500, errorData);
            }
        }

    }
}
