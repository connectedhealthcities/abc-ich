'use strict';

describe("PatientStartControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_PatientStartControllerService_) {
			 service = _PatientStartControllerService_;
		 });

	});

	describe("isShowResumePatient", function() {

		it("should return false if patientId is null", function() {

			var isShow = service.isShowResumePatient(null);
			expect(isShow).toBe(false);
		});

		it("should return true if patientId is not null", function() {

			var isShow = service.isShowResumePatient("not-null");
			expect(isShow).toBe(true);
		});
	});

	describe("isAppConfigured", function() {

		it("should return true if username and password are not null or empty strings", function() {

			var isConfigured = service.isAppConfigured("not-null", "not-null");
			expect(isConfigured).toBe(true);
		});

		it("should return false if username is null", function() {

			var isConfigured = service.isAppConfigured(null);
			expect(isConfigured).toBe(false);
		});

		it("should return false if password is null", function() {

			var isConfigured = service.isAppConfigured("not-null", null);
			expect(isConfigured).toBe(false);
		});

		it("should return false if username is empty string", function() {

			var isConfigured = service.isAppConfigured("");
			expect(isConfigured).toBe(false);
		});

		it("should return false if password is empty string", function() {

			var isConfigured = service.isAppConfigured("not-null", "");
			expect(isConfigured).toBe(false);
		});
	});
});
