using System.Collections.Generic;
using System.Web.Http;
using InterviewTestPagination.Models;
using InterviewTestPagination.Models.Todo;
using System.Linq;
using System;

namespace InterviewTestPagination.Controllers
{
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
        /// <param name="page"> Page number (default: 1)</param>
        /// <param name="itemsPerPage"> Number of items per page (default: 20)</param>
        /// <param name="priorityOrder">Order of priority for diminishing or increasing returns (1 for increasing and 2 for decreasing)</param>
        /// <param name="sort priority by id, task or creation date"> Number of items per page (default: 20)</param>
        /// <returns>Paginated result with ToDos</returns>

        [HttpGet]
        public PagedResult<Todo> TodosPaginated(int page = 1, int itemsPerPage = 20, int priorityOrder = 0, String sortPriorityBy = "")
        {
            // Get all ToDos
            var allTodos = _todoService.Repository.All();

            // Get amount ToDos 
            var totalItems = allTodos.Count();


            if (priorityOrder != 0 && sortPriorityBy != "")
            {
                // priorityOrder == 1 -> Organizes data in ascending order
                if (priorityOrder == 1)
                {
                    switch (sortPriorityBy)
                    {
                        case "id":
                            allTodos = allTodos.OrderBy(item => item.Id);
                            break;
                        case "task":
                            allTodos = allTodos.OrderBy(item => item.Task);
                            break;
                        case "createdDate":
                            allTodos = allTodos.OrderBy(item => item.CreatedDate);
                            break;
                    }
                }
                // priorityOrder == 2 -> Organizes data in descending order
                if (priorityOrder == 2)
                {
                    switch (sortPriorityBy)
                    {
                        case "id":
                            allTodos = allTodos.OrderByDescending(item => item.Id);
                            break;
                        case "task":
                            allTodos = allTodos.OrderByDescending(item => item.Task);
                            break;
                        case "createdDate":
                            allTodos = allTodos.OrderByDescending(item => item.CreatedDate);
                            break;
                    }
                }
            }

            if (itemsPerPage == 0)
            {
                return new PagedResult<Todo>
                {
                    Items = allTodos,
                    ItemsPerPage = totalItems,
                    CurrentPage = page,
                    TotalItems = totalItems,
                    TotalPages = 1
                };
            }
            else
            {
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
}

