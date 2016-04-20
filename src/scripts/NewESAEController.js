
angular.module("mportal")
.controller("NewESAEController", function($scope, $http, fileUploadService){
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
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-hide="isLabReportsChecked"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-hide="isLabReportsChecked" ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.selectedRowsLabReports,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
       $scope.DetOptionsLabReports = [{id:1, testname:"name", testdate:"", testresult: "", units: "", measure: "", refrange: ""}, {id:1, testname:"name", testdate:"", testresult: "", units: "", measure: "", refrange: ""}]
        // validation for disabling the Medical History grid checkboxes based on checking the associated Medical History checkbox
        $scope.histrycheck = function () {
            //if ($('#historycheck').prop('checked')) {
            //    $("input[name='histheaderchk']").prop("disabled", true);
            //    $("input.histchkcss").prop("disabled", true);
            //}
            //else {
            //    $("input[name='histheaderchk']").prop("disabled", false);
            //    $("input.histchkcss").prop("disabled", false);
            //}
        }
        //Reporter information
        $scope.reporterInformation = [{
            id: 1,
            name: "name1",
            data: "data1"
        }, {
            id: 2,
            name: "name2",
            data: "data2"
        }];
        $scope.reporterInformationSelected = [];
        $scope.reporterGridOptions = {
            data: "reporterInformation",
            enableSorting: true,

            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" id="editadversechk"  ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.reporterInformationSelected,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };
        $scope.reCreateIds = function(arr){
            _.forEach(arr, function(item, key){
                delete item.id;
                item.id = key + 1;
                return item;
            })
        }
        $scope.removeSelectedRows = function() {
            if ($scope.reporterInformationSelected.length) {
                _.forEach($scope.reporterInformationSelected, function(item) {
                    _.remove($scope.reporterInformation, item);
                });
            }
            $scope.reCreateIds($scope.reporterInformation);
        };
        $scope.openModalwindow = function() {
            var confirm = function(data) {
                console.log(data);

                $scope.reporterInformation.push(data);
                $scope.reCreateIds($scope.reporterInformation);
            };
            var cancel = function() {
                console.log(cancel);
            };
            fileUploadService.show(confirm, cancel);
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
        $scope.Study = [{
            STUDY_ID:1,
            UNIQUE_IDENTIFIER:"A"
        },
            {
                STUDY_ID:2,
                UNIQUE_IDENTIFIER:"B"
            }];
        $scope.Subject = [{SUBJECTIDENTIFIER: "B"}, {SUBJECTIDENTIFIER:"C"}];
        $scope.saveAsDraft = function () {
            $scope.myData = "";
            if ($('#medicationcheck').prop('checked'))
                $scope.Cdetails = "On";
            else
                $scope.Cdetails = "Off";

            if ($('#procedurecheck').prop('checked'))
                $scope.cdetails2 = "On";
            else
                $scope.cdetails2 = "Off";

            if ($('#historycheck').prop('checked'))
                $scope.mhdetails1 = "On";
            else
                $scope.mhdetails1 = "Off";

            var _AdverseEvents = [];
            var _Medications = [];
            var _procedures = [];
            var _medh1details = [];

            // ADVERSE EVENT DETAILS
            for (i = 0; i < $scope.AdverseEventsResult.length; i++) {
                var _adObj = new Object();
                if ($scope.selectedRows1.length > 0) {
                    for (j = 0; j < $scope.selectedRows1.length; j++) {
                        if (angular.equals($scope.AdverseEventsResult[i].index, $scope.selectedRows1[j].index)) {
                            $scope.AdverseSelect = "On";
                            break;
                        }
                        else
                            $scope.AdverseSelect = "Off";

                    }


                }
                else
                    $scope.AdverseSelect = "Off";

                _adObj.ADVERSESELECT = $scope.AdverseSelect;
                _adObj.ADVERSEEVENT = $scope.AdverseEventsResult[i].ADVERSEEVENT;
                _adObj.SERIOUS = $scope.AdverseEventsResult[i].SERIOUS;
                _adObj.ADVERSESTARTDATE = $scope.AdverseEventsResult[i].ADVERSESTARTDATE;
                _adObj.ADVERSEENDDATE = $scope.AdverseEventsResult[i].ADVERSEENDDATE;
                _adObj.TOXICITYGRADE = $scope.AdverseEventsResult[i].TOXICITYGRADE;
                _adObj.CAUSALITYFACTORS = $scope.AdverseEventsResult[i].CAUSALITYFACTORS;
                _adObj.OUTCOME = $scope.AdverseEventsResult[i].OUTCOME;

                _AdverseEvents.push(_adObj);
            }

            // CONCOMITANT MEDICATIONS DETAILS
            for (i = 0; i < $scope.ConcomitantMedicationsResult.length; i++) {
                var _mdObj = new Object();
                if ($scope.selectedmedication.length > 0) {
                    for (j = 0; j < $scope.selectedmedication.length; j++) {
                        if (angular.equals($scope.ConcomitantMedicationsResult[i].index1, $scope.selectedmedication[j].index1)) {
                            $scope.MedicationsSelect = "On";
                            break;
                        }
                        else
                            $scope.MedicationsSelect = "Off";

                    }


                }
                else
                    $scope.MedicationsSelect = "Off";

                _mdObj.MEDICATIONSSELECT = $scope.MedicationsSelect;
                _mdObj.NAMEOFMEDICATION = $scope.ConcomitantMedicationsResult[i].NAMEOFMEDICATION;
                _mdObj.MEDICATIONSSTARTDATE = $scope.ConcomitantMedicationsResult[i].MEDICATIONSSTARTDATE;
                _mdObj.MEDICATIONSONGOING = $scope.ConcomitantMedicationsResult[i].MEDICATIONSONGOING;
                _mdObj.MEDICATIONSREASONFORMEDICATION = $scope.ConcomitantMedicationsResult[i].MEDICATIONSREASONFORMEDICATION;
                _mdObj.CMREASONFORMEDICATION = $scope.ConcomitantMedicationsResult[i].CMREASONFORMEDICATION;

                _Medications.push(_mdObj);
            }


            // Concamitant Procedure details
            for (i = 0; i < $scope.ConcomitantProceduresResult.length; i++) {
                var _pObj = new Object();
                if ($scope.selectedprocedures.length > 0) {
                    for (j = 0; j < $scope.selectedprocedures.length; j++) {
                        if (angular.equals($scope.ConcomitantProceduresResult[i].index2, $scope.selectedprocedures[j].index2)) {
                            $scope.ProceduresSelect = "On";
                            break;
                        }
                        else
                            $scope.ProceduresSelect = "Off";

                    }


                }
                else
                    $scope.ProceduresSelect = "Off";

                _pObj.PROCEDURESSELECT = $scope.ProceduresSelect;
                _pObj.CPNAMEOFPROCEDURE = $scope.ConcomitantProceduresResult[i].CPNAMEOFPROCEDURE;
                _pObj.PROCEDURESSTARTDATE = $scope.ConcomitantProceduresResult[i].PROCEDURESSTARTDATE;
                _pObj.PROCEDURESONGOING = $scope.ConcomitantProceduresResult[i].PROCEDURESONGOING;
                _pObj.CPREASONFORMEDICATION = $scope.ConcomitantProceduresResult[i].CPREASONFORMEDICATION;
                _pObj.CPMREASONFORMEDICATION = $scope.ConcomitantProceduresResult[i].CPMREASONFORMEDICATION;

                _procedures.push(_pObj);
            }

            // Medical H1 details
            for (i = 0; i < $scope.MedicalH1Result.length; i++) {

                var _h1Obj = new Object();
                if ($scope.selectedmedhistory.length > 0) {
                    for (j = 0; j < $scope.selectedmedhistory.length; j++) {
                        if (angular.equals($scope.MedicalH1Result[i].index3, $scope.selectedmedhistory[j].index3)) {
                            $scope.Medh1Select = "On";
                            break;
                        }
                        else
                            $scope.Medh1Select = "Off";

                    }


                }
                else
                    $scope.Medh1Select = "Off";

                _h1Obj.MEDICALH1SELECT = $scope.Medh1Select;
                _h1Obj.MEDICALH1CONDITION = $scope.MedicalH1Result[i].MEDICALH1CONDITION;
                _h1Obj.MEDICALH1STARTDATE = $scope.MedicalH1Result[i].MEDICALH1STARTDATE;
                _h1Obj.MRELATEDTOSTUDYCONDITION = $scope.MedicalH1Result[i].MRELATEDTOSTUDYCONDITION;
                _h1Obj.MEDICALH1ONGOING = $scope.MedicalH1Result[i].MEDICALH1ONGOING;

                _medh1details.push(_h1Obj);
            }

            var _caseId = $scope.app_uid;
            var _StudyID = $scope.StudyID.STUDY_ID;
            var _SubjectID = $scope.SubjectID.SUBJECTIDENTIFIER;

            var _ssObj = new Object();
            _ssObj.app_uid = _caseId;
            _ssObj.Study = _StudyID;
            _ssObj.Study_label = $("#selectStudy option:selected").text();
            _ssObj.Subject = _SubjectID;
            _ssObj.Adverseeventdetails = JSON.stringify(_AdverseEvents);
            _ssObj.Medicationsdetails = JSON.stringify(_Medications);
            _ssObj.Proceduralsdetails = JSON.stringify(_procedures);
            _ssObj.medicalh1details = JSON.stringify(_medh1details);
            _ssObj.CaseDescription = $("#description").val();
            _ssObj.Cdetails = $scope.Cdetails;
            _ssObj.cdetails2 = $scope.cdetails2;
            _ssObj.mhdetails1 = $scope.mhdetails1;

            var requestY = $http({
                method: "PUT",
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/variable',
                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                data: _ssObj
            });
            requestY.success(function (html) {
                $("#progress").modal();
                var triggerId = '6150207515690fbf63c3197047063583';
                var purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/execute-trigger/' + triggerId;
                var requestX = $http({
                    method: "PUT",
                    url: purl,
                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                });
                requestX.success(function (html) {

                    var requestZ = $http({
                        method: "GET",
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/variables',
                        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                        data: ""
                    });
                    requestZ.success(function (html, status) {
                        if (status == '200') {
                            $('#error_container').bs_info("Saved successfully");

                            // After save getting cases data
                            $scope.filterOptions = {
                                filterText: "",
                                useExternalFilter: true
                            };

                            $scope.totalServerItems = 0;
                            $scope.pagingOptions = {
                                pageSize: 30,
                                currentPage: 1
                            };

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
                                    data: this.credentials
                                });
                                requestYmc.success(function (html) {
                                    $scope.AccessToken = html.access_token;
                                    var requestZmc = $http({
                                        method: 'GET',
                                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/draft/paged?start=1&limit=100',
                                        headers: { 'Authorization': 'Bearer ' + html.access_token }
                                    });
                                    requestZmc.success(function (data) {
                                        $('.mnggridStyle').trigger('resize');
                                        $scope.Cases = data.data;
                                        $scope.setPagingData($scope.Cases, page, pageSize);
                                        $scope.loader = 1;
                                        $("#progress").modal('hide');

                                    });
                                });

                            };
                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

                        }
                        else {
                            $('#error_container').bs_alert("Insertion failed");
                        }
                    });
                });
            });
            $scope.myDraftDiv = true;
            $scope.newCaseDiv = false;
            $scope.myActionsDiv = false;
            $scope.MyDraftEditMenu = false;
            $scope.topheadermenu = true;
            $scope.toggleMenuDiv = true;
            $('.mnggridStyle').trigger('resize');
        };
    })
    .factory("fileUploadService", function($modal) {
        function show(confirmCallback, cancelCallback) {
            // Show window
            var modalInstance = $modal.open({
                templateUrl: "templates/modalwindowTemp.html",
                backdrop: "static",
                windowClass: "modal",
                controller: "ModalWindowCtrl"
            });
            // Register confirm and cancel callbacks
            modalInstance.result.then(
                // if any, execute confirm callback
                function(newcomment) {
                    if (confirmCallback !== undefined) {
                        confirmCallback(newcomment);
                    }
                },
                // if any, execute cancel callback
                function() {
                    if (cancelCallback !== undefined) {
                        cancelCallback();
                    }
                });
        }
        return {
            show: show
        };
    })
    .controller("ModalWindowCtrl", function($scope, $modalInstance) {
        $scope.name = "modal";
        $scope.file = {};
        $scope.getfileName = function(file){
            $scope.file.name = file[0].name;
        };
        function confirm() {

            $modalInstance.close($scope.file);

        }

        function cancel() {
            $modalInstance.dismiss();
        }
        $scope.confirm = confirm;
        $scope.cancel = cancel;
    })
    .directive('validFile', function() {
        return {
            require: 'ngModel',
            link: function(scope, el, attrs, ngModel) {
                //change event is fired when file is selected
                el.bind('change', function() {
                    scope.$apply(function() {
                        ngModel.$setViewValue(el.val());
                        ngModel.$render();
                    })
                })
            }
        }
    });