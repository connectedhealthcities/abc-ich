'use strict';

// This file contains the following tests
//
// 		it should initialise the view model correctly
//		it should delegate isNextButtonEnabled to controller.service
//		it should delegate showIsReversalTimeKnownCard to controller.service
//		it should delegate showReversalTimeCard to controller.service
//		it should delegate hideReversalAgentOptionNone to controller.service
//		it should reset view model parameters appropriately when onReversalAgentChanged is called
//		it should reset view model parameters appropriately when onReversalAgentAdministeredTimeKnownChanged is called
//      it should populate view model parameters appropriately when onReversalNow is called
// 		it should save data when user selects 'Ok' on validation popup
// 		it should go to correct state when user selects 'Ok' on validation popup
// 		it should not save data when user selects 'Cancel' on validation popup
// 		it should not change state when user selects 'Cancel' on validation popup

describe('ReversalAgentDetailsController', function() {

    var vm;
	var $q;
    var GCS_THRESHOLD_MOCK;
	var STATE_REVERSAL_AGENT_DETAILS_MOCK, STATE_BP_MANAGEMENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, reversalAgentDetailsControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, dateTimeServiceMock;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
            GCS_THRESHOLD_MOCK = 9;
			STATE_REVERSAL_AGENT_DETAILS_MOCK = "state-reversal-agent-details-mock";
            STATE_BP_MANAGEMENT_MOCK = "state-bp-management-mock";
 			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			reversalAgentDetailsControllerServiceMock = jasmine.createSpyObj('ReversalAgentDetailsControllerService spy', ['isNextButtonEnabled', 'showIsReversalTimeKnownCard', 'showReversalTimeCard', 'hideReversalAgentOptionNone']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'getUniqueId',
                'getReversalAgentAdministeredAtExternalHospital',
                'getGcsScore',
                'getReversalAgentType',
                'getReversalAgentAdministeredTimeKnown', 
                'getReversalAgentStartDateTime',
                'setReversalAgentType',
                'setReversalAgentAdministeredTimeKnown',
                'setReversalAgentStartDateTime',
            ]);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getDateTimeFromDateAndTime']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('ReversalAgentDetailsController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'ReversalAgentDetailsControllerService': reversalAgentDetailsControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DateTimeService': dateTimeServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'STATE_REVERSAL_AGENT_DETAILS': STATE_REVERSAL_AGENT_DETAILS_MOCK,
				'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK                
			});
		});				
	});				
 
	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_REVERSAL_AGENT_DETAILS_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();	

 		expect(patientCacheServiceMock.getReversalAgentAdministeredAtExternalHospital).toHaveBeenCalled();
 		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
         
		expect(patientCacheServiceMock.getReversalAgentType).toHaveBeenCalled();
		expect(patientCacheServiceMock.getReversalAgentAdministeredTimeKnown).toHaveBeenCalled();
		expect(patientCacheServiceMock.getReversalAgentStartDateTime).toHaveBeenCalled();
        
		expect(vm.onNext).toBeDefined();
		expect(vm.onReversalNow).toBeDefined();
		expect(vm.onReversalAgentChanged).toBeDefined();
		expect(vm.onReversalAgentAdministeredTimeKnownChanged).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.showIsReversalTimeKnownCard).toBeDefined();
		expect(vm.showReversalTimeCard).toBeDefined();
		expect(vm.hideReversalAgentOptionNone).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

        vm.reversalAgent = "reversal-agent";
        vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
        vm.reversalAgentAdministeredTimeKnown = "reversal-agent-administered-time-known"; 
        vm.reversalDate = "reversal-date";
        vm.reversalTime = "reversal-time";
		vm.isNextButtonEnabled();
		expect(reversalAgentDetailsControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
			"reversal-agent",
			"reversal-agent-administered-at-external-hospital",
			"reversal-agent-administered-time-known",
			"reversal-date",
			"reversal-time"
		);				
	});
 
	it("should delegate showIsReversalTimeKnownCard to controller.service", function() {

		vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
		vm.showIsReversalTimeKnownCard();
		expect(reversalAgentDetailsControllerServiceMock.showIsReversalTimeKnownCard).toHaveBeenCalledWith("reversal-agent-administered-at-external-hospital");				
	});

	it("should delegate showReversalTimeCard to controller.service", function() {

		vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
        vm.reversalAgentAdministeredTimeKnown = "reversal-agent-administered-time-known";
        vm.reversalAgent = "reversal-agent";
		vm.showReversalTimeCard();
		expect(reversalAgentDetailsControllerServiceMock.showReversalTimeCard).toHaveBeenCalledWith("reversal-agent-administered-at-external-hospital", "reversal-agent-administered-time-known", "reversal-agent");				
	});

	it("should delegate hideReversalAgentOptionNone to controller.service", function() {

		vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
		vm.hideReversalAgentOptionNone();
		expect(reversalAgentDetailsControllerServiceMock.hideReversalAgentOptionNone).toHaveBeenCalledWith("reversal-agent-administered-at-external-hospital");				
	});

    it("should reset view model parameters appropriately when onReversalAgentChanged is called", function() {

        vm.reversalAgentAdministeredTimeKnown = "not-null";
        vm.reversalDate = "not-null";
        vm.reversalTime = "not-null";
		vm.onReversalAgentChanged();
		expect(vm.reversalAgentAdministeredTimeKnown).toBe(null);				
		expect(vm.reversalDate).toBe(null);				
		expect(vm.reversalTime).toBe(null);				
	});

    it("should reset view model parameters appropriately when onReversalAgentAdministeredTimeKnownChanged is called", function() {

        vm.reversalDate = "not-null";
        vm.reversalTime = "not-null";
		vm.onReversalAgentAdministeredTimeKnownChanged();
		expect(vm.reversalDate).toBe(null);				
		expect(vm.reversalTime).toBe(null);				
	});

	it("should populate view model parameters appropriately when onReversalNow is called", function() {

		vm.reversalDate = null;
		vm.reversalTime = null;
		vm.onReversalNow();
        expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();
		expect(vm.reversalDate).not.toBe(null);				
		expect(vm.reversalTime).not.toBe(null);				
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

		expect(patientCacheServiceMock.setReversalAgentType).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setReversalAgentAdministeredTimeKnown).toHaveBeenCalled();		
		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setReversalAgentStartDateTime).toHaveBeenCalled();		
	});

	it("should go to correct state when user selects 'Ok' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.								
		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();		

        vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.								
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);		
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(patientCacheServiceMock.setReversalAgentType).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setReversalAgentAdministeredTimeKnown).not.toHaveBeenCalled();		
		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setReversalAgentStartDateTime).not.toHaveBeenCalled();		
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
		expect(stateCacheServiceMock.goLatestStateTabC).not.toHaveBeenCalled();
	});
});
