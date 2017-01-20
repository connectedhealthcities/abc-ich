(function() {
    'use strict';

    // PCC: Prothrombin Complex Concentrate e.g. Beriplex
    // DNT: Door to Needle Time
    angular
        .module('strokeApp')
        .controller('PccDntChartController', PccDntChartController);

    PccDntChartController.$inject = ['$state', 'Patient', 'DateUtils', 'ControlChartService'];

    function PccDntChartController ($state, Patient, DateUtils, ControlChartService) {
        var vm = this;
        vm.patients = [];
        vm.chart = null;
        
        loadAllPatients();

        function loadAllPatients() {
            var goal = 90;
        	Patient.queryAll(function(result) {
                vm.patients = result;
                var chartDataPoints = getChartDataPoints(vm.patients);
                var values = ControlChartService.getChartValues(chartDataPoints);
                var mean = ControlChartService.getMeanValue(values);
                var sd = ControlChartService.getStandardDeviation(values, mean);
                var lcl = ControlChartService.getLowerControlLimit(mean, sd);                
                var ucl = ControlChartService.getUpperControlLimit(mean, sd);
                 var yMax = ControlChartService.getYMax(values, ucl, goal);
                
                generateChart(chartDataPoints, mean, lcl, ucl, yMax, goal);
            });
        }

        function getChartDataPoints(patients) {
        	
        	var i, patient, chartDataPoints = [];
        	
        	for(i = 0; i < patients.length; i++) {
        		patient = patients[i];
        		chartDataPoints.push({x:getTimeSeriesValue(patient), value:getDntValue(patient)});
        	}
        	
        	return chartDataPoints;
        }
        
        function generateChart(chartDataPoints, mean, lcl, ucl, yMax, goal) {
            vm.chart = c3.generate({
                bindto: "#pcc-dnt-chart",
                size: {
                    height: 400
                },
                data: {
                	json: chartDataPoints,
                	keys: { x: "x", value: ["value"] },
                	names: { value: "PCC Door-to-Needle time" },
                	onclick: chartDataSelectHandler
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
                    	min: 0,
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
                            	value: goal, 
                              	text: 'goal < ' + goal + ' min',
                              	class: 'color-red'
                            },
                            {
                            	value: mean, 
                              	text: 'mean'
                            },
                            {
                            	value: lcl, 
                              	text: 'LCL'
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
       
        function getTimeSeriesValue(patient) {
        	
        	var doorDate = DateUtils.convertDateTimeFromServer(patient.doorDateTime);
        	var timeSeriesValue = DateUtils.convertLocalDateToServer(doorDate);
        	return timeSeriesValue;
        }

        function getDntValue(patient) {
        	
        	var doorDate = DateUtils.convertDateTimeFromServer(patient.doorDateTime);
        	var beriplexStartDateTime = DateUtils.convertDateTimeFromServer(patient.beriplexStartDateTime);

        	var diffMs = Math.abs(beriplexStartDateTime - doorDate);
        	var minutes = Math.floor((diffMs/1000)/60);
        	return minutes;
        }
        
        function chartDataSelectHandler(d, element) {

            var patient = vm.patients[d.index];            
            $state.go('patient-detail', { 'id':patient.id });
        }

    }
})();

