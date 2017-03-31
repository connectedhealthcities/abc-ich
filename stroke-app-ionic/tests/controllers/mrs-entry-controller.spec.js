'use strict';

// This file contains the following tests
//
// 		it should initialise the view model correctly
//		it should delegate isNextButtonEnabled to controller.service
// 		it should save data when user selects 'Ok' on validation popup
// 		it should go to state STATE_NEUROSURGERY_REFERRAL_CRITERIA when user selects 'Ok' on validation popup
// 		it should not save data when user selects 'Cancel' on validation popup
// 		it should not change state when user selects 'Cancel' on validation popup

describe('MrsEntryController', function() {

    var vm;
	var $q;
	var STATE_MRS_ENTRY_MOCK, STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK;
    var scopeMock, stateMock, ionicPopupMock, mrsEntryControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.protocolC');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_MRS_ENTRY_MOCK = "state-mrs-entry-mock";
            STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK = "state-neurosurgery-referral-criteria-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			mrsEntryControllerServiceMock = jasmine.createSpyObj('MrsEntryControllerService spy', ['isNextButtonEnabled']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'setPremorbidMrsScore']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('MrsEntryController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'MrsEntryControllerService': mrsEntryControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_MRS_ENTRY': STATE_MRS_ENTRY_MOCK,
				'STATE_NEUROSURGERY_REFERRAL_CRITERIA': STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK                
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_MRS_ENTRY_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();		
		expect(vm.mrsValue).toBe(null);
         
		expect(vm.onNext).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.mrsValue = "mrs-value";
		vm.isNextButtonEnabled();
		expect(mrsEntryControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("mrs-value");				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setPremorbidMrsScore).toHaveBeenCalled();				
	});

	it("should go to state STATE_NEUROSURGERY_REFERRAL_CRITERIA when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK);				
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setPremorbidMrsScore).not.toHaveBeenCalled();				
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
