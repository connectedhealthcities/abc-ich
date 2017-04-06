'use strict';

describe("RegisterPatientControllerService", function() {

	var service;

	beforeEach(function() {

		 var mockMoment = {};

		 angular.mock.module('app.general');

		 module(function ($provide) {
        	 $provide.value('moment', mockMoment);
		 });
 
 		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_RegisterPatientControllerService_) {
			 service = _RegisterPatientControllerService_;
		 });

	});

	describe("showDateOfBirthCard", function() {

		it("should return true if isDateOfBirthKnown is true", function() {

			var isShow = service.showDateOfBirthCard(true);
			expect(isShow).toBe(true);
		});

		it("should return false if isDateOfBirthKnown is null", function() {

			var isShow = service.showDateOfBirthCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if isDateOfBirthKnown is false", function() {

			var isShow = service.showDateOfBirthCard(false);
			expect(isShow).toBe(false);
		});
	});

	describe("showBirthDateConfirmationField", function() {

		it("should return true if dateOfBirth is true", function() {

			var isShow = service.showBirthDateConfirmationField(true);
			expect(isShow).toBe(true);
		});

		it("should return false if dateOfBirth is null", function() {

			var isShow = service.showBirthDateConfirmationField(null);
			expect(isShow).toBe(false);
		});

		it("should return false if dateOfBirth is false", function() {

			var isShow = service.showBirthDateConfirmationField(false);
			expect(isShow).toBe(false);
		});
	});

	describe("showAgeCard", function() {

		it("should return true if isDateOfBirthKnown is false", function() {

			var isShow = service.showAgeCard(false);
			expect(isShow).toBe(true);
		});

		it("should return false if isDateOfBirthKnown is null", function() {

			var isShow = service.showAgeCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if isDateOfBirthKnown is true", function() {

			var isShow = service.showAgeCard(true);
			expect(isShow).toBe(false);
		});
	});

	describe("showScanTimeCard", function() {

		it("should return true if isExternalScan is false", function() {

			var isShow = service.showScanTimeCard(false);
			expect(isShow).toBe(true);
		});

		it("should return false if isExternalScan is null", function() {

			var isShow = service.showScanTimeCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if isExternalScan is true", function() {

			var isShow = service.showScanTimeCard(true);
			expect(isShow).toBe(false);
		});
	});

	describe("showExternalHospitalCard", function() {

		it("should return true if isExternalScan is true", function() {

			var isShow = service.showExternalHospitalCard(true);
			expect(isShow).toBe(true);
		});

		it("should return false if isExternalScan is null", function() {

			var isShow = service.showExternalHospitalCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if isExternalScan is false", function() {

			var isShow = service.showExternalHospitalCard(false);
			expect(isShow).toBe(false);
		});
	});

	describe("showOtherHospitalField", function() {

		it("should return true if selectedHospital is 'Other'", function() {

			var isShow = service.showOtherHospitalField("Other");
			expect(isShow).toBe(true);
		});

		it("should return false if selectedHospital is null", function() {

			var isShow = service.showOtherHospitalField(null);
			expect(isShow).toBe(false);
		});

		it("should return false if selectedHospital is not 'Other'", function() {

			var isShow = service.showOtherHospitalField("not-other");
			expect(isShow).toBe(false);
		});
	});

	describe("isDobInvalidDate", function() {

		it("should return true if year is less than 1000", function() {

			var isInvalid = service.isDobInvalidDate(null, null, 999);
			expect(isInvalid).toBe(true);
		});
	});

	describe("isYearOutOfRange", function() {

		it("should return true if year is less than minYear", function() {
			var isOutOfRange = service.isYearOutOfRange(4, 5, 10);
			expect(isOutOfRange).toBe(true);
		});

		it("should return false if year is equal to minYear", function() {
			var isOutOfRange = service.isYearOutOfRange(5, 5, 10);
			expect(isOutOfRange).toBe(false);
		});

		it("should return false if year is equal to maxYear", function() {
			var isOutOfRange = service.isYearOutOfRange(10, 5, 10);
			expect(isOutOfRange).toBe(false);
		});

		it("should return true if year is greater than maxYear", function() {
			var isOutOfRange = service.isYearOutOfRange(11, 5, 10);
			expect(isOutOfRange).toBe(true);
		});
	});

	describe("isInitialsInvalid", function() {

		it("should return false if initials is null", function() {

			var isInvalid = service.isInitialsInvalid(null);
			expect(isInvalid).toBe(false);
		});

		it("should return false if initials is two uppercase letters", function() {

			var isInvalid = service.isInitialsInvalid("AB");
			expect(isInvalid).toBe(false);
		});

		it("should return false if initials is three uppercase letters", function() {

			var isInvalid = service.isInitialsInvalid("ABC");
			expect(isInvalid).toBe(false);
		});

		it("should return true if initials is single uppercase letter", function() {

			var isInvalid = service.isInitialsInvalid("A");
			expect(isInvalid).toBe(true);
		});

		it("should return true if initials is four uppercase letters", function() {

			var isInvalid = service.isInitialsInvalid("ABCD");
			expect(isInvalid).toBe(true);
		});

		it("should return true if initials is three letters but not all are upercase", function() {

			var isInvalid = service.isInitialsInvalid("AbC");
			expect(isInvalid).toBe(true);
		});

		it("should return true if initials is three characters but not all are letters", function() {

			var isInvalid = service.isInitialsInvalid("A-C");
			expect(isInvalid).toBe(true);
		});
	});

	describe("areAllDateFieldsComplete", function() {

		it("should return false if any supplied parameters are null", function() {

			var areAllComplete = service.areAllDateFieldsComplete(null, "not-null", 1000);
			expect(areAllComplete).toBe(false);

			var areAllComplete = service.areAllDateFieldsComplete("not-null", null, 1000);
			expect(areAllComplete).toBe(false);

			var areAllComplete = service.areAllDateFieldsComplete("not-null", "not-null", null);
			expect(areAllComplete).toBe(false);
		});

		it("should return false if year is less than 1000", function() {

			var areAllComplete = service.areAllDateFieldsComplete("not-null", "not-null", 999);
			expect(areAllComplete).toBe(false);
		});

		it("should return true if year is less than 1000", function() {

			var areAllComplete = service.areAllDateFieldsComplete("not-null", "not-null", 1000);
			expect(areAllComplete).toBe(true);
		});
	});

	describe("isNextButtonEnabled", function() {

		it("should return false if initials are null", function() {

			var isEnabled = service.isNextButtonEnabled(null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if initials are invalid", function() {

			var isEnabled = service.isNextButtonEnabled("A");
			expect(isEnabled).toBe(false);
		});

		it("should return false if isDateOfBirthKnown is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if dateOfBirth is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", true, null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if isExternalScan is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", true, "not-null","not-null", null);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if estimatedAge is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if scanDate or scanTime is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", "not-null", false, null);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", "not-null", false, "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if selectedHospital is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", "not-null", true, "not-null", "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return false if otherHospital is null", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", false, "not-null", "not-null", true, "not-null", "not-null", "Other", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true when data is consistent", function() {

			var isEnabled = service.isNextButtonEnabled("ABC", true, "not-null", null, false, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("ABC", true, "not-null", null, true, null, null, "not-other");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("ABC", true, "not-null", null, true, null, null, "Other", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("ABC", false, null, "not-null", false, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("ABC", false, null, "not-null", true, null, null, "not-other");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("ABC", false, null, "not-null", true, null, null, "Other", "not-null");
			expect(isEnabled).toBe(true);

		});
	});

	describe("getDateOfBirth", function() {

		it("should return null if any of the supplied parameters is null", function() {

			var dob = service.getDateOfBirth(null, "not-null", "not-null", "not-null");
			expect(dob).toBe(null);

			var dob = service.getDateOfBirth("not-null", null, "not-null", "not-null");
			expect(dob).toBe(null);

			var dob = service.getDateOfBirth("not-null", "not-null", null, "not-null");
			expect(dob).toBe(null);

			var dob = service.getDateOfBirth("not-null", "not-null", "not-null", null);
			expect(dob).toBe(null);
		});
	});

});
