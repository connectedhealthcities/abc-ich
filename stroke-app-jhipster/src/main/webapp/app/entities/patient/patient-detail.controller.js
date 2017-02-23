(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('PatientDetailController', PatientDetailController);

    PatientDetailController.$inject = ['$scope', '$rootScope', 'previousState', 'entity', 'Patient', 'bpManagementEntries', 'DateUtils'];

    function PatientDetailController($scope, $rootScope, previousState, entity, Patient, bpManagementEntries, DateUtils) {
        var vm = this;

        vm.patient = entity;
        vm.bpManagementEntries = bpManagementEntries;
        vm.chart = null;
        vm.previousState = previousState.name;
        vm.bpTabClicked = bpTabClicked;
        

        var unsubscribe = $rootScope.$on('strokeApp:patientUpdate', function(event, result) {
            vm.patient = result;
        });
        $scope.$on('$destroy', unsubscribe);
        
        vm.chartDataPoints = getChartDataPoints(bpManagementEntries);
               
        function generateChart(chartDataPoints) {
            vm.chart = c3.generate({
                bindto: "#bp-management-chart",
                size: {
                    height: 400
                },
                data: {
                	xFormat: '%Y-%m-%d %H:%M:%S', // how the date is parsed
                	json: chartDataPoints,
                	keys: { x: "x", value: ["bp", "gtn", "labetalol"] },
                	names: { bp: "Systolic BP", gtn: "GTN Rate", labetalol: "Labetalol Dose" },
                	types: { bp: "line", gtn: "bar", labetalol: "bar"},
                	axes: { bp: 'y', gtn: 'y2', labetalol: 'y2' }
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                        	culling: false,
                            format: '%H:%M', // how the date is displayed
                            rotate: 90,
                            multiline: false
                        },
                        height: 70
                    },
                    y: {
                        label: {
                            text: "mmHg",
                            position: 'outer-middle'
                        }
                    },
                    y2: { show: true}
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true,
                    }
                }
            });
        }

        function getChartDataPoints(bpManagementEntries) {
        	
        	var i, bpManagementEntry, chartDataPoints = [];
        	
        	for(i = 0; i < bpManagementEntries.length; i++) {
        		bpManagementEntry = bpManagementEntries[i];
        		chartDataPoints.push({
        			x: getTimeSeriesValue(bpManagementEntry), 
        			bp: bpManagementEntry.systolicBp,
        			gtn: bpManagementEntry.gtnRate,
        			labetalol: bpManagementEntry.labetalolDose
        		});
        	}
        	
        	return chartDataPoints;
        }
        
        function getTimeSeriesValue(bpManagementEntry) {
        	
        	var bpManagementEntryDate = DateUtils.convertDateTimeFromServer(bpManagementEntry.dateTime);
        	return bpManagementEntryDate;
        }
        
        function bpTabClicked() {
        	// The chart does not render if the tab is hidden
        	// so we tie the chart generation to the selection of the tab.
            generateChart(vm.chartDataPoints);
        }

    }
})();
