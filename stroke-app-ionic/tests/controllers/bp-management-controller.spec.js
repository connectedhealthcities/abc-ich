'use strict';
describe('BpManagementController where PatientCacheService.getBpTreatmentThreshold returns null', function () {

    var vm;
    var $q;
    var STATE_BP_MANAGEMENT_MOCK, STATE_CRITICAL_CARE_REFERRAL_MOCK, STATE_PATIENT_END_MOCK;
    var GCS_THRESHOLD_MOCK;
    var scopeMock, stateMock, ionicPopupMock, BpManagementControllerMock;
    var patientCacheServiceMock, stateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;
    var tabStateCacheServiceMock, dateTimeServiceMock, bpManagementControllerServiceMock, BpStateCacheService;

    beforeEach(function() {

        module('app.protocolB');

        angular.mock.inject(function ($controller, $rootScope, _$q_) {
            $q = _$q_;
            STATE_BP_MANAGEMENT_MOCK = 'STATE-BP-MANAGEMENT-MOCK';
            STATE_CRITICAL_CARE_REFERRAL_MOCK = 'STATE-CRITICAL-CARE-REFERRAL-MOCK';
            STATE_PATIENT_END_MOCK = 'STATE-PATIENT-END-MOCK';
            GCS_THRESHOLD_MOCK = 9;
            scopeMock = $rootScope.$new();
            stateMock = jasmine.createSpyObj("$state spy", ["go"]);
            ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
            bpManagementControllerServiceMock = jasmine.createSpyObj('bpManagementControllerServiceMock spy', ['isNextButtonEnabled', 'isAddEntryButtonEnabled', 'isSbpOutOfRange', 'isDbpOutOfRange', 'isGtnRateOutOfRange', 'isLabetalolOutOfRange', 'isHeartRateOutOfRange', 'getEntry', 'getOnsetTimeText', 'getTreatmentTargetAndThreshold', 'getTargetAchievedText']);
            patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ["getUniqueId", "getBpMeasurementEntries", "getBpTreatmentThreshold", "getOnsetDateTime", "setBpTreatmentThreshold", "setBpTarget", "getBpTarget", "getGcsScore", "addBpMeasurementEntry", "setBpTargetReachedDateTime"]);
            stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
            demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
            bpStateCacheServiceMock = jasmine.createSpyObj('bpStateCacheServiceMock spy', ['getCurrentState', 'setCurrentState'])
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getTimeSinceOnsetText', 'getDateTimeFromDateAndTime']);

            patientCacheServiceMock.getBpTreatmentThreshold.and.returnValue(null);

            bpManagementControllerServiceMock.getTreatmentTargetAndThreshold.and.returnValue({ treatmentThreshold: 180, treatmentTarget: 150 });
            bpManagementControllerServiceMock.getOnsetTimeText.and.returnValue("greater than");

			tabStateCacheServiceMock = {
				setStateTabB: function() {},
				getStateTabC: function() {}
			};			

			vm = $controller('BpManagementController', {
			    '$scope': scopeMock,
			    '$state': stateMock,
			    '$ionicPopup': ionicPopupMock,
			    'PatientCacheService': patientCacheServiceMock,
			    'StateCacheService': stateCacheServiceMock,
			    'DateTimeService': dateTimeServiceMock,
			    'BpManagementControllerService': bpManagementControllerServiceMock, 
			    'BpStateCacheService': bpStateCacheServiceMock, 
			    'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
			    'DemoModeCacheService': demoModeCacheServiceMock,
			    'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK,
			    'STATE_CRITICAL_CARE_REFERRAL': STATE_CRITICAL_CARE_REFERRAL_MOCK,
			    'STATE_PATIENT_END': STATE_PATIENT_END_MOCK
			});
		});
    });

    it("should initialise the view model correctly", function () {

        expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_BP_MANAGEMENT_MOCK);

        expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
        expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();

        expect(vm.showSbpOutOfRangeMessage).toBeDefined();
        expect(vm.showDbpOutOfRangeMessage).toBeDefined();
        expect(vm.showGtnRateOutOfRangeMessage).toBeDefined();
        expect(vm.showLabetalolOutOfRangeMessage).toBeDefined();
        expect(vm.showHeartRateOutOfRangeMessage).toBeDefined();

        expect(patientCacheServiceMock.getBpMeasurementEntries).toHaveBeenCalled();
        expect(bpManagementControllerServiceMock.getTreatmentTargetAndThreshold).toHaveBeenCalled();
        expect(bpManagementControllerServiceMock.getTargetAchievedText).toHaveBeenCalled();
        
        expect(patientCacheServiceMock.getGcsScore).toHaveBeenCalled();

        expect(vm.treatmentThreshold).toBeDefined();
        expect(vm.treatmentTarget).toBeDefined();
        
        expect(vm.onNext).toBeDefined();
        expect(vm.addEntry).toBeDefined();
        expect(vm.onEntryNow).toBeDefined();
        expect(vm.isAddEntryButtonEnabled).toBeDefined();

        expect(vm.showGtnProtocolPopup).toBeDefined();
        expect(vm.showLabetalolProtocolPopup).toBeDefined();
                
        expect(vm.entryDate).toBe(null);
        expect(vm.entryTime).toBe(null);
        expect(vm.entrySbp).toBe(null);
        expect(vm.entryDbp).toBe(null);
        expect(vm.entryGtn).toBe(null);
        expect(vm.entryLabetalol).toBe(null);
        expect(vm.entryHeartRate).toBe(null);

        expect(vm.treatmentThreshold).toBe(180);
        expect(vm.treatmentTarget).toBe(150);
        expect(vm.onsetTimeText).toBe("greater than");

        expect(patientCacheServiceMock.setBpTreatmentThreshold).toHaveBeenCalled();
        expect(patientCacheServiceMock.setBpTarget).toHaveBeenCalled();
    });

    it("should delegate isAddEntryButtonEnabled to controller.service.isAddEntryButtonEnabled", function () {

        vm.entryDate = "entryDate";
        vm.entryTime = "entryTime";
        vm.entrySbp = "entrySbp";
        vm.entryDbp = "entryDbp";
        vm.entryGtn = "entryGtn";
        vm.entryLabetalol = "entryLabetalol";
        vm.entryHeartRate = "entryHeartRate";
        vm.isAddEntryButtonEnabled();

        expect(bpManagementControllerServiceMock.isAddEntryButtonEnabled).toHaveBeenCalledWith("entryDate", "entryTime", "entrySbp", "entryDbp", "entryGtn", "entryLabetalol", "entryHeartRate");
    });

    it("should delegate showSbpOutOfRangeMessage to controller.service.isSbpOutOfRange", function () {

        vm.entrySbp = "entrySbp";
        vm.showSbpOutOfRangeMessage();
        expect(bpManagementControllerServiceMock.isSbpOutOfRange).toHaveBeenCalledWith("entrySbp");
    });

    it("should delegate showDbpOutOfRangeMessage to controller.service.isDbpOutOfRange", function(){

        vm.entryDbp = "entryDbp";
        vm.showDbpOutOfRangeMessage();
        expect(bpManagementControllerServiceMock.isDbpOutOfRange).toHaveBeenCalledWith("entryDbp");
    });

    it("should delegate showGtnRateOutOfRangeMessage to controller.service.isGtnRateOutOfRange", function () {

        vm.entryGtn = "entryGtn";
        vm.showGtnRateOutOfRangeMessage();
        expect(bpManagementControllerServiceMock.isGtnRateOutOfRange).toHaveBeenCalledWith("entryGtn");
    });

    it("should delegate showLabetalolOutOfRangeMessage to controller.service.isLabetalolOutOfRange", function () {

        vm.entryLabetalol = "entryLabetalol";
        vm.showLabetalolOutOfRangeMessage();
        expect(bpManagementControllerServiceMock.isLabetalolOutOfRange).toHaveBeenCalledWith("entryLabetalol");
    });

    it("should delegate showHeartRateOutOfRangeMessage to controller.service.isHeartRateOutOfRange", function () {

        vm.entryHeartRate = "entryHeartRate";
        vm.showHeartRateOutOfRangeMessage();
        expect(bpManagementControllerServiceMock.isHeartRateOutOfRange).toHaveBeenCalledWith("entryHeartRate");
    });

    it("should populate view model parameters appropriately when onEntryNow is called", function () {

        vm.entryDate = null;
        vm.entryTime = null;
        vm.onEntryNow();
        expect(dateTimeServiceMock.getNowWithZeroSeconds).toHaveBeenCalled();
        expect(vm.entryDate).not.toBe(null);
        expect(vm.entryTime).not.toBe(null);
    });

    it("should go to correct state when onNext is called, current state is STATE_TARGET_ACHIEVED and GCS score is below threshold", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_TARGET_ACHIEVED = "dummy-state";
        vm.gcsScore = 8;
        vm.onNext();
        expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);
    });

    it("should go to correct state when onNext is called, current state is STATE_TARGET_ACHIEVED and GCS score is == threshold", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_TARGET_ACHIEVED = "dummy-state";
        vm.gcsScore = 9;
        vm.onNext();
        expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();
    });

    it("should go to correct state when onNext is called, current state is STATE_START and GCS score is below threshold", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_START = "dummy-state";
        vm.gcsScore = 8;
        vm.onNext();
        expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);
    });

    it("should go to correct state when onNext is called, current state is STATE_START and GCS score is == threshold", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_START = "dummy-state";
        vm.gcsScore = 9;
        vm.onNext();
        expect(stateCacheServiceMock.goLatestStateTabC).toHaveBeenCalled();
    });

    it("should go to correct state when onNext is called, current state is STATE_ABOVE_THRESHOLD", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD = "dummy-state";
        vm.onNext();
        expect(stateMock.go).toHaveBeenCalledWith(STATE_CRITICAL_CARE_REFERRAL_MOCK);
    });

    it("should go to correct state when onNext is called, current state is STATE_ABOVE_THRESHOLD_CONFIRMED", function () {

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD_CONFIRMED = "dummy-state";
        vm.onNext();
        expect(stateMock.go).toHaveBeenCalledWith(STATE_CRITICAL_CARE_REFERRAL_MOCK);
    });

    it("should save data when user selects 'Ok' on validation popup", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        dateTimeServiceMock.getDateTimeFromDateAndTime.and.returnValue("entryDateTime");

        vm.entrySbp = "entrySbp";
        vm.entryDbp = "entryDbp";
        vm.entryGtn = "entryGtn";
        vm.entryLabetalol = "entryLabetalol";
        vm.entryHeartRate = "entryHeartRate";

        vm.addEntry();
        scopeMock.$apply(); // Propagate promise resolution for data validation popup.

        expect(bpManagementControllerServiceMock.getEntry).toHaveBeenCalledWith("entryDateTime", "entrySbp", "entryDbp", "entryGtn", "entryLabetalol", "entryHeartRate");        
        expect(patientCacheServiceMock.addBpMeasurementEntry).toHaveBeenCalled();
    });

    it("should not save data when user selects 'Cancel' on validation popup", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(false); // User selects Cancel
            return deferred.promise;
        });

        vm.addEntry();
        scopeMock.$apply(); // Propagate promise resolution for data validation popup.

        expect(patientCacheServiceMock.addBpMeasurementEntry).not.toHaveBeenCalled();
    });

    it("should show Repeat Bp Reading popup and go to STATE_ABOVE_THRESHOLD (from STATE_START)", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_START = "dummy-state";
        vm.entrySbp = 1;
        vm.treatmentThreshold = 0;
        vm.addEntry();
        scopeMock.$apply();

        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Repeat after 2 minutes");

        expect(bpStateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD);
    });

    it("should go to STATE_ABOVE_THRESHOLD_CONFIRMED", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD = "dummy-state";
        vm.entrySbp = 1;
        vm.treatmentThreshold = 0;
        vm.addEntry();
        scopeMock.$apply();

        expect(bpStateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD_CONFIRMED);

    });

    it("should return to STATE_START if repeat reading is not above threshold", function () {

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD = "dummy-state";
        vm.entrySbp = 0;
        vm.treatmentThreshold = 1;
        vm.addEntry();
        scopeMock.$apply();

        expect(bpStateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(bpStateCacheServiceMock.STATE_START);

    });
    //Edd
    it("should show Repeat Bp Reading popup and go to STATE_ABOVE_THRESHOLD (from STATE_TARGET_ACHIEVED)", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_TARGET_ACHIEVED = "dummy-state";
        vm.entrySbp = 1;
        vm.treatmentThreshold = 0;
        vm.addEntry();
        scopeMock.$apply();

        
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Repeat after 2 minutes");

        expect(bpStateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD);
    });
    
    it("should show Bp target achieved popup and go to STATE_TARGET_ACHIEVED", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });

        ionicPopupMock.confirm.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(true); // User selects Ok
            return deferred.promise;
        });

        bpStateCacheServiceMock.getCurrentState.and.returnValue("dummy-state");
        bpStateCacheServiceMock.STATE_ABOVE_THRESHOLD_CONFIRMED = "dummy-state";
        vm.entrySbp = 0;
        vm.treatmentThreshold = 1;
        vm.addEntry();
        scopeMock.$apply();

        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("BP target achieved");

        expect(bpStateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(bpStateCacheServiceMock.STATE_TARGET_ACHIEVED);
    });

    it("should show GTN Protocol popup", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });
        vm.showGtnProtocolPopup();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("GTN protocol");

    });

    it("should show Labetalol Protocol Popup", function () {

        ionicPopupMock.alert.and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(); // User selects Ok
            return deferred.promise;
        });
        vm.showLabetalolProtocolPopup();
        expect(ionicPopupMock.alert).toHaveBeenCalled();
        expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Labetalol protocol");
    });
});

