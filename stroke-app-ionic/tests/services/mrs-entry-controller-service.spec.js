'use strict';

describe("MrsEntryControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolC');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_MrsEntryControllerService_) {
			 service = _MrsEntryControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if mrsValue is null", function() {

			var isShow = service.isNextButtonEnabled(null);
			expect(isShow).toBe(false);
		});

		it("should return true if mrsValue is not null", function() {

			var isShow = service.isNextButtonEnabled("not-null");
			expect(isShow).toBe(true);
		});
	});

});
