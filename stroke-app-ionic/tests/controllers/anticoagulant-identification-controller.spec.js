'use strict';

describe('AnticoagulantIdentificationController', function() {

    var vm;
	var $q;
	var STATE_ANTICOAGULANT_IDENTIFICATION_MOCK, STATE_CALCULATE_BERIPLEX_DOSE_MOCK, STATE_REVERSAL_AGENT_DETAILS_MOCK, STATE_BP_MANAGEMENT_MOCK;
    var GCS_THRESHOLD_MOCK;
    var scopeMock, stateMock, ionicPopupMock, anticoagulantIdentificationControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_ANTICOAGULANT_IDENTIFICATION_MOCK = "state-anticoagulant-identification-mock";
            STATE_CALCULATE_BERIPLEX_DOSE_MOCK = "state-calculate-beriplex-dose-mock";
            STATE_REVERSAL_AGENT_DETAILS_MOCK = "state-reversal-agent-details-mock";
 			STATE_BP_MANAGEMENT_MOCK = "state-bp-management-mock";
            GCS_THRESHOLD_MOCK = 9;
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
			anticoagulantIdentificationControllerServiceMock = jasmine.createSpyObj('AnticoagulantIdentificationControllerService spy', ['isNextButtonEnabled', 'isShowVitkList', 'isShowDoacList', 'getSliderConfig']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getGcsScore', 'getAnticoagulantType', 'getAnticoagulantName', 'setAnticoagulantType', 'setAnticoagulantName']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

			anticoagulantIdentificationControllerServiceMock.getSliderConfig.and.returnValue({"images": "test-images", "options": "test-options"});
		
			vm = $controller('AnticoagulantIdentificationController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'AnticoagulantIdentificationControllerService': anticoagulantIdentificationControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
				'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'STATE_ANTICOAGULANT_IDENTIFICATION': STATE_ANTICOAGULANT_IDENTIFICATION_MOCK,
				'STATE_CALCULATE_BERIPLEX_DOSE': STATE_CALCULATE_BERIPLEX_DOSE_MOCK,
				'STATE_REVERSAL_AGENT_DETAILS': STATE_REVERSAL_AGENT_DETAILS_MOCK,                              
				'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK                              
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_ANTICOAGULANT_IDENTIFICATION_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();

		expect(patientCacheServiceMock.getAnticoagulantType).toHaveBeenCalled();
		expect(patientCacheServiceMock.getAnticoagulantName).toHaveBeenCalled();

		expect(anticoagulantIdentificationControllerServiceMock.getSliderConfig).toHaveBeenCalled();
        expect(vm.sliderImages).toBe("test-images");
        expect(vm.sliderOptions).toBe("test-options");

		expect(vm.onNext).toBeDefined();
		expect(vm.onViewDoacs).toBeDefined();
		expect(vm.anticoagulantTypeChanged).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.isShowVitkList).toBeDefined();
		expect(vm.isShowDoacList).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.anticoagulantType = "anticoagulant-type";
		vm.anticoagulantName = "anticoagulant-name";
		vm.isNextButtonEnabled();
		expect(anticoagulantIdentificationControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("anticoagulant-type", "anticoagulant-name");				
	});

	it("should delegate isShowVitkList to controller.service", function() {

		vm.anticoagulantType = "anticoagulant-type";
		vm.isShowVitkList();
		expect(anticoagulantIdentificationControllerServiceMock.isShowVitkList).toHaveBeenCalledWith("anticoagulant-type");				
	});

	it("should delegate isShowDoacList to controller.service", function() {

		vm.anticoagulantType = "anticoagulant-type";
		vm.isShowDoacList();
		expect(anticoagulantIdentificationControllerServiceMock.isShowDoacList).toHaveBeenCalledWith("anticoagulant-type");				
	});

	it("should reset view model parameters appropriately when anticoagulantTypeChanged is called", function() {

		vm.anticoagulantName = "not-null";
		vm.anticoagulantTypeChanged();
		expect(vm.anticoagulantName).toBe(null);				
	});

	it("should display popup when onViewDoacs is called", function() {

		vm.onViewDoacs();
		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("DOAC images");
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

		expect(patientCacheServiceMock.setAnticoagulantType).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setAnticoagulantName).toHaveBeenCalled();		
	});

	it("should show correct popup and go to the correct state when user selects 'Ok' on validation popup", function() {
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

		vm.gcsScore = GCS_THRESHOLD_MOCK;

		vm.anticoagulantType = "Unknown";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
 		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Anticoagulant unknown");
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);		

		vm.anticoagulantType = "Vitamin K antagonist";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);		

		vm.anticoagulantType = "DOAC";
		vm.anticoagulantName = "Dabigatran";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
 		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("ICH on DOAC");
		expect(stateMock.go).toHaveBeenCalledWith(STATE_REVERSAL_AGENT_DETAILS_MOCK);	

		vm.anticoagulantType = "DOAC";
		vm.anticoagulantName = "Not Dabigatran";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
 		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("ICH on DOAC");
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);	

		vm.anticoagulantType = "None";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);

		vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
				
		vm.anticoagulantType = "None";
		vm.onNext(); // call the click handler
		scopeMock.$apply(); // Propagate promise resolutions.
		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();

	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(patientCacheServiceMock.setAnticoagulantType).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setAnticoagulantName).not.toHaveBeenCalled();		
	});

	it("should not change state when user selects 'Cancel' on validation popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(stateMock.go).not.toHaveBeenCalled();		
		expect(stateCacheServiceMock.goLatestStateTabC).not.toHaveBeenCalled();		
	});

});
