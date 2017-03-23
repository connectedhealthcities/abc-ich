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

			var isShow = service.isSendTestEmailButtonEnabled(null);
			expect(isShow).toBe(false);
		});

		it("should return true if emailAddress is not null", function() {

			var isShow = service.isSendTestEmailButtonEnabled("not-null");
			expect(isShow).toBe(true);
		});
	});

});
