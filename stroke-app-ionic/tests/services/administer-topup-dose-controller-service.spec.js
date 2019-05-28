describe("AdministerTopupDoseControllerService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('app.protocolA');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_AdministerTopupDoseControllerService_) {
			 service = _AdministerTopupDoseControllerService_;
		 });

	});

	describe("isTopupDoseValid", function(){

		it("should return false if topupDose is less than 0", function(){

			var topupDose = -10;
			var isValid = service.isTopupDoseValid(topupDose);
			expect(isValid).toBe(false);
		});

		it("should return false if topupDose is 0", function(){

			var topupDose = 0;
			var isValid = service.isTopupDoseValid(topupDose);
			expect(isValid).toBe(false);
		});

		it("should return false if topupDose is null", function(){

			var topupDose = null;
			var isValid = service.isTopupDoseValid(topupDose);
			expect(isValid).toBe(false);
		});

		it("should return true if topupDose is greater than 0", function(){

			var topupDose = 10;
			var isValid = service.isTopupDoseValid(topupDose);
			expect(isValid).toBe(true);
		});
	});

	describe("isInrValueValid", function(){

		it("should return false if inrValue is less than 1.3", function(){
			
			var inrValue = 1.2;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(false);
		});

		it("should return false if inrValue is greater than 10.0", function(){
			
			var inrValue = 10.1;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(false);
		});

		it("should return false if inrValue null", function(){
			
			var inrValue = null;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(false);
		});

		it("should return true if inrValue is greater than 1.3 or less than 10.0", function(){
			
			var inrValue = 1.31;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(true);

			inrValue = 9.99;
			isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(true);
		});

		it("should return true if inrValue is equal to 1.3", function(){
			
			var inrValue = 1.3;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(true);
		});

		it("should return true if inrValue is equal to 10.0", function(){
			
			var inrValue = 10.0;
			var isValid = service.isInrValueValid(inrValue);
			expect(isValid).toBe(true);
		});
	});

	describe("isCalculatedDoseValid", function(){

		it("should return false if the dose fails the isTopupDoseValid check and overrideCalculatedDose is false", function(){
			
			var calculatedDose = "invalid-data";
			var overrideCalculatedDose = false;
			var isValid = service.isCalculatedDoseValid(calculatedDose, overrideCalculatedDose);
			expect(isValid).toBe(false);
		});

		it("should return true if the dose fails the isTopupDoseValid check and overrideCalculatedDose is true", function(){
			
			var calculatedDose = "invalid-data";
			var overrideCalculatedDose = true;
			var isValid = service.isCalculatedDoseValid(calculatedDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});

		it("should return true if the dose passes the isTopupDoseValid check and overrideCalculatedDose is false", function(){
			
			var calculatedDose = 100;
			var overrideCalculatedDose = false;
			var isValid = service.isCalculatedDoseValid(calculatedDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});

		it("should return true if the dose passes the isTopupDoseValid check and overrideCalculatedDose is true", function(){
			
			var calculatedDose = 100;
			var overrideCalculatedDose = true;
			var isValid = service.isCalculatedDoseValid(calculatedDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});
	});

	describe("isActualDoseValid", function(){

		it("should return false if the dose fails the isTopupDoseValid check and overrideCalculatedDose is true", function(){
			
			var actualDose = "invalid-data";
			var overrideCalculatedDose = true;
			var isValid = service.isActualDoseValid(actualDose, overrideCalculatedDose);
			expect(isValid).toBe(false);
		});

		it("should return true if the dose fails the isTopupDoseValid check and overrideCalculatedDose is false", function(){
			
			var actualDose = "invalid-data";
			var overrideCalculatedDose = false;
			var isValid = service.isActualDoseValid(actualDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});

		it("should return true if the dose passes the isTopupDoseValid check and overrideCalculatedDose is true", function(){
			
			var actualDose = 100;
			var overrideCalculatedDose = true;
			var isValid = service.isActualDoseValid(actualDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});

		it("should return true if the dose passes the isTopupDoseValid check and overrideCalculatedDose is false", function(){
			
			var actualDose = 100;
			var overrideCalculatedDose = false;
			var isValid = service.isActualDoseValid(actualDose, overrideCalculatedDose);
			expect(isValid).toBe(true);
		});
	});

	describe("showCalculatedDoseCard", function(){

		it("should return false if the inrValue is null", function(){
			
			var inrValue = null;
			var isShow = service.showCalculatedDoseCard(inrValue);
			expect(isShow).toBe(false);
		});

		it("should return false if the inrValue fails the isInrValueValid check", function(){
			
			var inrValue = "invalid-data";
			var isShow = service.showCalculatedDoseCard(inrValue);
			expect(isShow).toBe(false);
		});

		it("should return true if the inrValue passes the isInrValueValid check", function(){
			
			var inrValue = 5;
			var isShow = service.showCalculatedDoseCard(inrValue);
			expect(isShow).toBe(true);
		});
	});

	describe("showActualDoseCard", function(){

		it("should return false if the inrValue is null", function(){
			
			var inrValue = null;
			var overrideCalculatedDose = "any";
			var isShow = service.showActualDoseCard(inrValue, overrideCalculatedDose);
			expect(isShow).toBe(false);
		});

		it("should return false if the inrValue fails the isInrValueValid check", function(){
			
			var inrValue = "invalid-data";
			var overrideCalculatedDose = "any";
			var isShow = service.showActualDoseCard(inrValue, overrideCalculatedDose);
			expect(isShow).toBe(false);
		});

		it("should return false if the inrValue passes the isInrValueValid check and overrideCalculatedDose is false", function(){
			
			var inrValue = 5;
			var overrideCalculatedDose = false;
			var isShow = service.showActualDoseCard(inrValue, overrideCalculatedDose);
			expect(isShow).toBe(false);
		});

		it("should return false if the inrValue fails the isInrValueValid check and overrideCalculatedDose is true", function(){
			
			var inrValue = "invalid-data";
			var overrideCalculatedDose = true;
			var isShow = service.showActualDoseCard(inrValue, overrideCalculatedDose);
			expect(isShow).toBe(false);
		});

		it("should return true if the inrValue passes the isInrValueValid check and overrideCalculatedDose is true", function(){
			
			var inrValue = 5;
			var overrideCalculatedDose = true;
			var isShow = service.showActualDoseCard(inrValue, overrideCalculatedDose);
			expect(isShow).toBe(true);
		});
	});

	describe("isNextButtonEnabled", function(){

		it("should return false if the inrValue is valid and the rest of the data is invalid", function(){
			
			var inrValue = 5;
			var topupCalculatedDose = "invalid-data";
			var topupActualDose = "invalid-data";
			var overrideCalculatedDose = "invalid-data";

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(false);
		});

		it("should return false if the topupCalculatedDose is valid and the rest of the data is invalid", function(){
			
			var inrValue = "invalid-data";
			var topupCalculatedDose = 5;
			var topupActualDose = "invalid-data";
			var overrideCalculatedDose = false;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(false);
		});

		it("should return false if the topupActualDose is valid and the rest of the data is invalid", function(){
			
			var inrValue = "invalid-data";
			var topupCalculatedDose = "invalid-data";
			var topupActualDose = 5;
			var overrideCalculatedDose = true;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(false);
		});

		it("should return false if the topupActualDose, and inrValue are valid and overrideCalculatedDose is false", function(){
			
			var inrValue = 5;
			var topupCalculatedDose = "anything";
			var topupActualDose = 5;
			var overrideCalculatedDose = false;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(false);
		});

		it("should return false if the topupCalculatedDose, and inrValue are valid and overrideCalculatedDose is true", function(){
			
			var inrValue = 5;
			var topupCalculatedDose = 5;
			var topupActualDose = "anything";
			var overrideCalculatedDose = true;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(false);
		});

		it("should return true if the topupActualDose, and inrValue are valid and overrideCalculatedDose is true", function(){
			
			var inrValue = 5;
			var topupCalculatedDose = "anything";
			var topupActualDose = 5;
			var overrideCalculatedDose = true;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(true);
		});

		it("should return true if the topupCalculatedDose, and inrValue are valid and overrideCalculatedDose is false", function(){
			
			var inrValue = 5;
			var topupCalculatedDose = 5;
			var topupActualDose = "anything";
			var overrideCalculatedDose = false;

			var isEnabled = service.isNextButtonEnabled(inrValue, topupCalculatedDose, topupActualDose, overrideCalculatedDose);
			expect(isEnabled).toBe(true);
		});
	});

});