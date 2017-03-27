'use strict';

// This file contains the following tests
//
// Initialisation
// 		it initialises the view model correctly
//		it should delegate isNextButtonEnabled to controller.service
//		it should delegate isShowVitkList to controller.service
//		it should delegate isShowDoacList to controller.service
//      it should reset view model parameters appropriately when anticoagulantTypeChanged is called
//      it should display popup when onViewDoacs is called
//
// User selects 'Next' button and Confirms the data validation popup (GCS >= GCS_THRESHOLD)
// 		it should save data
// 		it should show 'Anticoagulant Unknown' popup and go to state STATE_CALCULATE_BERIPLEX_DOSE when anticoagulant type is 'Unknown'
// 		it should go to state STATE_CALCULATE_BERIPLEX_DOSE when anticoagulant type is 'Vitamin K antagonist'
// 		it should show 'Anticoagulant Is Doac' popup and go to state STATE_REVERSAL_AGENT_DETAILS when anticoagulant type is 'DOAC'
// 		it should go to state STATE_BP_MANAGEMENT when anticoagulant type is 'None'
//
// User selects 'Next' button and Confirms the data validation popup (GCS < GCS_THRESHOLD)
// 		it should go to 'Latest State Tab C' when anticoagulant type is 'None'
//
// User selects 'Next' button and Cancels the data validation popup
// 		it should not save data
// 		it should not change state
//

describe('AnticoagulantIdentificationController - Initialisation', function() {

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
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getAnticoagulantType', 'getAnticoagulantName', 'setAnticoagulantType', 'setAnticoagulantName']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
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

	it("initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_ANTICOAGULANT_IDENTIFICATION_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

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

	it("it should delegate isShowVitkList to controller.service", function() {

		vm.anticoagulantType = "anticoagulant-type";
		vm.isShowVitkList();
		expect(anticoagulantIdentificationControllerServiceMock.isShowVitkList).toHaveBeenCalledWith("anticoagulant-type");				
	});

	it("it should delegate isShowDoacList to controller.service", function() {

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
});

describe("AnticoagulantIdentificationController - User selects 'Next' button and Confirms the data validation popup (GCS >= GCS_THRESHOLD)", function() {

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
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getAnticoagulantType', 'getAnticoagulantName', 'setAnticoagulantType', 'setAnticoagulantName', 'getGcsScore']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabB', 'goLatestStateTabC']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

			anticoagulantIdentificationControllerServiceMock.getSliderConfig.and.returnValue({"images": "test-images", "options": "test-options"});
			patientCacheServiceMock.getGcsScore.and.returnValue(9);

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

	it("should save data", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(patientCacheServiceMock.setAnticoagulantType).toHaveBeenCalled();		
		expect(patientCacheServiceMock.setAnticoagulantName).toHaveBeenCalled();		
	});

	it("should show 'Anticoagulant Unknown' popup and go to state STATE_CALCULATE_BERIPLEX_DOSE when anticoagulant type is 'Unknown'", function() {

        vm.anticoagulantType = "Unknown";
		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.

 		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Anticoagulant unknown");
		scopeMock.$apply(); // Propagate promise resolution for Anticoagulant unknown popup.
       				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);		
	});

	it("should go to state STATE_CALCULATE_BERIPLEX_DOSE when anticoagulant type is 'Vitamin K antagonist'", function() {

        vm.anticoagulantType = "Vitamin K antagonist";
		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.

		expect(stateMock.go).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);		
	});

	it("should show 'Anticoagulant Is Doac' popup and go to state STATE_REVERSAL_AGENT_DETAILS when anticoagulant type is 'DOAC'", function() {

        vm.anticoagulantType = "DOAC";
		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.

 		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("ICH on DOAC");
		scopeMock.$apply(); // Propagate promise resolution for Anticoagulant unknown popup.

		expect(stateMock.go).toHaveBeenCalledWith(STATE_REVERSAL_AGENT_DETAILS_MOCK);		
	});

	it("should go to 'Latest State Tab B' when anticoagulant type is 'None'", function() {

        vm.anticoagulantType = "None";
		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.

		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);		
	});
});

describe("AnticoagulantIdentificationController - User selects 'Next' button and Confirms the data validation popup (GCS >= GCS_THRESHOLD)", function() {

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
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getAnticoagulantType', 'getAnticoagulantName', 'setAnticoagulantType', 'setAnticoagulantName', 'getGcsScore']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabB', 'goLatestStateTabC']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

			anticoagulantIdentificationControllerServiceMock.getSliderConfig.and.returnValue({"images": "test-images", "options": "test-options"});
			patientCacheServiceMock.getGcsScore.and.returnValue(8);

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

	it("should go to 'Latest State Tab C' when anticoagulant type is 'None'", function() {

        vm.anticoagulantType = "None";
		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.

		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();		
	});
});

describe("AnticoagulantIdentificationController - User selects 'Next' button and Cancels the data validation popup", function() {

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
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			anticoagulantIdentificationControllerServiceMock = jasmine.createSpyObj('AnticoagulantIdentificationControllerService spy', ['isNextButtonEnabled', 'isShowVitkList', 'isShowDoacList', 'getSliderConfig']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'getAnticoagulantType', 'getAnticoagulantName', 'setAnticoagulantType', 'setAnticoagulantName']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

			anticoagulantIdentificationControllerServiceMock.getSliderConfig.and.returnValue({"images": "test-images", "options": "test-options"});

			ionicPopupMock.confirm.and.callFake(function() {
				var deferred = $q.defer();
				deferred.resolve(false); // User selects Cancel
				return deferred.promise;
			});					
		
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

	it("should not save data", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(stateMock.go).not.toHaveBeenCalled();		
	});

	it("should not change state", function() {

		vm.onNext(); // call the click handler

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
		scopeMock.$apply(); // Propagate promise resolution for data confirmation popup.				

		expect(patientCacheServiceMock.setAnticoagulantType).not.toHaveBeenCalled();		
		expect(patientCacheServiceMock.setAnticoagulantName).not.toHaveBeenCalled();		
	});
});