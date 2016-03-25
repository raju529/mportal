
angular.module("mportal", ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("home");
       $stateProvider.state("home", {
           url: "/home",
           templateUrl:"templates/home.html",
           controller: "HomeController"
       })
           .state("myActions", {
               url: "/myActions",
               templateUrl:"templates/myActions.html",
               controller: "MyActionsController"
           })
            .state("myActionsEdit", {
                url: "/myActions/edit/?actionId",
                templateUrl:"templates/myActions-edit.html",
                controller: "MyActionsEditController"
            })
           .state("newESAE", {
               url: "/neweSAE",
               templateUrl:"templates/newESAE.html",
               controller: "NewESAEController"
           })
           .state("myDraft", {
               url: "/myDraft",
               templateUrl:"templates/myDraft.html",
               controller: "MyDraftController"
           })
           .state("mySubmitCases", {
               url: "/mySubmitCases",
               templateUrl:"templates/mySubmitCases.html",
               controller: "MySubmitController"
           })
           .state("allCases", {
               url: "/allCases",
               templateUrl:"templates/allCases.html",
               controller: "AllCasesController"
           });
    }).run(function($rootScope,$location) {
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            if($location.$$path.includes("home")) {
                $rootScope.hideMenu = true;
            }else {
                $rootScope.hideMenu = false;
            }
        });
    });