(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('BpDttChartController', BpDttChartController);

    BpDttChartController.$inject = ['$state', 'Patient', 'DateUtils'];

    function BpDttChartController ($state, Patient, DateUtils) {
        var vm = this;
        vm.patients = [];
        vm.chart = null;
        
        loadAllPatients();

        function loadAllPatients() {
        	Patient.queryAll(function(result) {
                vm.patients = result;
                var chartDataPoints = getChartDataPoints(vm.patients);
                var mean = getMeanValue(chartDataPoints);
                var sd = getStandardDeviation(chartDataPoints, mean);
                var ucl = getUpperControlLimit(mean, sd);                
                var yMax = getYMax(chartDataPoints, ucl);

                generateChart(chartDataPoints, mean, ucl, yMax);
            });
        }

        function generateChart(chartDataPoints, mean, ucl, yMax) {
            vm.chart = c3.generate({
                bindto: "#bp-dtt-chart",
                size: {
                    height: 400
                },
                data: {
                	json: chartDataPoints,
                	keys: { x: "x", value: ["minutes"] },
                	names: { minutes: "Door-to-Target time" },
                	onclick: onclick = chartDataSelectHandler
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d',
                            rotate: 90,
                            multiline: false
                        },
                        height: 70
                    },
                    y: {
                    	max: yMax,
                        label: {
                            text: "Minutes",
                            position: 'outer-middle'
                        }
                    }
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true,
                        lines: [
                            {
                            	value: 90, 
                              	text: 'goal < 90 min',
                              	class: 'color-red'
                            },
                            {
                            	value: mean, 
                              	text: 'mean'
                            },
                            {
                            	value: ucl, 
                              	text: 'UCL'
                            }                        
                        ]
                    }
                }
            });
        }
       
        function getChartDataPoints(patients) {
        	
        	var i, patient, chartDataPoints = [];
        	
        	for(i = 0; i < patients.length; i++) {
        		patient = patients[i];
        		chartDataPoints.push({x:getTimeSeriesValue(patient), minutes:getDttValue(patient)});
        	}
        	
        	return chartDataPoints;
        }
        
        function getTimeSeriesValue(patient) {
        	
        	var doorDate = DateUtils.convertDateTimeFromServer(patient.doorDateTime);
        	var timeSeriesValue = DateUtils.convertLocalDateToServer(doorDate);
        	return timeSeriesValue;
        }

        function getDttValue(patient) {
        	
        	var doorDate = DateUtils.convertDateTimeFromServer(patient.doorDateTime);
        	var bpTargetReachedDate = DateUtils.convertDateTimeFromServer(patient.bpTargetReachedDateTime);

        	var diffMs = Math.abs(bpTargetReachedDate - doorDate);
        	var minutes = Math.floor((diffMs/1000)/60);
        	return minutes;
        }
        
        function getMeanValue(chartDataPoints) {
        	
        	var i, chartDataPoint, mean, total = 0;
        	
        	for(i = 0; i < chartDataPoints.length; i++) {
        		chartDataPoint = chartDataPoints[i];
        		total += chartDataPoint.minutes;
        	}
        	
        	mean = Math.round(total/chartDataPoints.length);
        	
        	return mean;        	
        }
        
        function getStandardDeviation(chartDataPoints, mean) {
        	   		
     		var i, chartDataPoint, difference, variance, standardDeviation, sumOfSquares = 0;

        	for(i = 0; i < chartDataPoints.length; i++) {
        		chartDataPoint = chartDataPoints[i];
        		difference = chartDataPoint.minutes - mean;
        		sumOfSquares += (difference * difference);
        	}

    		variance = sumOfSquares / chartDataPoints.length;
    		standardDeviation = Math.sqrt(variance);
    		
    		return standardDeviation;
       }

        function getUpperControlLimit(mean, sd) {
 
        	var ucl = mean + (3 * sd);
        	return ucl;        	
        }
        
        function getYMax(chartDataPoints, ucl) {
        	
        	var i, chartDataPoint, max = ucl;
        	
        	for(i = 0; i < chartDataPoints.length; i++) {
        		chartDataPoint = chartDataPoints[i];
        		if (chartDataPoint.minutes > max) {
        			max = chartDataPoint.minutes;
        		}
        	}
       	
        	return max;
        }

        function chartDataSelectHandler(d, element) {

            var patient = vm.patients[d.index];            
            $state.go('patient-detail', { id:patient.id });
        }

    }
})();

