/**
 * Created by V Ravi on 01-02-2016.
 */
angular.module("mportal")
    .controller("HomeController", function($scope){
        $scope.items = [{name: "A1", sal:10},
            {name: "A2", sal:10},
            {name: "A3", sal:10}
        ,{name: "A4", sal:10}
        ,{name: "A5", sal:10}];
    });