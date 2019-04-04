'use strict';

angular.module('utils').service('PCCDoseTableService', PCCDoseTableService);

PCCDoseTableService.$inject = [];

function PCCDoseTableService() {

    var service = {
        getDosingRecords: getDosingRecords,
        getDose: getDose
     };

    return service;

	function getDosingRecords(pccType) {
		var dosing = [
			{'inr':'1.3 - 3.9', 'dosing':'25 IU/kg'},
			{'inr':'4.0 - 6.0', 'dosing':'35 IU/kg'},
			{'inr':'> 6', 'dosing':'50 IU/kg'}
		];
		for(var kg = 30; kg <= 100; kg+=10){
			dosing[0]['kg'+kg] = getDose(pccType, kg, 2.0, false);
			dosing[1]['kg'+kg] = getDose(pccType, kg, 5.0, false);
			dosing[2]['kg'+kg] = getDose(pccType, kg, 7.0, false);
		}

		return dosing;
	}

	function getDose(pccType, weight, inr, doacTaken){
		var pccDose = null;

		if(weight > 100){
			weight = 100;
		} else if(weight < 30){
			weight = 30;
		}

		weight = (Math.round(weight / 10) * 10);

		if(inr !== null){
			if(inr >= 1.3 && inr < 4.0){
				pccDose = weight * 25;
			}
			else if(inr >= 4.0 && inr <= 6.0){
				pccDose = weight * 35;
			}
			else if(inr > 6.0){
				pccDose = weight * 50;
			}
		} else {
			if(doacTaken){
				pccDose = weight * 50;
			}
			else{
				pccDose = weight * 25;
			}
		}

		if(pccType === 'Octaplex' && pccDose > 3000){
			pccDose = 3000;
		} else if (pccType === 'Beriplex' && pccDose > 5000){
			pccDose = 5000;
		}

		return pccDose;
	}
}