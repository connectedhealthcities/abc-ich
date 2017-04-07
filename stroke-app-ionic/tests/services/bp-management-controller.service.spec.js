describe('BpManagementControllerService', function () {

    var service;

    beforeEach(function () {

        module('app.protocolB');

        angular.mock.inject(function (_BpManagementControllerService_) {
            service = _BpManagementControllerService_
        });
    });

    describe("isAddEntryButtonEnabled", function () {
        it("should return true if all values are not null and values are within range", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(true);
        });

        it("should return true if entryHeartRate is null and values are within range", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = 1;
            var entryHeartRate = null;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(true);
        });

        it("should return true if entryLabetalol is null and values are within range", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = null;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(true);
        });

        it("should return true if entryGtn is null and values are within range", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = null;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(true);
        });

        it("should return false if entryHeartRate is not within range < 10", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = 1;
            var entryHeartRate = 9;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryHeartRate is not within range > 300", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = 1;
            var entryHeartRate = 301;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should false false if entryLabetalol is not within range < 0", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = -1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryLabetalol is not within range > 100", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 1;
            var entryLabetalol = 101;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryGtn is not within range < 0", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = -1;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryGtn is not within range  > 21", function () {

            var entryDate = "not-null";
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 21;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryDate is null", function () {

            var entryDate = null;
            var entryTime = "not-null";
            var entrySbp = 11;
            var entryGtn = 21;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });

        it("should return false if entryTime is null", function () {

            var entryDate = "not-null";
            var entryTime = null;
            var entrySbp = 11;
            var entryGtn = 21;
            var entryLabetalol = 1;
            var entryHeartRate = 11;

            var isEnabled = service.isAddEntryButtonEnabled(entryDate, entryTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(isEnabled).toBe(false);
        });
    });

    describe("isSbpOutOfRange", function () {
        it("should return true if SBP is out of range < 10", function () {
            var isOutOfRange = service.isSbpOutOfRange(9);
            expect(isOutOfRange).toBe(true);
        });

        it("should return true if SBP is out of range > 300", function () {
            var isOutOfRange = service.isSbpOutOfRange(301);
            expect(isOutOfRange).toBe(true);
        });

        it("should return false if SBP is within range 10", function () {
            var isOutOfRange = service.isSbpOutOfRange(10);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if SBP is within range 300", function () {
            var isOutOfRange = service.isSbpOutOfRange(300);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if SBP is within range 150", function () {
            var isOutOfRange = service.isSbpOutOfRange(150);
            expect(isOutOfRange).toBe(false);
        });
    });

    describe("isGtnRateOutOfRange", function () {
        it("should return true if GTN rate is out of range < 0", function () {
            var isOutOfRange = service.isGtnRateOutOfRange(-1);
            expect(isOutOfRange).toBe(true);
        });

        it("should return true if GTN rate is out of range > 20", function () {
            var isOutOfRange = service.isGtnRateOutOfRange(21);
            expect(isOutOfRange).toBe(true);
        });

        it("should return false if GTN rate is within range 0", function () {
            var isOutOfRange = service.isGtnRateOutOfRange(0);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if GTN rate is within range 20", function () {
            var isOutOfRange = service.isGtnRateOutOfRange(20);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if GTN rate is within range 15", function () {
            var isOutOfRange = service.isGtnRateOutOfRange(15);
            expect(isOutOfRange).toBe(false);
        });
    });

    describe("isLabetalolOutOfRange", function () {
        it("should return true if Labetalol is out of range < 0", function () {
            var isOutOfRange = service.isLabetalolOutOfRange(-1);
            expect(isOutOfRange).toBe(true);
        });

        it("should return true if Labetalol is out of range > 100", function () {
            var isOutOfRange = service.isLabetalolOutOfRange(101);
            expect(isOutOfRange).toBe(true);
        });

        it("should return false if Labetalol is within range 10", function () {
            var isOutOfRange = service.isLabetalolOutOfRange(0);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if Labetalol is within range 300", function () {
            var isOutOfRange = service.isLabetalolOutOfRange(100);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if Labetalol is within range 15", function () {
            var isOutOfRange = service.isLabetalolOutOfRange(15);
            expect(isOutOfRange).toBe(false);
        });
    });

    describe("isHeartRateOutOfRange", function () {
        it("should return true if Heart rate is out of range < 10", function () {
            var isOutOfRange = service.isHeartRateOutOfRange(9);
            expect(isOutOfRange).toBe(true);
        });

        it("should return true if Heart rate is out of range > 300", function () {
            var isOutOfRange = service.isHeartRateOutOfRange(301);
            expect(isOutOfRange).toBe(true);
        });

        it("should return false if Heart rate is within range 10", function () {
            var isOutOfRange = service.isHeartRateOutOfRange(10);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if Heart rate is within range 300", function () {
            var isOutOfRange = service.isHeartRateOutOfRange(300);
            expect(isOutOfRange).toBe(false);
        });

        it("should return false if Heart rate is within range 15", function () {
            var isOutOfRange = service.isHeartRateOutOfRange(15);
            expect(isOutOfRange).toBe(false);
        });
    });

    describe("getEntry", function () {
        it("should return entry", function () {
            var entryDateTime = "dateTime";
            var entrySbp = "systolicBp";
            var entryGtn = "gtnRate";
            var entryLabetalol = "labetalolDose";
            var entryHeartRate = "heartRate";

            var entry = service.getEntry(entryDateTime, entrySbp, entryGtn, entryLabetalol, entryHeartRate);

            expect(entry.dateTime).toBe("dateTime");
            expect(entry.systolicBp).toBe("systolicBp");
            expect(entry.gtnRate).toBe("gtnRate");
            expect(entry.labetalolDose).toBe("labetalolDose");
            expect(entry.heartRate).toBe("heartRate");
        });
    });

    describe("getTargetAchievedText", function () {
        it("should return '130 to 180 mmHg'", function () {
            var targetAchievedText = service.getTargetAchievedText(200);
            expect(targetAchievedText).toBe("130 to 180 mmHg");
        });

        it("should return '130 to 140 mmHg'", function () {
            var targetAchievedText = service.getTargetAchievedText(150);
            expect(targetAchievedText).toBe("130 to 140 mmHg");
        });
    });

    describe("getTreatmentTargetAndThreshold", function () {
        it("should return valid oject when onset time is more than six hours ago", function () {
            var sixHoursAgo = new Date(new Date().getTime() - (6 * 60 * 60 * 1000));
            var treatmentTargetAndThresholdCardModel = service.getTreatmentTargetAndThreshold(sixHoursAgo, new Date());
            expect(treatmentTargetAndThresholdCardModel.treatmentThreshold).toBe(200);
            expect(treatmentTargetAndThresholdCardModel.treatmentTarget).toBe(180);
        });

        it("should return valid oject when onset time is less than six hours ago", function () {
            var treatmentTargetAndThresholdCardModel = service.getTreatmentTargetAndThreshold(new Date(), new Date());
            expect(treatmentTargetAndThresholdCardModel.treatmentThreshold).toBe(150);
            expect(treatmentTargetAndThresholdCardModel.treatmentTarget).toBe(140);
        });
    });

    describe("getTreatmentTargetAndThreshold", function () {
        it("should return 'greater than' when treatment threshold is 200", function () {
            onsetTimeText = service.getOnsetTimeText(200);
            expect(onsetTimeText).toBe("greater than");
        });

        it("should return 'less than' when treatment threshold is not 200", function () {
            onsetTimeText = service.getOnsetTimeText(1);
            expect(onsetTimeText).toBe("less than");
        });
    });
});