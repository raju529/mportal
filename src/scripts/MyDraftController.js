
angular.module("mportal")
.controller('MyDraftController', ['$http', '$scope','$state','mportalService', function ($http, $scope, $state, mportalService) {
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
        $('#togglemenu').removeClass('collapse in');
        $('#togglemenu').addClass('collapse');
        var requestYmcMA = $http({
            method: 'POST',
            url: $scope.serverUrl + $scope.workspace + '/oauth2/token',
            data: $scope.credentials
        });
        requestYmcMA.success(function (html) {
            $("#progress").modal();
            $scope.AccessToken = html.access_token;
            var requestZmcMA = $http({
                method: 'GET',
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases',
                headers: { 'Authorization': 'Bearer ' + html.access_token }
            });
            requestZmcMA.success(function (data) {
                $('.mnggridStyle').trigger('resize');
                $scope.CasesMA = data;
                $("#progress").modal('hide');
            });
        });

        $scope.newCaseDiv = false;
        $scope.myDraftDiv = false;
        $scope.myActionsDiv = true;
        $scope.MyDraftEditMenu = false;
        $scope.topheadermenu = true;
        $scope.toggleMenuDiv = true;
    };
    //$scope.myActions();
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
        //var st = "myActionsEdit/" + data.app_number;
        mportalService.myDraftData = data;
        $state.go("myDraftEdit");
        //$scope.EditInMyActions = 2;
        //$('#description').value = "";
        //$('#editdescrition').value = "";
        //$scope.AdverseEventsResult = "";
        //$scope.ConcomitantMedicationsResult = "";
        //$scope.ConcomitantProceduresResult = "";
        //$scope.MedicalH1Result = "";
        //$scope.EditAdverseEvents = "";
        //$scope.EditMedications = "";
        //$scope.EditMedh1details = "";
        //$scope.Editprocdetails = "";
        //$("input.ngSelectionHeader:checkbox").prop('checked', false);
        //$("input.ngSelectionHeader:checkbox").prop('disabled', false);
        //$("input[name='editmedicationcheck']").prop("disabled", false);
        //$("input[name='editmedicationcheck']").prop('checked', false);
        //$("input[name='editprocedurecheck']").prop("disabled", false);
        //$("input[name='editprocedurecheck']").prop('checked', false);
        //$("input[name='edithistorycheck']").prop("disabled", false);
        //$("input[name='edithistorycheck']").prop('checked', false);
        //$scope.myDraftDiv = false;
        //$scope.myActionsDiv = false;
        //$scope.MyDraftEditMenu = true;
        //$('.mnggridStyle').trigger('resize');
        //var _appnum = data["app_number"];
        //var _study_label = data["study_label"];
        //var _subject = data["subject"];
        //var _caseId = data["app_uid"]
        //$("#CaseIdNo").text(_appnum);
        //var _reqObj = new Object();
        //_reqObj.APPLICATION = _caseId;
        //
        //
        //var editreq1 = $http({
        //    method: "PUT",
        //    url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
        //    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
        //    data: _reqObj
        //});
        //editreq1.success(function (html) {
        //    $("#progress").modal();
        //    var _triggerId = '597503662569cb4d7658e78033551541';
        //    var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/execute-trigger/' + _triggerId;
        //    var editreq2 = $http({
        //        method: "PUT",
        //        url: _purl,
        //        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
        //    });
        //    editreq2.success(function (html) {
        //        var editreq3 = $http({
        //            method: "GET",
        //            url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variables',
        //            headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
        //            data: ""
        //        });
        //        editreq3.success(function (html, status) {
        //            $scope.AdverseEvents = html;
        //            var _adverseevents = "";
        //            var _medications = "";
        //            var _procedures = "";
        //            var _h1details = "";
        //
        //            if ($scope.AdverseEvents.Adverseeventdetails != null) {
        //                if (typeof $scope.AdverseEvents.Adverseeventdetails == 'string')
        //                    $scope.EditAdverseEvents = JSON.parse($scope.AdverseEvents.Adverseeventdetails);
        //                else {
        //                    _adverseevents = $scope.AdverseEvents.Adverseeventdetails;
        //                    var _arr = [];
        //                    for (var x in _adverseevents) {
        //                        _arr.push(_adverseevents[x]);
        //                    }
        //                    $scope.EditAdverseEvents = _arr;
        //                }
        //            }
        //            else
        //                $scope.EditAdverseEvents = "";
        //
        //
        //            if ($scope.AdverseEvents.Medicationsdetails != null) {
        //                if (typeof $scope.AdverseEvents.Medicationsdetails == 'string')
        //                    $scope.EditMedications = JSON.parse($scope.AdverseEvents.Medicationsdetails);
        //                else {
        //                    _medications = $scope.AdverseEvents.Medicationsdetails;
        //                    var _arr1 = [];
        //
        //                    for (var x in _medications) {
        //                        _arr1.push(_medications[x]);
        //                    }
        //                    $scope.EditMedications = _arr1;
        //                }
        //            }
        //            else
        //                $scope.EditMedications = "";
        //
        //            if ($scope.AdverseEvents.Proceduralsdetails != null) {
        //                if (typeof $scope.AdverseEvents.Proceduralsdetails == 'string')
        //                    $scope.Editprocdetails = JSON.parse($scope.AdverseEvents.Proceduralsdetails);
        //                else {
        //                    _procedures = $scope.AdverseEvents.Proceduralsdetails;
        //                    var _arr2 = [];
        //
        //                    for (var x in _procedures) {
        //                        _arr2.push(_procedures[x]);
        //                    }
        //                    $scope.Editprocdetails = _arr2;
        //                }
        //            }
        //            else
        //                $scope.Editprocdetails = "";
        //
        //            if ($scope.AdverseEvents.medicalh1details != null) {
        //                if (typeof $scope.AdverseEvents.medicalh1details == 'string') {
        //                    if (jQuery.isArray(JSON.parse($scope.AdverseEvents.medicalh1details)))
        //                        $scope.EditMedh1details = JSON.parse($scope.AdverseEvents.medicalh1details);
        //                    else {
        //                        _h1details = JSON.parse($scope.AdverseEvents.medicalh1details);
        //                        var _arr3 = [];
        //
        //                        for (var x in _h1details) {
        //                            _arr3.push(_h1details[x]);
        //                        }
        //                        $scope.EditMedh1details = _arr3;
        //                    }
        //                }
        //
        //                else {
        //                    _h1details = $scope.AdverseEvents.medicalh1details;
        //                    var _arr3 = [];
        //
        //                    for (var x in _h1details) {
        //                        _arr3.push(_h1details[x]);
        //                    }
        //                    $scope.EditMedh1details = _arr3;
        //                }
        //            }
        //            else
        //                $scope.EditMedh1details = "";
        //
        //
        //            angular.forEach($scope.EditAdverseEvents, function (item, index) {
        //                item.index = index + 1;
        //            });
        //
        //            angular.forEach($scope.EditMedications, function (item, index1) {
        //                item.index1 = index1 + 1;
        //            });
        //
        //            angular.forEach($scope.Editprocdetails, function (item, index2) {
        //                item.index2 = index2 + 1;
        //            });
        //
        //            angular.forEach($scope.EditMedh1details, function (item, index3) {
        //                item.index3 = index3 + 1;
        //            });
        //
        //            $scope.EditStudyId = $scope.AdverseEvents.Study;
        //            $scope.EditStudylabel = $scope.AdverseEvents.Study_label;
        //            $scope.EditSubject = $scope.AdverseEvents.Subject;
        //            $scope.EditCaseDescription = $scope.AdverseEvents.CaseDescription;
        //            $scope.EditCdetails = $scope.AdverseEvents.Cdetails;
        //            $scope.Editcdetails2 = $scope.AdverseEvents.cdetails2;
        //            $scope.Editmhdetails1 = $scope.AdverseEvents.mhdetails1;
        //            $scope.Editapp_uid = $scope.AdverseEvents.APPLICATION;
        //
        //            $scope.$apply();
        //
        //            // for selecting the checkboxes those adverseselect is on and if all are checked then selecting the header checkbox also
        //            var _advflag = 0;
        //            angular.forEach($scope.EditAdverseEvents, function (data, index) {
        //                if (data.ADVERSESELECT == 'On') {
        //                    $scope.editgridOptions1.selectItem(index, true);
        //                    _advflag = _advflag + 1;
        //                }
        //            });
        //
        //            if ($scope.EditAdverseEvents.length == _advflag && $scope.EditAdverseEvents.length > 0)
        //                $('#editadversechk').prop('checked', true);
        //            else
        //                $('#editadversechk').prop('checked', false);
        //
        //            // selecting checkboxes those medicalselect is on,if all are checked then selecting the header checkbox also & disabling the top medication check box atleast 1 row is selected
        //            var _medflg = 0;
        //            var _medheaderchk = 0;
        //            angular.forEach($scope.EditMedications, function (data, index) {
        //                if (data.MEDICATIONSSELECT == 'On') {
        //                    $scope.editgridOptions2.selectItem(index, true);
        //                    _medflg = 1;
        //                    _medheaderchk = _medheaderchk + 1;
        //                }
        //
        //            });
        //            if (_medflg == 1)
        //                $("input[name='editmedicationcheck']").prop("disabled", true);
        //
        //            if ($scope.EditMedications.length == _medheaderchk && $scope.EditMedications.length > 0)
        //                $('#editmedheaderchk').prop('checked', true);
        //            else
        //                $('#editmedheaderchk').prop('checked', false);
        //
        //            // same as medicalselect to proceduralselect
        //            var _procflg = 0;
        //            var _procheaderchk = 0;
        //            angular.forEach($scope.Editprocdetails, function (data, index) {
        //                if (data.PROCEDURESSELECT == 'On') {
        //                    $scope.editgridOptions2.selectItem(index, true);
        //                    _procflg = 1;
        //                    _procheaderchk = _procheaderchk + 1;
        //                }
        //
        //            });
        //            if (_procflg == 1)
        //                $("input[name='editprocedurecheck']").prop("disabled", true);
        //            if ($scope.Editprocdetails.length == _procheaderchk && $scope.Editprocdetails.length > 0)
        //                $('#editprocheaderchk').prop('checked', true);
        //            else
        //                $('#editprocheaderchk').prop('checked', false);
        //
        //            // same as medicalselect to h1details
        //            var _h1flg = 0;
        //            var _h1headerchk = 0;
        //            angular.forEach($scope.EditMedh1details, function (data, index) {
        //                if (data.MEDICALH1SELECT == 'On') {
        //                    $scope.editgridOptions4.selectItem(index, true);
        //                    _h1flg = 1;
        //                    _h1headerchk = _h1headerchk + 1;
        //                }
        //
        //            });
        //
        //            if (_h1flg == 1)
        //                $("input[name='edithistorycheck']").prop("disabled", true);
        //            if ($scope.EditMedh1details.length == _h1headerchk && $scope.EditMedh1details.length > 0)
        //                $('#edithistheaderchk').prop('checked', true);
        //            else
        //                $('#edithistheaderchk').prop('checked', false);
        //
        //            // based on top checkbox disabling and enabling the checkboxes in grid
        //            if ($scope.EditCdetails == "On") {
        //                $('#editmedicationcheck').prop('checked', true);
        //                $("input[name='editmedheaderchk']").prop("disabled", true);
        //                $("input.editmedchkcss").prop("disabled", true);
        //            }
        //            else {
        //                $('#editmedicationcheck').prop('checked', false);
        //                $("input[name='editmedheaderchk']").prop("disabled", false);
        //                $("input.editmedchkcss").prop("disabled", false);
        //            }
        //
        //            if ($scope.Editcdetails2 == "On") {
        //                $('#editprocedurecheck').prop('checked', true);
        //                $("input[name='editprocheaderchk']").prop("disabled", true);
        //                $("input.editprocchkcss").prop("disabled", true);
        //            }
        //            else {
        //                $('#editprocedurecheck').prop('checked', false);
        //                $("input[name='editprocheaderchk']").prop("disabled", false);
        //                $("input.editprocchkcss").prop("disabled", false);
        //            }
        //
        //            if ($scope.Editmhdetails1 == "On") {
        //                $('#edithistorycheck').prop('checked', true);
        //                $("input[name='edithistheaderchk']").prop("disabled", true);
        //                $("input.edithistchkcss").prop("disabled", true);
        //            }
        //            else {
        //                $('#edithistorycheck').prop('checked', false);
        //                $("input[name='edithistheaderchk']").prop("disabled", false);
        //                $("input.edithistchkcss").prop("disabled", false);
        //            }
        //            $("#progress").modal('hide');
        //        });
        //    });
        //});
    };
    //Deleted code
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