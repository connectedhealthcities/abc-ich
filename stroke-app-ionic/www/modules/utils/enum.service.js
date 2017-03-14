'use strict';

angular.module('utils').service('EnumService', EnumService);

EnumService.$inject = [];

function EnumService() {

    var service = {
        getServerEnumForInrType: getServerEnumForInrType,      
        getServerEnumForReversalAgentType: getServerEnumForReversalAgentType,
        getServerEnumForAnticoagulantType: getServerEnumForAnticoagulantType,
        getServerEnumForDestination: getServerEnumForDestination
     };

    return service;

    function getServerEnumForInrType(value) {
        var enumValue;
        switch(value) {
            case "Point of care":
                enumValue = "POINT_OF_CARE";
                break;
            case "Laboratory":
                enumValue = "LABORATORY";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }

    function getServerEnumForReversalAgentType(value) {
        var enumValue;
        switch(value) {
            case "Idarucizumab":
                enumValue = "IDARUCIZUMAB";
                break;
            case "PCC":
                enumValue = "PCC";
                break;
            case "None":
                enumValue = "NONE";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }

    function getServerEnumForAnticoagulantType(value) {
        var enumValue;
        switch(value) {
            case "Vitamin K antagonist":
                enumValue = "VITK";
                break;
            case "DOAC":
                enumValue = "DOAC";
                break;
            case "Unknown":
                enumValue = "UNKNOWN";
                break;
            case "None":
                enumValue = "NONE";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }

    function getServerEnumForDestination(value) {
        var enumValue;
        switch(value) {
            case "Stroke unit":
                enumValue = "STROKE_UNIT";
                break;
            case "ICU":
                enumValue = "ICU";
                break;
            case "HDU":
                enumValue = "HDU";
                break;
            case "Not yet decided":
                enumValue = "NOT_YET_DECIDED";
                break;
            case "None of the above":
                enumValue = "OTHER";
                break;
            default:
                enumValue = null;                
        }
        return enumValue;
    }
}