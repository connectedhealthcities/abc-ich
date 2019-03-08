'use strict';

describe("PCCDoseTableService", function() {

	var service;

	beforeEach(function() {

		 angular.mock.module('utils');
		
		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_PCCDoseTableService_) {
			 service = _PCCDoseTableService_;
		 });

	});


	describe("getDosingRecords", function() {

		it("should return the dosing table for Octaplex when the selected PCC type is Octaplex", function(){

			var expectedDosingTable = [
				{'inr':'1.3 - 3.9','dosing':'25 IU/kg','kg30':750, 'kg40':1000,'kg50':1250,'kg60':1500,'kg70':1750,'kg80':2000,'kg90':2250,'kg100':2500},
				{'inr':'4.0 - 6.0','dosing':'35 IU/kg','kg30':1050,'kg40':1400,'kg50':1750,'kg60':2100,'kg70':2450,'kg80':2800,'kg90':3000,'kg100':3000},
				{'inr':'> 6',	   'dosing':'50 IU/kg','kg30':1500,'kg40':2000,'kg50':2500,'kg60':3000,'kg70':3000,'kg80':3000,'kg90':3000,'kg100':3000}
			]
			var table = service.getDosingRecords('Octaplex');
			expect(table[2].kg100).toBe(3000);
			expect(table).toEqual(expectedDosingTable);
		});

		it("should return the dosing table for Beriplex when the selected PCC type is Beriplex", function(){

			var expectedDosingTable = [
				{'inr':'1.3 - 3.9','dosing':'25 IU/kg','kg30':750, 'kg40':1000,'kg50':1250,'kg60':1500,'kg70':1750,'kg80':2000,'kg90':2250,'kg100':2500},
				{'inr':'4.0 - 6.0','dosing':'35 IU/kg','kg30':1050,'kg40':1400,'kg50':1750,'kg60':2100,'kg70':2450,'kg80':2800,'kg90':3150,'kg100':3500},
				{'inr':'> 6',	   'dosing':'50 IU/kg','kg30':1500,'kg40':2000,'kg50':2500,'kg60':3000,'kg70':3500,'kg80':4000,'kg90':4500,'kg100':5000}
			]
			var table = service.getDosingRecords('Beriplex');
			expect(table[2].kg100).toBe(5000);
			expect(table).toEqual(expectedDosingTable);
		});
	});

	describe("getDose", function(){

		it("should return the dosage value that is equal to the weight of the patient * 25 if the inr value is 1.3 - 3.9", function(){
			var weightInKg = 30;
			var inr = 2.0;
			var pccType = "anything";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(weightInKg*25);
		});

		it("should return the dosage value that is equal to the weight of the patient * 35 if the inr value is 4.0 - 6.0", function(){
			var weightInKg = 30;
			var inr = 5.0;
			var pccType = "anything";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(weightInKg*35);
		});

		it("should return the dosage value that is equal to the weight of the patient * 50 if the inr value is > 6.0", function(){
			var weightInKg = 30;
			var inr = 7.0;
			var pccType = "anything";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(weightInKg*50);
		});

		it("should return the dosage value that is equal to the weight of the patient * 25 if the inr value is null", function(){
			var weightInKg = 30;
			var inr = null;
			var pccType = "anything";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(weightInKg*25);
		});

		it("should return the dosage value that is equal to the weight of patient * 25 where the weight is capped at 100", function(){
			var weightInKg = 1000000;
			var maxWeight = 100;
			var inr = null; // Doesn't matter.
			var pccType = "anything";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(maxWeight*25)
		});

		it("should return the dosage value that is equal to the weight of the patient * 50 if the inr value is null and a doac has been taken", function(){
			var weightInKg = 30;
			var inr = null;
			var pccType = "anything";
			var hasDoacBeenTaken = true;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(weightInKg*50);
		});

		it("should return the dosage value capped at 3000 if the PCC type is Octaplex", function(){
			var weightInKg = 100000;
			var inr = 7.0;
			var pccType = "Octaplex";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(3000);
		});

		it("should return the dosage value capped at 5000 if the PCC type is Beriplex", function(){
			var weightInKg = 100000;
			var inr = 7.0;
			var pccType = "Beriplex";
			var hasDoacBeenTaken = false;

			var dose = service.getDose(pccType, weightInKg, inr, hasDoacBeenTaken);
			expect(dose).toBe(5000);
		});
	});
});