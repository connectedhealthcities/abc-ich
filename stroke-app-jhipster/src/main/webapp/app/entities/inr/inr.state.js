(function() {
    'use strict';

    angular
        .module('strokeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('inr', {
            parent: 'entity',
            url: '/inr',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Inrs'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/inr/inrs.html',
                    controller: 'InrController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('inr-detail', {
            parent: 'entity',
            url: '/inr/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Inr'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/inr/inr-detail.html',
                    controller: 'InrDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'Inr', function($stateParams, Inr) {
                    return Inr.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'inr',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('inr-detail.edit', {
            parent: 'inr-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/inr/inr-dialog.html',
                    controller: 'InrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Inr', function(Inr) {
                            return Inr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('inr.new', {
            parent: 'inr',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/inr/inr-dialog.html',
                    controller: 'InrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                value: null,
                                inrType: null,
                                measuredDateTime: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('inr', null, { reload: 'inr' });
                }, function() {
                    $state.go('inr');
                });
            }]
        })
        .state('inr.edit', {
            parent: 'inr',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/inr/inr-dialog.html',
                    controller: 'InrDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Inr', function(Inr) {
                            return Inr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('inr', null, { reload: 'inr' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('inr.delete', {
            parent: 'inr',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/inr/inr-delete-dialog.html',
                    controller: 'InrDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Inr', function(Inr) {
                            return Inr.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('inr', null, { reload: 'inr' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
