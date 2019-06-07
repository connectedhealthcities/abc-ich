
describe("ReversalAgentDetailsControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_ReversalAgentDetailsControllerService_) {
			 service = _ReversalAgentDetailsControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return true if reversalAgent is 'None'", function() {

			var isEnabled = service.isNextButtonEnabled("None");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospital is null or false", function() {

			var isEnabled = service.isNextButtonEnabled("not-none", null, null, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("not-none", null, null, null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("not-none", null, null, "not-null", null);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("not-none", false, null, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("not-none", false, null, null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("not-none", false, null, "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospitalis true and reversalAgentAdministeredTimeKnown is false", function() {

			var isEnabled = service.isNextButtonEnabled("not-none", true, false);
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("not-none", true, null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospitalis true and reversalAgentAdministeredTimeKnown is true", function() {

			var isEnabled = service.isNextButtonEnabled("not-none", true, true, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled("not-none", true, true, null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled("not-none", true, true, "not-null", null);
			expect(isEnabled).toBe(false);
		});
	});

	describe("showIsReversalTimeKnownCard", function() {

		it("should return true if reversalAgentAdministeredAtExternalHospital is true", function() {

			var isShow = service.showIsReversalTimeKnownCard(true);
			expect(isShow).toBe(true);
		});

		it("should return false if overrideCalculatedDose is false", function() {

			var isShow = service.showIsReversalTimeKnownCard(false);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is null", function() {

			var isShow = service.showIsReversalTimeKnownCard(null);
			expect(isShow).toBe(false);
		});
	});

	describe("showReversalTimeCard", function() {

		it("should return true if reversalAgentAdministeredAtExternalHospital is null or false", function() {

			var isShow = service.showReversalTimeCard(null, null, "not-none");
			expect(isShow).toBe(true);

			var isShow = service.showReversalTimeCard(null, null, "None");
			expect(isShow).toBe(false);

			var isShow = service.showReversalTimeCard(null, null, null);
			expect(isShow).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospital is true and reversalAgentAdministeredTimeKnown is true", function() {

			var isShow = service.showReversalTimeCard(true, true);
			expect(isShow).toBe(true);

			var isShow = service.showReversalTimeCard(true, false);
			expect(isShow).toBe(false);
		});
	});

	describe("hideReversalAgentOptionNone", function() {

		it("should return true if reversalAgentAdministeredAtExternalHospital is true", function() {

			var isHide = service.hideReversalAgentOptionNone(true);
			expect(isHide).toBe(true);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is null", function() {

			var isHide = service.hideReversalAgentOptionNone(null);
			expect(isHide).toBe(false);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is false", function() {

			var isHide = service.hideReversalAgentOptionNone(false);
			expect(isHide).toBe(false);
		});
	});

	describe("hideReversalAgentCard", function(){
		
		it("should return true if hasDoacBeenTaken is true", function(){
			var isHide = service.hideReversalAgentCard(true);
			expect(isHide).toBe(true);
		});

		it("should return false if hasDoacBeenTaken is false", function(){
			var isHide = service.hideReversalAgentCard(false);
			expect(isHide).toBe(false);
		});

	});

});
