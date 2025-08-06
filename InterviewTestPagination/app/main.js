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
            // The API brings default at startup brings 20 items per page on page 1
            $http.get("api/todo/todospaginated")
                .then(function (response) {

                    $scope.todos = response.data.items;
                    $scope.currentPage = response.data.currentPage;
                    $scope.itemsPerPage = response.data.itemsPerPage;
                    $scope.totalItems = response.data.totalItems;
                    $scope.totalPages = response.data.totalPages;
                })
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
                totalPages: "="
            },
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) { }

        function link(scope, element, attrs) { }

        return directive;
    }

})(angular);

