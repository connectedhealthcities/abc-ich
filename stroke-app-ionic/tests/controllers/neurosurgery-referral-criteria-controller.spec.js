'use strict';

describe('NeurosurgeryReferralCriteriaController', function() {

    var vm;
    var $q;
    var STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK, STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK, STATE_PATIENT_END_MOCK;
    var MRS_THRESHOLD_MOCK, GCS_THRESHOLD_MOCK, ICH_VOLUME_THRESHOLD_MOCK;
    var scopeMock, stateMock, ionicPopupMock, neurosurgeryReferralCriteriaControllerServiceMock;
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock;
    var tabStateCacheServiceMock;

    beforeEach(function() {

        module('app.protocolC');

		angular.mock.inject(function ($controller, $rootScope, _$q_) {
		    $q = _$q_;
		    STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK = "STATE-NEUROSURGERY-REFERRAL-CRITERIA-MOCK";
		    STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK = "STATE-NEUROSURGERY-REFERRAL-SUMMARY-MOCK";
		    STATE_PATIENT_END_MOCK = "STATE-PATIENT-END-MOCK";
		    MRS_THRESHOLD_MOCK = 3;
		    GCS_THRESHOLD_MOCK = 9;
		    ICH_VOLUME_THRESHOLD_MOCK = 30;
            scopeMock = $rootScope.$new();
            stateMock = jasmine.createSpyObj("$state spy", ["go"]);
            ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
            neurosurgeryReferralCriteriaControllerServiceMock = jasmine.createSpyObj('NeurosurgeryReferralCriteriaControllerService spy', ['isNextButtonEnabled', 'isIchVolumeWithinRange', 'calculateVolume', 'isNeuroReferralRequired', "getSliderConfig", 'showIchVolumeField']);
            patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ["getUniqueId", "getGcsScore", "getIchVolume", "getIsPosteriorFossaIch", "getIsVentricleObstructed", "getIchLongestAxis", "getIchPerpendicularAxis", "getIchNumSlices", "getIchSliceThickness", "getPremorbidMrsScore", "setIsPosteriorFossaIch", "setIsVentricleObstructed", "setIchVolume", "setIchLongestAxis", "setIchPerpendicularAxis", "setIchNumSlices", "SetIchSliceThickness"]);
            
            stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
            demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);

            neurosurgeryReferralCriteriaControllerServiceMock.getSliderConfig.and.returnValue({ "images": "test-images", "options": "test-options" });

            tabStateCacheServiceMock = {
				setStateTabC: function() {}
			};			

            vm = $controller('NeurosurgeryReferralCriteriaController', {
                '$scope': scopeMock,
                '$state': stateMock,
                '$ionicPopup': ionicPopupMock,
                'NeurosurgeryReferralCriteriaControllerService': neurosurgeryReferralCriteriaControllerServiceMock,
                'PatientCacheService': patientCacheServiceMock,
                'StateCacheService': stateCacheServiceMock,
                'DemoModeCacheService': demoModeCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
                'MRS_THRESHOLD': MRS_THRESHOLD_MOCK,
                'ICH_VOLUME_THRESHOLD': ICH_VOLUME_THRESHOLD_MOCK,
                "STATE_NEUROSURGERY_REFERRAL_CRITERIA": STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK,
                "STATE_NEUROSURGERY_REFERRAL_SUMMARY": STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK,
                "STATE_PATIENT_END": STATE_PATIENT_END_MOCK
            });
		});
     });

    it("should initialise the view model correctly", function () {
	    
        expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_NEUROSURGERY_REFERRAL_CRITERIA_MOCK);

        expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
        expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

        expect(patientCacheServiceMock.getIsPosteriorFossaIch).toHaveBeenCalled();
        expect(patientCacheServiceMock.getIsVentricleObstructed).toHaveBeenCalled();
        expect(patientCacheServiceMock.getIchLongestAxis).toHaveBeenCalled();
        expect(patientCacheServiceMock.getIchPerpendicularAxis).toHaveBeenCalled();
        expect(patientCacheServiceMock.getIchNumSlices).toHaveBeenCalled();
        expect(patientCacheServiceMock.getIchSliceThickness).toHaveBeenCalled();
        expect(neurosurgeryReferralCriteriaControllerServiceMock.calculateVolume).toHaveBeenCalled();

        expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();
        expect(patientCacheServiceMock.getPremorbidMrsScore).toHaveBeenCalled();

        expect(neurosurgeryReferralCriteriaControllerServiceMock.getSliderConfig).toHaveBeenCalled();
        expect(vm.sliderImages).toBe("test-images");
        expect(vm.sliderOptions).toBe("test-options");

        expect(vm.onNext).toBeDefined();
        expect(vm.showVolumeMeasurementPopup).toBeDefined();
        expect(vm.showObstructionPopup).toBeDefined();

        expect(vm.onVolumeFieldChanged).toBeDefined();

        expect(vm.isNextButtonEnabled).toBeDefined();

        expect(vm.showIchVolumeField).toBeDefined();

        expect(vm.showIchVolumeOutOfRangeMessage).toBeDefined();
    });

    it("should delegate isNextButtonEnabled to controller.service", function () {

        vm.ichVolume = 1;
        vm.isPosteriorFossaIch = 2;
        vm.isObstruction = 3;
        vm.isNextButtonEnabled();
        expect(neurosurgeryReferralCriteriaControllerServiceMock.isNextButtonEnabled).toHaveBeenCalledWith(1, 2, 3);
    });

    it("should delegate isIchVolumeOutOfRange to controller.service", function () {

        vm.ichVolume = 1;
        vm.showIchVolumeOutOfRangeMessage();
        expect(neurosurgeryReferralCriteriaControllerServiceMock.isIchVolumeWithinRange).toHaveBeenCalledWith(1);
    });

    it("should delegate calculateVolume to controller.service", function () {

        vm.longestAxis = 1;
        vm.perpendicularAxis = 2;
        vm.numSlices = 3;
        vm.sliceThickness = 4;
        vm.onVolumeFieldChanged();
        expect(neurosurgeryReferralCriteriaControllerServiceMock.calculateVolume).toHaveBeenCalledWith(1, 2, 3, 4);
    });

    it("should delegate showIchVolumeField to controller.service", function () {

        vm.ichVolume = 50;
        vm.showIchVolumeField();
        expect(neurosurgeryReferralCriteriaControllerServiceMock.showIchVolumeField).toHaveBeenCalledWith(50);
    });

    it("should show volume measurement popup", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        vm.showVolumeMeasurementPopup();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("ABC/2 Volume measurement");
        
    });

    it("should show obstruction popup", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        vm.showObstructionPopup();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Occlusion images");

    });

    it("should show correct popup and go to the correct state when user selects 'Ok' on validation popup and referral to neurosurgery is not required", function () {
        
        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        neurosurgeryReferralCriteriaControllerServiceMock.isNeuroReferralRequired.and.callFake(function () {
            return false;
        });

        vm.onNext();
        scopeMock.$apply();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Referral to neurosurgery not required");
        expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);

    });

    it("should show correct popup and go to the correct state when user selects 'Ok' on validation popup and referral to neurosurgery is required", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        neurosurgeryReferralCriteriaControllerServiceMock.isNeuroReferralRequired.and.callFake(function () {
            return true;
        });

        vm.premorbidMrsScore = 2;
        vm.onNext();
        scopeMock.$apply();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Refer to neurosurgery");
        expect(stateMock.go).toHaveBeenCalledWith(STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK);
    });

    it("should show correct popup and go to the correct state when user selects 'Ok' on validation popup and referral to neurosurgery should be considered", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        neurosurgeryReferralCriteriaControllerServiceMock.isNeuroReferralRequired.and.callFake(function () {
            return true;
        });

        vm.premorbidMrsScore = 3;
        vm.onNext();
        scopeMock.$apply();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Consider referral to neurosurgery");
        expect(stateMock.go).toHaveBeenCalledWith(STATE_NEUROSURGERY_REFERRAL_SUMMARY_MOCK);
    });

    it("should save data when user selects 'Ok' on validation popup", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        neurosurgeryReferralCriteriaControllerServiceMock.isNeuroReferralRequired.and.returnValue(true);

        vm.premorbidMrsScore = 3;
        vm.onNext();
        scopeMock.$apply();

        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Consider referral to neurosurgery");

        expect(patientCacheServiceMock.setIsPosteriorFossaIch).toHaveBeenCalled();
        expect(patientCacheServiceMock.setIsVentricleObstructed).toHaveBeenCalled();
        expect(patientCacheServiceMock.setIchVolume).toHaveBeenCalled();
        expect(patientCacheServiceMock.setIchLongestAxis).toHaveBeenCalled();
        expect(patientCacheServiceMock.setIchPerpendicularAxis).toHaveBeenCalled();
        expect(patientCacheServiceMock.setIchNumSlices).toHaveBeenCalled();
        expect(patientCacheServiceMock.SetIchSliceThickness).toHaveBeenCalled();
    });

    it("should dismiss popup and not change state when user selects 'Cancel' on validation popup", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(false); // User selects Cancel
            return deferred.promise;
        });

        vm.onNext();
        scopeMock.$apply();
        expect(ionicPopupMock.confirm).toHaveBeenCalled();
        expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Data validation");
        expect(stateMock.go).not.toHaveBeenCalled();

    });

});
