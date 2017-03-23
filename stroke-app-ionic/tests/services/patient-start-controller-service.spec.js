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

});
