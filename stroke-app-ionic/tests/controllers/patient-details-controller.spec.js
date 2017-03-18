'use strict';

// This file contains the following tests
//
// Initialisation
// 		it initialises the view model correctly
//
// User selects 'Next' button and Ok to data validation popup
// 		it should save data
// 		it should go to state STATE_GCS_ENTRY
//
// User selects 'Next' button and Cancel to data validation popup
// 		it should not save data
// 		it should not change state

describe('PatientDetailsController - Initialisation', function() {

    var vm;
	var $q;
	var STATE_PATIENT_DETAILS_MOCK, STATE_GCS_ENTRY_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientDetailsControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, dateTimeServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_PATIENT_DETAILS_MOCK = "state-patient-details-mock";
            STATE_GCS_ENTRY_MOCK = "state-gcs-entry-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientDetailsControllerServiceMock = jasmine.createSpyObj('PatientDetailsControllerService spy', ['isNextButtonEnabled', 'isShowTimeSinceOnsetText']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'setDoorDateTime', 'setOnsetDateTime', 'setIsLastSeenWellOnset', 'setIsBestEstimateOnset']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getTimeSinceOnsetText', 'getDateTimeFromDateAndTime']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('PatientDetailsController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientDetailsControllerService': patientDetailsControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DateTimeService': dateTimeServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_PATIENT_DETAILS': STATE_PATIENT_DETAILS_MOCK,
				'STATE_GCS_ENTRY': STATE_GCS_ENTRY_MOCK                
			});
		});				
	});				

	it("initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_PATIENT_DETAILS_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();		
		expect(vm.doorDate).toBe(null);
		expect(vm.doorTime).toBe(null);
		expect(vm.onsetDate).toBe(null);
		expect(vm.onsetTime).toBe(null);
		expect(vm.isOnsetLastSeenWell).toBe(null);
		expect(vm.isOnsetBestEstimate).toBe(null);
		expect(vm.timeSinceOnsetText).toBe(null);
         
		expect(vm.onNext).toBeDefined();
		expect(vm.onDoorNow).toBeDefined();
		expect(vm.onOnsetNow).toBeDefined();
		expect(vm.onOnsetChanged).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.isShowTimeSinceOnsetText).toBeDefined();
	});
});

describe("PatientDetailsController - User selects 'Next' button and Ok to data validation popup", function() {

    var vm;
	var $q;
	var STATE_PATIENT_DETAILS_MOCK, STATE_GCS_ENTRY_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientDetailsControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, dateTimeServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_PATIENT_DETAILS_MOCK = "state-patient-details-mock";
            STATE_GCS_ENTRY_MOCK = "state-gcs-entry-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientDetailsControllerServiceMock = jasmine.createSpyObj('PatientDetailsControllerService spy', ['isNextButtonEnabled', 'isShowTimeSinceOnsetText']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'setDoorDateTime', 'setOnsetDateTime', 'setIsLastSeenWellOnset', 'setIsBestEstimateOnset']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getTimeSinceOnsetText', 'getDateTimeFromDateAndTime']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			ionicPopupMock.confirm.and.callFake(function() {
				var deferred = $q.defer();
				deferred.resolve(true); // User selects Ok
				return deferred.promise;
			});					

			vm = $controller('PatientDetailsController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientDetailsControllerService': patientDetailsControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DateTimeService': dateTimeServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_PATIENT_DETAILS': STATE_PATIENT_DETAILS_MOCK,
				'STATE_GCS_ENTRY': STATE_GCS_ENTRY_MOCK                
			});
		});				
	});				

	it("should save data", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(dateTimeServiceMock.getDateTimeFromDateAndTime.calls.count()).toBe(2);
		expect(patientCacheServiceMock.setDoorDateTime).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setOnsetDateTime).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setIsLastSeenWellOnset).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setIsBestEstimateOnset).toHaveBeenCalled();		
	});

	it("it should go to state STATE_GCS_ENTRY", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				
				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_GCS_ENTRY_MOCK);		
	});
});

describe("PatientDetailsController - User selects 'Next' button and Ok to data validation popup", function() {

    var vm;
	var $q;
	var STATE_PATIENT_DETAILS_MOCK, STATE_GCS_ENTRY_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientDetailsControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, dateTimeServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_PATIENT_DETAILS_MOCK = "state-patient-details-mock";
            STATE_GCS_ENTRY_MOCK = "state-gcs-entry-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientDetailsControllerServiceMock = jasmine.createSpyObj('PatientDetailsControllerService spy', ['isNextButtonEnabled', 'isShowTimeSinceOnsetText']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'setDoorDateTime', 'setOnsetDateTime', 'setIsLastSeenWellOnset', 'setIsBestEstimateOnset']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getTimeSinceOnsetText', 'getDateTimeFromDateAndTime']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			ionicPopupMock.confirm.and.callFake(function() {
				var deferred = $q.defer();
				deferred.resolve(false); // User selects Cancel
				return deferred.promise;
			});					

			vm = $controller('PatientDetailsController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientDetailsControllerService': patientDetailsControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DateTimeService': dateTimeServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_PATIENT_DETAILS': STATE_PATIENT_DETAILS_MOCK,
				'STATE_GCS_ENTRY': STATE_GCS_ENTRY_MOCK                
			});
		});				
	});				

	it("should not save data", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).not.toHaveBeenCalled();
		expect(patientCacheServiceMock.setDoorDateTime).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setOnsetDateTime).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setIsLastSeenWellOnset).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setIsBestEstimateOnset).not.toHaveBeenCalled();		
	});

	it("it should not change state", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				
				
		expect(stateMock.go).not.toHaveBeenCalled();		
	});
});
