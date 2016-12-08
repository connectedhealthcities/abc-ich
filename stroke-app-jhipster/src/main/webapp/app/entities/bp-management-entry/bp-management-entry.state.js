(function() {
    'use strict';

    angular
        .module('strokeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('bp-management-entry', {
            parent: 'entity',
            url: '/bp-management-entry',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'BpManagementEntries'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entries.html',
                    controller: 'BpManagementEntryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
            }
        })
        .state('bp-management-entry-detail', {
            parent: 'entity',
            url: '/bp-management-entry/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'BpManagementEntry'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entry-detail.html',
                    controller: 'BpManagementEntryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                entity: ['$stateParams', 'BpManagementEntry', function($stateParams, BpManagementEntry) {
                    return BpManagementEntry.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'bp-management-entry',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('bp-management-entry-detail.edit', {
            parent: 'bp-management-entry-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entry-dialog.html',
                    controller: 'BpManagementEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['BpManagementEntry', function(BpManagementEntry) {
                            return BpManagementEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('bp-management-entry.new', {
            parent: 'bp-management-entry',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entry-dialog.html',
                    controller: 'BpManagementEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                dateTime: null,
                                systolicBp: null,
                                gtnRate: null,
                                labetalolDose: null,
                                heartRate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('bp-management-entry', null, { reload: 'bp-management-entry' });
                }, function() {
                    $state.go('bp-management-entry');
                });
            }]
        })
        .state('bp-management-entry.edit', {
            parent: 'bp-management-entry',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entry-dialog.html',
                    controller: 'BpManagementEntryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['BpManagementEntry', function(BpManagementEntry) {
                            return BpManagementEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('bp-management-entry', null, { reload: 'bp-management-entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('bp-management-entry.delete', {
            parent: 'bp-management-entry',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/bp-management-entry/bp-management-entry-delete-dialog.html',
                    controller: 'BpManagementEntryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['BpManagementEntry', function(BpManagementEntry) {
                            return BpManagementEntry.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('bp-management-entry', null, { reload: 'bp-management-entry' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
