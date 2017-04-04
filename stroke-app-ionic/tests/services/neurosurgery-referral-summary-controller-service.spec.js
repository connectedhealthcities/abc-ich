'use strict';

describe("NeurosurgeryReferralSummaryControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolC');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_NeurosurgeryReferralSummaryControllerService_) {
			 service = _NeurosurgeryReferralSummaryControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if isReferred is null", function() {

			var isEnabled = service.isNextButtonEnabled(null);
			expect(isEnabled).toBe(false);
		});

		it("should return true when isReferred is true and all referral details are completed", function() {

			var isEnabled = service.isNextButtonEnabled(true, "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(true, null, "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, "not-null", null, "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, "not-null", "not-null", null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, "not-null", "not-null", "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true when isReferred is false", function() {

			var isEnabled = service.isNextButtonEnabled(false, "not-null");
			expect(isEnabled).toBe(true);
		});
	});

	describe("showReferralDetailsCards", function() {

		it("should return true if isReferred is true", function() {

			var isShow = service.showReferralDetailsCards(true);
			expect(isShow).toBe(true);
		});
		it("should return false if isReferred is false", function() {

			var isShow = service.showReferralDetailsCards(false);
			expect(isShow).toBe(false);
		});

		it("should return false if isReferred is null", function() {

			var isShow = service.showReferralDetailsCards(null);
			expect(isShow).toBe(false);
		});
	});

});
