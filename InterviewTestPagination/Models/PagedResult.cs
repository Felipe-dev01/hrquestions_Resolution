using System.Collections.Generic;

namespace InterviewTestPagination.Models 
{
    /// <summary>
    ///     DTO representing a paginated result
    /// </summary>
    /// <typeparam name="T">Type of items on the page</typeparam>
    public class PagedResult<T>
    {
        // List of items on the current page
        public IEnumerable<T> Items { get; set; }

        // Current page number
        public int CurrentPage { get; set; }

        // Number of items per page
        public int ItemsPerPage { get; set; }

        // Total number of items
        public int TotalItems { get; set; }

        // Total number of pages
        public int TotalPages { get; set; }
        
    }
}