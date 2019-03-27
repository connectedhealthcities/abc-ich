'use strict';

describe('NeurosurgeryReferralCriteriaControllerService', function() {

    var service;

    beforeEach(function() {

        module('app.protocolC');

        // Inject the service to test.
        // The underscores are stripped when angular looks up the matching service.
		angular.mock.inject(function (_NeurosurgeryReferralCriteriaControllerService_) {
            service = _NeurosurgeryReferralCriteriaControllerService_;
		});
    });

    describe("isNextButtonEnabled", function () {
        it("should return true if ichEntries, isPosteriorFossaIch and isObstruction are not null and ichEntries.length > 0", function () {
            var isEnabled = service.isNextButtonEnabled(['entry'], "not-null", "not-null");
            expect(isEnabled).toBe(true);
        });

        it("should return false if isObstruction and isPosteriorFossaIch are not null and ichEntries is null", function () {
            var isEnabled = service.isNextButtonEnabled(null, "not-null", "not-null");
            expect(isEnabled).toBe(false);
        });

        it("should return false if ichEntries and isObstruction are not null and isPosteriorFossaIch  is null", function () {
            var isEnabled = service.isNextButtonEnabled("not-null", null, "not-null");
            expect(isEnabled).toBe(false);
        });

        it("should return false if ichEntries and isPosteriorFossaIch are not null and isObstruction is null", function () {
            var isEnabled = service.isNextButtonEnabled("not-null", "not-null", null);
            expect(isEnabled).toBe(false);
        });

        it("should return false if ichEntries, isObstruction, and isPosteriorFossaIch are not null and ichEntries.length == 0", function () {
            var isEnabled = service.isNextButtonEnabled([], "not-null", "not-null");
            expect(isEnabled).toBe(false);
        });
    });

    describe("isAddEntryButtonEnabled", function(){
        it("should return true if ichVolume is not null and ichVolume is in valid range", function(){
            var ichVolume = 10;
            var isEnabled = service.isAddEntryButtonEnabled(ichVolume);
            expect(isEnabled).toBe(true);
        });

        it("should return false if ichVolume is not null and ichVolume is greater than the maximum range bound", function(){
            var ichVolume = 501;
            var isEnabled = service.isAddEntryButtonEnabled(ichVolume);
            expect(isEnabled).toBe(false);
        });

        it("should return false if ichVolume is not null and ichVolume is smaller than the minimum range bound", function(){
            var ichVolume = -10;
            var isEnabled = service.isAddEntryButtonEnabled(ichVolume);
            expect(isEnabled).toBe(false);
        });

        it("should return false if ichVolume is null", function(){
            var ichVolume = null;
            var isEnabled = service.isAddEntryButtonEnabled(ichVolume);
            expect(isEnabled).toBe(false);
        });
    });

    describe("isIchVolumeOutOfRange", function () {
        it("should return true if ichVolume is within the allowed range", function () {
            var isIchVolumeWithinRange = service.isIchVolumeWithinRange(0);
            expect(isIchVolumeWithinRange).toBe(true);

            isIchVolumeWithinRange = service.isIchVolumeWithinRange(500);
            expect(isIchVolumeWithinRange).toBe(true);
        });

        it("should return true if ichVolume is null", function () {
            var isIchVolumeWithinRange = service.isIchVolumeWithinRange(null);
            expect(isIchVolumeWithinRange).toBe(true);
        });

        it("should return false if ichVolume is not within the allowed range", function () {
            var isIchVolumeWithinRange = service.isIchVolumeWithinRange(-1);
            expect(isIchVolumeWithinRange).toBe(false);

            isIchVolumeWithinRange = service.isIchVolumeWithinRange(501);
            expect(isIchVolumeWithinRange).toBe(false);
        });
    });

    describe("calculateVolume", function () {
        
        it("should return null if any parameter is null", function () {
            var volume = service.calculateVolume(null, 2, 3, 4);
            expect(volume).toBe(null);

            volume = service.calculateVolume(1, null, 3, 4);
            expect(volume).toBe(null);

            volume = service.calculateVolume(1, 2, null, 4);
            expect(volume).toBe(null);

            volume = service.calculateVolume(1, 2, 3, null);
            expect(volume).toBe(null);
        });

        it("should not be null if all parameters are not null", function () {
            var volume = service.calculateVolume(1, 2, 3, 4);
            expect(volume).not.toBe(null);
        });
    });

    describe("isNeuroReferralRequired", function () {
        it("should return false if GCS score is >= GCS threshold (9) and Total ICH volume < ICH threshold (3) and there is no posterior fossa ICH and Ventricle obstructed is false", function () {
            var ichEntries = [{
                'ichVolume':2
            }];
            var isNeuroReferralRequired = service.isNeuroReferralRequired(9, ichEntries, false, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(false);

            isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, false, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(false);
        });

        it("should return true if GCS score is < GCS threshold (9) and Total ICH volume < ICH threshold (3) and there is no posterior fossa ICH and Ventricle obstructed false", function () {
            var ichEntries = [{
                'ichVolume':2
            }];
            var isNeuroReferralRequired = service.isNeuroReferralRequired(8, ichEntries, false, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);
        });

        it("should return true if GCS score is > GCS threshold (9) and Total ICH volume >= ICH threshold (3) and there is no posterior fossa ICH and Ventricle obstructed false", function () {
            var ichEntries = [
                {'ichVolume':2},
                {'ichVolume':3}
            ];
            var isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, false, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);

            isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, false, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);
        });

        it("should return true if GCS score is >= GCS threshold (9) and Total ICH volume < ICH threshold (3) and there is no posterior fossa ICH and Ventricle obstructed true", function () {
            var ichEntries = [{
                'ichVolume':2
            }];
            var isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, false, true, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);

            isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, false, true, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);
        });

        it("should return true if GCS score is >= GCS threshold (9) and Total ICH volume < ICH threshold (3) and there is no Ventricle obstructed and posterior fossa ICH is true ", function () {
            var ichEntries = [{
                'ichVolume':2
            }];
            var isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, true, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);

            isNeuroReferralRequired = service.isNeuroReferralRequired(10, ichEntries, true, false, 9, 3);
            expect(isNeuroReferralRequired).toBe(true);
        });
    });

    describe("getSliderConfig", function () {
        it("should return slider config object", function () {
            var sliderConfig = service.getSliderConfig();
            expect(sliderConfig).toBeDefined();
            expect(sliderConfig.images).toBeDefined();
            expect(sliderConfig.options).toBeDefined();
        });
    });

    describe("showIchVolumeField", function () {
        it("should return true if ichVolume is not null", function () {
            var showIchVolumeField = service.showIchVolumeField("not-null");
            expect(showIchVolumeField).toBe(true);
        });

        it("should return false if ichVolume is null", function () {
            var showIchVolumeField = service.showIchVolumeField(null);
            expect(showIchVolumeField).toBe(false);
        });
    });
});
