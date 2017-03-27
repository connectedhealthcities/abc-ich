
describe("ConfirmBeriplexDoseControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_ConfirmBeriplexDoseControllerService_) {
			 service = _ConfirmBeriplexDoseControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if overrideCalculatedDose is null", function() {

			var isShow = service.isNextButtonEnabled(null, "not-null");
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is false", function() {

			var isShow = service.isNextButtonEnabled(false, null);
			expect(isShow).toBe(true);
		});

		it("should return false if overrideCalculatedDose is true and actualDose is null", function() {

			var isShow = service.isNextButtonEnabled(true, null);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is true and actualDose is n0t null", function() {

			var isShow = service.isNextButtonEnabled(true, "not-null");
			expect(isShow).toBe(true);
		});
	});

	describe("isShowVitkList", function() {

		it("should return false if overrideCalculatedDose is null", function() {

			var isShow = service.isShowActualDose(null);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is false", function() {

			var isShow = service.isShowActualDose(false);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is true", function() {

			var isShow = service.isShowActualDose(true);
			expect(isShow).toBe(true);
		});
	});

});