describe('BpManagementController where PatientCacheService.getBpTreatmentThreshold returns "not-null"', function () {

    var vm;
    var $q;
    var STATE_BP_MANAGEMENT_MOCK, STATE_CRITICAL_CARE_REFERRAL_MOCK, STATE_PATIENT_END_MOCK;
    var GCS_THRESHOLD_MOCK;
    var scopeMock, stateMock, ionicPopupMock, BpManagementControllerMock;
    var patientCacheServiceMock, stateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;
    var tabStateCacheServiceMock, dateTimeServiceMock, bpManagementControllerServiceMock, BpStateCacheService;

    beforeEach(function () {

        module('app.protocolB');

        angular.mock.inject(function ($controller, $rootScope, _$q_) {
            $q = _$q_;
            STATE_BP_MANAGEMENT_MOCK = 'STATE-BP-MANAGEMENT-MOCK';
            STATE_CRITICAL_CARE_REFERRAL_MOCK = 'STATE-CRITICAL-CARE-REFERRAL-MOCK';
            STATE_PATIENT_END_MOCK = 'STATE-PATIENT-END-MOCK';
            GCS_THRESHOLD_MOCK = 9;
            scopeMock = $rootScope.$new();
            stateMock = jasmine.createSpyObj("$state spy", ["go"]);
            ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
            bpManagementControllerServiceMock = jasmine.createSpyObj('bpManagementControllerServiceMock spy', ['isNextButtonEnabled', 'isAddEntryButtonEnabled', 'isSbpOutOfRange', 'isDbpOutOfRange', 'isGtnRateOutOfRange', 'isLabetalolOutOfRange', 'isHeartRateOutOfRange', 'getEntry', 'getOnsetTimeText', 'getTreatmentTargetAndThreshold', 'getTargetAchievedText']);
            patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ["getUniqueId", "getBpMeasurementEntries", "getBpTreatmentThreshold", "getOnsetDateTime", "setBpTreatmentThreshold", "setBpTarget", "getBpTarget", "getGcsScore", "addBpMeasurementEntry", "setBpTargetReachedDateTime"]);
            stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'goLatestStateTabC']);
            demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
            bpStateCacheServiceMock = jasmine.createSpyObj('bpStateCacheServiceMock spy', ['getCurrentState', 'setCurrentState'])
            dateTimeServiceMock = jasmine.createSpyObj('DateTimeService spy', ['getNowWithZeroSeconds', 'getTimeSinceOnsetText', 'getDateTimeFromDateAndTime']);
            
            patientCacheServiceMock.getBpTreatmentThreshold.and.returnValue("not-null");

            bpManagementControllerServiceMock.getOnsetTimeText.and.returnValue("greater than");


            tabStateCacheServiceMock = {
                setStateTabB: function () { },
                getStateTabC: function () { }
            };

            vm = $controller('BpManagementController', {
                '$scope': scopeMock,
                '$state': stateMock,
                '$ionicPopup': ionicPopupMock,
                'PatientCacheService': patientCacheServiceMock,
                'StateCacheService': stateCacheServiceMock,
                'DateTimeService': dateTimeServiceMock,
                'BpManagementControllerService': bpManagementControllerServiceMock,
                'BpStateCacheService': bpStateCacheServiceMock,
                'GCS_THRESHOLD': GCS_THRESHOLD_MOCK,
                'DemoModeCacheService': demoModeCacheServiceMock,
                'STATE_BP_MANAGEMENT': STATE_BP_MANAGEMENT_MOCK,
                'STATE_CRITICAL_CARE_REFERRAL': STATE_CRITICAL_CARE_REFERRAL_MOCK,
                'STATE_PATIENT_END': STATE_PATIENT_END_MOCK
            });
        });
    });

    it("should initialise the view model correctly", function () {

        expect(patientCacheServiceMock.getBpTreatmentThreshold).toHaveBeenCalled();
        expect(bpManagementControllerServiceMock.getTreatmentTargetAndThreshold).not.toHaveBeenCalled();
        expect(vm.onsetTimeText).toBe("greater than");

        expect(patientCacheServiceMock.setBpTreatmentThreshold).not.toHaveBeenCalled();
        expect(patientCacheServiceMock.setBpTarget).not.toHaveBeenCalled();

    });
});
