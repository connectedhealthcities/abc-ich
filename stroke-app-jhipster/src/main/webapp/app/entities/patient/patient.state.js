(function() {
    'use strict';

    angular
        .module('strokeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('patient', {
            parent: 'entity',
            url: '/patient?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Patients'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/patient/patients.html',
                    controller: 'PatientController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
            }
        })
        .state('patient-detail', {
            parent: 'entity',
            url: '/patient/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Patient'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/patient/patient-detail.html',
                    controller: 'PatientDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Patient', function($stateParams, Patient) {
                    return Patient.get({id : $stateParams.id}).$promise;
                }],
                bpManagementEntries: ['$stateParams', 'BpManagementEntry', function($stateParams, BpManagementEntry) {
                    return BpManagementEntry.getByPatient({patientId : $stateParams.id}).$promise;
                }],  
                ichEntries: ['$stateParams', 'IchEntry', function($stateParams, IchEntry){
                    return IchEntry.getByPatient({patientId: $stateParams.id}).$promise;
                }],            
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'patient',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        });
    }

})();
