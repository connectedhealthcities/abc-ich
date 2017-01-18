(function() {
    'use strict';

    angular
        .module('strokeApp')
        .factory('ControlChartService', ControlChartService);

    ControlChartService.$inject = [];

    function ControlChartService () {

        var service = {
        	getMeanValue: getMeanValue,
        	getStandardDeviation: getStandardDeviation,
        	getLowerControlLimit: getLowerControlLimit,
        	getUpperControlLimit: getUpperControlLimit,
        	getYMax: getYMax
        };

        return service;

        function getMeanValue(values) {
        	
        	var i, value, mean, total = 0;
        	
        	for(i = 0; i < values.length; i++) {
        		value = values[i];
        		total += value;
        	}
        	
        	mean = Math.round(total/values.length);
        	
        	return mean;        	
        }
        
        function getStandardDeviation(values, mean) {
        	   		
     		var i, value, difference, variance, standardDeviation, sumOfSquares = 0;

        	for(i = 0; i < values.length; i++) {
        		value = values[i];
        		difference = value - mean;
        		sumOfSquares += (difference * difference);
        	}

    		variance = sumOfSquares / values.length;
    		standardDeviation = Math.sqrt(variance);
    		
    		return standardDeviation;
       }

        function getLowerControlLimit(mean, sd) {
        	 
        	var lcl = mean - (3 * sd);
        	return lcl;        	
        }
        
        function getUpperControlLimit(mean, sd) {
 
        	var ucl = mean + (3 * sd);
        	return ucl;        	
        }
        
        function getYMax(values, ucl, goal) {
        	
        	var i, value, max = ucl > goal ? ucl : goal;
        	
        	for(i = 0; i < values.length; i++) {
        		value = values[i];
        		if (value > max) {
        			max = value;
        		}
        	}
       	
        	return max;
        }

    }
})();
