'use strict';

describe("CriticalCareReferralControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolB');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_CriticalCareReferralControllerService_) {
			 service = _CriticalCareReferralControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if isReferredToCriticalCare is null", function() {

			var isEnabled = service.isNextButtonEnabled(null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if isReferredToCriticalCare is not null", function() {

			var isEnabled = service.isNextButtonEnabled("not-null");
			expect(isEnabled).toBe(true);
		});
	});

});
