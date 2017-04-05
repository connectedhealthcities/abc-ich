'use strict';

describe("DateTimeService", function() {

	var service;

	beforeEach(function() {

		 var mockMoment = {};

		 angular.mock.module('utils');
		 
		 module(function ($provide) {
        	 $provide.value('moment', mockMoment);
      	 });

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_DateTimeService_) {
			 service = _DateTimeService_;
		 });

	});


	describe("getNowWithZeroSeconds", function() {

		it("should return a date with zero seconds and zero milliiseconds", function() {

			var now = service.getNowWithZeroSeconds();
			expect(now.getSeconds()).toBe(0);
			expect(now.getMilliseconds()).toBe(0);
		});


	});

	describe("getTimeSinceOnsetText", function() {

		it("should return an empty string if any supplied parameter is null", function() {

			var text = service.getTimeSinceOnsetText(null);
			expect(text).toBe("");

			var text = service.getTimeSinceOnsetText(new Date(), null);
			expect(text).toBe("");

			var text = service.getTimeSinceOnsetText(new Date(), new Date(), null);
			expect(text).toBe("");
		});

		it("should return days, hours and minutes", function() {

			var date = new Date(2010, 10, 10);
			var time = new Date(2010, 10, 10, 10, 10, 0, 0);
			var now = new Date(2010, 10, 11, 11, 11, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 1 day, 1 hour, 1 minute.");

			now = new Date(2010, 10, 12, 12, 12, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 2 days, 2 hours, 2 minutes.");
		});

		it("should return hours and minutes", function() {

			var date = new Date(2010, 10, 10);
			var time = new Date(2010, 10, 10, 10, 10, 0, 0);
			var now = new Date(2010, 10, 10, 11, 11, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 1 hour, 1 minute.");

			now = new Date(2010, 10, 10, 12, 12, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 2 hours, 2 minutes.");
		});

		it("should return minutes", function() {

			var date = new Date(2010, 10, 10);
			var time = new Date(2010, 10, 10, 10, 10, 0, 0);
			var now = new Date(2010, 10, 10, 10, 11, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 1 minute.");

			now = new Date(2010, 10, 10, 10, 12, 0, 0);
			var text = service.getTimeSinceOnsetText(now, date, time);
			expect(text).toBe("Time since onset is 2 minutes.");
		});
	});

	describe("getDateTimeFromDateAndTime", function() {

		it("should return null if any supplied parameter is null", function() {

			var dateTime = service.getDateTimeFromDateAndTime(null);
			expect(dateTime).toBe(null);

			var dateTime = service.getDateTimeFromDateAndTime(new Date(), null);
			expect(dateTime).toBe(null);
		});

		it("should return the correct date-time", function() {

			var date = new Date(2011, 11, 11, 11,  11, 11, 11);
			var time = new Date(2004, 4, 4, 4, 4, 4, 4);
			var dateTime = service.getDateTimeFromDateAndTime(date, time);
			expect(dateTime.getFullYear()).toBe(2011);
			expect(dateTime.getMonth()).toBe(11);
			expect(dateTime.getDate()).toBe(11);
			expect(dateTime.getHours()).toBe(4);
			expect(dateTime.getMinutes()).toBe(4);
			expect(dateTime.getSeconds()).toBe(0);
			expect(dateTime.getMilliseconds()).toBe(0);
		});

	});

});
