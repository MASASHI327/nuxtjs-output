
using Microsoft.EntityFrameworkCore;
using System.Linq;
using TodoList.Domain;
using TodoList.DTO;

namespace TodoList.Repository
{
    public class TodoListRepository
    {
        private readonly ApplicationDbContext _context;

        public TodoListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<TodoEntity>> GetTodoListByUserIdAsync(int userId)

        {
            return await _context.TodoLists.Where(t=> t.USER_ID == userId).ToListAsync();
        }

        public async Task<TodoEntity?>GetTodoByTodoIdAndUserIdAsync(int userId, int todoId)
        {
            return await _context.TodoLists.FirstOrDefaultAsync(t => t.USER_ID == userId && t.TODO_ID == todoId);
        }

        public async Task<bool> AddTodoAsync(TodoEntity newTodo)
        {
            bool result = false;
            _context.TodoLists.Add(newTodo);
            int savedResult = await _context.SaveChangesAsync();
            if (savedResult > 0)
            {
                result = true;
            }
            return result;
        }

        public async Task<bool> UpdateTodoAsync(TodoEntity updateTodo)
        {
            bool result = false;
            TodoEntity? preUpdateTodo = _context.TodoLists.FirstOrDefault
                                   (t => t.TODO_ID == updateTodo.TODO_ID && t.USER_ID == updateTodo.USER_ID);
               
                if (preUpdateTodo != null)
                {
                    // TODOリストの内容を更新
                    preUpdateTodo.TITLE = updateTodo.TITLE;
                    preUpdateTodo.CONTENT = updateTodo.CONTENT;
                    preUpdateTodo.UPDATED_DATE = DateTime.Now;
                }
                else
                {
                throw new Exception("データが取得できない");
                }
                int savedResult = await _context.SaveChangesAsync();
                if (savedResult > 0)
                {
                    result = true;
                }
            return result;
        }


        public async Task<bool> DeleteTodoAsync(int userId, int todoId)
        {
            bool result = false;
            TodoEntity? deleteTodo = await _context.TodoLists.FirstOrDefaultAsync(t => t.TODO_ID == todoId && t.USER_ID == userId );
            if(deleteTodo != null)
            {
                _context.TodoLists.Remove(deleteTodo);
                int deletedResult = await _context.SaveChangesAsync();
                if (deletedResult > 0)
                {
                    result = true;
                }
            }
            else
            {
                throw new Exception("データが取得できない");
            }
            return result;
        }
    }
}
