'use strict';

describe('NeurosurgeryReferralSummaryController', function() {

    var vm;
	var $q;
    var GCS_THRESHOLD_MOCK;
	var STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK, STATE_PATIENT_END_MOCK, STATE_BP_MANAGEMENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, neurosurgeryReferralSummaryControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, dateTimeServiceMock;

    beforeEach(function() {

        module('app.protocolC');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
            GCS_THRESHOLD_MOCK = 9;
			STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK = "state-nerosurgery-referral-summary-mock";
            STATE_PATIENT_END_MOCK = "state-patient-end-mock";
            STATE_BP_MANAGEMENT_MOCK = "state-bp-management-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			neurosurgeryReferralSummaryControllerServiceMock = jasmine.createSpyObj('NeurosurgeryReferralSummaryControllerService spy', ['isNextButtonEnabled', 'showReferralDetailsCards']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', [
                'getUniqueId',
                'getEstimatedAge',
                'getBirthDate',
                'getGcsScoreEye',
                'getGcsScoreVerbal',
                'getGcsScoreMotor',
                'getGcsScore',
                'getIsPosteriorFossaIch',
                'getIsVentricleObstructed',
                'getIchVolume',
                'getPremorbidMrsScore',
				'getIsReferredToNeurosurgery',
                'getReferralToNeurosurgeryDateTime',
                'getNeurosurgeonName',
                'getIsReferralToNeurosurgeryAccepted',
				'setIsReferredToNeurosurgery',
                'setReferralToNeurosurgeryDateTime',
                'setNeurosurgeonName',
                'setIsReferralToNeurosurgeryAccepted'
            ]);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
 			dateTimeServiceMock = jasmine.createSpyObj('dateTimeService spy', ['getAgeFromBirthDate', 'getNowWithZeroSeconds', 'getDateTimeFromDateAndTime']);
			
			vm = $controller('NeurosurgeryReferralSummaryController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'NeurosurgeryReferralSummaryControllerService': neurosurgeryReferralSummaryControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
                'DateTimeService': dateTimeServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
				'STATE_NEUROSURGERY_REFERRAL_SUMMARY': STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK,
				'STATE_PATIENT_END': STATE_PATIENT_END_MOCK,
                'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK
			});
		});				
	});				
 
	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

 		expect(patientCacheServiceMock.getEstimatedAge).toHaveBeenCalled();
		expect(patientCacheServiceMock.getBirthDate).toHaveBeenCalled();
		expect(dateTimeServiceMock.getAgeFromBirthDate).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScoreEye).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScoreVerbal).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScoreMotor).toHaveBeenCalled();
		expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsPosteriorFossaIch).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsVentricleObstructed).toHaveBeenCalled();
		expect(patientCacheServiceMock.getPremorbidMrsScore).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsReferredToNeurosurgery).toHaveBeenCalled();
		expect(patientCacheServiceMock.getReferralToNeurosurgeryDateTime).toHaveBeenCalled();
		expect(patientCacheServiceMock.getNeurosurgeonName).toHaveBeenCalled();
		expect(patientCacheServiceMock.getIsReferralToNeurosurgeryAccepted).toHaveBeenCalled();
       
		expect(vm.onNext).toBeDefined();
		expect(vm.onReferralNow).toBeDefined();
		expect(vm.isNextButtonEnabled).toBeDefined();
		expect(vm.showReferralDetailsCards).toBeDefined();
	});

	it("should delegate isNextButtonEnabled to controller.service", function() {

		vm.isReferred = "is-referred";
		vm.referralDate = "referral-date";
		vm.referralTime = "referral-time";
		vm.neurosurgeonName = "neurosurgeon-name";
		vm.isAccepted = "is-accepted";
		vm.isNextButtonEnabled();
		expect(neurosurgeryReferralSummaryControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(
            "is-referred",
            "referral-date",
            "referral-time",
            "neurosurgeon-name",
            "is-accepted"
        );				
	});

	it("should delegate showReferralDetailsCards to controller.service", function() {
		vm.isReferred = "is-referred";
		vm.showReferralDetailsCards();
		expect(neurosurgeryReferralSummaryControllerServiceMock.showReferralDetailsCards).toHaveBeenCalledWith("is-referred");				
	});

 	it("should reset view model parameters appropriately when isReferredChanged is called", function() {

        vm.referralDate = "not-null";
        vm.referralTime = "not-null";
        vm.neurosurgeonName = "not-null";
        vm.isAccepted = "not-null";
		vm.isReferredChanged();
		expect(vm.referralDate).toBe(null);				
		expect(vm.referralTime).toBe(null);				
		expect(vm.neurosurgeonName).toBe(null);				
		expect(vm.isAccepted).toBe(null);				
	});
   
	it("should populate view model parameters appropriately when onReferralNow is called", function() {
        vm.referralDate = null;
        vm.referralTime = null;
		vm.onReferralNow();
		expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();
        expect(vm.referralDate).not.toBe(null);				
        expect(vm.referralTime).not.toBe(null);				
	});

	it("should save data when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setIsReferredToNeurosurgery).toHaveBeenCalled();
		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).toHaveBeenCalled();
		expect(patientCacheServiceMock.setReferralToNeurosurgeryDateTime).toHaveBeenCalled();
 		expect(patientCacheServiceMock.setNeurosurgeonName).toHaveBeenCalled();
 		expect(patientCacheServiceMock.setIsReferralToNeurosurgeryAccepted).toHaveBeenCalled();
	});

	it("should go to correct state when user selects 'Ok' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

        vm.gcsScore = GCS_THRESHOLD_MOCK - 1;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data validation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);				

        vm.gcsScore = GCS_THRESHOLD_MOCK;
		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data validation popup.				
		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);				
	});

	it("should not save data when user selects 'Cancel' on validation popup", function() {
        ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel
			return deferred.promise;
		});					

		vm.onNext();
		scopeMock.$apply(); // Propagate promise resolution for data vakidation popup.				

		expect(patientCacheServiceMock.setIsReferredToNeurosurgery).not.toHaveBeenCalled();
		expect(dateTimeServiceMock.getDateTimeFromDateAndTime).not.toHaveBeenCalled();
		expect(patientCacheServiceMock.setReferralToNeurosurgeryDateTime).not.toHaveBeenCalled();
 		expect(patientCacheServiceMock.setNeurosurgeonName).not.toHaveBeenCalled();
 		expect(patientCacheServiceMock.setIsReferralToNeurosurgeryAccepted).not.toHaveBeenCalled();
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
