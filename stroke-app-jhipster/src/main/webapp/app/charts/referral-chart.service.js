(function() {
    'use strict';

    angular
        .module('strokeApp')
        .factory('ReferralChartService', ReferralChartService);

    ReferralChartService.$inject = ['$filter', '_'];

    function ReferralChartService ($filter, _) {

        var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var service = {
        	addYearMonthFieldToPatients: addYearMonthFieldToPatients,
        	getIncorrectReferrals: getIncorrectReferrals,
        	getMissingReferrals: getMissingReferrals,
        	getChartDataPoints: getChartDataPoints,
        	getMonthlyGroups: getMonthlyGroups,
        	getXAxisTickText: getXAxisTickText
        };

        return service;

        function addYearMonthFieldToPatients(patients) {
        	
        	var i, patient;
        	
        	for(i = 0; i < patients.length; i++) {
        		patient = patients[i];
        		patient.yearMonth = convertDateToYearMonthString(patient.doorDateTime);       		
        	}        	

        	return patients;
        }
        
        function getIncorrectReferrals(patients) {
        	
        	var i, patient, incorrectReferrals = [];
        	
        	for(i = 0; i < patients.length; i++) {
        		patient = patients[i];
        		
        		if (patient.referredToNeurosurgery && !shouldPatientBeReferred(patient)) {
            		incorrectReferrals.push(patient);
        		}
        	}        	

        	return incorrectReferrals;
        }

        function getMissingReferrals(patients) {
        	
        	var i, patient, missingReferrals = [];
        	
        	for(i = 0; i < patients.length; i++) {
        		patient = patients[i];
        		
        		if (!patient.referredToNeurosurgery && shouldPatientBeReferred(patient)) {
            		missingReferrals.push(patient);
        		}
        	}        	

        	return missingReferrals;
        }

        function getChartDataPoints(numeratorGroups, denominatorGroups) {

        	var numerator, denominator, percentage, roundedPercentage, chartDataPoints = [];

        	_.each(numeratorGroups, function(value, key) {
        		numerator = value.length;
            	denominator = denominatorGroups[key].length;
            	percentage =  numerator / denominator * 100;
            	roundedPercentage = Math.round(percentage * 10) / 10; // limit to 1 decimal place
            	chartDataPoints.push( {x: new Date(key), value: roundedPercentage} );
            });
        	
        	return chartDataPoints;
        }

        function getMonthlyGroups(patients) {
        	
            var monthlyGroups = _.groupBy(patients, function(patient) {
            	return patient.yearMonth;
            });
            
            return monthlyGroups;
        }
 
        function getXAxisTickText(x) {
        	return shortMonthNames[x.getMonth()] + " " + x.getFullYear();
        }

        function convertDateToYearMonthString (date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM');
            } else {
                return null;
            }
        }

        function shouldPatientBeReferred(patient) {
        	
        	var shouldRefer = false;
        	
        	// If premorbid mRS ≥ 3  -unlikely to be candidate for surgery
        	if (patient.premorbidMrsScore < 3) {
        		if (patient.gcsScore > 8) {
        			if (patient.posteriorFossaIch || patient.ventricleObstructed || patient.ichVolume > 30) {
        				shouldRefer = true;
        			}
        		}
        	}
        	
        	return shouldRefer;
        }

    }
})();
