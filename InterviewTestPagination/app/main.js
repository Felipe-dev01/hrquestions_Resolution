(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination]);

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * // TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * // TODO: create appropriate functions (link? controller?) and scope bindings
     * // TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function todoPaginatedList() {
        var directive = {
            restrict: "E",
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: {},
            controller: ["$scope", "$http", controller],
        };

        function controller($scope, $http) {

            // Variable initialization
            $scope.currentPage = 1;
            $scope.itemsPerPage = 20;
            $scope.totalItems = 0;
            $scope.totalPages = 0;
            // Order of priority for diminishing or increasing returns (1 for increasing and 2 for decreasing)
            $scope.priorityOrder = 2;
            // Define who will organize the list
            // By default, the list priority order is by date in descending order.
            $scope.sortPriorityBy = "createdDate";

            // saves which last priority order of each item
            $scope.priorityOrderId = 0;
            $scope.priorityOrderTask = 0;
            // By default, the list priority order is by date in descending order.
            $scope.priorityOrderDate = 2;

            // The API brings default at startup brings 20 items per page on page 1
            $scope.updatePage = function () {
                
                $http.get(`api/todo/todospaginated?page=${$scope.currentPage}&itemsPerPage=${$scope.itemsPerPage}&priorityOrder=${$scope.priorityOrder}&sortPriorityBy=${$scope.sortPriorityBy}`)
                    .then(function (response) {
                        $scope.todos = response.data.items;
                        $scope.currentPage = response.data.currentPage;
                        // convert to STRING for print "selection Option" in the screen
                        $scope.itemsPerPage = response.data.itemsPerPage.toString();
                        $scope.totalItems = response.data.totalItems;
                        $scope.totalPages = response.data.totalPages;
                    })
            }

            // Updates the page as passed by the parameter in the 'pagination' scope in 'pagination.html'
            $scope.onPageChange = function (itemsPerPage, currentPage) {
                $scope.itemsPerPage = itemsPerPage;
                $scope.currentPage = currentPage;
                $scope.updatePage();
            }

            // Add the arrow in the table header
            $scope.addArrows = function (type, priorityOrder) {
                let header = document.getElementById(type);
                if (priorityOrder == 1) {
                    header.innerHTML += " ↑";
                } else if (priorityOrder == 2) {
                    header.innerHTML += " ↓";
                }
            }

            // Removes all priority arrows
            $scope.removeAllArrows = function () {
                let headers = document.querySelectorAll('th');
                headers.forEach(function (header) {
                    // Remove todos as setas do header da tabela
                    header.innerHTML = header.innerHTML.replace(' ↑', '').replace(' ↓', '');
                })
            }
            // Advance to the next priority order individually
            $scope.nextOrder = function (currentOrder) {
                if (currentOrder == 0) {
                    return 1;
                } else if (currentOrder == 1) {
                    return 2;
                } else if (currentOrder == 2) {
                    return 0;
                }
            }
            // Sorts in order of priority through the sorting sort type
            $scope.sortPriority = function (type) {
                // Remove all arrows
                $scope.removeAllArrows();
                switch (type) {
                    case 'id':
                        // Stores in priorityOrderId so that it is possible to switch between priority modes
                        $scope.priorityOrderId = $scope.nextOrder($scope.priorityOrderId);
                        // Stores priorityOrderId in priorityOrder for page refresh
                        $scope.priorityOrder = $scope.priorityOrderId;
                        // Define that the priority order will be by id
                        $scope.sortPriorityBy = "id";
                        // Call the function to add the arrows
                        $scope.addArrows('id', $scope.priorityOrderId);
                        break;
                    case 'task':
                        $scope.priorityOrderTask = $scope.nextOrder($scope.priorityOrderTask);
                        $scope.priorityOrder = $scope.priorityOrderTask;
                        $scope.addArrows('task', $scope.priorityOrderTask);
                        break;
                    case 'createdDate':
                        $scope.priorityOrderDate = $scope.nextOrder($scope.priorityOrderDate);
                        $scope.priorityOrder = $scope.priorityOrderDate;
                        $scope.addArrows('createdDate', $scope.priorityOrderDate);
                        break;
                }
                // calls the page refresh function
                $scope.updatePage();
            }
            // Initialize the page
            $scope.updatePage();
        }
        return directive;
    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * // TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * // TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * // TODO: create appropriate functions (link? controller?) and scope bindings
     * // TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function pagination() {
        var directive = {
            restrict: "E",
            templateUrl: "app/templates/pagination.html",
            scope: {
                currentPage: "=",
                totalItems: "=",
                totalPages: "=",
                itemsPerPage: "=",
                // Allows page updating by calling the onPageChange function
                onUpdate: "&"
            },
            controller: ["$scope", controller],
        };

        function controller($scope) {
            // Changes the number of items per screen and sends to refresh the page 
            $scope.changedItemsPerPage = function () {
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            };

            // Move to the next page
            $scope.nextPage = function () {
                $scope.currentPage++;
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            }
            // Move to the previous page
            $scope.previousPage = function () {
                $scope.currentPage--;
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            }
            // Move to the last page
            $scope.lastPage = function () {
                $scope.currentPage = $scope.totalPages;
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            }
            // Move to the first page
            $scope.firstPage = function () {
                $scope.currentPage = 1;
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            }

            // Update the page through input
            $scope.changedCurrentPage = function () {
                // If the user has deleted the input number to enter a new one
                if ($scope.currentPage === null || $scope.currentPage === undefined) {
                    return;
                }
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage, currentPage: $scope.currentPage });
            }
        }
        return directive;
    }

})(angular);

