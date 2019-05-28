'use strict';

describe('AdministerTopupDoseController', function() {

    var vm;
	var $q, $window;
    var scopeMock, stateMock, ionicPopupMock, administerTopupDoseControllerServiceMock, patientCacheServiceMock; 
    var demoModeCacheServiceMock, pccDoseTableServiceMock, stateCacheServiceMock;
    var STATE_ADMINISTER_BERIPLEX_MOCK;

    beforeEach(function() {

        module('app.protocolA');

		angular.mock.inject(function($controller, $rootScope, _$q_, _$window_) {
			$q = _$q_;
            $window = _$window_;
			STATE_ADMINISTER_BERIPLEX_MOCK = "state-administer-beriplex-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			administerTopupDoseControllerServiceMock = jasmine.createSpyObj('AdministerTopupDoseControllerService spy', ['isInrValueValid', 'isCalculatedDoseValid', 'isActualDoseValid', 'showCalculatedDoseCard', 'showActualDoseCard', 'isNextButtonEnabled']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'getUniqueId',
				'getCalculatedBeriplexDose',
                'getActualBeriplexDose',
                'getSelectedPCCType',
                'getEstimatedWeightInKg',
                'getInrValue',
                'getTopupDose',
                'setActualBeriplexDose',
                'setCalculatedBeriplexDose',
                'setTopupDose',
                'setInrValue'
            ]);
            pccDoseTableServiceMock = jasmine.createSpyObj('PCCDoseTableService spy', ['getDosingRecords', 'getDose']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			
			vm = $controller('AdministerTopupDoseController', {
                '$window': $window,
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'AdministerTopupDoseControllerService': administerTopupDoseControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
                'DemoModeCacheService': demoModeCacheServiceMock,
                'PCCDoseTableService': pccDoseTableServiceMock,
				'StateCacheService': stateCacheServiceMock,              
				'STATE_ADMINISTER_BERIPLEX': STATE_ADMINISTER_BERIPLEX_MOCK
            });
		});				
	});	

    describe("initialization", function() {

        it("should initialise the view model correctly", function() {
                
            // Parameters for header row.
            expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
            expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

            // Parameters for page content.
            expect(patientCacheServiceMock.getCalculatedBeriplexDose).toHaveBeenCalled();
            expect(patientCacheServiceMock.getActualBeriplexDose).toHaveBeenCalled();
            expect(patientCacheServiceMock.getSelectedPCCType).toHaveBeenCalled();
            expect(patientCacheServiceMock.getEstimatedWeightInKg).toHaveBeenCalled();
            expect(pccDoseTableServiceMock.getDosingRecords).toHaveBeenCalled();
            expect(patientCacheServiceMock.getTopupDose).toHaveBeenCalled();
            
            // Click handlers
            expect(vm.onNext).toBeDefined();
            expect(vm.onCancel).toBeDefined();

            // Change handlers
            expect(vm.onInrValueChanged).toBeDefined();

            // Enable/disable handlers
            expect(vm.isNextButtonEnabled).toBeDefined();

            // Show/hide handlers
            expect(vm.showCalculatedDoseCard).toBeDefined();       
            expect(vm.showActualDoseCard).toBeDefined();   
            expect(vm.showInrInvalidMessage).toBeDefined();   
            expect(vm.showCalculatedDoseInvalidMessage).toBeDefined();   
            expect(vm.showActualDoseInvalidMessage).toBeDefined();
        });
    });

    describe("function delegation", function(){

        it("should delegate showCalculatedDoseCard to controller.service", function() {

            vm.unconfirmedInrValue = "unconfirmed-inr-value";
            vm.showCalculatedDoseCard();
            expect(administerTopupDoseControllerServiceMock.showCalculatedDoseCard).toHaveBeenCalledWith("unconfirmed-inr-value");
        });

        it("should delegate showActualDoseCard to controller.service", function() {

            vm.overrideCalculatedDose = "override-calculated-dose";
            vm.unconfirmedInrValue = "unconfirmed-inr-value";
            vm.showActualDoseCard();
            expect(administerTopupDoseControllerServiceMock.showActualDoseCard).toHaveBeenCalledWith("unconfirmed-inr-value", "override-calculated-dose");
        });

        it("should delegate showInrInvalidMessage to controller.service.isInrValueValid", function() {

            vm.unconfirmedInrValue = "unconfirmed-inr-value";
            vm.showInrInvalidMessage();
            expect(administerTopupDoseControllerServiceMock.isInrValueValid).toHaveBeenCalledWith("unconfirmed-inr-value");
        });

        it("should delegate showCalculatedDoseInvalidMessage to controller.service.isCalculatedDoseValid", function() {

            vm.topupCalculatedDose = "topup-calculated-dose";
            vm.overrideCalculatedDose = "override-calculated-dose";
            vm.showCalculatedDoseInvalidMessage();
            expect(administerTopupDoseControllerServiceMock.isCalculatedDoseValid).toHaveBeenCalledWith("topup-calculated-dose", "override-calculated-dose");
        });

        it("should delegate showActualDoseInvalidMessage to controller.service.isActualDoseValid", function() {

            vm.topupActualDose = "topup-actual-dose";
            vm.overrideCalculatedDose = "override-calculated-dose";
            vm.showActualDoseInvalidMessage();
            expect(administerTopupDoseControllerServiceMock.isActualDoseValid).toHaveBeenCalledWith("topup-actual-dose", "override-calculated-dose");
        });

        it("should delegate isNextButtonEnabled to controller.service", function() {

            vm.unconfirmedInrValue = "unconfirmed-inr-value";
            vm.topupCalculatedDose = "topup-calculated-dose";
            vm.topupActualDose = "topup-actual-dose";
            vm.overrideCalculatedDose = "override-calculated-dose";
            vm.isNextButtonEnabled();
            expect(administerTopupDoseControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith("unconfirmed-inr-value", "topup-calculated-dose", "topup-actual-dose", "override-calculated-dose");
        });
    });

    describe("view model parameter population", function(){

        it("should update the topupCalculatedDose appropriately when onInrValueChanged is called", function(){

            vm.selectedPCCType = "Beriplex";
            vm.estimatedWeightInKg = 60;
            vm.unconfirmedInrValue = 2.0;
            vm.hasDoacBeenTaken = true;

            vm.topupCalculatedDose = null;
            vm.onInrValueChanged();
            expect(vm.topupCalculatedDose).not.toBe(null);
        });
    });

    describe("popup button handling", function(){

        it("should save data when user selects 'OK' on validation popup", function(){

            ionicPopupMock.confirm.and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(true); // User selects Ok
                return deferred.promise;
            });                    

            vm.topupActualDose = 1;
            vm.pccDose = 1;
            vm.actualDose = 1;
            vm.unconfirmedInrValue = 1;
            vm.overrideCalculatedDose = true;
            var newPCCDose = vm.pccDose + vm.topupActualDose;
            vm.onNext();
            scopeMock.$apply(); // Propagate promise resolution for data validation popup.

            expect(patientCacheServiceMock.setActualBeriplexDose).toHaveBeenCalledWith(newPCCDose);                
            expect(patientCacheServiceMock.setTopupDose).toHaveBeenCalledWith(vm.topupActualDose); 
            expect(patientCacheServiceMock.setInrValue).toHaveBeenCalledWith(vm.unconfirmedInrValue);                                     
        });

        it("should go to correct state when user selects 'OK' on validation popup", function() {

            ionicPopupMock.confirm.and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(true); // User selects Ok
                return deferred.promise;
            });                    

            vm.topupActualDose = 1;
            vm.pccDose = 1;
            vm.actualDose = 1;
            vm.unconfirmedInrValue = 1;
            vm.onNext();
            scopeMock.$apply(); // Propagate promise resolution for data validation popup.

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
            expect(patientCacheServiceMock.setCalculatedBeriplexDose).not.toHaveBeenCalled();
            expect(patientCacheServiceMock.setTopupDose).not.toHaveBeenCalled();
            expect(patientCacheServiceMock.setInrValue).not.toHaveBeenCalled();
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

});