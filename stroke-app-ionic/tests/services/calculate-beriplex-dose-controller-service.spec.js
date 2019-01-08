
describe("CalculateBeriplexDoseControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_CalculateBeriplexDoseControllerService_) {
			 service = _CalculateBeriplexDoseControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return true if reversalAgentAdministeredAtExternalHospital is true", function() {

			var isEnabled = service.isNextButtonEnabled(true);
			expect(isEnabled).toBe(true);
		});

		it("should return false if 'administerBeriplexWithoutInr' is null", function() {

			var isEnabled = service.isNextButtonEnabled(false, null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if 'administerBeriplexWithoutInr' is true", function() {

			var isEnabled = service.isNextButtonEnabled(false, true, "anything", "anything", "anything", "anything", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, true, "anything", "anything", "anything", "anything", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if 'administerBeriplexWithoutInr' is false and 'anticoagulantType' is Unknown and inrValue >= INR_THRESHOLD", function() {

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", "not-null", 5, "not-null", 5);
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", null, "not-null", "not-null", "not-null", 5, "not-null", 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", null, "not-null", "not-null", 5, "not-null", 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", null, "not-null", 5, "not-null", 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", null, 5, "not-null", 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", "not-null", null, "not-null", 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", "not-null", 5, null, 5);
			expect(isEnabled).toBe(false);
		});

		it("should return true if 'administerBeriplexWithoutInr' is false and 'anticoagulantType' is Unknown and inrValue < INR_THRESHOLD", function() {

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", "not-null", 4, null, 5);
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", null, "not-null", "not-null", "not-null", 4, null, 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", null, "not-null", "not-null", 4, null, 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", null, "not-null", 4, null, 5);
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "Unknown", "not-null", "not-null", "not-null", null, 4, null, 5);
			expect(isEnabled).toBe(false);
		});

		it("should return true if 'administerBeriplexWithoutInr' is false and 'anticoagulantType' is NOT Unknown", function() {

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", "not-null", "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", null, "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", "not-null", null, "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", "not-null", "not-null", null, "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", "not-null", "not-null", "not-null", null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, false, "not-nknown", "not-null", "not-null", "not-null", "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should always return true if 'anticoagulantType' is 'DOAC' and 'estimatedWeightInKg' is not Unknown", function(){
			var isEnabled = service.isNextButtonEnabled(false, false, "DOAC", "anything", "anything", "anything", 10, "anything", "anything", "anything");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, false, "DOAC", "anything", "anything", "anything", null, "anything", "anything", "anything");
			expect(isEnabled).toBe(false);
		});
	});

	describe("showReversalAgentAdministeredAtExternalHospitalCard", function() {

		it("should return false if externalScanHospitalName is null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard(null, null);
			expect(isShow).toBe(false);
		});

		it("should return true if externalScanHospitalName is not null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("not-null", null);
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("anything", "DOAC");
			expect(isShow).toBe(false);
		});
	});

	describe("showAdministerBeriplexWithoutInrCard", function() {

		it("should return true if externalScanHospitalName is null", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard(null, "anything", "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is null", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("not-null", null, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is true", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("not-null", true, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospital is false", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("not-null", false, "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", "anything", "DOAC");
			expect(isShow).toBe(false);
		});
	});

	describe("showInrCard", function() {

		it("should return false if administerBeriplexWithoutInr is null", function() {

			var isShow = service.showInrCard(null, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return false if administerBeriplexWithoutInr is true", function() {

			var isShow = service.showInrCard(true, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if administerBeriplexWithoutInr is false", function() {

			var isShow = service.showInrCard(false, "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showInrCard("anything", "DOAC");
			expect(isShow).toBe(false);
		});
	});

	describe("showEstimatedWeightCard", function() {

		it("should return false if administerBeriplexWithoutInr is null", function() {

			var isShow = service.showEstimatedWeightCard(null, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if administerBeriplexWithoutInr is not null", function() {

			var isShow = service.showEstimatedWeightCard("not-null", "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return true if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showEstimatedWeightCard("anything", "DOAC");
			expect(isShow).toBe(true);
		});
	});

	describe("showBeriplexAdministrationOverrideCard", function() {

		it("should return false if anticoagulantType is not 'Unknown'", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("not-unknown", "anything", "anything", "anything");
			expect(isShow).toBe(false);
		});

		it("should return false if anticoagulantType is 'Unknown' and inrValue <= INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("Unknown", "anything", 5, 5);
			expect(isShow).toBe(false);
		});

		it("should return false if anticoagulantType is 'Unknown' and administerBeriplexWithoutInr is true and inrValue > INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("Unknown", true, 5.1, 5);
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'Unknown' and inrValue > INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("Unknown", false, 5.1, 5);
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showBeriplexAdministrationOverrideCard("DOAC", "anything", "anything", "anything");
			expect(isShow).toBe(false);
		});
	});

	describe("calculateStonesToKg", function() {

		it("should return null if weightInStones is null", function() {

			var weightInKg = service.calculateStonesToKg(null);
			expect(weightInKg).toBe(null);
		});

		it("should return rounded integer if weightInStones is a number", function() {

			// 15.5 x 6.35029 = 98.42954
			var weightInKg = service.calculateStonesToKg(15.5);
			expect(weightInKg).toBe(98);
		});
	});

	describe("calculateKgToStones", function() {

		it("should return null if weightInKg is null", function() {

			var weightInStones = service.calculateKgToStones(null);
			expect(weightInStones).toBe(null);
		});

		it("should return value rounded to 1 decimal place if weightInKg is a number", function() {

			// 98.4 x 0.157473 = 15.49535
			var weightInStones = service.calculateKgToStones(98.4);
			expect(weightInStones).toBe(15.5);
		});
	});

	describe("calculateBeriplexDose", function() {

		it("should return null if inrValue is null and weightInKg is null", function() {

			var dose = service.calculateBeriplexDose(null, null);
			expect(dose).toBe(null);
		});

		it("should return null if weightInKg is null", function() {

			var dose = service.calculateBeriplexDose("not-null", null);
			expect(dose).toBe(null);
		});

		it("should limit maximum weightInKg to 100Kg", function() {

			var dose = service.calculateBeriplexDose(7, 120);
			expect(dose).toBe(5000);
		});

		it("should limit minimum weightInKg to 30Kg", function() {

			var dose = service.calculateBeriplexDose(7, 10);
			expect(dose).toBe(1500);
		});

		it("should return zero when inrValue is below the lower band", function() {

			var dose = service.calculateBeriplexDose(1.2, 50);
			expect(dose).toBe(0);
		});

		it("should return correct value when inrValue is within the lower band", function() {

			var dose = service.calculateBeriplexDose(1.3, 50);
			expect(dose).toBe(1250);

			var dose = service.calculateBeriplexDose(3.9, 50);
			expect(dose).toBe(1250);

		});

		it("should return correct value when inrValue is within the middle band", function() {

			var dose = service.calculateBeriplexDose(4.0, 50);
			expect(dose).toBe(1750);

			var dose = service.calculateBeriplexDose(6.0, 50);
			expect(dose).toBe(1750);
		});

		it("should return weightInKg*50 if inrValue is null and weightInKg is below 100", function(){
			var dose = service.calculateBeriplexDose(null, 100);
			expect(dose).toBe(5000);

			var dose = service.calculateBeriplexDose(null, 50);
			expect(dose).toBe(50*50);

			var dose = service.calculateBeriplexDose(null, 20);
			expect(dose).toBe(20*50);

			var dose = service.calculateBeriplexDose(null, 33.55);
			expect(dose).toBe(33.55*50);
		});

		it("should return max dose value (5000) if inrValue is null and weightInKg is 100 or above", function(){
			var dose = service.calculateBeriplexDose(null, 100);
			expect(dose).toBe(5000);

			var dose = service.calculateBeriplexDose(null, 200);
			expect(dose).toBe(5000);

			var dose = service.calculateBeriplexDose(null, 300);
			expect(dose).toBe(5000);

			var dose = service.calculateBeriplexDose(null, 50);
			expect(dose).not.toBe(5000);
		});

	});

	describe("isInrOutOfRange", function() {

		it("should return false if inrValue is null", function() {
			var isOutOfRange = service.isInrOutOfRange(null);
			expect(isOutOfRange).toBe(false);
		});

		it("should return true if inrValue is less than minimum allowed", function() {
			var isOutOfRange = service.isInrOutOfRange(0.49);
			expect(isOutOfRange).toBe(true);
		});

		it("should return false if inrValue is equal to the minimum allowed", function() {
			var isOutOfRange = service.isInrOutOfRange(0.5);
			expect(isOutOfRange).toBe(false);
		});

		it("should return false if inrValue is equal to the maximum allowed", function() {
			var isOutOfRange = service.isInrOutOfRange(10);
			expect(isOutOfRange).toBe(false);
		});

		it("should return true if inrValue is greater than the maximum allowed", function() {
			var isOutOfRange = service.isInrOutOfRange(10.1);
			expect(isOutOfRange).toBe(true);
		});
	});

	describe("isWeightOutOfRange", function() {

		it("should return false if estimatedWeightInKg is null", function() {
			var isOutOfRange = service.isWeightOutOfRange(null);
			expect(isOutOfRange).toBe(false);
		});

		it("should return true if estimatedWeightInKg is less than minimum allowed", function() {
			var isOutOfRange = service.isWeightOutOfRange(9.9);
			expect(isOutOfRange).toBe(true);
		});

		it("should return false if estimatedWeightInKg is equal to the minimum allowed", function() {
			var isOutOfRange = service.isWeightOutOfRange(10);
			expect(isOutOfRange).toBe(false);
		});

		it("should return false if estimatedWeightInKg is equal to the maximum allowed", function() {
			var isOutOfRange = service.isWeightOutOfRange(300);
			expect(isOutOfRange).toBe(false);
		});

		it("should return true if estimatedWeightInKg is greater than the maximum allowed", function() {
			var isOutOfRange = service.isWeightOutOfRange(300.1);
			expect(isOutOfRange).toBe(true);
		});
	});

});
