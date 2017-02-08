'use strict';

describe('PatientDetailsController', function() {

    var vm;
    var scope, ionicPopup, patientCacheService, dateTimeService, state, q;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, $rootScope, _$state_, _$q_) {

			state = _$state_;
			scope = $rootScope.$new();
			q = _$q_;
			ionicPopup = {
				confirm: function() {}
			};
			patientCacheService = {
				setDoorDateTime: function() {},
				setOnsetDateTime: function() {},
				setIsLastSeenWellOnset: function() {},
				setIsBestEstimateOnset: function() {}
			};
			dateTimeService = {
				getDateTimeFromDateAndTime: function() {}
			};			

			vm = $controller('PatientDetailsController', {'$scope': scope, '$ionicPopup': ionicPopup, 'PatientCacheService': patientCacheService, 'DateTimeService': dateTimeService});	 	
		});
     });

	it("should not change view when data is not confirmed", function() {

		spyOn(patientCacheService, 'setDoorDateTime');
		spyOn(patientCacheService, 'setOnsetDateTime');
		spyOn(patientCacheService, 'setIsLastSeenWellOnset');
		spyOn(patientCacheService, 'setIsBestEstimateOnset');

		spyOn(dateTimeService, 'getDateTimeFromDateAndTime');

		spyOn(ionicPopup, 'confirm').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(false); // Cancel button selected
			return deferred.promise;
		});

		spyOn(state, 'go');

		vm.onNext(); // call the click handler

		expect(ionicPopup.confirm).toHaveBeenCalled();

		scope.$apply(); // Propagate 'ionicPopup.confirm' promise			

	    expect(patientCacheService.setDoorDateTime).not.toHaveBeenCalled();		
	    expect(patientCacheService.setOnsetDateTime).not.toHaveBeenCalled();		
	    expect(patientCacheService.setIsLastSeenWellOnset).not.toHaveBeenCalled();		
	    expect(patientCacheService.setIsBestEstimateOnset).not.toHaveBeenCalled();		

	    expect(dateTimeService.getDateTimeFromDateAndTime).not.toHaveBeenCalled();		

	    expect(state.go).not.toHaveBeenCalled();		
    });

	it("should go to state 'gcs-entry' when data is confirmed", function() {
			
		spyOn(patientCacheService, 'setDoorDateTime');
		spyOn(patientCacheService, 'setOnsetDateTime');
		spyOn(patientCacheService, 'setIsLastSeenWellOnset');
		spyOn(patientCacheService, 'setIsBestEstimateOnset');

		spyOn(dateTimeService, 'getDateTimeFromDateAndTime').and.returnValue("dummy date time");
			
		spyOn(ionicPopup, 'confirm').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(true); // Ok button selected
			return deferred.promise;
		});

		spyOn(state, 'go');

   	 	vm.isOnsetLastSeenWell = true;
    	vm.isOnsetBestEstimate = false;

		vm.onNext(); // call the click handler

		expect(ionicPopup.confirm).toHaveBeenCalled();

		scope.$apply(); // Propagate 'ionicPopup.confirm' promise			

 	    expect(patientCacheService.setDoorDateTime).toHaveBeenCalledWith("dummy date time");		
	    expect(patientCacheService.setOnsetDateTime).toHaveBeenCalledWith("dummy date time");		
	    expect(patientCacheService.setIsLastSeenWellOnset).toHaveBeenCalledWith(true);		
	    expect(patientCacheService.setIsBestEstimateOnset).toHaveBeenCalledWith(false);		

	    expect(state.go).toHaveBeenCalledWith('gcs-entry');		
    });
});