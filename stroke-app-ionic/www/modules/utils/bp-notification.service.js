'use strict';

angular.module('utils').service('BpNotificationService', BpNotificationService);

BpNotificationService.$inject = [];

function BpNotificationService() {
    var _notificationId = 1;
    var _timeSinceInitialReading;
    var _fiveMinutes = 5 * 60 * 1000;
    var _halfHour = 30 * 60 * 1000;
    var _fullHour = 60 * 60 * 1000;
    var _onNotificationClickedCallback;

    var service = {
        isPluginLoaded: isPluginLoaded,
        setTimeSinceInitialReading: setTimeSinceInitialReading,
        scheduleTestNotification: scheduleTestNotification,
        beginBpMeasurementPrompts: beginBpMeasurementPrompts,
        stopBpMeasurementPrompts: stopBpMeasurementPrompts,
        getBpNotificationInformation: getBpNotificationInformation
     };

    return service;

    function setTimeSinceInitialReading(timeSinceInitialReading){
        _timeSinceInitialReading = timeSinceInitialReading;
    }

    function isPluginLoaded(){
        return window.hasOwnProperty('cordova');
    }

    function scheduleTestNotification() {
        if(isPluginLoaded()){
            var inFiveSeconds = new Date(Date.now() + 5000);
            cordova.plugins.notification.local.schedule({
                title: "Test notification",
                text: "This is a test notification.",
                trigger: { at: inFiveSeconds }
            });
        }
    }

    function beginBpMeasurementPrompts(onClick){
        if(isPluginLoaded()){
            _timeSinceInitialReading = 0;
            _onNotificationClickedCallback = onClick;
            subscribeToNotificationEvents();
            fireInitialBpNotification();
        }
    }

    function stopBpMeasurementPrompts(){
        if(isPluginLoaded()){
            unsubscribeFromNotificationEvents();
            cordova.plugins.notification.local.cancel(_notificationId);
        }
    }

    function subscribeToNotificationEvents(){
        cordova.plugins.notification.local.on('trigger', onBpNotificationTrigger);
        cordova.plugins.notification.local.on('click', onBpNotificationClicked);
    }

    // The api requires that the functions that were subscribed
    // to are passed in again on unsubscribing.
    // As such, un/subscribing to anonymous functions is impossible.
    function unsubscribeFromNotificationEvents(){
        cordova.plugins.notification.local.un('trigger', onBpNotificationTrigger);
        cordova.plugins.notification.local.un('click', onBpNotificationClicked);
    }

    function onBpNotificationTrigger(){
        _timeSinceInitialReading += _fiveMinutes;
        if(_timeSinceInitialReading >= _fullHour){
            console.log("Stop notifications");
            unsubscribeFromNotificationEvents();
        } else {
            console.log("Continue notifications");
            scheduleBpNotification();
        }
    }

    // It is default behaviour to cancel a notification when it is clicked.
    // This reschedules the notification again.
    function onBpNotificationClicked(){
        scheduleBpNotification();
        _onNotificationClickedCallback();
    }

    function fireInitialBpNotification(){
        cordova.plugins.notification.local.schedule({
            id: _notificationId,
            title: "SBP is above the treatment threshold.",
            text: "Repeat reading after 5 mins.",
            trigger: { at: new Date() },
            foreground: true
        });
    }

    function scheduleBpNotification(){
        var alertInfo = getBpNotificationInformation();
        var inFiveMinutes = new Date(Date.now() + _fiveMinutes);

        cordova.plugins.notification.local.schedule({
            id: _notificationId,
            title: alertInfo.title,
            text: alertInfo.text,
            trigger: { at: inFiveMinutes },
            foreground: true
        });
    }

    function getBpNotificationInformation(){
        var nextNotificationTime = _timeSinceInitialReading + _fiveMinutes;
        if(nextNotificationTime < _halfHour){
            return {'title':'Increase GTN', 'text':'BP target not reached. Increase GTN by 1.5ml.'};
        } else if(nextNotificationTime == _halfHour){
            return {'title':'Start Labetalol', 'text':'BP target not reached. Start Labetalol if there are no contraindications.'};
        } else if(nextNotificationTime < _fullHour){
            return {'title':'Increase Labetalol', 'text':'BP target not reached. Increase Labetalol if there are no contraindications.'};
        } else if(nextNotificationTime >= _fullHour){
            return {'title':'Contact CCU', 'text':'Target still not met after an hour. Contact CCU.'};
        }
    }
}