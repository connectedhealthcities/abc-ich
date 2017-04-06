'use strict';
 
describe('RegisterPatientController', function() {

    var vm;
	var $q;
	var STATE_REGISTER_PATIENT_MOCK, STATE_PATIENT_START_MOCK, STATE_PATIENT_DETAILS_MOCK;
    var scopeMock, stateMock, ionicPopupMock, registerPatientControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, dateTimeServiceMock, patientHttpServiceMock, hospitalHttpServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');
 
		angular.mock.inject(function($controller, $rootScope, _$q_)  {
			$q = _$q_;
			STATE_REGISTER_PATIENT_MOCK = "state-register-patient";
            STATE_PATIENT_START_MOCK = "state-patient-start";
            STATE_PATIENT_DETAILS_MOCK = "state-patient-details";
 			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
			registerPatientControllerServiceMock = jasmine.createSpyObj('RegisterPatientControllerService spy', [
                'showDateOfBirthCard',
                'showBirthDateConfirmationField',
                'showAgeCard',
                'showScanTimeCard',
                'showExternalHospitalCard',
                'showOtherHospitalField',
                'isDobInvalidDate',
                'isYearOutOfRange',
                'isInitialsInvalid',
                'areAllDateFieldsComplete',
                'getMaxYear',
                'getYear',
                'isNextButtonEnabled',
                'getDateOfBirth'
            ]);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'setUniqueId',
                'setId',
                'setInitials',
                'setBirthDate',
                'setEstimatedAge',
                'setExternalScanHospitalName',
                'setScanDateTime'
            ]);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
			dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getDateTimeFromDateAndTime', 'getNowWithZeroSeconds']);
			patientHttpServiceMock = jasmine.createSpyObj('PatientHttpService spy', ['registerPatient']);
			hospitalHttpServiceMock = jasmine.createSpyObj('HospitalHttpService spy', ['getHospitals']);           
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

            hospitalHttpServiceMock.getHospitals.and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve([
                    { "uniqueId": "HOSP_1", "name": "Hospital 1" },
                    { "uniqueId": "HOSP_2", "name": "Hospital 2" }
                ]); 
                return deferred.promise;
            });					
			
			vm = $controller('RegisterPatientController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'RegisterPatientControllerService': registerPatientControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock,
                'DateTimeService': dateTimeServiceMock,
                'PatientHttpService': patientHttpServiceMock,
                'HospitalHttpService': hospitalHttpServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK,
				'STATE_PATIENT_START': STATE_PATIENT_START_MOCK,
				'STATE_PATIENT_DETAILS': STATE_PATIENT_DETAILS_MOCK                
			});
		});				
	});				
 

	it("should initialise the view model correctly", function() {

	 	scopeMock.$apply(); // Propagate promise resolution for async getHospitals request				
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_REGISTER_PATIENT_MOCK);
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();
		expect(registerPatientControllerServiceMock.getMaxYear).toHaveBeenCalled();
		expect(registerPatientControllerServiceMock.getYear).toHaveBeenCalled();
		expect(vm.hospitals).toEqual([{ "uniqueId": "HOSP_1", "name": "Hospital 1" }, { "uniqueId": "HOSP_2", "name": "Hospital 2" }, {"name": "Other"} ]);
        	
		expect(vm.isDateOfBirthKnown).toBe(null);
		expect(vm.isExternalScan).toBe(null);
		expect(vm.initials).toBe(null);
		expect(vm.day).toBe(null);
		expect(vm.month).toBe(null);
		expect(vm.year).toBe(null);
		expect(vm.dateOfBirth).toBe(null);
		expect(vm.estimatedAge).toBe(null);
		expect(vm.scanDate).toBe(null);
		expect(vm.scanTime).toBe(null);
		expect(vm.selectedHospital).toBe(null);
		expect(vm.otherHospital).toBe(null);
         
		expect(vm.onNext).toBeDefined();
		expect(vm.onScanNow).toBeDefined(); 

		expect(vm.onDateOfBirthKnownChanged).toBeDefined(); 
		expect(vm.onExternalScanChanged).toBeDefined(); 
		expect(vm.onSelectedHospitalChanged).toBeDefined(); 
		expect(vm.onInitialsChanged).toBeDefined(); 
		expect(vm.onDateChanged).toBeDefined();                
		expect(vm.isNextButtonEnabled).toBeDefined();

		expect(vm.showDateOfBirthCard).toBeDefined();
		expect(vm.showBirthDateConfirmationField).toBeDefined();
		expect(vm.showAgeCard).toBeDefined();
		expect(vm.showScanTimeCard).toBeDefined();
		expect(vm.showExternalHospitalCard).toBeDefined();
		expect(vm.showOtherHospitalField).toBeDefined();
		expect(vm.showInitialsInvalidMessage).toBeDefined();
		expect(vm.showDobInvalidMessage).toBeDefined();
		expect(vm.showYearOutOfRangeMessage).toBeDefined();
	});
 
	it("should delegate showDateOfBirthCard to controller.service", function() {

		vm.isDateOfBirthKnown = "is-date-of-birth-known";
		vm.showDateOfBirthCard();
		expect(registerPatientControllerServiceMock.showDateOfBirthCard).toHaveBeenCalledWith("is-date-of-birth-known");				
	});

	it("should delegate showBirthDateConfirmationField to controller.service", function() {

		vm.dateOfBirth = "date-of-birth";
		vm.showBirthDateConfirmationField();
		expect(registerPatientControllerServiceMock.showBirthDateConfirmationField).toHaveBeenCalledWith("date-of-birth");				
	});

	it("should delegate showAgeCard to controller.service", function() {

		vm.isDateOfBirthKnown = "is-date-of-birth-known";
		vm.showAgeCard();
		expect(registerPatientControllerServiceMock.showAgeCard).toHaveBeenCalledWith("is-date-of-birth-known");				
	});

	it("should delegate showScanTimeCard to controller.service", function() {

		vm.isExternalScan = "is-external-scan";
		vm.showScanTimeCard();
		expect(registerPatientControllerServiceMock.showScanTimeCard).toHaveBeenCalledWith("is-external-scan");				
	});

	it("should delegate showExternalHospitalCard to controller.service", function() {

		vm.isExternalScan = "is-external-scan";
		vm.showExternalHospitalCard();
		expect(registerPatientControllerServiceMock.showExternalHospitalCard).toHaveBeenCalledWith("is-external-scan");				
	});

	it("should delegate showOtherHospitalField to controller.service", function() {

		vm.selectedHospital = "selected-hospital";
		vm.showOtherHospitalField();
		expect(registerPatientControllerServiceMock.showOtherHospitalField).toHaveBeenCalledWith("selected-hospital");				
	});

	it("should delegate showInitialsInvalidMessage to controller.service", function() {

		vm.initials = "initials";
		vm.showInitialsInvalidMessage();
		expect(registerPatientControllerServiceMock.isInitialsInvalid).toHaveBeenCalledWith("initials");				
	});

	it("should delegate showDobInvalidMessage to controller.service", function() {
        registerPatientControllerServiceMock.areAllDateFieldsComplete.and.returnValue(true);
	    vm.day = "day";
        vm.month = "month";
        vm.year = "year";
		vm.showDobInvalidMessage();
		expect(registerPatientControllerServiceMock.areAllDateFieldsComplete).toHaveBeenCalledWith("day", "month", "year");				
		expect(registerPatientControllerServiceMock.isDobInvalidDate).toHaveBeenCalledWith("day", "month", "year");				
	});

	it("should delegate showYearOutOfRangeMessage to controller.service", function() {
        registerPatientControllerServiceMock.areAllDateFieldsComplete.and.returnValue(false);
	    vm.day = "day";
        vm.month = "month";
        vm.year = "year";
        vm.maxYear =  "max-year";
		vm.showYearOutOfRangeMessage();
		expect(registerPatientControllerServiceMock.isDobInvalidDate).toHaveBeenCalledWith("day", "month", "year");				
		expect(registerPatientControllerServiceMock.isYearOutOfRange).toHaveBeenCalledWith("year", 1900, "max-year");				
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

        vm.initials = "initials";
        vm.isDateOfBirthKnown = "is-date-of-birth-known";
        vm.dateOfBirth = "date-of-birth";
        vm.estimatedAge = "estimated-age";
        vm.isExternalScan = "is-external-scan";
        vm.scanDate = "scan-date";
        vm.scanTime = "scan-time";
        vm.selectedHospital = "selected-hospital";
        vm.otherHospital = "other-hospital";
		vm.isNextButtonEnabled();
		expect(registerPatientControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
            "initials",
            "is-date-of-birth-known",
            "date-of-birth",
            "estimated-age",
            "is-external-scan",
            "scan-date",
            "scan-time",
            "selected-hospital",
            "other-hospital"
         );				
	});

	it("should populate view model parameters appropriately when onScanNow is called", function() {

		vm.scanDate = null;
		vm.scanTime = null;
		vm.onScanNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.scanDate).not.toBe(null);				
		expect(vm.scanTime).not.toBe(null);				
	});

	it("should reset view model parameters appropriately when onDateOfBirthKnownChanged is called", function() {

        vm.day = "not-null";
        vm.month = "not-null";
        vm.year = "not-null";
        vm.dateOfBirth = "not-null";
        vm.estimatedAge = "not-null";
		vm.onDateOfBirthKnownChanged();
		expect(vm.day).toBe(null);				
		expect(vm.month).toBe(null);				
		expect(vm.year).toBe(null);				
		expect(vm.dateOfBirth).toBe(null);				
		expect(vm.estimatedAge).toBe(null);				
	});

	it("should reset view model parameters appropriately when onExternalScanChanged is called", function() {

        vm.scanDate = "not-null";
        vm.scanTime = "not-null";
        vm.selectedHospital = "not-null";
        vm.otherHospital = "not-null";
		vm.onExternalScanChanged();
		expect(vm.scanDate).toBe(null);				
		expect(vm.scanTime).toBe(null);				
		expect(vm.selectedHospital).toBe(null);				
		expect(vm.otherHospital).toBe(null);				
	});

	it("should reset view model parameters appropriately when onSelectedHospitalChanged is called", function() {

        vm.otherHospital = "not-null";
		vm.onSelectedHospitalChanged();
		expect(vm.otherHospital).toBe(null);				
	});

 	it("should reset view model parameters appropriately when onInitialsChanged is called", function() {

		vm.initials = null;
 		vm.onInitialsChanged("abc");
		expect(vm.initials).toBe("ABC");

		vm.initials = "not-null";
		vm.onInitialsChanged(null);
		expect(vm.initials).toBe("not-null");
	});

	it("should delegate onDateChanged to controller.service", function() {

 		vm.day = "day";
		vm.month = "month";
		vm.year = "year";
        vm.maxYear = "max-year";
		vm.onDateChanged();
		expect(registerPatientControllerServiceMock.getDateOfBirth).toHaveBeenCalledWith("day", "month", "year", "max-year");				       
 	});

	it("should make a 'registerPatient' request to the server when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": false}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientHttpServiceMock.registerPatient).toHaveBeenCalled();				
	});

	it("should not make a 'registerPatient' request to the server when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientHttpServiceMock.registerPatient).not.toHaveBeenCalled();				
	});
 
 	it("should display 'Registration Failed' popup when registration fails - initial request", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": false};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient registration failed");
	});

 	it("should display 'Patient Already Registered' popup when patient is already registered", function() {
 		var popupAlreadyCalled = false;
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			var reponse = popupAlreadyCalled ? false: true;
			deferred.resolve(reponse); // User selects Ok to data validation popup and Cancel to Patient Already Registered popup
			popupAlreadyCalled = true;
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Patient already registered");
	});

 	it("should make another 'registerPatient' request when user selects 'Ok' to 'Patient Already Registered' popup", function() {
		
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok to both data validation and Patient Already Registered popups
			return deferred.promise;
		});					

       ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientHttpServiceMock.registerPatient.calls.count()).toBe(2);				
	});

 	it("should not make another 'registerPatient' request when user selects 'Cancel' to 'Patient Already Registered' popup", function() {
		
  		var popupAlreadyCalled = false;
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			var reponse = popupAlreadyCalled ? false: true;
			deferred.resolve(reponse); // User selects Ok to data validation popup and Cancel to Patient Already Registered popup
			popupAlreadyCalled = true;
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientHttpServiceMock.registerPatient.calls.count()).toBe(1);				
	});

 	it("should display 'Registration Failed' popup when registration fails - confirmation request", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

		var registerPatientAlreadyCalled = false; 
        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response;
			if (registerPatientAlreadyCalled) {
				response = {"success": false, "patient": {"uniqueId": "dummy-uniwue-id"}};
			}
			else {
				response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			}
			deferred.resolve(response);
			registerPatientAlreadyCalled = true;
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient registration failed");
	});
 
	it("should save data and display 'Patient notes' popup when initial patient registration succeeds" , function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": false}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setUniqueId).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setId).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInitials).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setBirthDate).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setEstimatedAge).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setExternalScanHospitalName).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setScanDateTime).toHaveBeenCalled();

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient notes");
		
	});

	it("should save data and display 'Patient notes' popup when confirmation patient registration succeeds" , function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setUniqueId).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setId).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInitials).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setBirthDate).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setEstimatedAge).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setExternalScanHospitalName).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setScanDateTime).toHaveBeenCalled();

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient notes");
		
	});
 
	it("should go to state STATE_PATIENT_DETAILS when user selects 'Ok' on 'Patient notes' popup" , function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_DETAILS_MOCK);						
	});
 
	it("should go to state STATE_PATIENT_START when user cancels patient registration" , function() {
  		var popupAlreadyCalled = false;
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			var reponse = popupAlreadyCalled ? false: true;
			deferred.resolve(reponse); // User selects Ok to data validation popup and Cancel to Patient Already Registered popup
			popupAlreadyCalled = true;
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_START_MOCK);						
	});

	it("should go to state STATE_PATIENT_START when user dismisses 'Registration failed' - initial request" , function() {
         ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response = {"success": false, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			deferred.resolve(response); 
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_START_MOCK);						
	});
	
	it("should go to state STATE_PATIENT_START when user dismisses 'Registration failed' - confirmation request" , function() {
         ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User selects Ok
			return deferred.promise;
		});					

 		var registerPatientAlreadyCalled = false; 
        patientHttpServiceMock.registerPatient.and.callFake(function() {
			var deferred = $q.defer();
			var response;
			if (registerPatientAlreadyCalled) {
				response = {"success": false, "patient": {"uniqueId": "dummy-uniwue-id"}};
			}
			else {
				response = {"success": true, "patient": {"uniqueId": "dummy-uniwue-id", "id": 0, "isDuplicate": true}};
			}
			deferred.resolve(response);
			registerPatientAlreadyCalled = true;
			return deferred.promise;
		});					

		vm.isDemoMode = false;
 		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_START_MOCK);						
	});
});
