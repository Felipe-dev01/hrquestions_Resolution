using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Todo;
using System.Linq;

namespace InterviewTestPagination.Controllers {
    /// <summary>
    /// 'Rest' controller for the <see cref="Todo"/>
    /// model.
    /// 
    /// TODO: implement the pagination Action
    /// </summary>
    public class TodoController : ApiController
    {
        // TODO: [low priority] setup DI 
        private readonly IModelService<Todo> _todoService = new TodoService();

        /// <summary>
        /// Returns a page of Paginated ToDos  
        /// </summary>
        /// <param name="page"> Page number (starts at 1, default: 1)</param>
        /// <param name="items"> Number of items per page (default: 20)</param>
        /// <returns>Paginated result with ToDos</returns>

        [HttpGet]
        public PagedResult<Todo> TodosPaginated(int page = 1, int itemsPerPage = 20)
        {
            // Get all ToDos
            var allTodos = _todoService.Repository.All();

            // Get amount ToDos 
            var totalItems = allTodos.Count();

            // Calculates the total number of pages required 
            int totalPages = (int)System.Math.Ceiling((double)totalItems / itemsPerPage);

            // Calculates the quantity of items that were already shown on the previous pages 
            int itemsToSkip = (page - 1) * itemsPerPage;

            // Gets the items on the current page
            var itemsCurrentPage = allTodos
                .Skip(itemsToSkip)
                .Take(itemsPerPage)
                .ToList();

            return new PagedResult<Todo>
            {
                // Attribute defined in PagedResult = variable defined in this method 
                Items = itemsCurrentPage,
                CurrentPage = page,
                ItemsPerPage = itemsPerPage,
                TotalItems = totalItems,
                TotalPages = totalPages
            };
        }

    }
}

