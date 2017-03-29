
describe("AdministerBeriplexControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_AdministerBeriplexControllerService_) {
			 service = _AdministerBeriplexControllerService_;
		 });

	});
        // if (isBeriplexAdministered != null &&
        //     !isBeriplexAdministered &&
        //     isVitkAdministered != null &&
        //     !isVitkAdministered) {
        //     isEnabled = true;
        // }
        // else if (isBeriplexAdministered != null &&
        //     isBeriplexAdministered &&
        //     isVitkAdministered != null &&
        //     !isVitkAdministered) {
        //     if (beriplexDate != null &&
        //         beriplexTime != null) {
        //         isEnabled = true;
        //     }
        // }
        // else if (isBeriplexAdministered != null &&
        //     !isBeriplexAdministered &&
        //     isVitkAdministered != null &&
        //     isVitkAdministered) {
        //     if (vitkDate != null &&
        //         vitkTime != null) {
        //         isEnabled = true;
        //     }
        // }
        // else {
        //     if (beriplexDate != null &&
        //         beriplexTime != null &&
        //         vitkDate != null &&
        //         vitkTime != null) {
        //         isEnabled = true;
        //     }
        // }

	describe("isNextButtonEnabled", function() {

		it("should return true if isBeriplexAdministered is false and isVitkAdministered is false", function() {

			var isShow = service.isNextButtonEnabled(false, false);
			expect(isShow).toBe(true);
		});

		it("should return true if isBeriplexAdministered is true and isVitkAdministered is false", function() {

			var isShow = service.isNextButtonEnabled(true, false, "not-null", "not-null");
			expect(isShow).toBe(true);

			var isShow = service.isNextButtonEnabled(true, false, null, "not-null");
			expect(isShow).toBe(false);

			var isShow = service.isNextButtonEnabled(true, false, "not-null", null);
			expect(isShow).toBe(false);
		});

		it("should return true if isBeriplexAdministered is false and isVitkAdministered is true", function() {

			var isShow = service.isNextButtonEnabled(false, true, null, null, "not-null", "not-null");
			expect(isShow).toBe(true);

			var isShow = service.isNextButtonEnabled(false, true, null, null, null, "not-null");
			expect(isShow).toBe(false);

			var isShow = service.isNextButtonEnabled(false, true, null, null, "not-null", null);
			expect(isShow).toBe(false);
		});

		it("should return true if isBeriplexAdministered is true and isVitkAdministered is true", function() {

			var isShow = service.isNextButtonEnabled(true, true, "not-null", "not-null", "not-null", "not-null");
			expect(isShow).toBe(true);

			var isShow = service.isNextButtonEnabled(true, true, null, "not-null", "not-null", "not-null");
			expect(isShow).toBe(false);

			var isShow = service.isNextButtonEnabled(true, true, "not-null", null, "not-null", "not-null");
			expect(isShow).toBe(false);

			var isShow = service.isNextButtonEnabled(true, true, "not-null", "not-null", null, "not-null");
			expect(isShow).toBe(false);

			var isShow = service.isNextButtonEnabled(true, true, "not-null", "not-null", "not-null", null);
			expect(isShow).toBe(false);

		});

	});

	describe("showBeriplexDateTimeCard", function() {

		it("should return false if overrideCalculatedDose is null", function() {

			var isShow = service.showBeriplexDateTimeCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is false", function() {

			var isShow = service.showBeriplexDateTimeCard(false);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is true", function() {

			var isShow = service.showBeriplexDateTimeCard(true);
			expect(isShow).toBe(true);
		});
	});

	describe("showVitaminkDateTimeCard", function() {

		it("should return false if overrideCalculatedDose is null", function() {

			var isShow = service.showVitaminkDateTimeCard(null);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is false", function() {

			var isShow = service.showVitaminkDateTimeCard(false);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is true", function() {

			var isShow = service.showVitaminkDateTimeCard(true);
			expect(isShow).toBe(true);
		});
	});

});
