
angular.module("mportal")
    .factory("mportalService", function(){
        return {};
    })
    .controller('MyActionsController', ['$http', '$scope','$state','mportalService', function ($http, $scope, $state, mportalService) {
    $scope.showLoadingImg = true;
    $scope.serverUrl = 'http://mse2bstage.ddismart.com:82/';
    $scope.workspace = 'mse2b';
    $scope.credentials = {
        grant_type: 'password',
        scope: '*',
        client_id: 'OZMBWXSSGSRNXGHBNXCKIMZEBIMKYHOU',
        client_secret: '68502807656a5ceb16a7d12079790905',
        username: 'mc_sowjanya_m',
        password: 'makromakro'
    };


    $scope.Cases = "";
    $scope.AccessToken = "";
    $scope.Study = "";
    $scope.Subject = "";
    $scope.CaseID = "";
    $scope.Result = "";
    $scope.app_uid = "";
    $scope.AdverseEvents = "";
    $scope.ConcomitantMedications = "";
    $scope.ConcomitantProcedures = "";
    $scope.MedicalHistory = "";
    $scope.AdverseEventsResult = "";
    $scope.ConcomitantMedicationsResult = "";
    $scope.ConcomitantProceduresResult = "";
    $scope.MedicalH1Result = "";
    $scope.Cdetails = "";
    $scope.cdetails2 = "";
    $scope.mhdetails1 = "";
    $scope.loader = "";
    $scope.EditAdverseEvents = "";
    $scope.EditMedications = "";
    $scope.Editprocdetails = "";
    $scope.EditMedh1details = "";
    $scope.EditStudyId = "";
    $scope.EditStudylabel = "";
    $scope.EditSubject = "";
    $scope.Editapp_uid = "";




    // columns for MY ACTIONS by shankar suggested by valli
    $scope.columnsMA = [
        { field: 'app_number', displayName: '#', cellClass: 'border' },
        { field: 'study_label', displayName: 'Study Id', cellClass: 'border' },
        { field: 'country', displayName: 'Country', cellClass: 'border' },
        { field: 'app_tas_title', displayName: 'State', cellClass: 'border' },
        { field: 'app_del_previous_user', displayName: 'Sent by', cellClass: 'border' },
        // { field: 'subject', displayName: 'Subject', cellClass: 'border' },
        //  { field: 'app_update_date', displayName: 'Last Modified', cellClass: 'border' },
        //            { field: 'Action', width: '60px',
        //                displayName: 'Action',cellClass: 'border',
        //                cellTemplate: '<a href="#" name="maEdit" ng-click="editma(row.entity)" style="padding:2px;"><i class="glyphicon glyphicon-edit"></i></a>&nbsp;' +
        //                 '<a href="#" name="maRemove" ng-click="" style="padding:2px;"><i class="glyphicon glyphicon-remove"></i></a>'
        //            }
        {field: 'Action', width: '150px',
            displayName: 'Action', cellClass: 'border',
            cellTemplate: '<div class="ngSelectionCell">' +
            '<input type="button" ng-click="editma(row.entity)" name="btnedit"  value="Edit" style="width:40px;height:17px;font-size:9px;text-align:center;" class="buttonCustG"/>&nbsp;' +
            '<input type="button" ng-click="" style="width:50px;height:17px;font-size:9px;text-align:center;" value="Delete" class="buttonCustG"/></div>'
        }
    ];


        $scope.setPagingData = function (data, page, pageSize) {
            var _pagedData = data.slice((page - 1) * pageSize, page * pageSize);
            $scope.myData = _pagedData;
            $scope.totalServerItems = data.length;
            if (!$scope.$$phase) {
                $scope.$apply();
            }
        };

        $scope.getPagedDataAsync = function (pageSize, page, searchText) {
            var requestYmc = $http({
                method: 'POST',
                url: $scope.serverUrl + $scope.workspace + '/oauth2/token',
                data: $scope.credentials
            });
            requestYmc.success(function (html) {
                $("#progress").modal();
                $scope.AccessToken = html.access_token;
                var requestZmc = $http({
                    method: 'GET',
                    url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/draft/paged?start=1&limit=1000',
                    headers: { 'Authorization': 'Bearer ' + html.access_token }
                });
                requestZmc.success(function (data) {
                    $('.mnggridStyle').trigger('resize');
                    $scope.Cases = data.data;
                    $scope.loader = 1;
                    $("#progress").modal('hide');
                    $scope.setPagingData($scope.Cases, page, pageSize);
                });
            });
        };

        //$scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

        $scope.$watch('pagingOptions', function (newVal, oldVal) {
            if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);

        $scope.$watch('filterOptions', function (newVal, oldVal) {
            if (newVal !== oldVal) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
            }
        }, true);
        // pagination code ends


        $('.mnggridStyle').trigger('resize');
        $("#progress").modal();
        if ($scope.loader != 1)
            $("#progress").modal();
        $("#progress").modal('hide');
        $scope.myDraftDiv = true;
        $scope.newCaseDiv = false;
        $scope.myActionsDiv = false;
        $scope.MyDraftEditMenu = false;
        $scope.topheadermenu = true;
        $scope.toggleMenuDiv = true;


    //on clicking My Actions
    $scope.myActions = function () {
        console.log("service")
        //$('#togglemenu').removeClass('collapse in');
        //$('#togglemenu').addClass('collapse');
        var requestYmcMA = $http({
            method: 'POST',
            url: $scope.serverUrl + $scope.workspace + '/oauth2/token',
            data: $scope.credentials
        });
        requestYmcMA.success(function (html) {
           // $("#progress").modal();
            $scope.AccessToken = html.access_token;
            var requestZmcMA = $http({
                method: 'GET',
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases',
                headers: { 'Authorization': 'Bearer ' + html.access_token }
            });
            requestZmcMA.success(function (data) {
                //$('.mnggridStyle').trigger('resize');
                $scope.CasesMA = data;
                //$("#progress").modal('hide');
            });
        });

        $scope.newCaseDiv = false;
        $scope.myDraftDiv = false;
        $scope.myActionsDiv = true;
        $scope.MyDraftEditMenu = false;
        $scope.topheadermenu = true;
        $scope.toggleMenuDiv = true;
    };
        //You need to comment out $scope.myActions method
        $scope.myActions();
     //MY Actions grid
    $scope.gridOptionsMA = {
        data: 'CasesMA',
        enableSorting: true,
        columnDefs: $scope.columnsMA,
        headerRowHeight: 25,
        rowHeight: 25,
        showFooter: false,
        enableColumnResize: true,
        enableRowSelection: false
    };

    //edit in my actions
    $scope.editma = function (data) {
        mportalService.myactionsData = data;
        $state.go("myActionsEdit");
    };
        //Deleted code. if you comment out $scope.myActions method u need to delete
        $scope.CasesMA=[
            {
                app_number:511,study_label:11,country:"India",app_tas_title:"Return to state",app_del_previous_user:"valli"
            },
            {
                app_number:512,study_label:12,country:"India",app_tas_title:"Return to state",app_del_previous_user:"valli"
            },
            {
                app_number:513,study_label:13,country:"India",app_tas_title:"Return to state",app_del_previous_user:"valli"
            }
        ]
} ]);
