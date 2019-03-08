'use strict';

describe('AdministerBeriplexController', function() {

    var vm;
	var $q, $window;
	var STATE_ADMINISTER_BERIPLEX_MOCK, STATE_BP_MANAGEMENT_MOCK;
    var GCS_THRESHOLD_MOCK;
    var scopeMock, stateMock, ionicPopupMock, administerBeriplexControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, dateTimeServiceMock, demoModeCacheServiceMock;
    var pccDoseTableServiceMock;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_, _$window_) {
			$q = _$q_;
            $window = _$window_;
			STATE_ADMINISTER_BERIPLEX_MOCK = "state-administer-beriplex-mock";
            STATE_BP_MANAGEMENT_MOCK = "state-bp-managemwnt-mock";
            GCS_THRESHOLD_MOCK = 9;
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			administerBeriplexControllerServiceMock = jasmine.createSpyObj('AdministerBeriplexControllerService spy', ['isNextButtonEnabled', 'showBeriplexDateTimeCard', 'showVitaminkDateTimeCard', 'showVitaminKCards']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'getUniqueId',
				'getCalculatedBeriplexDose',
                'getActualBeriplexDose',
                'getGcsScore',
                'getReversalAgentType',
                'getReversalAgentStartDateTime',
                'getIsVitaminkAdministered',
                'getVitaminkDateTime',
                'getIsInfusionInstructionsViewed',
                'setReversalAgentType',
                'setReversalAgentStartDateTime',
                'setIsVitaminkAdministered',
                'setVitaminkDateTime',
                'setIsInfusionInstructionsViewed',
                'getAnticoagulantType',
                'getSelectedPCCType',
                'getEstimatedWeightInKg',
                'getInrValue',
                'getAdministerBeriplexWithoutInr',
                'getHasDoacBeenTaken',
                'getTopupDose'
            ]);
            pccDoseTableServiceMock = jasmine.createSpyObj('PCCDoseTableService spy', ['getDosingRecords', 'getDose']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getDateTimeFromDateAndTime']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

			patientCacheServiceMock.getReversalAgentType.and.returnValue("PCC");
			
			vm = $controller('AdministerBeriplexController', {
                '$window': $window,
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'AdministerBeriplexControllerService': administerBeriplexControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock,
                'DateTimeService': dateTimeServiceMock,                
                'DemoModeCacheService': demoModeCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'STATE_ADMINISTER_BERIPLEX': STATE_ADMINISTER_BERIPLEX_MOCK,
				'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK,
				'PCCDoseTableService': pccDoseTableServiceMock                
			});
		});				
	});				

 
	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_ADMINISTER_BERIPLEX_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();

		expect(patientCacheServiceMock.getCalculatedBeriplexDose).toHaveBeenCalled();
		expect(patientCacheServiceMock.getActualBeriplexDose).toHaveBeenCalled();
		expect(patientCacheServiceMock.getReversalAgentType).toHaveBeenCalled();
        expect(vm.isBeriplexAdministered).toBe(true);
		expect(patientCacheServiceMock.getReversalAgentStartDateTime).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsVitaminkAdministered).toHaveBeenCalled();
		expect(patientCacheServiceMock.getVitaminkDateTime).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsInfusionInstructionsViewed).toHaveBeenCalled();
		expect(patientCacheServiceMock.getAnticoagulantType).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
        
		expect(vm.onNext).toBeDefined();
 		expect(vm.onBeriplexNow).toBeDefined();
 		expect(vm.onVitkNow).toBeDefined();
 		expect(vm.isBeriplexAdministeredChanged).toBeDefined();
 		expect(vm.isVitkAdministeredChanged).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.showBeriplexDateTimeCard).toBeDefined();		
		expect(vm.showVitaminkDateTimeCard).toBeDefined();	
		expect(vm.showVitaminKCards).toBeDefined();	
		expect(vm.onViewInfusionInstructions).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.isBeriplexAdministered = "is-beriplex-administered";
        vm.isVitkAdministered = "is-vitk-administered";
        vm.beriplexDate = "beriplex-date";
        vm.beriplexTime = "beriplex-time";
        vm.vitkDate = "vitk-date";
        vm.vitkTime = "vitk-time";
		vm.isNextButtonEnabled();
		expect(administerBeriplexControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
            "is-beriplex-administered",
            "is-vitk-administered",
            "beriplex-date",
            "beriplex-time",
            "vitk-date",
           "vitk-time" 
        );				
	});

	it("should delegate showBeriplexDateTimeCard to controller.service", function() {

		vm.isBeriplexAdministered = "is-beriplex-administered";
		vm.showBeriplexDateTimeCard();
		expect(administerBeriplexControllerServiceMock.showBeriplexDateTimeCard).toHaveBeenCalledWith("is-beriplex-administered");				
	});

	it("should delegate showVitaminkDateTimeCard to controller.service", function() {

		vm.isVitkAdministered = "is-vitk-administered";
		vm.showVitaminkDateTimeCard();
		expect(administerBeriplexControllerServiceMock.showVitaminkDateTimeCard).toHaveBeenCalledWith("is-vitk-administered");				
	});

	it("should delegate showVitaminKCards to controller.service", function(){
		vm.anticoagulantType = "anticoagulant-type";
		vm.showVitaminKCards();
		expect(administerBeriplexControllerServiceMock.showVitaminKCards).toHaveBeenCalledWith("anticoagulant-type");
	});

	it("should reset view model parameters appropriately when isBeriplexAdministeredChanged is called", function() {

        vm.beriplexDate = "not-null";
        vm.beriplexTime = "not-null";
		vm.isBeriplexAdministeredChanged();
		expect(vm.beriplexDate).toBe(null);				
		expect(vm.beriplexTime).toBe(null);				
	});

	it("should reset view model parameters appropriately when isVitkAdministeredChanged is called", function() {

        vm.vitkDate = "not-null";
        vm.vitkTime = "not-null";
		vm.isVitkAdministeredChanged();
		expect(vm.vitkDate).toBe(null);				
		expect(vm.vitkTime).toBe(null);				
	});

	it("should populate view model parameters appropriately when onBeriplexNow is called", function() {

		vm.beriplexDate = null;
		vm.beriplexTime = null;
		vm.onBeriplexNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.beriplexDate).not.toBe(null);				
		expect(vm.beriplexTime).not.toBe(null);				
	});

	it("should populate view model parameters appropriately when onVitkNow is called", function() {

		vm.vitkDate = null;
		vm.vitkTime = null;
		vm.onVitkNow();
 		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();				
		expect(vm.vitkDate).not.toBe(null);				
		expect(vm.vitkTime).not.toBe(null);				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        vm.isBeriplexAdministered = true;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.
        expect(dateTimeServiceMock.getDateTimeFromDateAndTime.calls.count()).toBe(2);				
		expect(patientCacheServiceMock.setReversalAgentType).toHaveBeenCalledWith("PCC");				
		expect(patientCacheServiceMock.setReversalAgentStartDateTime).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsVitaminkAdministered).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setVitaminkDateTime).toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsInfusionInstructionsViewed).toHaveBeenCalled();				

        vm.isBeriplexAdministered = false;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(patientCacheServiceMock.setReversalAgentType).toHaveBeenCalledWith("None");				
	});

	it("should go to correct state when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);				

        vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
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

		expect(patientCacheServiceMock.setReversalAgentType).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setReversalAgentStartDateTime).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsVitaminkAdministered).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setVitaminkDateTime).not.toHaveBeenCalled();				
		expect(patientCacheServiceMock.setIsInfusionInstructionsViewed).not.toHaveBeenCalled();				
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
