(function() {
    'use strict';

    angular
        .module('strokeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('chart', {
            abstract: true,
            parent: 'app'
        })
        .state('bp-dtt-chart', {
            parent: 'chart',
            url: '/bp-dtt-chart',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'BP DTT Chart'
            },
            views: {
                'content@': {
                    templateUrl: 'app/charts/bp-dtt-chart.html',
                    controller: 'BpDttChartController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('pcc-dnt-chart', {
            parent: 'chart',
            url: '/pcc-dnt-chart',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'PCC DNT Chart'
            },
            views: {
                'content@': {
                    templateUrl: 'app/charts/pcc-dnt-chart.html',
                    controller: 'PccDntChartController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
