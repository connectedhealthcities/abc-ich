(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('MissingReferralsChartController', MissingReferralsChartController);

    MissingReferralsChartController.$inject = ['$state', 'Patient', 'DateUtils', 'ControlChartService', 'ReferralChartService'];

    function MissingReferralsChartController ($state, Patient, DateUtils, ControlChartService, ReferralChartService) {
        var vm = this;
        vm.patients = [];
        vm.chart = null;
        
        loadAllPatients();

        function loadAllPatients() {
        	Patient.queryAll(function(result) {
                vm.patients = ReferralChartService.addYearMonthFieldToPatients(result);
                
                var missingReferrals = ReferralChartService.getMissingReferrals(vm.patients);
                var numeratorGroups = ReferralChartService.getMonthlyGroups(missingReferrals);
                var denominatorGroups = ReferralChartService.getMonthlyGroups(vm.patients);                
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
                bindto: "#missing-referrals-chart",
                size: {
                    height: 400
                },
                data: {
                	json: chartDataPoints,
                	keys: { x: "x", value: ["value"] },
                	names: { value: "%age of missing referrals" }
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

