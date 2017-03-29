'use strict';

angular.module('utils').service('DateTimeService', DateTimeService);

DateTimeService.$inject = ['$filter'];

function DateTimeService($filter) {

    var service = {
        getNowWithZeroSeconds: getNowWithZeroSeconds,
        getTimeSinceOnsetText: getTimeSinceOnsetText,
        getDateTimeFromDateAndTime: getDateTimeFromDateAndTime,
        getAgeFromBirthDate: getAgeFromBirthDate,
        formatDateTimeForRtf: formatDateTimeForRtf,
        formatBirthDateForRtf: formatBirthDateForRtf
    };

    return service;

    function getNowWithZeroSeconds() {
        var now = new Date();
        now.setSeconds(0);
        now.setMilliseconds(0);
        return now;
    }

    function getTimeSinceOnsetText(now, onsetDate, onsetTime) {

        var timeSinceOnsetText = "";
        if (onsetDate !== null && onsetTime !== null) {
            var onsetDateTime = getDateTimeFromDateAndTime(onsetDate, onsetTime);
            var millis = now.getTime() - onsetDateTime.getTime();

            var ONE_MINUTE_IN_MILLIS = 60 * 1000; 
            var ONE_HOUR_IN_MILLIS = 60 * ONE_MINUTE_IN_MILLIS;
            var ONE_DAY_IN_MILLIS = 24 * ONE_HOUR_IN_MILLIS;

            var days = Math.floor(millis / ONE_DAY_IN_MILLIS);
            millis = millis % ONE_DAY_IN_MILLIS;
            var hours = Math.floor(millis / ONE_HOUR_IN_MILLIS);
            millis = millis % ONE_HOUR_IN_MILLIS;
            var minutes = Math.floor(millis / ONE_MINUTE_IN_MILLIS);

            var timeSinceOnsetText = "Time since onset is ";

            if (days > 0) {
                timeSinceOnsetText += days + " days, " + hours + " hours, " + minutes + " minutes.";
            }
            else if (hours > 0) {
                timeSinceOnsetText += hours + " hours, " + minutes + " minutes.";
            }
            else {
                timeSinceOnsetText += minutes + " minutes.";
            }
        }
           
        return timeSinceOnsetText;
    }

    function getDateTimeFromDateAndTime(date, time) {
        if (date === null || time === null) {
            return null;
        }
        var dateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(), 0, 0);

        return dateTime;
    }

    function formatDateTimeForRtf(dateTime) {
        var date = $filter('date')(dateTime, 'd MMM y H:mm');
        return date;
    }

    function formatBirthDateForRtf(dateTime) {
        var birthdate = $filter('date') (dateTime, 'd MMM y');
        return birthdate;
    }

    function getAgeFromBirthDate(birthDate) {
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;    
    }
}

