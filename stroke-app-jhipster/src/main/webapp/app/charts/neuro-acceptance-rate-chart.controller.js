(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('NeuroAcceptanceRateChartController', NeuroAcceptanceRateChartController);

    NeuroAcceptanceRateChartController.$inject = ['$state', 'Patient', 'DateUtils', 'ControlChartService', 'ReferralChartService'];

    function NeuroAcceptanceRateChartController ($state, Patient, DateUtils, ControlChartService, ReferralChartService) {
        var vm = this;
        vm.patients = [];
        vm.chart = null;
        
        loadAllPatients();

        function loadAllPatients() {
        	Patient.queryAll(function(result) {
                vm.patients = ReferralChartService.addYearMonthFieldToPatients(result);

                var patientsAcceptedForTransfer = ReferralChartService.getPatientsAcceptedForTransfer(vm.patients);
                var patientsReferred = ReferralChartService.getPatientsReferred(vm.patients);
                var numeratorGroups = ReferralChartService.getMonthlyGroups(patientsAcceptedForTransfer);
                var denominatorGroups = ReferralChartService.getMonthlyGroups(patientsReferred);                
                var chartDataPoints = ReferralChartService.getChartDataPoints(numeratorGroups, denominatorGroups);
                var values = ControlChartService.getChartValues(chartDataPoints);
                var mean = ControlChartService.getMeanValue(values);
                var sd = ControlChartService.getStandardDeviation(values, mean);
                var lcl = ControlChartService.getLowerControlLimit(mean, sd);                
                var ucl = ControlChartService.getUpperControlLimit(mean, sd);
                var yMax = ControlChartService.getYMax(values, ucl);

                generateChart(chartDataPoints, mean, lcl, ucl, yMax);
            });
        }

        function generateChart(chartDataPoints, mean, lcl, ucl, yMax) {
            vm.chart = c3.generate({
                bindto: "#neuro-acceptance-rate-chart",
                size: {
                    height: 400
                },
                data: {
                	json: chartDataPoints,
                	keys: { x: "x", value: ["value"] },
                	names: { value: "%age referrals accepted" }
                },
                axis: {
                    x: {
                        type: 'timeseries', // category
                        tick: {
                        	culling: false,
                            format: function(x) { return ReferralChartService.getXAxisTickText(x) }
                        }
                    },
                    y: {
                       	min: 0,
                    	max: yMax,
                        label: {
                            text: "%",
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
               
    }
})();

