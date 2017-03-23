'use strict';

describe("GcsEntryControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_GcsEntryControllerService_) {
			 service = _GcsEntryControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if eyeValue is null", function() {

			var isShow = service.isNextButtonEnabled(null, "not-null", "not-null");
			expect(isShow).toBe(false);
		});

		it("should return false if verbalValue is null", function() {

			var isShow = service.isNextButtonEnabled("not-null", null, "not-null");
			expect(isShow).toBe(false);
		});

		it("should return false if motorValue is null", function() {

			var isShow = service.isNextButtonEnabled("not-null", "not-null", null);
			expect(isShow).toBe(false);
		});

		it("should return true if none are null", function() {

			var isShow = service.isNextButtonEnabled("not-null", "not-null", "not-null");
			expect(isShow).toBe(true);
		});
	});

	describe("getGcsTotal", function() {

		it("should return null if eyeValue is null", function() {

			var isShow = service.getGcsTotal(null, "not-null", "not-null");
			expect(isShow).toBe(null);
		});

		it("should return null if verbalValue is null", function() {

			var isShow = service.getGcsTotal("not-null", null, "not-null");
			expect(isShow).toBe(null);
		});

		it("should return null if motorValue is null", function() {

			var isShow = service.getGcsTotal("not-null", "not-null", null);
			expect(isShow).toBe(null);
		});

		it("should return the sum if none are null", function() {

			var isShow = service.getGcsTotal(3, 4, 5);
			expect(isShow).toBe(3+4+5);
		});

	});

});
