'use strict';

describe("PatientDetailsControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_PatientDetailsControllerService_) {
			 service = _PatientDetailsControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if doorDate is null", function() {

			var isEnabled = service.isNextButtonEnabled(null, "not-null", "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);
		});

		it("should return false if doorTime is null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", null, "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);
		});

		it("should return false if onsetDate is null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", "not-null", null, "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);
		});

		it("should return false if onsetTime is null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", "not-null", "not-null", null, "not-null", "not-null");
			expect(isEnabled).toBe(false);
		});

		it("should return false if isOnsetLastSeenWell is null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", "not-null", "not-null", "not-null", null, "not-null");
			expect(isEnabled).toBe(false);
		});

		it("should return false if isOnsetBestEstimate is null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", "not-null", "not-null", "not-null", "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if none are null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null", "not-null", "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(true);
		});
	});

	describe("isShowTimeSinceOnsetText", function() {

		it("should return false if timeSinceOnsetText is null", function() {

			var isShow = service.isShowTimeSinceOnsetText(null);
			expect(isShow).toBe(false);
		});

		it("should return true if timeSinceOnsetText is not null", function() {

			var isShow = service.isShowTimeSinceOnsetText("not-null");
			expect(isShow).toBe(true);
		});
	});

});
