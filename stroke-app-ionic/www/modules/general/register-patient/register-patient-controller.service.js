'use strict';

angular.module('app.general').service('RegisterPatientControllerService', RegisterPatientControllerService);

RegisterPatientControllerService.$inject = ['moment'];

function RegisterPatientControllerService(moment) {

    var service = {
        showDateOfBirthCard: showDateOfBirthCard,
        showBirthDateConfirmationField: showBirthDateConfirmationField,
        showAgeCard: showAgeCard,
        showScanTimeCard: showScanTimeCard,
        showExternalHospitalCard: showExternalHospitalCard,
        showOtherHospitalField: showOtherHospitalField,
        isDobInvalidDate: isDobInvalidDate,
        isYearOutOfRange: isYearOutOfRange,
        isInitialsInvalid: isInitialsInvalid,
        areAllDateFieldsComplete: areAllDateFieldsComplete,
        getMaxYear: getMaxYear,
        getYear: getYear,
        isNextButtonEnabled: isNextButtonEnabled,
        getDateOfBirth: getDateOfBirth
    }

    return service;


    function showDateOfBirthCard(isDateOfBirthKnown) {
        var isShow = false;
 
        if (isDateOfBirthKnown) {
            isShow = true;
        }
        return isShow;
    }    

    function showBirthDateConfirmationField(dateOfBirth) {
        var isShow = false;
 
        if (dateOfBirth) {
            isShow = true;
        }
        return isShow;      
    }    

    function showAgeCard(isDateOfBirthKnown) {
         var isShow = false;
 
        if (isDateOfBirthKnown !== null && !isDateOfBirthKnown) {
            isShow = true;
        }
        return isShow;   
    }    

    function showScanTimeCard(isExternalScan) {
        var isShow = false;
 
        if (isExternalScan !== null && !isExternalScan) {
            isShow = true;
        }
        return isShow;      
    }    

    function showExternalHospitalCard(isExternalScan) {
        var isShow = false;
 
        if (isExternalScan) {
            isShow = true;
        }
        return isShow;       
    }    

    function showOtherHospitalField(selectedHospital) {
        var isShow = false;
 
        if (selectedHospital === 'Other') {
            isShow = true;
        }
        return isShow;       
    }    

    function isDobInvalidDate(day, month, year) {
        var isDobValid = false;

        if (year >= 1000) { //we are actually checking the year is atleast 4 characters
            isDobValid = moment([year, month -1, day]).isValid();
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

    function areAllDateFieldsComplete(day, month, year){
        var areAllDateFieldsComplete = (day !== null && month !== null && (year !== null && year > 999));//greater than 999 because year must be atleast 4 characters before we validate it

        return areAllDateFieldsComplete;    
    }

    function getMaxYear(date) {
        var m = moment(date);
        return parseInt(m.subtract(14, 'y').format("YYYY"));
    }

    function getYear(date) {
        var m = moment(date);
        return parseInt(m.format("YYYY"));
    }

    function isNextButtonEnabled(initials, isDateOfBirthKnown, dateOfBirth, estimatedAge, isExternalScan, scanDate, scanTime, selectedHospital, otherHospital) {
        var isEnabled = false;

        if (initials !== null && !isInitialsInvalid(initials)) {
            if (isDateOfBirthKnown !== null) {
                if ((isDateOfBirthKnown && dateOfBirth !== null) || 
                    (!isDateOfBirthKnown && estimatedAge !== null)) {
                    if (isExternalScan !== null) {
                        if ( (!isExternalScan && scanDate !== null && scanTime !== null) ||
                             (isExternalScan && selectedHospital !== null && selectedHospital !== "Other") ||
                             (isExternalScan && selectedHospital !== null && selectedHospital === "Other" && otherHospital !== null) ) {
                            isEnabled = true;
                        }
                    }
                }
            }
        }

        return isEnabled;
    }

    function getDateOfBirth(day, month, year, maxYear) {
        var dob = null;

        if (day !== null && month !== null && year !== null && maxYear !== null) {
             
            var isDobInvalid = isDobInvalidDate(day, month, year);
            var isDobOutOfRange = isYearOutOfRange(year, 1900, maxYear);
 
            if (!isDobInvalid && !isDobOutOfRange) {
                dob = new Date(year, month - 1, day);
            } 
        }
              
        return dob;
    }
}
