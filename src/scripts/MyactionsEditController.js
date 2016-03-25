angular.module("mportal")
    .controller("MyActionsEditController", function($scope, $stateParams){

        $scope.id = $stateParams.actionId;

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