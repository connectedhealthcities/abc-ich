'use strict';

describe('BpNotificationService', function () {

    var service;

    beforeEach(function () {

        angular.mock.module('utils');

        angular.mock.inject(function(_BpNotificationService_)  {
            service = _BpNotificationService_;
        });
        
    });

    describe("isPluginLoaded", function () {
        it("should return false always as not running on a device", function () {
            
            var pluginLoaded = service.isPluginLoaded();
            expect(pluginLoaded).toBe(false);
        });
    });

    describe("getBpNotificationInformation", function () {
        it("should return a message prompting the user the increase GTN if timeSinceInitialReading is less than 25*60*1000 (five minutes less than half an hour)", function () {

            service.setTimeSinceInitialReading(10*60*1000);
            var message = service.getBpNotificationInformation();
            expect(message.title).toEqual('Increase GTN');
        });

        it("should return a message prompting the user the start labetalol if timeSinceInitialReading is equal to 25*60*1000 (five minutes less than half an hour)", function () {

            service.setTimeSinceInitialReading(25*60*1000);
            var message = service.getBpNotificationInformation();
            expect(message.title).toEqual('Start Labetalol');
        });

        it("should return a message prompting the user the increase labetalol if timeSinceInitialReading is greater than 25*60*1000 (five minutes less than half an hour) and less than 55*60*1000 (five minutes less than one hour)", function () {

            service.setTimeSinceInitialReading(30*60*1000);
            var message = service.getBpNotificationInformation();
            expect(message.title).toEqual('Increase Labetalol');
        });

        it("should return a message prompting the user the contact the CCU if timeSinceInitialReading is greater than or equal to 55*60*1000 (five minutes less than one hour)", function () {

            service.setTimeSinceInitialReading(55*60*1000);
            var message = service.getBpNotificationInformation();
            expect(message.title).toEqual('Contact CCU');
        });
    });



});