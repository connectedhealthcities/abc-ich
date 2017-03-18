
describe("AnticoagulantIdentificationControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_AnticoagulantIdentificationControllerService_) {
			 service = _AnticoagulantIdentificationControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if anticoagulantType is null", function() {

			var isShow = service.isNextButtonEnabled(null);
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'Unknown'", function() {

			var isShow = service.isNextButtonEnabled("Unknown");
			expect(isShow).toBe(true);
		});

		it("should return true if anticoagulantType is 'None'", function() {

			var isShow = service.isNextButtonEnabled("None");
			expect(isShow).toBe(true);
		});

		it("should return true if anticoagulantType is 'Vitamin K antagonist' and anticoagulantName is not null", function() {

			var isShow = service.isNextButtonEnabled("Vitamin K antagonist", "not-null");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'Vitamin K antagonist' and anticoagulantName is null", function() {

			var isShow = service.isNextButtonEnabled("Vitamin K antagonist", null);
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'DOAC' and anticoagulantName is not null", function() {

			var isShow = service.isNextButtonEnabled("DOAC", "not-null");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC' and anticoagulantName is null", function() {

			var isShow = service.isNextButtonEnabled("DOAC", null);
			expect(isShow).toBe(false);
		});
	});

	describe("isShowVitkList", function() {

		it("should return false if anticoagulantType is not 'Vitamin K antagonist'", function() {

			var isShow = service.isShowVitkList("not Vitamin K antagonist");
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'Vitamin K antagonist'", function() {

			var isShow = service.isShowVitkList("Vitamin K antagonist");
			expect(isShow).toBe(true);
		});
	});

	describe("isShowDoacList", function() {

		it("should return false if anticoagulantType is not 'DOAC'", function() {

			var isShow = service.isShowDoacList("not DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'DOAC'", function() {

			var isShow = service.isShowDoacList("DOAC");
			expect(isShow).toBe(true);
		});
	});
});
