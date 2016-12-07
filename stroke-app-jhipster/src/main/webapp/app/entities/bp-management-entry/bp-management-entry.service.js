(function() {
    'use strict';
    angular
        .module('strokeApp')
        .factory('BpManagementEntry', BpManagementEntry);

    BpManagementEntry.$inject = ['$resource', 'DateUtils'];

    function BpManagementEntry ($resource, DateUtils) {
        var resourceUrl =  'api/bp-management-entries/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.dateTime = DateUtils.convertDateTimeFromServer(data.dateTime);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();
