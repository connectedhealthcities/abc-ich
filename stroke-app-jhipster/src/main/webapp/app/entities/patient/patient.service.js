(function() {
    'use strict';
    angular
        .module('strokeApp')
        .factory('Patient', Patient);

    Patient.$inject = ['$resource', 'DateUtils'];

    function Patient ($resource, DateUtils) {
        var resourceUrl =  'api/patients/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthDate = DateUtils.convertLocalDateFromServer(data.birthDate);
                        data.onsetDateTime = DateUtils.convertDateTimeFromServer(data.onsetDateTime);
                        data.bpStartTreatmentDateTime = DateUtils.convertDateTimeFromServer(data.bpStartTreatmentDateTime);
                        data.doorDateTime = DateUtils.convertDateTimeFromServer(data.doorDateTime);
                        data.appStartDateTime = DateUtils.convertDateTimeFromServer(data.appStartDateTime);
                        data.beriplexStartDateTime = DateUtils.convertDateTimeFromServer(data.beriplexStartDateTime);
                        data.vitaminkDateTime = DateUtils.convertDateTimeFromServer(data.vitaminkDateTime);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthDate = DateUtils.convertLocalDateToServer(copy.birthDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthDate = DateUtils.convertLocalDateToServer(copy.birthDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
