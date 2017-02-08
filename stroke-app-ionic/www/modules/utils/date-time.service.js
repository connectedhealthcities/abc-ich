'use strict';

angular.module('utils').service('DateTimeService', DateTimeService);

DateTimeService.$inject = [];

function DateTimeService() {

    var service = {

        dateTimeToShortTime: dateTimeToShortTime,
        getDateTimeStringFromDate: getDateTimeStringFromDate,
        getTimeStringFromDate: getTimeStringFromDate,
        getDateStringFromDate: getDateStringFromDate,
        getTimeSinceOnsetText: getTimeSinceOnsetText,
        getDateTimeFromDateAndTime: getDateTimeFromDateAndTime
    };

    return service;

    function dateTimeToShortTime(dateTime) {
        var shortTime = dateTime.toTimeString().split(' ')[0].split(":");
        var d = new Date(); // creates a Date Object using the clients current time
        d.setHours  (+shortTime[0]); // set Time accordingly, using implicit type coercion
        d.setMinutes( shortTime[1]); // you can pass Number or String, it doesn't matter
        return  d;
    }

    function getDateTimeStringFromDate(date) {
        var dateTimeString = this.getDateStringFromDate(date) + " " + this.getTimeStringFromDate(date);
        return dateTimeString;
    }

    function getDateStringFromDate(date) {
        var dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        return dateString;
    }

    function getTimeStringFromDate(date) {
        var timeString = date.getHours() + ":" + date.getMinutes();
        return timeString;
    }
 
    function getTimeSinceOnsetText(now, onsetDate, onsetTime) {
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
           
        return timeSinceOnsetText;
    }

    function getDateTimeFromDateAndTime(date, time) {
        var dateTime = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            time.getHours(),
            time.getMinutes(), 0, 0);

        return dateTime;
    }
}

