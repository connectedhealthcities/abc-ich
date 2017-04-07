'use strict';

describe('GcsEntryController', function() {

    var vm;
	var $q;
    var GCS_THRESHOLD_MOCK;
	var STATE_GCS_ENTRY_MOCK, STATE_ANTICOAGULANT_IDENTIFICATION_MOCK;
    var scopeMock, stateMock, ionicPopupMock, gcsEntryControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;


    beforeEach(function() {

        module('app.general');
 
		angular.mock.inject(function($controller, $rootScope, _$q_)  {
			$q = _$q_;
			STATE_GCS_ENTRY_MOCK = "state-gcs-entry";
            STATE_ANTICOAGULANT_IDENTIFICATION_MOCK = "state-anticoagulant-identification";
            GCS_THRESHOLD_MOCK = 9;
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
			gcsEntryControllerServiceMock = jasmine.createSpyObj('GcsEntryControllerService spy', ['isNextButtonEnabled', 'getGcsTotal']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'setGcsScoreEye', 'setGcsScoreVerbal', 'setGcsScoreMotor', 'setGcsScore']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('GcsEntryController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'GcsEntryControllerService': gcsEntryControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_GCS_ENTRY': STATE_GCS_ENTRY_MOCK,
				'STATE_ANTICOAGULANT_IDENTIFICATION': STATE_ANTICOAGULANT_IDENTIFICATION_MOCK                
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_GCS_ENTRY_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();		
		expect(vm.eyeValue).toBe(null);
		expect(vm.verbalValue).toBe(null);
		expect(vm.motorValue).toBe(null);
		expect(vm.gcsTotal).toBe(null);
         
		expect(vm.onNext).toBeDefined();
		expect(vm.gcsValueChanged).toBeDefined();        
		expect(vm.isNextButtonEnabled).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.eyeValue = "eye-value";
		vm.verbalValue = "verbal-value";
		vm.motorValue = "motor-value";
		vm.isNextButtonEnabled();
		expect(gcsEntryControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("eye-value", "verbal-value", "motor-value");				
	});

	it("should delegate gcsValueChanged to controller.service", function() {

		vm.eyeValue = "eye-value";
		vm.verbalValue = "verbal-value";
		vm.motorValue = "motor-value";
		vm.gcsValueChanged();
		expect(gcsEntryControllerServiceMock.getGcsTotal).toHaveBeenCalledWith("eye-value", "verbal-value", "motor-value");				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

 		vm.gcsTotal = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setGcsScoreEye).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreVerbal).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreMotor).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScore).toHaveBeenCalled();				
	});
 
	it("should go to state STATE_NEUROSURGERY_REFERRAL_CRITERIA when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.gcsTotal = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_ANTICOAGULANT_IDENTIFICATION_MOCK);				
	});

	it("should display 'Stabilise Patient' Popup when user selects 'Ok' on validation popup (GCS < GCS_THRESHOLD)", function() {
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

 		vm.gcsTotal = GCS_THRESHOLD_MOCK - 1;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Stabilise patient");

		expect(patientCacheServiceMock.setGcsScoreEye).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreVerbal).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreMotor).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScore).toHaveBeenCalled();				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_ANTICOAGULANT_IDENTIFICATION_MOCK);				
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setGcsScoreEye).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreVerbal).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScoreMotor).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setGcsScore).not.toHaveBeenCalled();				
	});

	it("should not change state when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).not.toHaveBeenCalled();				
	});

});
