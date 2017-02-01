'use strict';

angular.module('utils').service('DateTimeService', DateTimeService);

DateTimeService.$inject = [];

function DateTimeService() {

    this.dateTimeToShortTime = function(dateTime){
        var shortTime = dateTime.toTimeString().split(' ')[0].split(":");
        var d = new Date(); // creates a Date Object using the clients current time
        d.setHours  (+shortTime[0]); // set Time accordingly, using implicit type coercion
        d.setMinutes( shortTime[1]); // you can pass Number or String, it doesn't matter
        return  d;
    };
    this.getDateStringFromDate = function(date){
        var dateString = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
        return dateString;
    };
    this.getTimeStringFromDate = function(date){
        var timeString = date.getHours() + ":" + date.getMinutes();
        return timeString;
    };
    this.getDateTimeStringFromDate = function(date){
        var dateTimeString = this.getDateStringFromDate(date) + " " + this.getTimeStringFromDate(date);
        return dateTimeString;
    }
    
    
    
    return {"dateTimeToShortTime": this.dateTimeToShortTime,
            "getDateTimeStringFromDate": this.getDateTimeStringFromDate,
            "getTimeStringFromDate": this.getTimeStringFromDate,
            "getDateStringFromDate": this.getDateStringFromDate
    };
}

