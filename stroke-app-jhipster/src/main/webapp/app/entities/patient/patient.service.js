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
            'queryAll': {
            	url: 'api/patients-all',
                method: 'GET',
                isArray: true
            },
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthDate = DateUtils.convertLocalDateFromServer(data.birthDate);
                        data.onsetDateTime = DateUtils.convertDateTimeFromServer(data.onsetDateTime);
                        data.doorDateTime = DateUtils.convertDateTimeFromServer(data.doorDateTime);
                        data.appStartDateTime = DateUtils.convertDateTimeFromServer(data.appStartDateTime);
                        data.bpTargetReachedDateTime = DateUtils.convertDateTimeFromServer(data.bpTargetReachedDateTime);
                        data.reversalAgentStartDateTime = DateUtils.convertDateTimeFromServer(data.reversalAgentStartDateTime);
                        data.vitaminkDateTime = DateUtils.convertDateTimeFromServer(data.vitaminkDateTime);
                        data.scanDateTime = DateUtils.convertDateTimeFromServer(data.scanDateTime);
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
