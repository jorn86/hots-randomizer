angular.module('hots', [])
    .controller('AppController', function($scope, $http, $filter) {
        $http.get('heroes.json').then(function(result) {
            $scope.data = result.data;
        });

        $scope.sorting = 'universe';
        $scope.descending = false;
        $scope.filter = {};

        $scope.sort = function(field) {
            if (field === $scope.sorting) {
                $scope.descending = !$scope.descending;
            }
            else {
                $scope.sorting = field;
                $scope.descending = false;
            }
        };

        var role = function(role) {
            switch (role) {
                case 'Warrior': return $scope.filter.warrior;
                case 'Assassin': return $scope.filter.assassin;
                case 'Support': return $scope.filter.support;
                case 'Specialist': return $scope.filter.specialist;
            }
            return false;
        };
        var universe = function(universe) {
            switch (universe) {
                case 'Warcraft': return $scope.filter.warcraft;
                case 'Starcraft': return $scope.filter.starcraft;
                case 'Diablo': return $scope.filter.diablo;
            }
            return false;
        };
        $scope.filterFunction = function(hero) {
            var noRoles = !($scope.filter.assassin || $scope.filter.warrior || $scope.filter.specialist || $scope.filter.support);
            var noUniverses = !($scope.filter.warcraft || $scope.filter.starcraft || $scope.filter.diablo);
            var showRole = noRoles || role(hero.role);
            var showUniverse = noUniverses || universe(hero.universe);
            return showRole && showUniverse;
        };
        $scope.random = function() {
            var results = _.chain($scope.data).filter($scope.filterFunction).filter(function(h) {return !h.ignore}).value();
            $scope.result = results[Math.floor(results.length * Math.random())];
        };
    });
