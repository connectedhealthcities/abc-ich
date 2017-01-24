(function() {
    'use strict';
    angular
        .module('strokeApp')
        .factory('BpManagementEntry', BpManagementEntry);

    BpManagementEntry.$inject = ['$resource'];

    function BpManagementEntry ($resource) {
        var resourceUrl =  'api/bp-management-entries/patient/:patientId';

        return $resource(resourceUrl, {}, {
            'getByPatient': {
                method: 'GET',
                isArray: true
            }
        });
    }
})();
