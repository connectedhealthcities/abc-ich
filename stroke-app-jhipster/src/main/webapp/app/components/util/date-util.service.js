(function() {
    'use strict';

    angular
        .module('strokeApp')
        .factory('DateUtils', DateUtils);

    DateUtils.$inject = ['$filter'];

    function DateUtils ($filter) {

        var service = {
            convertDateTimeFromServer : convertDateTimeFromServer,
            convertLocalDateFromServer : convertLocalDateFromServer,
            convertLocalDateToServer : convertLocalDateToServer,
            dateformat : dateformat,
            getMinutesBetweenDates: getMinutesBetweenDates
        };

        return service;

        function convertDateTimeFromServer (date) {
            if (date) {
                return new Date(date);
            } else {
                return null;
            }
        }

        function convertLocalDateFromServer (date) {
            if (date) {
                var dateString = date.split('-');
                return new Date(dateString[0], dateString[1] - 1, dateString[2]);
            }
            return null;
        }

        function convertLocalDateToServer (date) {
            if (date) {
                return $filter('date')(date, 'yyyy-MM-dd');
            } else {
                return null;
            }
        }

        function dateformat () {
            return 'yyyy-MM-dd';
        }
        
        function getMinutesBetweenDates (earlierDate, laterDate) {
            
        	// return null if either of the supplied dates is null
            if (earlierDate === null || laterDate === null) {
            	return null;
            }
            
            var earlierDateMs = earlierDate.getTime();
            var laterDateMs = laterDate.getTime();
  
            // return null if later date is before earlier date
            if (laterDateMs < earlierDateMs) {
            	return null;
            }

            var diffMs = laterDateMs - earlierDate;
            
            var minutes = (diffMs / 1000) / 60;
            minutes = Math.round(minutes);
            
            return minutes           
        }
    }

})();
