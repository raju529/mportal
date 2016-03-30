angular.module("mportal")
    .controller("MyActionsEditController", function($scope, mportalService, $state){
        var data = mportalService.myactionsData;
        $scope.app_number = data["app_number"] || 0;
       // $scope.id = $stateParams.actionId;
        $scope.myActionsEdit = function(){
            $scope.EditInMyActions = 2;
            $('#description').value = "";
            $('#editdescrition').value = "";
            $scope.AdverseEventsResult = "";
            $scope.ConcomitantMedicationsResult = "";
            $scope.ConcomitantProceduresResult = "";
            $scope.MedicalH1Result = "";
            $scope.EditAdverseEvents = "";
            $scope.EditMedications = "";
            $scope.EditMedh1details = "";
            $scope.Editprocdetails = "";
            $("input.ngSelectionHeader:checkbox").prop('checked', false);
            $("input.ngSelectionHeader:checkbox").prop('disabled', false);
            $("input[name='editmedicationcheck']").prop("disabled", false);
            $("input[name='editmedicationcheck']").prop('checked', false);
            $("input[name='editprocedurecheck']").prop("disabled", false);
            $("input[name='editprocedurecheck']").prop('checked', false);
            $("input[name='edithistorycheck']").prop("disabled", false);
            $("input[name='edithistorycheck']").prop('checked', false);
            $scope.myDraftDiv = false;
            $scope.myActionsDiv = false;
            $scope.MyDraftEditMenu = true;
            $('.mnggridStyle').trigger('resize');
            var _appnum = data["app_number"];
            var _study_label = data["study_label"];
            var _subject = data["subject"];
            var _caseId = data["app_uid"]
            $("#CaseIdNo").text(_appnum);
            var _reqObj = new Object();
            _reqObj.APPLICATION = _caseId;


            var editreq1 = $http({
                method: "PUT",
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                data: _reqObj
            });
            editreq1.success(function (html) {
                $("#progress").modal();
                var _triggerId = '597503662569cb4d7658e78033551541';
                var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/execute-trigger/' + _triggerId;
                var editreq2 = $http({
                    method: "PUT",
                    url: _purl,
                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                });
                editreq2.success(function (html) {
                    var editreq3 = $http({
                        method: "GET",
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variables',
                        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                        data: ""
                    });
                    editreq3.success(function (html, status) {
                        $scope.AdverseEvents = html;
                        var _adverseevents = "";
                        var _medications = "";
                        var _procedures = "";
                        var _h1details = "";

                        if ($scope.AdverseEvents.Adverseeventdetails != null) {
                            if (typeof $scope.AdverseEvents.Adverseeventdetails == 'string')
                                $scope.EditAdverseEvents = JSON.parse($scope.AdverseEvents.Adverseeventdetails);
                            else {
                                _adverseevents = $scope.AdverseEvents.Adverseeventdetails;
                                var _arr = [];
                                for (var x in _adverseevents) {
                                    _arr.push(_adverseevents[x]);
                                }
                                $scope.EditAdverseEvents = _arr;
                            }
                        }
                        else
                            $scope.EditAdverseEvents = "";


                        if ($scope.AdverseEvents.Medicationsdetails != null) {
                            if (typeof $scope.AdverseEvents.Medicationsdetails == 'string')
                                $scope.EditMedications = JSON.parse($scope.AdverseEvents.Medicationsdetails);
                            else {
                                _medications = $scope.AdverseEvents.Medicationsdetails;
                                var _arr1 = [];

                                for (var x in _medications) {
                                    _arr1.push(_medications[x]);
                                }
                                $scope.EditMedications = _arr1;
                            }
                        }
                        else
                            $scope.EditMedications = "";

                        if ($scope.AdverseEvents.Proceduralsdetails != null) {
                            if (typeof $scope.AdverseEvents.Proceduralsdetails == 'string')
                                $scope.Editprocdetails = JSON.parse($scope.AdverseEvents.Proceduralsdetails);
                            else {
                                _procedures = $scope.AdverseEvents.Proceduralsdetails;
                                var _arr2 = [];

                                for (var x in _procedures) {
                                    _arr2.push(_procedures[x]);
                                }
                                $scope.Editprocdetails = _arr2;
                            }
                        }
                        else
                            $scope.Editprocdetails = "";

                        if ($scope.AdverseEvents.medicalh1details != null) {
                            if (typeof $scope.AdverseEvents.medicalh1details == 'string') {
                                if (jQuery.isArray(JSON.parse($scope.AdverseEvents.medicalh1details)))
                                    $scope.EditMedh1details = JSON.parse($scope.AdverseEvents.medicalh1details);
                                else {
                                    _h1details = JSON.parse($scope.AdverseEvents.medicalh1details);
                                    var _arr3 = [];

                                    for (var x in _h1details) {
                                        _arr3.push(_h1details[x]);
                                    }
                                    $scope.EditMedh1details = _arr3;
                                }
                            }

                            else {
                                _h1details = $scope.AdverseEvents.medicalh1details;
                                var _arr3 = [];

                                for (var x in _h1details) {
                                    _arr3.push(_h1details[x]);
                                }
                                $scope.EditMedh1details = _arr3;
                            }
                        }
                        else
                            $scope.EditMedh1details = "";


                        angular.forEach($scope.EditAdverseEvents, function (item, index) {
                            item.index = index + 1;
                        });

                        angular.forEach($scope.EditMedications, function (item, index1) {
                            item.index1 = index1 + 1;
                        });

                        angular.forEach($scope.Editprocdetails, function (item, index2) {
                            item.index2 = index2 + 1;
                        });

                        angular.forEach($scope.EditMedh1details, function (item, index3) {
                            item.index3 = index3 + 1;
                        });

                        $scope.EditStudyId = $scope.AdverseEvents.Study;
                        $scope.EditStudylabel = $scope.AdverseEvents.Study_label;
                        $scope.EditSubject = $scope.AdverseEvents.Subject;
                        $scope.EditCaseDescription = $scope.AdverseEvents.CaseDescription;
                        $scope.EditCdetails = $scope.AdverseEvents.Cdetails;
                        $scope.Editcdetails2 = $scope.AdverseEvents.cdetails2;
                        $scope.Editmhdetails1 = $scope.AdverseEvents.mhdetails1;
                        $scope.Editapp_uid = $scope.AdverseEvents.APPLICATION;

                        $scope.$apply();

                        // for selecting the checkboxes those adverseselect is on and if all are checked then selecting the header checkbox also
                        var _advflag = 0;
                        angular.forEach($scope.EditAdverseEvents, function (data, index) {
                            if (data.ADVERSESELECT == 'On') {
                                $scope.editgridOptions1.selectItem(index, true);
                                _advflag = _advflag + 1;
                            }
                        });

                        if ($scope.EditAdverseEvents.length == _advflag && $scope.EditAdverseEvents.length > 0)
                            $('#editadversechk').prop('checked', true);
                        else
                            $('#editadversechk').prop('checked', false);

                        // selecting checkboxes those medicalselect is on,if all are checked then selecting the header checkbox also & disabling the top medication check box atleast 1 row is selected
                        var _medflg = 0;
                        var _medheaderchk = 0;
                        angular.forEach($scope.EditMedications, function (data, index) {
                            if (data.MEDICATIONSSELECT == 'On') {
                                $scope.editgridOptions2.selectItem(index, true);
                                _medflg = 1;
                                _medheaderchk = _medheaderchk + 1;
                            }

                        });
                        if (_medflg == 1)
                            $("input[name='editmedicationcheck']").prop("disabled", true);

                        if ($scope.EditMedications.length == _medheaderchk && $scope.EditMedications.length > 0)
                            $('#editmedheaderchk').prop('checked', true);
                        else
                            $('#editmedheaderchk').prop('checked', false);

                        // same as medicalselect to proceduralselect
                        var _procflg = 0;
                        var _procheaderchk = 0;
                        angular.forEach($scope.Editprocdetails, function (data, index) {
                            if (data.PROCEDURESSELECT == 'On') {
                                $scope.editgridOptions2.selectItem(index, true);
                                _procflg = 1;
                                _procheaderchk = _procheaderchk + 1;
                            }

                        });
                        if (_procflg == 1)
                            $("input[name='editprocedurecheck']").prop("disabled", true);
                        if ($scope.Editprocdetails.length == _procheaderchk && $scope.Editprocdetails.length > 0)
                            $('#editprocheaderchk').prop('checked', true);
                        else
                            $('#editprocheaderchk').prop('checked', false);

                        // same as medicalselect to h1details
                        var _h1flg = 0;
                        var _h1headerchk = 0;
                        angular.forEach($scope.EditMedh1details, function (data, index) {
                            if (data.MEDICALH1SELECT == 'On') {
                                $scope.editgridOptions4.selectItem(index, true);
                                _h1flg = 1;
                                _h1headerchk = _h1headerchk + 1;
                            }

                        });

                        if (_h1flg == 1)
                            $("input[name='edithistorycheck']").prop("disabled", true);
                        if ($scope.EditMedh1details.length == _h1headerchk && $scope.EditMedh1details.length > 0)
                            $('#edithistheaderchk').prop('checked', true);
                        else
                            $('#edithistheaderchk').prop('checked', false);

                        // based on top checkbox disabling and enabling the checkboxes in grid
                        if ($scope.EditCdetails == "On") {
                            $('#editmedicationcheck').prop('checked', true);
                            $("input[name='editmedheaderchk']").prop("disabled", true);
                            $("input.editmedchkcss").prop("disabled", true);
                        }
                        else {
                            $('#editmedicationcheck').prop('checked', false);
                            $("input[name='editmedheaderchk']").prop("disabled", false);
                            $("input.editmedchkcss").prop("disabled", false);
                        }

                        if ($scope.Editcdetails2 == "On") {
                            $('#editprocedurecheck').prop('checked', true);
                            $("input[name='editprocheaderchk']").prop("disabled", true);
                            $("input.editprocchkcss").prop("disabled", true);
                        }
                        else {
                            $('#editprocedurecheck').prop('checked', false);
                            $("input[name='editprocheaderchk']").prop("disabled", false);
                            $("input.editprocchkcss").prop("disabled", false);
                        }

                        if ($scope.Editmhdetails1 == "On") {
                            $('#edithistorycheck').prop('checked', true);
                            $("input[name='edithistheaderchk']").prop("disabled", true);
                            $("input.edithistchkcss").prop("disabled", true);
                        }
                        else {
                            $('#edithistorycheck').prop('checked', false);
                            $("input[name='edithistheaderchk']").prop("disabled", false);
                            $("input.edithistchkcss").prop("disabled", false);
                        }
                        $("#progress").modal('hide');
                    });
                });
            });
        };

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
        $scope.editAdverseSelected = [];
        $scope.editgridOptions1 = {
            data: 'EditAdverseEvents',
            enableSorting: true,
            columnDefs: $scope.columns1,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1"  class="ngSelectionCheckbox"  name="advchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" ng-model="allSelected" id="editadversechk"  ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectWithCheckboxOnly: true,
            selectedItems: $scope.editAdverseSelected,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };


        // CONCOMITANT MEDICATIONS DETAILS edit grid
        // columns for CONCOMITANT MEDICATIONS DETAILS
        $scope.columns2 = [
            { field: 'index1', displayName: 'id', visible: false },
            { field: 'NAMEOFMEDICATION', displayName: 'Name Of Medication' },
            { field: 'MEDICATIONSSTARTDATE', displayName: 'Start Date' },
            { field: 'MEDICATIONSONGOING', displayName: 'Ongoing?' },
            { field: 'MEDICATIONSREASONFORMEDICATION', displayName: 'Reason for Medication (indication)', width: '280px' },
            { field: 'CMREASONFORMEDICATION', displayName: 'Reason for Medication'}];
        $scope.editselectedmedication = [];
        $scope.editgridOptions2 = {
            data: 'EditMedications',
            enableSorting: true,
            columnDefs: $scope.columns2,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="editmeddatacheck()" class="ngSelectionCheckbox editmedchkcss"  name="editmedchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="editmedheaderchk" ng-click="editmedheadercheck()" name="editmedheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectedItems: $scope.editselectedmedication,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };

        // CONCOMITANT PROCEDURES DETAILS grid
        // columns for CONCOMITANT PROCEDURES DETAILS
        $scope.columns3 = [
            { field: 'index2', displayName: 'id', visible: false },
            { field: 'CPNAMEOFPROCEDURE', displayName: 'Name Of Procedure' },
            { field: 'PROCEDURESSTARTDATE', displayName: 'Start Date' },
            { field: 'PROCEDURESONGOING', displayName: 'Ongoing?' },
            { field: 'CPREASONFORMEDICATION', displayName: 'Reason for Medication (indication)', width: '280px' },
            { field: 'CPMREASONFORMEDICATION', displayName: 'Reason for Medication'}];
        $scope.editselectedprocedures = [];
        $scope.editgridOptions3 = {
            data: 'Editprocdetails',
            enableSorting: true,
            columnDefs: $scope.columns3,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="editprocdatacheck()" class="ngSelectionCheckbox editprocchkcss"  name="editprocchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="editprocheaderchk" ng-click="editprocheadercheck()" name="editprocheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>',
            showSelectionCheckbox: true,
            selectedItems: $scope.editselectedprocedures,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };

        // MEDICAL HISTORY DETAILS grid
        //columns for MEDICAL HISTORY DETAILS
        $scope.columns4 = [
            { field: 'index3', displayName: 'id', visible: false },
            { field: 'MEDICALH1CONDITION', displayName: 'Condition' },
            { field: 'MEDICALH1STARTDATE', displayName: 'Start Date' },
            { field: 'MRELATEDTOSTUDYCONDITION', displayName: 'Related to Study Condition?' },
            { field: 'MEDICALH1ONGOING', displayName: 'Ongoing?'}];
        $scope.editselectedmedhistory = [];
        $scope.editgridOptions4 = {
            data: 'EditMedh1details',
            enableSorting: true,
            columnDefs: $scope.columns4,
            checkboxCellTemplate: '<div class="ngSelectionCell"><input tabindex="-1" ng-click="histrydatacheck()" class="ngSelectionCheckbox edithistchkcss"  name="edithistchkbox" type="checkbox" ng-checked="row.selected" /></div>',
            checkboxHeaderTemplate: '<input class="ngSelectionHeader" type="checkbox" id="edithistheaderchk" ng-click="edithistheadercheck()" name="edithistheaderchk"  ng-model="allSelected" ng-change="toggleSelectAll(allSelected)"/>' + '&nbsp; Select',
            showSelectionCheckbox: true,
            selectedItems: $scope.editselectedmedhistory,
            selectWithCheckboxOnly: true,
            enableColumnResize: true,
            headerRowHeight: 25,
            rowHeight: 25
        };

        $scope.editAreaCancel = function(){
            $state.go("myActions");
        };
        $scope.EditAdverseEvents=[
            {
                index:1, ADVERSEEVENT:"Actoplus MET",SERIOUS:"No",ADVERSESTARTDATE:"03/17/1998",ADVERSEENDDATE:"11/10/2008",TOXICITYGRADE:"",CAUSALITYFACTORS:"PossibleRelated",OUTCOME:"recovered"

            },
            {
                index:2, ADVERSEEVENT:"Actoplus MET",SERIOUS:"No",ADVERSESTARTDATE:"03/17/1998",ADVERSEENDDATE:"11/10/2008",TOXICITYGRADE:"",CAUSALITYFACTORS:"PossibleRelated",OUTCOME:"recovered"

            },
            {
                index:3, ADVERSEEVENT:"Actoplus MET",SERIOUS:"No",ADVERSESTARTDATE:"03/17/1998",ADVERSEENDDATE:"11/10/2008",TOXICITYGRADE:"",CAUSALITYFACTORS:"PossibleRelated",OUTCOME:"recovered"

            }
        ];

        $scope.EditMedications=[
            {
                index1:1, NAMEOFMEDICATION:"Cachexia",MEDICATIONSSTARTDATE:"01/05/1993",MEDICATIONSONGOING:1,MEDICATIONSREASONFORMEDICATION:"appendix",CMREASONFORMEDICATION:""
            },
            {
                index1:2, NAMEOFMEDICATION:"Cachexia",MEDICATIONSSTARTDATE:"01/05/1993",MEDICATIONSONGOING:1,MEDICATIONSREASONFORMEDICATION:"appendix",CMREASONFORMEDICATION:""
            },
            {
                index1:3,NAMEOFMEDICATION:"Cachexia",MEDICATIONSSTARTDATE:"01/05/1993",MEDICATIONSONGOING:1,MEDICATIONSREASONFORMEDICATION:"appendix",CMREASONFORMEDICATION:""
            }
        ];

        $scope.Editprocdetails=[
            {
                index2:1,CPNAMEOFPROCEDURE:"proc",PROCEDURESSTARTDATE:"01/05/1993",PROCEDURESONGOING:"",CPREASONFORMEDICATION:"",CPMREASONFORMEDICATION:""
            },
            {
                index2:2,CPNAMEOFPROCEDURE:"proc",PROCEDURESSTARTDATE:"01/05/1993",PROCEDURESONGOING:"",CPREASONFORMEDICATION:"",CPMREASONFORMEDICATION:""
            },
            {
                index2:3,CPNAMEOFPROCEDURE:"proc",PROCEDURESSTARTDATE:"01/05/1993",PROCEDURESONGOING:"",CPREASONFORMEDICATION:"",CPMREASONFORMEDICATION:""
            }
        ];

        $scope.EditMedh1details=[
            {
                index3:1,MEDICALH1CONDITION:"Diabetes mellitus type2",MEDICALH1STARTDATE:"01/05/1993",MRELATEDTOSTUDYCONDITION:"",MEDICALH1ONGOING:""
            },
            {
                index3:2,MEDICALH1CONDITION:"Diabetes mellitus type2",MEDICALH1STARTDATE:"01/05/1993",MRELATEDTOSTUDYCONDITION:"",MEDICALH1ONGOING:""
            },
            {
                index3:2,MEDICALH1CONDITION:"Diabetes mellitus type2",MEDICALH1STARTDATE:"01/05/1993",MRELATEDTOSTUDYCONDITION:"",MEDICALH1ONGOING:""
            }

        ]

    });