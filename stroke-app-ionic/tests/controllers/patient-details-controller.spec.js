'use strict';

describe('PatientDetailsController', function() {

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

	it("should initialise the view model correctly", function() {
				
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

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.doorDate = "door-date";
        vm.doorTime = "door-time";
        vm.onsetDate = "onset-date";
        vm.onsetTime = "onset-time";
        vm.isOnsetLastSeenWell = "is-onset-last-seen-well";
        vm.isOnsetBestEstimate = "is-onset-best-estimate";		
		vm.isNextButtonEnabled();
		expect(patientDetailsControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
			"door-date",
			"door-time",
			"onset-date",
			"onset-time",
			"is-onset-last-seen-well",
			"is-onset-best-estimate"
		);				
	});

	it("should delegate isShowTimeSinceOnsetText to controller.service", function() {

		vm.timeSinceOnsetText = "time-since-onset-text";
		vm.isShowTimeSinceOnsetText();
		expect(patientDetailsControllerServiceMock.isShowTimeSinceOnsetText).toHaveBeenCalledWith("time-since-onset-text");				
	});

	it("should delegate onOnsetChanged to DateTimeService", function() {

		vm.onOnsetChanged();
		expect(dateTimeServiceMock.getTimeSinceOnsetText).toHaveBeenCalled();				
	});

	it("should populate view model parameters appropriately when onDoorNow is called", function() {

		vm.doorDate = null;
		vm.doorTime = null;
		vm.onDoorNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.doorDate).not.toBe(null);				
		expect(vm.doorTime).not.toBe(null);				
	});

	it("should populate view model parameters appropriately when onOnsetNow is called", function() {

		vm.onsetDate = null;
		vm.onsetTime = null;
		vm.onOnsetNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.onsetDate).not.toBe(null);				
		expect(vm.onsetTime).not.toBe(null);				
		expect(dateTimeServiceMock.getTimeSinceOnsetText).toHaveBeenCalled();				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

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

	it("should go to state STATE_GCS_ENTRY when user selects 'Ok' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				
				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_GCS_ENTRY_MOCK);		
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

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

	it("should not change state when user selects 'Cancel' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				
				
		expect(stateMock.go).not.toHaveBeenCalled();		
	});
});
