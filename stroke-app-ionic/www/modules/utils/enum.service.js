'use strict';

angular.module('utils').service('EnumService', EnumService);

EnumService.$inject = [];

function EnumService() {

    var service = {
        displayValueFromEnumValueForInrType: displayValueFromEnumValueForInrType,
        enumValueFromDisplayValueForInrType: enumValueFromDisplayValueForInrType,
       
        displayValueFromEnumValueForReversalAgentType: displayValueFromEnumValueForReversalAgentType,
        enumValueFromDisplayValueForReversalAgentType: enumValueFromDisplayValueForReversalAgentType,

        displayValueFromEnumValueForAnticoagulantType: displayValueFromEnumValueForAnticoagulantType,
        enumValueFromDisplayValueForAnticoagulantType: enumValueFromDisplayValueForAnticoagulantType,

        displayValueFromEnumValueForDestination: displayValueFromEnumValueForDestination,
        enumValueFromDisplayValueForDestination: enumValueFromDisplayValueForDestination
     };

    return service;

    function displayValueFromEnumValueForInrType(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "POINT_OF_CARE":
                displayValue = "Point of care";
                break;
            case "LABORATORY":
                displayValue = "Laboratory";
                break;
            default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForInrType(displayValue) {
        var enumValue;
        switch(displayValue) {
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

    function displayValueFromEnumValueForReversalAgentType(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "IDARUCIZUMAB":
                displayValue = "Idarucizumab";
                break;
            case "PCC":
                displayValue = "PCC";
                break;
            case "NONE":
                displayValue = "None";
                break;
            default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForReversalAgentType(displayValue) {
        var enumValue;
        switch(displayValue) {
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

    function displayValueFromEnumValueForAnticoagulantType(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "VITK":
                displayValue = "Vitamin K antagonist";
                break;
            case "DOAC":
                displayValue = "DOAC";
                break;
            case "UNKNOWN":
                displayValue = "Unknown";
                break;
            case "NONE":
                displayValue = "None";
                break;
           default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForAnticoagulantType(displayValue) {
        var enumValue;
        switch(displayValue) {
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

    function displayValueFromEnumValueForDestination(enumValue) {
        var displayValue;
        switch(enumValue) {
            case "STROKE_UNIT":
                displayValue = "Stroke unit";
                break;
            case "ICU":
                displayValue = "ICU";
                break;
            case "HDU":
                displayValue = "HDU";
                break;
            case "NOT_YET_DECIDED":
                displayValue = "Not yet decided";
                break;
            case "OTHER":
                displayValue = "None of the above";
                break;
            default:
                displayValue = null;                
        }
        return displayValue;
    }

    function enumValueFromDisplayValueForDestination(displayValue) {
        var enumValue;
        switch(displayValue) {
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