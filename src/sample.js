var app;
app = angular.module('newCase', ['ngGrid']);
app.controller('listController', ['$http', '$scope', function ($http, $scope) {


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


    //Cloumns for Study Treatment
    $scope.columnsLabReports = [
        { field: 'id', displayName: 'id', visible: false },
        { field: 'testname', displayName: 'Test Name' },
        { field: 'testdate', displayName: 'Test Date' },
        { field: 'testresult', displayName: 'Test Result' },
        { field: 'units', displayName: 'Units' },
        { field: 'measure', displayName: 'Measure' },
        { field: 'refrange', displayName: 'Reference Range'}];

    //Cloumns for Study Treatment
    $scope.columnsStudyTreatment = [
        { field: 'id', displayName: 'id', visible: false },
        { field: 'treatmentname', displayName: 'Treatment Name' },
        { field: 'dose', displayName: 'Dose' },
        { field: 'doseunits', displayName: 'Dose Units' },
        { field: 'frequency', displayName: 'Frequency' },
        { field: 'startdate', displayName: 'Start Date' },
        { field: 'enddate', displayName: 'End Date'}];

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

    // columns for manage case
    $scope.columns = [
        { field: 'app_number', displayName: '#', cellClass: 'border' },
        { field: 'study_label', displayName: 'Study Id', cellClass: 'border' },
        { field: 'country', displayName: 'Country', cellClass: 'border' },
        { field: 'app_tas_title', displayName: 'State', cellClass: 'border' },
        //   { field: 'subject', displayName: 'Subject', cellClass: 'border' },
        //  {field: 'app_update_date', displayName: 'Last Modified', cellClass: 'border' },





        {field: 'Action', width: '150px',
            displayName: 'Action', cellClass: 'border',
            cellTemplate: '<div class="ngSelectionCell">' +
            '<input type="button" ng-click="edit(row.entity)" name="btnedit"  value="Edit" style="width:40px;height:17px;font-size:9px;text-align:center;" class="buttonCustG"/>&nbsp;' +
            '<input type="button" ng-click="" style="width:50px;height:17px;font-size:9px;text-align:center;" value="Delete" class="buttonCustG"/></div>'
        }
    ];


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
    // manage case(draft) grid
    $scope.gridOptions = {
        data: 'myData',
        enableSorting: true,
        columnDefs: $scope.columns,
        headerRowHeight: 25,
        rowHeight: 25,
        enablePaging: true,
        showFooter: true,
        enableRowSelection: false,
        enableColumnResize: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };

    // Adverse event details edit grid

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


    //validations for checkboxes in new case
    // validation for disabling the associated Concomitant Medications checkbox on checking the data checkbox in Concomitant Medications grid
    $scope.meddatacheck = function () {
        if ($('input[name="medchkbox"]:checked').length == 0) {
            $("input[name='medicationcheck']").prop("disabled", false);
        }
        else
            $("input[name='medicationcheck']").prop("disabled", true);
    };

    // validation for disabling the associated Concomitant Procedures checkbox on checking the data checkbox in Concomitant Procedures grid
    $scope.procdatacheck = function () {
        if ($('input[name="procchkbox"]:checked').length == 0) {
            $("input[name='procedurecheck']").prop("disabled", false);
        }
        else
            $("input[name='procedurecheck']").prop("disabled", true);
    };

    // validation for disabling the associated Medical History checkbox on checking the data checkbox in Medical History grid
    $scope.histrydatacheck = function () {
        if ($('input[name="histchkbox"]:checked').length == 0) {
            $("input[name='historycheck']").prop("disabled", false);
        }
        else
            $("input[name='historycheck']").prop("disabled", true);
    };

    // validation for disabling the associated Concomitant Medications checkbox on checking the header checkbox in Concomitant Medications grid
    $scope.medheadercheck = function () {
        if ($("input[name='medheaderchk']").prop('checked')) {
            $("input[name='medicationcheck']").prop("disabled", true);
        }
        else {
            $("input[name='medicationcheck']").prop("disabled", false);
        }
    };


    // validation for disabling the associated Concomitant Procedures checkbox on checking the header checkbox in Concomitant Procedures grid
    $scope.procheadercheck = function () {
        if ($("input[name='procheaderchk']").prop('checked')) {
            $("input[name='procedurecheck']").prop("disabled", true);
        }
        else {
            $("input[name='procedurecheck']").prop("disabled", false);
        }
    };

    // validation for disabling the associated Medical History checkbox on checking the header checkbox in Medical History grid
    $scope.histheadercheck = function () {
        if ($("input[name='histheaderchk']").prop('checked')) {
            $("input[name='historycheck']").prop("disabled", true);
        }
        else {
            $("input[name='historycheck']").prop("disabled", false);
        }
    };

    // validation for disabling the Concomitant Medications grid checkboxes based on checking the associated Concomitant Medications checkbox
    $scope.medcheck = function () {
        if ($('#medicationcheck').prop('checked')) {
            $("input[name='medheaderchk']").prop("disabled", true);
            $("input.medchkcss").prop("disabled", true);
        }
        else {
            $("input[name='medheaderchk']").prop("disabled", false);
            $("input.medchkcss").prop("disabled", false);
        }
    }

    // validation for disabling the Concomitant Procedures grid checkboxes based on checking the associated Concomitant Procedures checkbox
    $scope.proccheck = function () {
        if ($('#procedurecheck').prop('checked')) {
            $("input[name='procheaderchk']").prop("disabled", true);
            $("input.procchkcss").prop("disabled", true);
        }
        else {
            $("input[name='procheaderchk']").prop("disabled", false);
            $("input.procchkcss").prop("disabled", false);
        }
    }

    // validation for disabling the Medical History grid checkboxes based on checking the associated Medical History checkbox
    $scope.histrycheck = function () {
        if ($('#historycheck').prop('checked')) {
            $("input[name='histheaderchk']").prop("disabled", true);
            $("input.histchkcss").prop("disabled", true);
        }
        else {
            $("input[name='histheaderchk']").prop("disabled", false);
            $("input.histchkcss").prop("disabled", false);
        }
    }


    // validations for checkboxes in managecase

    // validation for disabling the associated Concomitant Medications checkbox on checking the data checkbox in Concomitant Medications grid
    $scope.editmeddatacheck = function () {
        //   $scope.edtmedchk = 1;

        if ($('input[name="editmedchkbox"]:checked').length == 0) {
            //$scope.edtmedchk = 0;
            $("input[name='editmedicationcheck']").prop("disabled", false);
        }
        else {
            //  $scope.edtmedchk = 1;
            $("input[name='editmedicationcheck']").prop("disabled", true);
        }
    };

    // validation for disabling the associated Concomitant Procedures checkbox on checking the data checkbox in Concomitant Procedures grid
    $scope.editprocdatacheck = function () {
        if ($('input[name="editprocchkbox"]:checked').length == 0) {
            $("input[name='editprocedurecheck']").prop("disabled", false);
        }
        else
            $("input[name='editprocedurecheck']").prop("disabled", true);
    };

    // validation for disabling the associated Medical History checkbox on checking the data checkbox in Medical History grid
    $scope.edithistrydatacheck = function () {
        if ($('input[name="edithistchkbox"]:checked').length == 0) {
            $("input[name='edithistorycheck']").prop("disabled", false);
        }
        else
            $("input[name='edithistorycheck']").prop("disabled", true);
    };

    // validation for disabling the associated Concomitant Medications checkbox on checking the header checkbox in Concomitant Medications grid
    $scope.editmedheadercheck = function () {
        if ($("input[name='editmedheaderchk']").prop('checked')) {
            $("input[name='editmedicationcheck']").prop("disabled", true);
        }
        else {
            $("input[name='editmedicationcheck']").prop("disabled", false);
        }
    };


    // validation for disabling the associated Concomitant Procedures checkbox on checking the header checkbox in Concomitant Procedures grid
    $scope.editprocheadercheck = function () {
        if ($("input[name='editprocheaderchk']").prop('checked')) {
            $("input[name='editprocedurecheck']").prop("disabled", true);
        }
        else {
            $("input[name='editprocedurecheck']").prop("disabled", false);
        }
    };

    // validation for disabling the associated Medical History checkbox on checking the header checkbox in Medical History grid
    $scope.edithistheadercheck = function () {
        if ($("input[name='edithistheaderchk']").prop('checked')) {
            $("input[name='edithistorycheck']").prop("disabled", true);
        }
        else {
            $("input[name='edithistorycheck']").prop("disabled", false);
        }
    };

    // validation for disabling the Concomitant Medications grid checkboxes based on checking the associated Concomitant Medications checkbox
    $scope.editmedcheck = function () {
        if ($('#editmedicationcheck').prop('checked')) {
            $("input[name='editmedheaderchk']").prop("disabled", true);
            $("input.editmedchkcss").prop("disabled", true);
        }
        else {
            $("input[name='editmedheaderchk']").prop("disabled", false);
            $("input.editmedchkcss").prop("disabled", false);
        }
    }

    // validation for disabling the Concomitant Procedures grid checkboxes based on checking the associated Concomitant Procedures checkbox
    $scope.editproccheck = function () {
        if ($('#editprocedurecheck').prop('checked')) {
            $("input[name='editprocheaderchk']").prop("disabled", true);
            $("input.editprocchkcss").prop("disabled", true);
        }
        else {
            $("input[name='editprocheaderchk']").prop("disabled", false);
            $("input.editprocchkcss").prop("disabled", false);
        }
    }

    // validation for disabling the Medical History grid checkboxes based on checking the associated Medical History checkbox
    $scope.edithistrycheck = function () {
        if ($('#edithistorycheck').prop('checked')) {
            $("input[name='edithistheaderchk']").prop("disabled", true);
            $("input.edithistchkcss").prop("disabled", true);
        }
        else {
            $("input[name='edithistheaderchk']").prop("disabled", false);
            $("input.edithistchkcss").prop("disabled", false);
        }
    };




    // for getting subjects based on studyid
    $scope.ChangedStudy = function () {
        $('.gridStyle').trigger('resize');
        $("#progress").modal();
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
                    $("#progress").modal('hide');
                });
            });
        });

    };

    // getting adverse event details based on study and subject
    $scope.ChangedSubject = function () {
        $('.gridStyle').trigger('resize');
        $("#progress").modal();
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
                    $("#progress").modal('hide');
                });
            });
        });
    };


    // saving the details
    $scope.save = function () {
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

    // submitting the details
    $scope.submit = function () {
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

        if (validate()) {
            $("#progress").modal();
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
                var _triggerId = '6150207515690fbf63c3197047063583';
                var _purl = $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/execute-trigger/' + _triggerId;
                var requestX = $http({
                    method: "PUT",
                    url: _purl,
                    headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                });
                requestX.success(function (html) {
                    var requestZ = $http({
                        method: "GET",
                        url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/variables',
                        headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                        data: ""
                    });
                    requestZ.success(function (html) {
                        var routereq = $http({
                            method: 'PUT',
                            url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + $scope.app_uid + '/route-case',
                            headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                        });
                        routereq.success(function (status) {
                            $("#progress").modal('hide');
                            $('#error_container').bs_info("Submitted successfully");
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
                                        $('#limcase').addClass('active');
                                        $("#progress").modal('hide');
                                    });
                                });
                            };
                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            $scope.myActionsDiv = false;
                            $scope.myDraftDiv = true;
                            $scope.newCaseDiv = false;
                            $scope.MyDraftEditMenu = false;
                            $scope.topheadermenu = true;
                            $scope.toggleMenuDiv = true;
                            $('.mnggridStyle').trigger('resize');
                        });
                    });
                });
            });
        }
    };

    // getting adverse event details by sending the case id on clicking edit button
    $scope.edit = function (data) {
        $scope.EditInMyDraft = 2;
        $("#error_container").html('');
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
        $scope.toggleMenuDiv = true;
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
                        $("input[name='editmedheaderchk']").prop("checked", false);
                        $("input.editmedchkcss").prop("checked", false);
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
                        $("input[name='editprocheaderchk']").prop("checked", false);
                        $("input.editprocchkcss").prop("checked", false);
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
                        $("input[name='edithistheaderchk']").prop("checked", false);
                        $("input.edithistchkcss").prop("checked", false);
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


    // saving the details
    $scope.update = function () {
        $scope.myData = "";
        if ($('#editmedicationcheck').prop('checked'))
            $scope.Cdetails = "On";
        else
            $scope.Cdetails = "Off";

        if ($('#editprocedurecheck').prop('checked'))
            $scope.cdetails2 = "On";
        else
            $scope.cdetails2 = "Off";

        if ($('#edithistorycheck').prop('checked'))
            $scope.mhdetails1 = "On";
        else
            $scope.mhdetails1 = "Off";

        var _editAdverseEvents = [];
        var _editMedications = [];
        var _editprocedures = [];
        var _editmedh1details = [];

        // ADVERSE EVENT DETAILS
        for (i = 0; i < $scope.EditAdverseEvents.length; i++) {
            var _adObj = new Object();
            if ($scope.editAdverseSelected.length > 0) {
                for (j = 0; j < $scope.editAdverseSelected.length; j++) {
                    if (angular.equals($scope.EditAdverseEvents[i].index, $scope.editAdverseSelected[j].index)) {
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
            _adObj.ADVERSEEVENT = $scope.EditAdverseEvents[i].ADVERSEEVENT;
            _adObj.SERIOUS = $scope.EditAdverseEvents[i].SERIOUS;
            _adObj.ADVERSESTARTDATE = $scope.EditAdverseEvents[i].ADVERSESTARTDATE;
            _adObj.ADVERSEENDDATE = $scope.EditAdverseEvents[i].ADVERSEENDDATE;
            _adObj.TOXICITYGRADE = $scope.EditAdverseEvents[i].TOXICITYGRADE;
            _adObj.CAUSALITYFACTORS = $scope.EditAdverseEvents[i].CAUSALITYFACTORS;
            _adObj.OUTCOME = $scope.EditAdverseEvents[i].OUTCOME;

            _editAdverseEvents.push(_adObj);
        }

        // CONCOMITANT MEDICATIONS DETAILS
        for (i = 0; i < $scope.EditMedications.length; i++) {
            var _mdObj = new Object();
            if ($scope.editselectedmedication.length > 0) {
                for (j = 0; j < $scope.editselectedmedication.length; j++) {
                    if (angular.equals($scope.EditMedications[i].index1, $scope.editselectedmedication[j].index1)) {
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
            _mdObj.NAMEOFMEDICATION = $scope.EditMedications[i].NAMEOFMEDICATION;
            _mdObj.MEDICATIONSSTARTDATE = $scope.EditMedications[i].MEDICATIONSSTARTDATE;
            _mdObj.MEDICATIONSONGOING = $scope.EditMedications[i].MEDICATIONSONGOING;
            _mdObj.MEDICATIONSREASONFORMEDICATION = $scope.EditMedications[i].MEDICATIONSREASONFORMEDICATION;
            _mdObj.CMREASONFORMEDICATION = $scope.EditMedications[i].CMREASONFORMEDICATION;

            _editMedications.push(_mdObj);
        }


        // Concamitant Procedure details
        for (i = 0; i < $scope.Editprocdetails.length; i++) {
            var _pObj = new Object();
            if ($scope.editselectedprocedures.length > 0) {
                for (j = 0; j < $scope.editselectedprocedures.length; j++) {
                    if (angular.equals($scope.Editprocdetails[i].index2, $scope.editselectedprocedures[j].index2)) {
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
            _pObj.CPNAMEOFPROCEDURE = $scope.Editprocdetails[i].CPNAMEOFPROCEDURE;
            _pObj.PROCEDURESSTARTDATE = $scope.Editprocdetails[i].PROCEDURESSTARTDATE;
            _pObj.PROCEDURESONGOING = $scope.Editprocdetails[i].PROCEDURESONGOING;
            _pObj.CPREASONFORMEDICATION = $scope.Editprocdetails[i].CPREASONFORMEDICATION;
            _pObj.CPMREASONFORMEDICATION = $scope.Editprocdetails[i].CPMREASONFORMEDICATION;

            _editprocedures.push(_pObj);
        }

        // Medical H1 details
        for (i = 0; i < $scope.EditMedh1details.length; i++) {

            var _h1Obj = new Object();
            if ($scope.editselectedmedhistory.length > 0) {
                for (j = 0; j < $scope.editselectedmedhistory.length; j++) {
                    if (angular.equals($scope.EditMedh1details[i].index3, $scope.editselectedmedhistory[j].index3)) {
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
            _h1Obj.MEDICALH1CONDITION = $scope.EditMedh1details[i].MEDICALH1CONDITION;
            _h1Obj.MEDICALH1STARTDATE = $scope.EditMedh1details[i].MEDICALH1STARTDATE;
            _h1Obj.MRELATEDTOSTUDYCONDITION = $scope.EditMedh1details[i].MRELATEDTOSTUDYCONDITION;
            _h1Obj.MEDICALH1ONGOING = $scope.EditMedh1details[i].MEDICALH1ONGOING;

            _editmedh1details.push(_h1Obj);
        }

        var _caseId = $scope.Editapp_uid;
        var _StudyID = $scope.EditStudyId;
        var _SubjectID = $scope.EditSubject;

        var _ssObj = new Object();
        _ssObj.app_uid = _caseId;
        _ssObj.Study = _StudyID;
        _ssObj.Study_label = $scope.EditStudylabel;
        _ssObj.Subject = _SubjectID;
        _ssObj.Adverseeventdetails = JSON.stringify(_editAdverseEvents);
        _ssObj.Medicationsdetails = JSON.stringify(_editMedications);
        _ssObj.Proceduralsdetails = JSON.stringify(_editprocedures);
        _ssObj.medicalh1details = JSON.stringify(_editmedh1details);
        _ssObj.CaseDescription = $("#editdescrition").val();
        _ssObj.Cdetails = $scope.Cdetails;
        _ssObj.cdetails2 = $scope.cdetails2;
        _ssObj.mhdetails1 = $scope.mhdetails1;

        var requestY = $http({
            method: "PUT",
            url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
            headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
            data: _ssObj
        });
        requestY.success(function (html) {
            var _triggerId = '6150207515690fbf63c3197047063583';
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

                    $("input.ngSelectionHeader:checkbox").prop('checked', false);
                    $("input.ngSelectionHeader:checkbox").prop('disabled', false);
                    $("input[name='editmedicationcheck']").prop("disabled", false);
                    $("input[name='editmedicationcheck']").prop('checked', false);
                    $("input[name='editprocedurecheck']").prop("disabled", false);
                    $("input[name='editprocedurecheck']").prop('checked', false);
                    $("input[name='edithistorycheck']").prop("disabled", false);
                    $("input[name='edithistorycheck']").prop('checked', false);
                    if ($('#editdescrition').length > 0) {
                        $scope.myForm.casedes.$error.required = false;
                        $scope.myForm.$invalid = false;
                    }
                    else {
                        $scope.myForm.casedes.$error.required = true;
                        $scope.myForm.$invalid = true;
                    }
                    if ($scope.EditInMyActions == "2") {
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
                        $scope.myActionsDiv = true;
                        $scope.myDraftDiv = false;
                    }
                    else {
                        $scope.myDraftDiv = true;
                        $scope.myActionsDiv = false;
                    }



                    $scope.newCaseDiv = false;
                    $scope.MyDraftEditMenu = false;
                    $scope.topheadermenu = true;
                    $scope.toggleMenuDiv = true;
                    $scope.EditInMyActions = "";
                    $('.mnggridStyle').trigger('resize');
                });
            });
        });
    };

    // submitting the details
    $scope.updsubmit = function () {
        $scope.myData = "";
        if ($('#editmedicationcheck').prop('checked'))
            $scope.Cdetails = "On";
        else
            $scope.Cdetails = "Off";

        if ($('#editprocedurecheck').prop('checked'))
            $scope.cdetails2 = "On";
        else
            $scope.cdetails2 = "Off";

        if ($('#edithistorycheck').prop('checked'))
            $scope.mhdetails1 = "On";
        else
            $scope.mhdetails1 = "Off";

        var _editAdverseEvents = [];
        var _editMedications = [];
        var _editprocedures = [];
        var _editmedh1details = [];

        // ADVERSE EVENT DETAILS
        for (i = 0; i < $scope.EditAdverseEvents.length; i++) {
            var _adObj = new Object();
            if ($scope.editAdverseSelected.length > 0) {
                for (j = 0; j < $scope.editAdverseSelected.length; j++) {
                    if (angular.equals($scope.EditAdverseEvents[i].index, $scope.editAdverseSelected[j].index)) {
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
            _adObj.ADVERSEEVENT = $scope.EditAdverseEvents[i].ADVERSEEVENT;
            _adObj.SERIOUS = $scope.EditAdverseEvents[i].SERIOUS;
            _adObj.ADVERSESTARTDATE = $scope.EditAdverseEvents[i].ADVERSESTARTDATE;
            _adObj.ADVERSEENDDATE = $scope.EditAdverseEvents[i].ADVERSEENDDATE;
            _adObj.TOXICITYGRADE = $scope.EditAdverseEvents[i].TOXICITYGRADE;
            _adObj.CAUSALITYFACTORS = $scope.EditAdverseEvents[i].CAUSALITYFACTORS;
            _adObj.OUTCOME = $scope.EditAdverseEvents[i].OUTCOME;

            _editAdverseEvents.push(_adObj);
        }

        // CONCOMITANT MEDICATIONS DETAILS
        for (i = 0; i < $scope.EditMedications.length; i++) {
            var _mdObj = new Object();
            if ($scope.editselectedmedication.length > 0) {
                for (j = 0; j < $scope.editselectedmedication.length; j++) {
                    if (angular.equals($scope.EditMedications[i].index1, $scope.editselectedmedication[j].index1)) {
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
            _mdObj.NAMEOFMEDICATION = $scope.EditMedications[i].NAMEOFMEDICATION;
            _mdObj.MEDICATIONSSTARTDATE = $scope.EditMedications[i].MEDICATIONSSTARTDATE;
            _mdObj.MEDICATIONSONGOING = $scope.EditMedications[i].MEDICATIONSONGOING;
            _mdObj.MEDICATIONSREASONFORMEDICATION = $scope.EditMedications[i].MEDICATIONSREASONFORMEDICATION;
            _mdObj.CMREASONFORMEDICATION = $scope.EditMedications[i].CMREASONFORMEDICATION;

            _editMedications.push(_mdObj);
        }


        // Concamitant Procedure details
        for (i = 0; i < $scope.Editprocdetails.length; i++) {
            var _pObj = new Object();
            if ($scope.editselectedprocedures.length > 0) {
                for (j = 0; j < $scope.editselectedprocedures.length; j++) {
                    if (angular.equals($scope.Editprocdetails[i].index2, $scope.editselectedprocedures[j].index2)) {
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
            _pObj.CPNAMEOFPROCEDURE = $scope.Editprocdetails[i].CPNAMEOFPROCEDURE;
            _pObj.PROCEDURESSTARTDATE = $scope.Editprocdetails[i].PROCEDURESSTARTDATE;
            _pObj.PROCEDURESONGOING = $scope.Editprocdetails[i].PROCEDURESONGOING;
            _pObj.CPREASONFORMEDICATION = $scope.Editprocdetails[i].CPREASONFORMEDICATION;
            _pObj.CPMREASONFORMEDICATION = $scope.Editprocdetails[i].CPMREASONFORMEDICATION;

            _editprocedures.push(_pObj);
        }

        // Medical H1 details
        for (i = 0; i < $scope.EditMedh1details.length; i++) {

            var _h1Obj = new Object();
            if ($scope.editselectedmedhistory.length > 0) {
                for (j = 0; j < $scope.editselectedmedhistory.length; j++) {
                    if (angular.equals($scope.EditMedh1details[i].index3, $scope.editselectedmedhistory[j].index3)) {
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
            _h1Obj.MEDICALH1CONDITION = $scope.EditMedh1details[i].MEDICALH1CONDITION;
            _h1Obj.MEDICALH1STARTDATE = $scope.EditMedh1details[i].MEDICALH1STARTDATE;
            _h1Obj.MRELATEDTOSTUDYCONDITION = $scope.EditMedh1details[i].MRELATEDTOSTUDYCONDITION;
            _h1Obj.MEDICALH1ONGOING = $scope.EditMedh1details[i].MEDICALH1ONGOING;

            _editmedh1details.push(_h1Obj);
        }
        var _caseId = $scope.Editapp_uid;
        if (editvalidate()) {
            $('#basicModal').modal('hide');
            $("#progress").modal();

            var _StudyID = $scope.EditStudyId;
            var _SubjectID = $scope.EditSubject;

            var _ssObj = new Object();
            _ssObj.app_uid = _caseId;
            _ssObj.Study = _StudyID;
            _ssObj.Study_label = $scope.EditStudylabel;
            _ssObj.Subject = _SubjectID;
            _ssObj.Adverseeventdetails = JSON.stringify(_editAdverseEvents);
            _ssObj.Medicationsdetails = JSON.stringify(_editMedications);
            _ssObj.Proceduralsdetails = JSON.stringify(_editprocedures);
            _ssObj.medicalh1details = JSON.stringify(_editmedh1details);
            _ssObj.CaseDescription = $("#editdescrition").val();
            _ssObj.Cdetails = $scope.Cdetails;
            _ssObj.cdetails2 = $scope.cdetails2;
            _ssObj.mhdetails1 = $scope.mhdetails1;

            var requestY = $http({
                method: "PUT",
                url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/variable',
                headers: { 'Authorization': 'Bearer ' + $scope.AccessToken },
                data: _ssObj
            });
            requestY.success(function (html) {
                var _triggerId = '6150207515690fbf63c3197047063583';
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
                    requestZ.success(function (html, status) {
                        var routereq = $http({
                            method: 'PUT',
                            url: $scope.serverUrl + 'api/1.0/' + $scope.workspace + '/cases/' + _caseId + '/route-case',
                            headers: { 'Authorization': 'Bearer ' + $scope.AccessToken }
                        });
                        routereq.success(function (status) {
                            $('#error_container').bs_info("Submitted successfully");
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
                                        $('#limcase').addClass('active');
                                        $("#progress").modal('hide');
                                    });
                                });
                            };
                            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
                            $("input.ngSelectionHeader:checkbox").prop('checked', false);
                            $("input[name='editmedicationcheck']").prop("disabled", false);
                            $("input[name='editmedicationcheck']").prop('checked', false);
                            $("input[name='editprocedurecheck']").prop("disabled", false);
                            $("input[name='editprocedurecheck']").prop('checked', false);
                            $("input[name='edithistorycheck']").prop("disabled", false);
                            $("input[name='edithistorycheck']").prop('checked', false);

                            if ($('#editdescrition').length > 0) {
                                $scope.myForm.casedes.$error.required = false;
                                $scope.myForm.$invalid = false;
                            }
                            else {
                                $scope.myForm.casedes.$error.required = true;
                                $scope.myForm.$invalid = true;
                            }
                            if ($scope.EditInMyActions == "2") {
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
                                $scope.myActionsDiv = true;
                                $scope.myDraftDiv = false;
                            }
                            else {
                                $scope.myDraftDiv = true;
                                $scope.myActionsDiv = false;
                            }
                            $scope.newCaseDiv = false;
                            $scope.MyDraftEditMenu = false;
                            $scope.topheadermenu = true;
                            $scope.toggleMenuDiv = true;
                            $scope.EditInMyActions = "";
                            $('.mnggridStyle').trigger('resize');
                        });
                    });
                });
            });
        }
    };


    validate = function () {
        var _mySelections = $scope.selectedRows1;
        var _flag = 0;
        for (i = 0; i < $scope.selectedRows1.length; i++) {
            var _serious = $scope.selectedRows1[i].SERIOUS;
            if (angular.equals("Yes", $scope.selectedRows1[i].SERIOUS)) {
                _flag++;
                break;
            }
        }
        if (_flag == 0) {
            $('#error_container').bs_alert("Please select atleast one mandatory check for Adverse Event");
            return false;
        }
        else
            return true;
    }

    editvalidate = function () {
        var _mySelections = $scope.editAdverseSelected;
        var _flag = 0;
        for (i = 0; i < $scope.editAdverseSelected.length; i++) {
            var _serious = $scope.editAdverseSelected[i].SERIOUS;
            if (angular.equals("Yes", $scope.editAdverseSelected[i].SERIOUS)) {
                _flag++;
                break;
            }
        }
        if (_flag == 0) {
            $('#error_container1').bs_alert("Please select atleast one mandatory check for Adverse Event");
            return false;
        }
        else
            return true;
    }



    // on clicking the new case
    $scope.newCasefn = function () {
        $('#togglemenu').removeClass('collapse in');
        $('#togglemenu').addClass('collapse');
        // to clear all the fields after save and submit
        $('#description').val('');
        $("input.ngSelectionHeader:checkbox").prop('checked', false);
        $("input.ngSelectionHeader:checkbox").prop('disabled', false);
        $("input[name='medicationcheck']").prop("disabled", false);
        $("input[name='medicationcheck']").prop('checked', false);
        $("input[name='procedurecheck']").prop("disabled", false);
        $("input[name='procedurecheck']").prop('checked', false);
        $("input[name='historycheck']").prop("disabled", false);
        $("input[name='historycheck']").prop('checked', false);
        $scope.myForm1.casedes.$error.required = true;
        $scope.myForm1.$invalid = true;

        $("#error_container").html("");
        $("#progress").modal();
        var requestY = $http({
            method: 'POST',
            url: $scope.serverUrl + $scope.workspace + '/oauth2/token',
            data: this.credentials
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
                                $("#progress").modal('hide');
                            });
                        });
                    });
                });
            });
        });

        $scope.newCaseDiv = true;
        $scope.myDraftDiv = false;
        $scope.myActionsDiv = false;
        $scope.MyDraftEditMenu = false;
        $scope.topheadermenu = true;
        $scope.toggleMenuDiv = true;
        $scope.SubjectID = false;
        $scope.StudyID = "";
        $scope.SubjectID = "";
        $('#selectStudy').get(0).selectedIndex = 0;
        $('#selectSubject').get(0).selectedIndex = 0;
        $('#description').value = "";
        $scope.AdverseEventsResult = "";
        $scope.ConcomitantMedicationsResult = "";
        $scope.ConcomitantProceduresResult = "";
        $scope.MedicalH1Result = "";

    };

    // on clicking the draft
    $scope.manageCase = function (data) {
        $('#togglemenu').removeClass('collapse in');
        $('#togglemenu').addClass('collapse');
        // pagination code starts

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

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

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
    };

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
    $scope.editAreaCancel = function () {
        if ($scope.EditInMyActions == "2") {
            $scope.EditInMyActions = "";
            $('.mnggridStyle').trigger('resize');
            $("#progress").modal('hide');
            $scope.myDraftDiv = false;
            $scope.newCaseDiv = false;
            $scope.myActionsDiv = true;
            $scope.MyDraftEditMenu = false;
            $scope.topheadermenu = true;
            $scope.toggleMenuDiv = true;
        }
        else {
            $scope.EditInMyActions = "";
            $('.mnggridStyle').trigger('resize');
            $("#progress").modal('hide');
            $scope.myDraftDiv = true;
            $scope.newCaseDiv = false;
            $scope.myActionsDiv = false;
            $scope.MyDraftEditMenu = false;
            $scope.topheadermenu = true;
            $scope.toggleMenuDiv = true;
        }
    };
} ]);