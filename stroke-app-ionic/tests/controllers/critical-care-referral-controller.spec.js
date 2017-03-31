'use strict';

// This file contains the following tests
//
// 		it should initialise the view model correctly
//		it should delegate isNextButtonEnabled to controller.service
// 		it should save data when user selects 'Ok' on validation popup
// 		it should go to correct state when user selects 'Ok' on validation popup
// 		it should not save data when user selects 'Cancel' on validation popup
// 		it should not change state when user selects 'Cancel' on validation popup

describe('CriticalCareReferralController', function() {

    var vm;
	var $q;
    var GCS_THRESHOLD_MOCK;
	var STATE_CRITICAL_CARE_REFERRAL_MOCK, STATE_PATIENT_END_MOCK;
    var scopeMock, stateMock, ionicPopupMock, criticalCareReferralControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.protocolB');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
            GCS_THRESHOLD_MOCK = 9;
			STATE_CRITICAL_CARE_REFERRAL_MOCK = "state-critical-care-referral-mock";
            STATE_PATIENT_END_MOCK = "state-patient-end-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			criticalCareReferralControllerServiceMock = jasmine.createSpyObj('CriticalCareReferralControllerService spy', ['isNextButtonEnabled']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getGcsScore', 'getIsReferredToCriticalCare', 'setIsReferredToCriticalCare']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode', 'getIsReferredToCriticalCare', 'setIsReferredToCriticalCare']);
			
			vm = $controller('CriticalCareReferralController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'CriticalCareReferralControllerService': criticalCareReferralControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'STATE_CRITICAL_CARE_REFERRAL': STATE_CRITICAL_CARE_REFERRAL_MOCK,
				'STATE_PATIENT_END': STATE_PATIENT_END_MOCK                
			});
		});				
	});				
 
	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_CRITICAL_CARE_REFERRAL_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsReferredToCriticalCare).toHaveBeenCalled();
        
		expect(vm.onNext).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
	});
 
	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.isReferredToCriticalCare = "is-referred-to-critical-care";
		vm.isNextButtonEnabled();
		expect(criticalCareReferralControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("is-referred-to-critical-care");				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(patientCacheServiceMock.setIsReferredToCriticalCare).toHaveBeenCalled();				
	});

	it("should go to correct state when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);				

        vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();				
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setIsReferredToCriticalCare).not.toHaveBeenCalled();				
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
		expect(stateCacheServiceMock.goLatestStateTabC).not.toHaveBeenCalled();				
	});

});
