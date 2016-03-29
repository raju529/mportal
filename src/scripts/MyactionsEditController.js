angular.module("mportal")
    .controller("MyActionsEditController", function($scope, mportalService){
        var data = mportalService.myactionsData;
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


        $scope.adverseEvents=[
            {
                adverseEvent:"Actoplus MET",Serious:"No",StartDate:"03/17/1998",EndDate:"11/10/2008",ToxicityGrade:"",CasualityFactors:"PossibleRelated",Outcome:"recovered"

            },
            {
                adverseEvent:"Actoplus MET",Serious:"No",StartDate:"03/17/1998",EndDate:"11/10/2008",ToxicityGrade:"",CasualityFactors:"PossibleRelated",Outcome:"recovered"

            },
            {
                adverseEvent:"Actoplus MET",Serious:"No",StartDate:"03/17/1998",EndDate:"11/10/2008",ToxicityGrade:"",CasualityFactors:"PossibleRelated",Outcome:"recovered"

            }
        ];

        $scope.medicationDetails=[
            {
                medicationName:"Cachexia",StartDate:"01/05/1993",Ongoing:1,reasonForMedi:"appendix",reasonForMedic:""
            },
            {
                medicationName:"Cachexia",StartDate:"01/05/1993",Ongoing:1,reasonForMedi:"appendix",reasonForMedic:""
            },
            {
                medicationName:"Cachexia",StartDate:"01/05/1993",Ongoing:1,reasonForMedi:"appendix",reasonForMedic:""
            }
        ];

        $scope.procedureDetails=[
            {
                procedureName:"proc",StartDate:"",Ongoing:"",reasonForMedi:"",reasonForMedic:""
            }
        ];

        $scope.historyDetails=[
            {
                condition:"Diabetes mellitus type2",StartDate:"",studyCondition:"",ongoing:""
            }
        ]

    });