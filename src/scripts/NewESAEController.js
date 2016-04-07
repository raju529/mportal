
angular.module("mportal")
.controller("NewESAEController", function($scope, $http){
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
        $scope.newCasefn = function () {
            var requestY = $http({
                method: 'POST',
                url: $scope.serverUrl + $scope.workspace + '/oauth2/token',
                data: $scope.credentials
            });
            requestY.success(function (html) {
                $scope.AccessToken = html.access_token;
                var _object = new Object();
                _object.pro_uid = '124237060567a4ef6b52b04062602163';
                _object.tas_uid = '775238037567a564672afd6067824126';
                var requestC = $http({
                    method: 'POST',
                    url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases',
                    headers: { 'Authorization': 'Bearer ' + html.access_token },
                    data: _object
                });
                requestC.success(function (data) {
                    $scope.app_uid = data.app_uid;
                    var requestZ = $http({
                        method: 'GET',
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases',
                        headers: { 'Authorization': 'Bearer ' + html.access_token }
                    });
                    requestZ.success(function (data) {
                        var _caseId = $scope.app_uid;
                        var _uObj = new Object();
                        _uObj.USR_USERNAME = "admin";

                        var requestY = $http({
                            method: "PUT",
                            url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
                            headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                            data: _uObj
                        });
                        requestY.success(function (html) {
                            var _triggerId = '767639160567a5435293fe9092143998';
                            var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/execute-trigger/' + _triggerId;

                            var requestX = $http({
                                method: "PUT",
                                url: _purl,
                                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                            });
                            requestX.success(function (html) {
                                var requestZ = $http({
                                    method: "GET",
                                    url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variables',
                                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                                    data: ""
                                });
                                requestZ.success(function (html) {
                                    $scope.Study = JSON.parse(html.Study);
                                    $scope.Result = html;

                                });
                            });
                        });
                    });
                });
            });
        };
        $scope.newCasefn();

        // columns for Adverse event details
        $scope.columns1 = [
            { field: 'index', displayName: 'id', visible: false },
            { field: 'ADVERSEEVENT', displayName: 'Adverse Event' },
            { field: 'SERIOUS', displayName: 'Serious' },
            { field: 'ADVERSESTARTDATE', displayName: 'Start Date' },
            { field: 'ADVERSEENDDATE', displayName: 'End Date' },
            { field: 'TOXICITYGRADE', displayName: 'Toxicity Grade' },
            { field: 'CAUSALITYFACTORS', displayName: 'Causality Factors' },
            { field: 'OUTCOME', displayName: 'Out Come'}];
        // columns for CONCOMITANT MEDICATIONS DETAILS
        $scope.columns2 = [
            { field: 'index1', displayName: 'id', visible: false },
            { field: 'NAMEOFMEDICATION', displayName: 'Name Of Medication' },
            { field: 'MEDICATIONSSTARTDATE', displayName: 'Start Date' },
            { field: 'MEDICATIONSONGOING', displayName: 'Ongoing?' },
            { field: 'MEDICATIONSREASONFORMEDICATION', displayName: 'Reason for Medication (indication)', width: '280px' },
            { field: 'CMREASONFORMEDICATION', displayName: 'Reason for Medication'}];
        // columns for CONCOMITANT PROCEDURES DETAILS
        $scope.columns3 = [
            { field: 'index2', displayName: 'id', visible: false },
            { field: 'CPNAMEOFPROCEDURE', displayName: 'Name Of Procedure' },
            { field: 'PROCEDURESSTARTDATE', displayName: 'Start Date' },
            { field: 'PROCEDURESONGOING', displayName: 'Ongoing?' },
            { field: 'CPREASONFORMEDICATION', displayName: 'Reason for Medication (indication)', width: '280px' },
            { field: 'CPMREASONFORMEDICATION', displayName: 'Reason for Medication'}];
        //columns for MEDICAL HISTORY DETAILS
        $scope.columns4 = [
            { field: 'index3', displayName: 'id', visible: false },
            { field: 'MEDICALH1CONDITION', displayName: 'Condition' },
            { field: 'MEDICALH1STARTDATE', displayName: 'Start Date' },
            { field: 'MRELATEDTOSTUDYCONDITION', displayName: 'Related to Study Condition?' },
            { field: 'MEDICALH1ONGOING', displayName: 'Ongoing?'}];
        //Cloumns for Study Treatment
        $scope.columnsStudyTreatment = [
            { field: 'id', displayName: 'id', visible: false },
            { field: 'treatmentname', displayName: 'Treatment Name' },
            { field: 'dose', displayName: 'Dose' },
            { field: 'doseunits', displayName: 'Dose Units' },
            { field: 'frequency', displayName: 'Frequency' },
            { field: 'startdate', displayName: 'Start Date' },
            { field: 'enddate', displayName: 'End Date'}];
        //Cloumns for Study Treatment
        $scope.columnsLabReports = [
            { field: 'id', displayName: 'id', visible: false },
            { field: 'testname', displayName: 'Test Name' },
            { field: 'testdate', displayName: 'Test Date' },
            { field: 'testresult', displayName: 'Test Result' },
            { field: 'units', displayName: 'Units' },
            { field: 'measure', displayName: 'Measure' },
            { field: 'refrange', displayName: 'Reference Range'}];
        // Adverse event details grid
        $scope.selectedRows1 = [];
        $scope.gridOptions1 = {
            data: 'AdverseEventsResult',
            enableSorting: true,
            columnDefs: $scope.columns1,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.selectedRows1,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };

        // CONCOMITANT MEDICATIONS DETAILS grid
        $scope.selectedmedication = [];
        $scope.gridOptions2 = {
            data: 'ConcomitantMedicationsResult',
            enableSorting: true,
            columnDefs: $scope.columns2,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="meddatacheck()" class="ngSelectionCheckbox medchkcss"  name="medchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="medheaderchk" ng-click="medheadercheck()" name="medheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectedItems: $scope.selectedmedication,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };

        // CONCOMITANT PROCEDURES DETAILS grid
        $scope.selectedprocedures = [];
        $scope.gridOptions3 = {
            data: 'ConcomitantProceduresResult',
            enableSorting: true,
            columnDefs: $scope.columns3,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="procdatacheck()" class="ngSelectionCheckbox procchkcss"  name="procchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="procheaderchk" ng-click="procheadercheck()" name="procheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectedItems: $scope.selectedprocedures,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
        // MEDICAL HISTORY DETAILS grid
        $scope.selectedmedhistory = [];
        $scope.gridOptions4 = {
            data: 'MedicalH1Result',
            enableSorting: true,
            columnDefs: $scope.columns4,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="histrydatacheck()" class="ngSelectionCheckbox histchkcss"  name="histchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="histheaderchk" ng-click="histheadercheck()" name="histheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectedItems: $scope.selectedmedhistory,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
        // study treatment grid
        $scope.selectedStudyTreatment = [];
        $scope.gridOptionsStudyTreatment = {
            data: 'DetStudyTreatment',
            enableSorting: true,
            columnDefs: $scope.columnsStudyTreatment,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.selectedStudyTreatment,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
        // study treatment grid
        $scope.selectedRowsLabReports = [];
        $scope.gridOptionsLabReports = {
            data: 'DetOptionsLabReports',
            enableSorting: true,
            columnDefs: $scope.columnsLabReports,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.selectedRowsLabReports,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
        // for getting subjects based on studyid
        $scope.ChangedStudy = function () {
            var _caseId = $scope.app_uid;
            var _StudyID = $scope.StudyID.STUDY_ID;
            var _sObj = new Object();
            _sObj.Study = _StudyID;

            var srequest = $http({
                method: "PUT",
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                data: _sObj
            });
            srequest.success(function (html) {
                var _triggerId = '8288879395683c8389c52c1085156694';
                var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/execute-trigger/' + _triggerId;

                var requestX = $http({
                    method: "PUT",
                    url: _purl,
                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                });
                requestX.success(function (html) {
                    var requestZ = $http({
                        method: "GET",
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variables',
                        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                        data: ""
                    });
                    requestZ.success(function (html) {
                        $scope.Subject = JSON.parse(html.Subject);
                        console.log($scope.Subject[0].SUBJECTIDENTIFIER);
                        console.log($scope.Subject[0]);
                    });
                });
            });

        };
        // getting adverse event details based on study and subject
        $scope.ChangedSubject = function () {
            var _StudyID = $scope.StudyID.STUDY_ID;
            var _SubjectID = $scope.SubjectID.SUBJECTIDENTIFIER;
            var _caseId = $scope.app_uid;

            var _ssObj = new Object();
            _ssObj.Study = _StudyID;
            _ssObj.Subject = _SubjectID;
            var requestY = $http({
                method: "PUT",
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                data: _ssObj
            });
            requestY.success(function (html) {
                var _triggerId = '24447631856826b96a112d7062402809';
                var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/execute-trigger/' + _triggerId;
                var requestX = $http({
                    method: "PUT",
                    url: _purl,
                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                });
                requestX.success(function (html) {

                    var requestZ = $http({
                        method: "GET",
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variables',
                        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                        data: ""
                    });
                    requestZ.success(function (html) {
                        console.log(html);

                        $scope.AdverseEvents = html;
                        $scope.DetStudyTreatment = "";
                        $scope.DetOptionsLabReports ="";
                        if ($scope.AdverseEvents.Adverseeventdetails != null)
                            $scope.AdverseEventsResult = JSON.parse($scope.AdverseEvents.Adverseeventdetails);
                        else
                            $scope.AdverseEventsResult = "";

                        if ($scope.AdverseEvents.Medicationsdetails != null)
                            $scope.ConcomitantMedicationsResult = JSON.parse($scope.AdverseEvents.Medicationsdetails);
                        else
                            $scope.ConcomitantMedicationsResult = "";

                        if ($scope.AdverseEvents.ConcomitantProcedures != null)
                            $scope.ConcomitantProceduresResult = JSON.parse($scope.AdverseEvents.ConcomitantProcedures);
                        else
                            $scope.ConcomitantProceduresResult = "";

                        if ($scope.AdverseEvents.medicalh1details != null)
                            var _parsed = JSON.parse($scope.AdverseEvents.medicalh1details);
                        else
                            var _parsed = "";
                        var _arr = [];

                        for (var x in _parsed) {
                            _arr.push(_parsed[x]);
                        }
                        $scope.MedicalH1Result = _arr;

                        $scope.AdverseEventsResult = $scope.AdverseEventsResult;
                        $scope.ConcomitantMedicationsResult = $scope.ConcomitantMedicationsResult;

                        angular.forEach($scope.AdverseEventsResult, function (item, index) {
                            item.index = index + 1;
                        });

                        angular.forEach($scope.ConcomitantMedicationsResult, function (item, index1) {
                            item.index1 = index1 + 1;
                        });

                        angular.forEach($scope.ConcomitantProceduresResult, function (item, index2) {
                            item.index2 = index2 + 1;
                        });

                        angular.forEach($scope.MedicalH1Result, function (item, index3) {
                            item.index3 = index3 + 1;
                        });

                    });
                });
            });
        };
    });