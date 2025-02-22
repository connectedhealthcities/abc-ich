(function() {
    'use strict';

    angular
        .module('strokeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('hospital', {
            parent: 'entity',
            url: '/hospital',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Hospitals'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hospital/hospitals.html',
                    controller: 'HospitalController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('hospital-detail', {
            parent: 'entity',
            url: '/hospital/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Hospital'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/hospital/hospital-detail.html',
                    controller: 'HospitalDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Hospital', function($stateParams, Hospital) {
                    return Hospital.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'hospital',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('hospital-detail.edit', {
            parent: 'hospital-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hospital/hospital-dialog.html',
                    controller: 'HospitalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hospital', function(Hospital) {
                            return Hospital.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hospital.new', {
            parent: 'hospital',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hospital/hospital-dialog.html',
                    controller: 'HospitalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                uniqueId: null,
                                name: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('hospital', null, { reload: 'hospital' });
                }, function() {
                    $state.go('hospital');
                });
            }]
        })
        .state('hospital.edit', {
            parent: 'hospital',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hospital/hospital-dialog.html',
                    controller: 'HospitalDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Hospital', function(Hospital) {
                            return Hospital.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hospital', null, { reload: 'hospital' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('hospital.delete', {
            parent: 'hospital',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/hospital/hospital-delete-dialog.html',
                    controller: 'HospitalDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Hospital', function(Hospital) {
                            return Hospital.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('hospital', null, { reload: 'hospital' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
