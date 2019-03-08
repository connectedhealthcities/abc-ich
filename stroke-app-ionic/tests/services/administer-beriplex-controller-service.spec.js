
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

	describe("isNextButtonEnabled", function() {

		it("should return true if isBeriplexAdministered is false and isVitkAdministered is false", function() {

			var isEnabled = service.isNextButtonEnabled(false, false);
			expect(isEnabled).toBe(true);
		});

		it("should return true if isBeriplexAdministered is true and isVitkAdministered is false", function() {

			var isEnabled = service.isNextButtonEnabled(true, false, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(true, false, null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, false, "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if isBeriplexAdministered is false and isVitkAdministered is true", function() {

			var isEnabled = service.isNextButtonEnabled(false, true, null, null, "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(false, true, null, null, null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(false, true, null, null, "not-null", null);
			expect(isEnabled).toBe(false);
		});

		it("should return true if isBeriplexAdministered is true and isVitkAdministered is true", function() {

			var isEnabled = service.isNextButtonEnabled(true, true, "not-null", "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(true);

			var isEnabled = service.isNextButtonEnabled(true, true, null, "not-null", "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, true, "not-null", null, "not-null", "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, true, "not-null", "not-null", null, "not-null");
			expect(isEnabled).toBe(false);

			var isEnabled = service.isNextButtonEnabled(true, true, "not-null", "not-null", "not-null", null);
			expect(isEnabled).toBe(false);

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

	describe("showVitaminKCards", function(){

		it("should return false if anticoagulantType is 'DOAC'", function(){

			var isShow = service.showVitaminKCards("DOAC");
			expect(isShow).toBe(false);
		});

		it("should return true if anticoagulantType is not 'DOAC'", function(){

			var isShow = service.showVitaminKCards("Anything but DOAC");
			expect(isShow).toBe(true);
		});

	});

	describe("isPCCTopupButtonEnabled", function(){

		it("should return true if inrValue is null or false", function(){

			var inrValue = false;
			var hasDoacBeenTaken = null;
			var isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(true);

			inrValue = null;
			isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(true);
		});

		it("should return true if hasDoacBeenTaken is null or false", function(){

			var inrValue = null;
			var hasDoacBeenTaken = false;
			var isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(true);

			hasDoacBeenTaken = null;
			isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(true);
		});

		it("should return false if inrValue is true", function(){

			var inrValue = true;
			var hasDoacBeenTaken = false;
			var isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(false);
		});

		it("should return false if hasDoacBeenTaken is true", function(){

			var inrValue = false;
			var hasDoacBeenTaken = true;
			var isShow = service.isPCCTopupButtonEnabled(inrValue, hasDoacBeenTaken);
			expect(isShow).toBe(false);
		});
	});

	describe("showCalculatedDose", function(){

		it("should return false if the inrValue is null", function(){

			var inrVal = null;
			var isShow = service.showCalculatedDose(inrVal);
			expect(isShow).toBe(false);
		});

		it("should return false if the inrValue is false", function(){

			var inrVal = false;
			var isShow = service.showCalculatedDose(inrVal);
			expect(isShow).toBe(false);
		});

		it("should return true if the inrValue is true", function(){

			var inrVal = true;
			var isShow = service.showCalculatedDose(inrVal);
			expect(isShow).toBe(true);
		});
	});

	describe("showActualDose", function(){

		it("should return false if overrideCalculatedDose is null", function(){

			var overrideCalculatedDose = null;
			var inrValue = "anything";
			var isShow = service.showActualDose(overrideCalculatedDose, inrValue);
			expect(isShow).toBe(false);
		});	

		it("should return false if overrideCalculatedDose is false", function(){

			var overrideCalculatedDose = false;
			var inrValue = "anything";
			var isShow = service.showActualDose(overrideCalculatedDose, inrValue);
			expect(isShow).toBe(false);
		});	

		it("should return false if the inrValue is null", function(){

			var overrideCalculatedDose = "anything";
			var inrValue = null;
			var isShow = service.showActualDose(overrideCalculatedDose, inrValue);
			expect(isShow).toBe(false);
		});	

		it("should return false if the inrValue is false", function(){

			var overrideCalculatedDose = "anything";
			var inrValue = false;
			var isShow = service.showActualDose(overrideCalculatedDose, inrValue);
			expect(isShow).toBe(false);
		});	

		it("should return true if both inrValue and overrideCalculatedDose are true", function(){

			var overrideCalculatedDose = true;
			var inrValue = true;
			var isShow = service.showActualDose(overrideCalculatedDose, inrValue);
			expect(isShow).toBe(true);
		});	
	});

	describe("showCalculatedDoseToAdminister", function(){

		it("should return false if overrideCalculatedDose is true", function(){

			var overrideCalculatedDose = true;
			var isShow = service.showCalculatedDoseToAdminister(overrideCalculatedDose);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is null", function(){

			var overrideCalculatedDose = null;
			var isShow = service.showCalculatedDoseToAdminister(overrideCalculatedDose);
			expect(isShow).toBe(true);
		});

		it("should return true if overrideCalculatedDose is false", function(){

			var overrideCalculatedDose = false;
			var isShow = service.showCalculatedDoseToAdminister(overrideCalculatedDose);
			expect(isShow).toBe(true);
		});
	});

	describe("isTopupDosePopupValid", function(){

		it("should return false if inrValue is null", function(){
			var inrValue = null;
			var overrideCalculatedDose = "anything";
			var topupActualDose = "anything";

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(false);
		});

		it("should return false if inrValue is false", function(){
			var inrValue = false;
			var overrideCalculatedDose = "anything";
			var topupActualDose = "anything";

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(false);
		});

		it("should return false if inrValue is less than 1.3", function(){
			var inrValue = 0.1;
			var overrideCalculatedDose = "anything";
			var topupActualDose = "anything";

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is true and topupActualDose is null", function(){
			var inrValue = 1.3;
			var overrideCalculatedDose = true;
			var topupActualDose = null;

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(false);
		});

		it("should return false if overrideCalculatedDose is true and topupActualDose is false", function(){
			var inrValue = 1.3;
			var overrideCalculatedDose = true;
			var topupActualDose = false;

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(false);
		});

		it("should return true if overrideCalculatedDose is null", function(){
			var inrValue = 1.3;
			var overrideCalculatedDose = null;
			var topupActualDose = "anything";

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(true);
		});

		it("should return true if overrideCalculatedDose is false", function(){
			var inrValue = 1.3;
			var overrideCalculatedDose = false;
			var topupActualDose = "anything";

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(true);
		});

		it("should return true if topupActualDose is true", function(){
			var inrValue = 1.3;
			var overrideCalculatedDose = "anything";
			var topupActualDose = true;

			var isShow = service.isTopupDosePopupValid(inrValue, overrideCalculatedDose, topupActualDose);
			expect(isShow).toBe(true);
		});
	});


});
