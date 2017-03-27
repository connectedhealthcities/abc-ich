'use strict';

// This file contains the following tests
//
// 		it initialises the view model correctly
//		it should delegate isNextButtonEnabled to controller.service
//		it should delegate showReversalAgentAdministeredAtExternalHospitalCard to controller.service
//		it should delegate showAdministerBeriplexWithoutInrCard to controller.service
//		it should delegate showInrCard to controller.service
//		it should delegate showEstimatedWeightCard to controller.service
//		it should delegate showBeriplexAdministrationOverrideCard to controller.service
//		it should reset view model parameters appropriately when onReversalAgentAdministeredAtExternalHospitalChanged is called
//		it should reset view model parameters appropriately when onAdministerBeriplexWithoutInrChanged is called
//		it should reset view model parameters appropriately when onInrValueChanged is called
//		it should reset view model parameters appropriately when onWeightInKgChanged is called
//		it should reset view model parameters appropriately when onWeightInStonesChanged is called
//		it should populate view model parameters appropriately when onInrNow is called
// 		it should save data when user selects 'Ok' on validation popup
// 		it should go to the correct state when user selects 'Ok' on validation popup
//		it should display 'Inr Below Treament Range' popup
// 		it should not save data when user selects 'Cancel' on validation popup
// 		it should not change state when user selects 'Cancel' on validation popup

