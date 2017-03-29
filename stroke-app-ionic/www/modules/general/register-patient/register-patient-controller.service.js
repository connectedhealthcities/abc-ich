'use strict';

angular.module('app.general').service('RegisterPatientControllerService', RegisterPatientControllerService);

RegisterPatientControllerService.$inject = ['moment'];

function RegisterPatientControllerService(moment) {

    var service = {
        isDobInvalidDate: isDobInvalidDate,
        isYearOutOfRange: isYearOutOfRange,
        isInitialsInvalid: isInitialsInvalid,
        areAllDateFieldsComplete: areAllDateFieldsComplete,
        getMaxYear: getMaxYear,
        getYear: getYear
    }

    return service;

    function getMaxYear(date) {
        var m = moment(date);
        return parseInt(m.subtract(14, 'y').format("YYYY"));
    }

    function getYear(date) {
        var m = moment(date);
        return parseInt(m.format("YYYY"));
    }

    function areAllDateFieldsComplete(day, month, year){
        var areAllDateFieldsComplete = (day !== null && month !== null && (year !== null && year > 999));//greater than 999 because year must be atleast 4 characters before we validate it

        return areAllDateFieldsComplete;    
    }

    function isDobInvalidDate(day, month, year) {
        var isDobValid = false;

        if (year < 1000) { //we are actually checking the year is atleast 4 characters
            isDobValid = false;
        } else {
            var m = moment([year, month -1, day]);
            isDobValid = m.isValid();
        }

        return !isDobValid
    }

    function isYearOutOfRange(year, minYear, maxYear) {
        var isYearOutOfRange = false;
        if (year < minYear || year > maxYear) {
            isYearOutOfRange = true;
        }
        return isYearOutOfRange;
    }

    function isInitialsInvalid(initials) {
        if (!initials) { return false; }
        var initialsValidationPattern = /^[A-Z]{2,3}$/;//is a string uppercase-alphabetical and 2-3 characters in length

        var isInvalid = !initialsValidationPattern.test(initials);
        return isInvalid;
    }    
}
