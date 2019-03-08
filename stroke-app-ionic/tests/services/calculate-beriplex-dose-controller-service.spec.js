
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

		it("should return false if all values are null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard(null, null, null);
			expect(isShow).toBe(false);
		});

		it("should return false if selectedPCCType is null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard(null, "not-null", "not-null");
			expect(isShow).toBe(false);
		});

		it("should return false if externalScanHospitalName is null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("not-null", null, "not-null");
			expect(isShow).toBe(false);
		});

		it("should return true if externalScanHospitalName and selectedPCCType are not null", function() {

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("not-null", "not-null", null);
			expect(isShow).toBe(true);
		});

		it("should always return false if anticoagulantType is 'DOAC'", function(){

			var isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("anything", "anything", "DOAC");
			expect(isShow).toBe(false);

			isShow = service.showReversalAgentAdministeredAtExternalHospitalCard("anything", null, "DOAC");
			expect(isShow).toBe(false);

			isShow = service.showReversalAgentAdministeredAtExternalHospitalCard(null, "anything", "DOAC");
			expect(isShow).toBe(false);
		});
	});

	describe("showAdministerBeriplexWithoutInrCard", function() {

		it("should return true if externalScanHospitalName is null", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", null, "anything", "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is null", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", "not-null", null, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return false if reversalAgentAdministeredAtExternalHospital is true", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", "not-null", true, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if reversalAgentAdministeredAtExternalHospital is false", function() {

			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", "not-null", false, "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			var isShow = service.showAdministerBeriplexWithoutInrCard("anything", "anything", "anything", "DOAC");
			expect(isShow).toBe(false);
		});

		it("should always return false if selectedPCCType is null", function(){
			var isShow = service.showAdministerBeriplexWithoutInrCard(null, "anything", "anything", "anything");
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, null, "anything", "anything");
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, "anything", null, "anything");
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, "anything", "anything", null);
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, null, null, "anything");
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, null, "anything", null);
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, null, null, "anything");
			expect(isShow).toBe(false);

			isShow = service.showAdministerBeriplexWithoutInrCard(null, null, null, null);
			expect(isShow).toBe(false);
		});
	});

	describe("showInrCard", function() {

		it("should return false if administerBeriplexWithoutInr is null", function() {

			var isShow = service.showInrCard("anything", null, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return false if administerBeriplexWithoutInr is true", function() {

			var isShow = service.showInrCard("anything", true, "anything but DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if administerBeriplexWithoutInr is false", function() {

			var isShow = service.showInrCard("anything", false, "anything but DOAC");
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){

			var isShow = service.showInrCard("anything", "anything", "DOAC");
			expect(isShow).toBe(false);
		});

		it("should always return false if selectedPCCType is null", function(){
			
			var isShow = service.showInrCard(null, "anything", "anything");
			expect(isShow).toBe(false);

			isShow = service.showInrCard(null, null, "anything");
			expect(isShow).toBe(false);

			isShow = service.showInrCard(null, "anything", null);
			expect(isShow).toBe(false);

			isShow = service.showInrCard(null, null, null);
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

			var isShow = service.showBeriplexAdministrationOverrideCard("anything", "not-unknown", "anything", "anything", "anything");
			expect(isShow).toBe(false);
		});

		it("should return false if anticoagulantType is 'Unknown' and inrValue <= INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("anything", "Unknown", "anything", 5, 5);
			expect(isShow).toBe(false);
		});

		it("should return false if anticoagulantType is 'Unknown' and administerBeriplexWithoutInr is true and inrValue > INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("anything", "Unknown", true, 5.1, 5);
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is 'Unknown' and inrValue > INR_THRESHOLD", function() {

			var isShow = service.showBeriplexAdministrationOverrideCard("anything", "Unknown", false, 5.1, 5);
			expect(isShow).toBe(true);
		});

		it("should return false if anticoagulantType is 'DOAC'", function(){
			
			var isShow = service.showBeriplexAdministrationOverrideCard("anything", "DOAC", "anything", "anything", "anything");
			expect(isShow).toBe(false);
		});

		it("should always return false if selectedPCCType is null", function(){

			var isShow = service.showBeriplexAdministrationOverrideCard(null, "anything", "anything", "anything", "anything");
			expect(isShow).toBe(false);

			isShow = service.showBeriplexAdministrationOverrideCard(null, "Unknown", false, 5.1, 5);
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
