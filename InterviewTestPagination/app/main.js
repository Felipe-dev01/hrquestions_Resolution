(function (angular) {
    "use strict";

    angular
        .module("todoApp")
        .directive("todoPaginatedList", [todoPaginatedList])
        .directive("pagination", [pagination]);

    /**
     * Directive definition function of 'todoPaginatedList'.
     * 
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
     * 
     * @returns {} directive definition object
     */
    function todoPaginatedList() {
        var directive = {
            restrict: "E",
            templateUrl: "app/templates/todo.list.paginated.html",
            scope: {},
            controller: ["$scope", "$http", controller],
            link: link
        };

        function controller($scope, $http) {
            $scope.currentPage = 1;
            $scope.itemsPerPage = 20;
            $scope.totalItems = 0;
            $scope.totalPages = 0;

            // The API brings default at startup brings 20 items per page on page 1
            $scope.updatePage = function () {
                $http.get(`api/todo/todospaginated?page=${$scope.currentPage}&itemsPerPage=${$scope.itemsPerPage}`)
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

            // Initialize the page
            $scope.updatePage();
        }

        function link(scope, element, attrs) { }

        return directive;

    }

    /**
     * Directive definition function of 'pagination' directive.
     * 
     * TODO: make it a reusable component (i.e. usable by any list of objects not just the Models.Todo model)
     * TODO: correctly parametrize scope (inherited? isolated? which properties?)
     * TODO: create appropriate functions (link? controller?) and scope bindings
     * TODO: make appropriate general directive configuration (support transclusion? replace content? EAC?)
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
                onUpdate: "&"
            },
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {
            // Changes the number of items per screen and sends to refresh the page 
            $scope.changedItemsPerPage = function () {
                $scope.onUpdate({ itemsPerPage: $scope.itemsPerPage });
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
        }

        function link(scope, element, attrs) { }

        return directive;
    }

})(angular);

