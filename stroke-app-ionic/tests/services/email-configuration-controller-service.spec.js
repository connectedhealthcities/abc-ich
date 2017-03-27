'use strict';

describe("EmailConfigurationControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_EmailConfigurationControllerService_) {
			 service = _EmailConfigurationControllerService_;
		 });

	});

	describe("isSendTestEmailButtonEnabled", function() {

		it("should return false if emailAddress is null", function() {

			var isEnabled = service.isSendTestEmailButtonEnabled(null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if emailAddress is not null", function() {

			var isEnabled = service.isSendTestEmailButtonEnabled("not-null");
			expect(isEnabled).toBe(true);
		});
	});

});