describe('CalculateBeriplexDoseController', function() {

    var vm;
	var $q;
 	var INR_THRESHOLD_MOCK, GCS_THRESHOLD_MOCK;
	var STATE_CALCULATE_BERIPLEX_DOSE_MOCK, STATE_CONFIRM_BERIPLEX_DOSE_MOCK, STATE_REVERSAL_AGENT_DETAILS_MOCK, STATE_BP_MANAGEMENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, calculateBeriplexDoseControllerServiceMock; 
    var patientCacheServiceMock, dateTimeServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
            INR_THRESHOLD_MOCK = 1.3;
            GCS_THRESHOLD_MOCK = 9;
            STATE_CALCULATE_BERIPLEX_DOSE_MOCK = "state-calculate-beriplex-dose-mock"
			STATE_CONFIRM_BERIPLEX_DOSE_MOCK = "state-confirm-beriplex-dose-mock";
            STATE_REVERSAL_AGENT_DETAILS_MOCK = "state-reversal-agent-details-mock";
            STATE_BP_MANAGEMENT_MOCK = "state-bp-management-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
			calculateBeriplexDoseControllerServiceMock = jasmine.createSpyObj('CalculateBeriplexDoseControllerService spy', [
                'isNextButtonEnabled', 
                'showReversalAgentAdministeredAtExternalHospitalCard',
                'showAdministerBeriplexWithoutInrCard',
                'showInrCard',
                'showEstimatedWeightCard',
                'showBeriplexAdministrationOverrideCard',
                'calculateStonesToKg',
                'calculateKgToStones',
                'calculateBeriplexDose'
            ]);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'getUniqueId',
				'getGcsScore',
                'getExternalScanHospitalName',
                'getAnticoagulantType',
                'getReversalAgentAdministeredAtExternalHospital',
                'getAdministerBeriplexWithoutInr',
                'getInrValue',
                'getInrType',
                'getInrDateTime',
                'getAdministerBeriplexWhenUnknown',
                'getIsWeightGivenInKg',
                'getEstimatedWeightInKg',
				'getCalculatedBeriplexDose',
                'setReversalAgentAdministeredAtExternalHospital',
                'setAdministerBeriplexWithoutInr',
                'setInrValue',
                'setInrType',
                'setInrDateTime',
                'setAdministerBeriplexWhenUnknown',
                'setIsWeightGivenInKg',
                'setEstimatedWeightInKg',
                'setCalculatedBeriplexDose'               
            ]);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getDateTimeFromDateAndTime']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('CalculateBeriplexDoseController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'CalculateBeriplexDoseControllerService': calculateBeriplexDoseControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
                'DateTimeService': dateTimeServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
                'INR_THRESHOLD': INR_THRESHOLD_MOCK,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
                'STATE_CALCULATE_BERIPLEX_DOSE': STATE_CALCULATE_BERIPLEX_DOSE_MOCK,
				'STATE_CONFIRM_BERIPLEX_DOSE': STATE_CONFIRM_BERIPLEX_DOSE_MOCK,
				'STATE_REVERSAL_AGENT_DETAILS': STATE_REVERSAL_AGENT_DETAILS_MOCK,
                'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK            
			});
		});				
	});				

	it("initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_CALCULATE_BERIPLEX_DOSE_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

		expect(patientCacheServiceMock.getExternalScanHospitalName).toHaveBeenCalled();
		expect(patientCacheServiceMock.getAnticoagulantType).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();

		expect(patientCacheServiceMock.getReversalAgentAdministeredAtExternalHospital).toHaveBeenCalled();
		expect(patientCacheServiceMock.getAdministerBeriplexWithoutInr).toHaveBeenCalled();
		expect(patientCacheServiceMock.getInrValue).toHaveBeenCalled();
		expect(patientCacheServiceMock.getInrType).toHaveBeenCalled();
		expect(patientCacheServiceMock.getInrDateTime).toHaveBeenCalled();
		expect(patientCacheServiceMock.getAdministerBeriplexWhenUnknown).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsWeightGivenInKg).toHaveBeenCalled();
		expect(patientCacheServiceMock.getEstimatedWeightInKg).toHaveBeenCalled();
		expect(calculateBeriplexDoseControllerServiceMock.calculateKgToStones).toHaveBeenCalled();
		expect(patientCacheServiceMock.getCalculatedBeriplexDose).toHaveBeenCalled();

		expect(vm.onNext).toBeDefined();
		expect(vm.onInrNow).toBeDefined();	

		expect(vm.onReversalAgentAdministeredAtExternalHospitalChanged).toBeDefined();	
		expect(vm.onAdministerBeriplexWithoutInrChanged).toBeDefined();	
		expect(vm.onInrValueChanged).toBeDefined();	
		expect(vm.onWeightInKgChanged).toBeDefined();	
		expect(vm.onWeightInStonesChanged).toBeDefined();	
	
		expect(vm.isNextButtonEnabled).toBeDefined();

		expect(vm.showReversalAgentAdministeredAtExternalHospitalCard).toBeDefined();		
		expect(vm.showAdministerBeriplexWithoutInrCard).toBeDefined();		
		expect(vm.showInrCard).toBeDefined();		
		expect(vm.showEstimatedWeightCard).toBeDefined();		
		expect(vm.showBeriplexAdministrationOverrideCard).toBeDefined();		
	});
 
 	it("should delegate isNextButtonEnabled to controller.service", function() {

        vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
        vm.administerBeriplexWithoutInr = "administer-beriplexW-wthout-inr"; 
        vm.anticoagulantType = "anticoagulant-type"; 
        vm.inrType = "inr-type";
        vm.inrDate = "inr-date";
        vm.inrTime = "inr-time";
        vm.estimatedWeightInKg = "estimated-weight-in-kg"; 
        vm.inrValue = "inr-value";
        vm.administerBeriplexWhenUnknown = "administer-beriplex-when-unknown";
 		vm.isNextButtonEnabled();
		expect(calculateBeriplexDoseControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
			"reversal-agent-administered-at-external-hospital", 
			"administer-beriplexW-wthout-inr",
			"anticoagulant-type",
			"inr-type",
			"inr-date",
			"inr-time",
			"estimated-weight-in-kg",
			"inr-value",
			"administer-beriplex-when-unknown",
			INR_THRESHOLD_MOCK
		);				
	});

	it("should delegate showReversalAgentAdministeredAtExternalHospitalCard to controller.service", function() {

		vm.externalScanHospitalName = "external-scan-hospital-name";
		vm.showReversalAgentAdministeredAtExternalHospitalCard();
		expect(calculateBeriplexDoseControllerServiceMock.showReversalAgentAdministeredAtExternalHospitalCard).toHaveBeenCalledWith("external-scan-hospital-name");				
	});

	it("should delegate showAdministerBeriplexWithoutInrCard to controller.service", function() {

		vm.externalScanHospitalName = "external-scan-hospital-name";
		vm.reversalAgentAdministeredAtExternalHospital = "reversal-agent-administered-at-external-hospital";
		vm.showAdministerBeriplexWithoutInrCard();
		expect(calculateBeriplexDoseControllerServiceMock.showAdministerBeriplexWithoutInrCard).toHaveBeenCalledWith("external-scan-hospital-name", "reversal-agent-administered-at-external-hospital");				
	});

	it("should delegate showInrCard to controller.service", function() {

		vm.administerBeriplexWithoutInr = "administer-beriplex-without-inr";
		vm.showInrCard();
		expect(calculateBeriplexDoseControllerServiceMock.showInrCard).toHaveBeenCalledWith("administer-beriplex-without-inr");				
	});

	it("should delegate showEstimatedWeightCard to controller.service", function() {

		vm.administerBeriplexWithoutInr = "administer-beriplex-without-inr";
		vm.showEstimatedWeightCard();
		expect(calculateBeriplexDoseControllerServiceMock.showEstimatedWeightCard).toHaveBeenCalledWith("administer-beriplex-without-inr");				
	});

	it("should delegate showBeriplexAdministrationOverrideCard to controller.service", function() {

		vm.anticoagulantType = "anticoagulant-type";
		vm.administerBeriplexWithoutInr = "administer-beriplex-without-inr";
		vm.inrValue = "inr-value";
		vm.showBeriplexAdministrationOverrideCard();
		expect(calculateBeriplexDoseControllerServiceMock.showBeriplexAdministrationOverrideCard).toHaveBeenCalledWith("anticoagulant-type", "administer-beriplex-without-inr", "inr-value", INR_THRESHOLD_MOCK);				
	});

	it("should reset view model parameters appropriately when onReversalAgentAdministeredAtExternalHospitalChanged is called", function() {

        vm.administerBeriplexWithoutInr = "not-null";
        vm.inrValue = "not-null";
        vm.inrType = "not-null";
        vm.inrDate = "not-null";
        vm.inrTime = "not-null";
        vm.weightGivenInKg = "not-null";
        vm.estimatedWeightInKg = "not-null";
        vm.estimatedWeightInStones = "not-null";
		vm.onReversalAgentAdministeredAtExternalHospitalChanged();
		expect(vm.administerBeriplexWithoutInr).toBe(null);				
		expect(vm.inrValue).toBe(null);				
		expect(vm.inrType).toBe(null);				
		expect(vm.inrDate).toBe(null);				
		expect(vm.inrTime).toBe(null);				
		expect(vm.weightGivenInKg).toBe(null);				
		expect(vm.estimatedWeightInKg).toBe(null);				
		expect(vm.estimatedWeightInStones).toBe(null);				
	});

 
	it("should reset view model parameters appropriately when onAdministerBeriplexWithoutInrChanged is called", function() {

		vm.administerBeriplexWithoutInr = null;
        vm.inrValue = "not-null";
        vm.inrType = "not-null";
        vm.inrDate = "not-null";
        vm.inrTime = "not-null";
        vm.weightGivenInKg = "not-null";
        vm.estimatedWeightInKg = "not-null";
        vm.estimatedWeightInStones = "not-null";
		vm.onAdministerBeriplexWithoutInrChanged();
		expect(vm.inrValue).toBe(null);				
		expect(vm.inrType).toBe(null);				
		expect(vm.inrDate).toBe(null);				
		expect(vm.inrTime).toBe(null);				
		expect(vm.weightGivenInKg).toBe(null);				
		expect(vm.estimatedWeightInKg).toBe(null);				
		expect(vm.estimatedWeightInStones).toBe(null);

		vm.administerBeriplexWithoutInr = "not-null";
        vm.inrValue = "not-null";
		vm.onAdministerBeriplexWithoutInrChanged();
		expect(vm.inrValue).toBe(2.0);				
	});

	it("should reset view model parameters appropriately when onInrValueChanged is called", function() {

		vm.inrValue = "inr-value";
		vm.estimatedWeightInKg = "estimated-weight-in-kg";

        vm.administerBeriplexWhenUnknown = "not-null";
		vm.onInrValueChanged();
		expect(vm.administerBeriplexWhenUnknown).toBe(null);

		expect(calculateBeriplexDoseControllerServiceMock.calculateBeriplexDose).toHaveBeenCalledWith("inr-value", "estimated-weight-in-kg");				
				
	});

	it("should reset view model parameters appropriately when onWeightInKgChanged is called", function() {

		vm.inrValue = "inr-value";
		vm.estimatedWeightInKg = "estimated-weight-in-kg";

		vm.weightGivenInKg = false;
		vm.onWeightInKgChanged();
		expect(vm.weightGivenInKg).toBe(true);				

		expect(calculateBeriplexDoseControllerServiceMock.calculateKgToStones).toHaveBeenCalledWith("estimated-weight-in-kg");				
		expect(calculateBeriplexDoseControllerServiceMock.calculateBeriplexDose).toHaveBeenCalledWith("inr-value", "estimated-weight-in-kg");				
	});

	it("should reset view model parameters appropriately when onWeightInStonesChanged is called", function() {

		vm.inrValue = "inr-value";
		vm.estimatedWeightInKg = "estimated-weight-in-kg";
		vm.estimatedWeightInStones = "estimated-weight-in-stones";

		vm.weightGivenInKg = true;
		vm.onWeightInStonesChanged();
		expect(vm.weightGivenInKg).toBe(false);				

		expect(calculateBeriplexDoseControllerServiceMock.calculateStonesToKg).toHaveBeenCalledWith("estimated-weight-in-stones");				
	});

	it("should populate view model parameters appropriately when onInrNow is called", function() {

		vm.inrDate = null;
		vm.inrTime = null;
		vm.onInrNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.inrDate).not.toBe(null);				
		expect(vm.inrTime).not.toBe(null);				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).toHaveBeenCalled();				

		expect(patientCacheServiceMock.setReversalAgentAdministeredAtExternalHospital).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setAdministerBeriplexWithoutInr).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrDateTime).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrValue).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrType).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setEstimatedWeightInKg).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsWeightGivenInKg).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setCalculatedBeriplexDose).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setAdministerBeriplexWhenUnknown).toHaveBeenCalled();				
	});

	it("should go to the correct state when user selects 'Ok' on validation popup", function() {
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

		vm.reversalAgentAdministeredAtExternalHospital = true;	
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_REVERSAL_AGENT_DETAILS_MOCK);

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= true;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CONFIRM_BERIPLEX_DOSE_MOCK);

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK - 1;
		vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK - 1;
		vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK;
		vm.anticoagulantType = "Vitamin K antagonist";
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CONFIRM_BERIPLEX_DOSE_MOCK);

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK;
		vm.anticoagulantType = "Unknown";
		vm.administerBeriplexWhenUnknown = true;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_CONFIRM_BERIPLEX_DOSE_MOCK);

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK;
		vm.anticoagulantType = "Unknown";
		vm.administerBeriplexWhenUnknown = null;
		vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();

		vm.reversalAgentAdministeredAtExternalHospital = null;
		vm.administerBeriplexWithoutInr	= null;
		vm.inrValue = INR_THRESHOLD_MOCK;
		vm.anticoagulantType = "Unknown";
		vm.administerBeriplexWhenUnknown = null;
		vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);
					
	});

	it("should display 'Inr Below Treament Range' popup", function() {
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

		vm.inrValue = INR_THRESHOLD_MOCK - 1;	
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
					
		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("INR below treatment range");
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).not.toHaveBeenCalled();				

		expect(patientCacheServiceMock.setReversalAgentAdministeredAtExternalHospital).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setAdministerBeriplexWithoutInr).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrDateTime).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrValue).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setInrType).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setEstimatedWeightInKg).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsWeightGivenInKg).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setCalculatedBeriplexDose).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setAdministerBeriplexWhenUnknown).not.toHaveBeenCalled();				
	});

	it("it should not change state when user selects 'Cancel' on validation popup", function() {
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
