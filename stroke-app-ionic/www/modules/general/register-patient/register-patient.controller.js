'use strict';

angular.module('app.general').controller('RegisterPatientController', RegisterPatientController);

RegisterPatientController.$inject = ['$scope', '$state', '$ionicPopup', 'RegisterPatientControllerService', 'PatientCacheService', 'StateCacheService', 'DateTimeService', 'PatientHttpService', 'HospitalHttpService', 'DemoModeCacheService', 'STATE_REGISTER_PATIENT', 'STATE_PATIENT_START', 'STATE_PATIENT_DETAILS'];

function RegisterPatientController($scope, $state, $ionicPopup, RegisterPatientControllerService, PatientCacheService, StateCacheService, DateTimeService, PatientHttpService, HospitalHttpService, DemoModeCacheService, STATE_REGISTER_PATIENT, STATE_PATIENT_START, STATE_PATIENT_DETAILS) {

    var vm = this;

    function init() {
        // set current state
        StateCacheService.setCurrentState(STATE_REGISTER_PATIENT);

        // initialise vm parameters for header row
        vm.isDemoMode = DemoModeCacheService.getIsDemoMode();
 
        // initialise vm parameters for page logic       
        var dateNow = new Date();
        vm.maxYear = RegisterPatientControllerService.getMaxYear(dateNow);
        vm.thisYear = RegisterPatientControllerService.getYear(dateNow);

        // initialise vm parameters for page content       
        vm.hospitals = [];
        HospitalHttpService.getHospitals().then(function(hospitals) {
            for (var i = 0; i < hospitals.length; i++) {
                vm.hospitals.push(hospitals[i]);
            }
            vm.hospitals.push({"name": "Other"});
        });

        vm.isDateOfBirthKnown = null;
        vm.isExternalScan = null;
        vm.initials = null;
        vm.day = null;
        vm.month = null;
        vm.year = null;
        vm.dateOfBirth = null;
        vm.estimatedAge = null;
        vm.scanDate = null;
        vm.scanTime = null;
        vm.selectedHospital = null;
        vm.otherHospital = null;

        // Setup click handlers
        vm.onNext = onNext;
        vm.onScanNow = onScanNow;

        // Setup change handlers
        vm.onDateOfBirthKnownChanged = onDateOfBirthKnownChanged;
        vm.onExternalScanChanged = onExternalScanChanged;
        vm.onSelectedHospitalChanged = onSelectedHospitalChanged;
        vm.onInitialsChanged = onInitialsChanged;
        vm.onDateChanged = onDateChanged;

        // Setup enable/disable handlers
        vm.isNextButtonEnabled = isNextButtonEnabled;

        // Setup show/hide handlers
        vm.showDateOfBirthCard = showDateOfBirthCard;
        vm.showBirthDateConfirmationField = showBirthDateConfirmationField;
        vm.showAgeCard = showAgeCard;
        vm.showScanTimeCard = showScanTimeCard;
        vm.showExternalHospitalCard = showExternalHospitalCard;
        vm.showOtherHospitalField = showOtherHospitalField;    
        vm.showInitialsInvalidMessage = showInitialsInvalidMessage;
        vm.showDobInvalidMessage = showDobInvalidMessage;
        vm.showYearOutOfRangeMessage = showYearOutOfRangeMessage;
    }

    init();

    // Click handlers
    function onNext() {
        showDataValidationPopup(handleDataValid);
    }

    function onScanNow() {
        var now = DateTimeService.getNowWithZeroSeconds();
        vm.scanDate = now;
        vm.scanTime = now;
    }

    // Change handlers
    function onDateOfBirthKnownChanged() {
        vm.day = null;
        vm.month = null;
        vm.year = null;
        vm.dateOfBirth = null;
        vm.estimatedAge = null;
    }

    function onExternalScanChanged() {
        vm.scanDate = null;
        vm.scanTime = null;
        vm.selectedHospital = null;
        vm.otherHospital = null;
    }

    function onSelectedHospitalChanged() {
        vm.otherHospital = null;
    }

    function onInitialsChanged(initials) {
        if (initials !== null) { 
             vm.initials = initials.toUpperCase();
        }     
    }

    function onDateChanged() {
        vm.dateOfBirth = RegisterPatientControllerService.getDateOfBirth(vm.day, vm.month, vm.year, vm.maxYear);
    }

    // Enable/disable handlers
    function isNextButtonEnabled() {
        return RegisterPatientControllerService.isNextButtonEnabled(
            vm.initials,
            vm.isDateOfBirthKnown,
            vm.dateOfBirth,
            vm.estimatedAge,
            vm.isExternalScan,
            vm.scanDate,
            vm.scanTime,
            vm.selectedHospital,
            vm.otherHospital);
    }

    // Show/hide handlers
    function showDateOfBirthCard() {
        return RegisterPatientControllerService.showDateOfBirthCard(vm.isDateOfBirthKnown);
    }

    function showBirthDateConfirmationField() {
        return RegisterPatientControllerService.showBirthDateConfirmationField(vm.dateOfBirth);
    }

    function showAgeCard() {
        return RegisterPatientControllerService.showAgeCard(vm.isDateOfBirthKnown);
    }

    function showScanTimeCard() {
        return RegisterPatientControllerService.showScanTimeCard(vm.isExternalScan);
    }

    function showExternalHospitalCard() {
        return RegisterPatientControllerService.showExternalHospitalCard(vm.isExternalScan);
    }

    function showOtherHospitalField() {
        return RegisterPatientControllerService.showOtherHospitalField(vm.selectedHospital);
    }

    function showInitialsInvalidMessage() {
        return RegisterPatientControllerService.isInitialsInvalid(vm.initials);
    }

    function showDobInvalidMessage() {
        //we dont want to validate a date of birth that is incomplete..
        if (!RegisterPatientControllerService.areAllDateFieldsComplete(vm.day, vm.month, vm.year)) {            
            return false;
        }

        return RegisterPatientControllerService.isDobInvalidDate(vm.day, vm.month, vm.year);
    }

    function showYearOutOfRangeMessage() {
        //if date isnt valid dont bother checking the year is within range yet
        if (RegisterPatientControllerService.isDobInvalidDate(vm.day, vm.month, vm.year)) {
            return false; //and dont show the out of range message
        }

        return RegisterPatientControllerService.isYearOutOfRange(vm.year, 1900, vm.maxYear);
    }

    // Private functions
    function handleDataValid() {
        if (vm.isDemoMode) {
            vm.uniqueId = "demo-mode-patient";
            var patientId = 0; // Always use 0 for demo mode
            savePatient(vm.uniqueId, patientId);
        }
        else {
            var isDuplicateAllowed = false;
            PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, isDuplicateAllowed).then(function(response) {
                if (response.success) {
                    vm.uniqueId = response.patient.uniqueId;
                    if (response.patient.isDuplicate) {
                        showPatientAlreadyRegisteredPopup(confirmRegisterPatient, cancelRegisterPatient);
                    }
                    else {
                        savePatient(response.patient.uniqueId, response.patient.id);
                    }
                }
                else {
                    showPatientRegistrationFailedPopup(handleRegistrationFailed);
                }
            });       
        }
    }

    function confirmRegisterPatient() {
        var isDuplicateAllowed = true;
        PatientHttpService.registerPatient(vm.initials, vm.dateOfBirth, vm.estimatedAge, isDuplicateAllowed).then(function(response) {
            vm.uniqueId = response.patient.uniqueId;
            if (response.success) {
                savePatient(response.patient.uniqueId, response.patient.id);
            }
            else {
                showPatientRegistrationFailedPopup(handleRegistrationFailed);
            }
        });       
    }

    function cancelRegisterPatient() {
         $state.go(STATE_PATIENT_START);
     }

    function savePatient(uniqueId, id) {
        saveData(uniqueId, id);
        showPatientNotesPopup(goNextState);
    }

    function goNextState() {
        $state.go(STATE_PATIENT_DETAILS);
    }

    function handleRegistrationFailed() {
        $state.go(STATE_PATIENT_START);
    }
 
    function saveData(uniqueId, id) {
        PatientCacheService.setUniqueId(uniqueId);
        PatientCacheService.setId(id);        
        PatientCacheService.setInitials(vm.initials);
        PatientCacheService.setBirthDate(vm.dateOfBirth);
        PatientCacheService.setEstimatedAge(vm.estimatedAge);
        if (vm.selectedHospital === "Other") {
            PatientCacheService.setExternalScanHospitalName(vm.otherHospital);
        }
        else {
            PatientCacheService.setExternalScanHospitalName(vm.selectedHospital);
        }
        var scanDateTime = DateTimeService.getDateTimeFromDateAndTime(vm.scanDate, vm.scanTime);
        PatientCacheService.setScanDateTime(scanDateTime);
    }

    // Popups
    function showDataValidationPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/register-patient-data-validation-popup.html',
            title: 'Data validation',
            subTitle: 'Please confirm data entered is correct',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };       
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
        });
    }

    function showPatientAlreadyRegisteredPopup(okHandler, cancelHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-already-registered-popup.html',
            title: 'Patient already registered',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };       
        var popup = $ionicPopup.confirm(popupTemplate);

        popup.then(function(res) {
            if (res) {
                okHandler();
            }
            else {
                cancelHandler();
            }
        });
    }

    function showPatientNotesPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-notes-popup.html',
            title: 'Patient notes',
            cssClass: 'chi-wide-popup',
            scope: $scope
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }

    function showPatientRegistrationFailedPopup(okHandler) {
        var popupTemplate = {
            templateUrl: 'modules/general/register-patient/patient-registration-failed-popup.html',
            title: 'Patient registration failed',
            cssClass: 'chi-wide-popup'
        };
        var popup = $ionicPopup.alert(popupTemplate);

        popup.then(okHandler);
    }
    
}
