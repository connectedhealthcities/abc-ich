'use strict';

describe('ConfirmBeriplexDoseController', function() {

    var vm;
	var $q;
	var STATE_CONFIRM_BERIPLEX_DOSE_MOCK, STATE_ADMINISTER_BERIPLEX_MOCK;
    var scopeMock, stateMock, ionicPopupMock, confirmBeriplexDoseControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_CONFIRM_BERIPLEX_DOSE_MOCK = "state-confirm-beriplex-dose-mock";
            STATE_ADMINISTER_BERIPLEX_MOCK = "state-administer-beriplex-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			confirmBeriplexDoseControllerServiceMock = jasmine.createSpyObj('ConfirmBeriplexDoseControllerService spy', ['isNextButtonEnabled', 'isShowActualDose']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getCalculatedBeriplexDose', 'setActualBeriplexDose']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('ConfirmBeriplexDoseController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'ConfirmBeriplexDoseControllerService': confirmBeriplexDoseControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_CONFIRM_BERIPLEX_DOSE': STATE_CONFIRM_BERIPLEX_DOSE_MOCK,
				'STATE_ADMINISTER_BERIPLEX': STATE_ADMINISTER_BERIPLEX_MOCK                
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_CONFIRM_BERIPLEX_DOSE_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

		expect(vm.overrideCalculatedDose).toBe(null);
		expect(vm.actualDose).toBe(null);
		expect(patientCacheServiceMock.getCalculatedBeriplexDose).toHaveBeenCalled();

		expect(vm.onNext).toBeDefined();
		expect(vm.onOverrideCalculatedDoseChanged).toBeDefined();		
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.isShowActualDose).toBeDefined();		
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.overrideCalculatedDose = "override-calculated-dose";
		vm.actualDose = "actual-dose";
		vm.isNextButtonEnabled();
		expect(confirmBeriplexDoseControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("override-calculated-dose", "actual-dose");				
	});

	it("should delegate isShowActualDose to controller.service", function() {

		vm.overrideCalculatedDose = "override-calculated-dose";
		vm.isShowActualDose();
		expect(confirmBeriplexDoseControllerServiceMock.isShowActualDose).toHaveBeenCalledWith("override-calculated-dose");				
	});

	it("should reset view model parameters appropriately when onOverrideCalculatedDoseChanged is called", function() {

		vm.actualDose = "not-null";
		vm.onOverrideCalculatedDoseChanged();
		expect(vm.actualDose).toBe(null);				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setActualBeriplexDose).toHaveBeenCalled();				
	});

	it("should go to state STATE_ADMINISTER_BERIPLEX when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_ADMINISTER_BERIPLEX_MOCK);				
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setActualBeriplexDose).not.toHaveBeenCalled();				
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
