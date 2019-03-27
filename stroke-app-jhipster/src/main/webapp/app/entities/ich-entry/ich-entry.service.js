(function() {
    'use strict';
    angular
        .module('strokeApp')
        .factory('IchEntry', IchEntry);

    IchEntry.$inject = ['$resource'];

    function IchEntry ($resource) {
        var resourceUrl =  'api/ich-entries/patient/:patientId';

         return $resource(resourceUrl, {}, {
            'getByPatient': {
                method: 'GET',
                isArray: true
            }
        });
    }
})();
