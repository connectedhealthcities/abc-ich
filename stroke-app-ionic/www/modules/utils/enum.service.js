'use strict';

angular.module('utils').service('EnumService', EnumService);

EnumService.$inject = [];

function EnumService() {

    var service = {
        getServerEnumForInrType: getServerEnumForInrType,      
        getServerEnumForReversalAgentType: getServerEnumForReversalAgentType,
        getServerEnumForAnticoagulantType: getServerEnumForAnticoagulantType
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
}