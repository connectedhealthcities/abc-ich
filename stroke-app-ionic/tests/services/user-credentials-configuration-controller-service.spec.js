'use strict';

describe("UserCredentialsConfigurationControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_UserCredentialsConfigurationControllerService_) {
			 service = _UserCredentialsConfigurationControllerService_;
		 });

	});

	describe("isTestLoginButtonEnabled", function() {

		it("should return false if username is null", function() {

			var isShow = service.isTestLoginButtonEnabled(null, "not-null");
			expect(isShow).toBe(false);
		});

		it("should return false if password is null", function() {

			var isShow = service.isTestLoginButtonEnabled("not-null", null);
			expect(isShow).toBe(false);
		});

		it("should return true if none are null", function() {

			var isShow = service.isTestLoginButtonEnabled("not-null", "not-null");
			expect(isShow).toBe(true);
		});
	});

});
