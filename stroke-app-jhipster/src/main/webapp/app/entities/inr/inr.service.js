(function() {
    'use strict';
    angular
        .module('strokeApp')
        .factory('Inr', Inr);

    Inr.$inject = ['$resource', 'DateUtils'];

    function Inr ($resource, DateUtils) {
        var resourceUrl =  'api/inrs/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.measuredDateTime = DateUtils.convertDateTimeFromServer(data.measuredDateTime);
                    }
                    return data;
                }
            },
            'getByPatient': {
            	url: 'api/inrs/patient/:patientId',
                method: 'GET',
                isArray: true
            },
            'update': { method:'PUT' }
        });
    }
})();
