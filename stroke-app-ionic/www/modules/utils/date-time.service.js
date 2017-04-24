'use strict';

angular.module('utils').service('DateTimeService', DateTimeService);

DateTimeService.$inject = ['$filter', 'moment'];

function DateTimeService($filter, moment) {

    var service = {
        getNowWithZeroSeconds: getNowWithZeroSeconds,
        getTimeSinceOnsetText: getTimeSinceOnsetText,
        getDateTimeFromDateAndTime: getDateTimeFromDateAndTime,
        getAgeFromBirthDate: getAgeFromBirthDate,
        formatDateTimeForPrint: formatDateTimeForPrint,
        formatBirthDateForPrint: formatBirthDateForPrint
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
        if (now !== null && onsetDate !== null && onsetTime !== null) {
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
                var daysText = days === 1 ? " day, " : " days, ";
                var hoursText = hours === 1 ? " hour, " : " hours, ";
                var minuteText = minutes === 1 ? " minute." : " minutes.";
                timeSinceOnsetText += days + daysText + hours + hoursText + minutes + minuteText;
            }
            else if (hours > 0) {
                var hoursText = hours === 1 ? " hour, " : " hours, ";
                var minuteText = minutes === 1 ? " minute." : " minutes.";
                timeSinceOnsetText += hours + hoursText + minutes + minuteText;
            }
            else {
                var minuteText = minutes === 1 ? " minute." : " minutes.";
                timeSinceOnsetText += minutes + minuteText;
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

    function getAgeFromBirthDate(birthDate) {
        return moment().diff(birthDate, 'years');
    }

    function formatDateTimeForPrint(dateTime) {
        var date = $filter('date')(dateTime, 'd MMM y H:mm');
        return date;
    }

    function formatBirthDateForPrint(dateTime) {
        var birthdate = $filter('date') (dateTime, 'd MMM y');
        return birthdate;
    }

}

