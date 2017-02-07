'use strict';

describe('GcsEntryController', function() {

    var vm;
    var scope, ionicPopup, patientCacheService, state, q;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, $rootScope, _$state_, _$q_) {

			state = _$state_;
			scope = $rootScope.$new();
			q = _$q_;
			ionicPopup = {
				confirm: function() {},
				alert: function() {}
			};
			patientCacheService = {
				setGcsScoreEye: function() {},
				setGcsScoreVerbal: function() {},
				setGcsScoreMotor: function() {},
				setGcsScore: function() {}
			};			

			vm = $controller('GcsEntryController', {'$scope': scope, '$ionicPopup': ionicPopup, 'PatientCacheService': patientCacheService});	 	
		});
     });

	it("should not change view when data is not confirmed", function() {
						
		spyOn(patientCacheService, 'setGcsScoreEye');
		spyOn(patientCacheService, 'setGcsScoreVerbal');
		spyOn(patientCacheService, 'setGcsScoreMotor');
		spyOn(patientCacheService, 'setGcsScore');

		spyOn(ionicPopup, 'confirm').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(false); // Cancel button selected
			return deferred.promise;
		});
		spyOn(ionicPopup, 'alert');

		spyOn(state, 'go');

		vm.onNext(); // call the click handler

		expect(ionicPopup.confirm).toHaveBeenCalled();

		scope.$apply(); // Propagate 'ionicPopup.confirm' promise			

	    expect(ionicPopup.alert).not.toHaveBeenCalled();		

	    expect(patientCacheService.setGcsScoreEye).not.toHaveBeenCalled();		
	    expect(patientCacheService.setGcsScoreVerbal).not.toHaveBeenCalled();		
	    expect(patientCacheService.setGcsScoreMotor).not.toHaveBeenCalled();		
	    expect(patientCacheService.setGcsScore).not.toHaveBeenCalled();		

	    expect(state.go).not.toHaveBeenCalled();		
    });

	it("should go to state 'anticoagulant-identification' when data is confirmed #1", function() {
			
		spyOn(patientCacheService, 'setGcsScoreEye');
		spyOn(patientCacheService, 'setGcsScoreVerbal');
		spyOn(patientCacheService, 'setGcsScoreMotor');
		spyOn(patientCacheService, 'setGcsScore');
			
		spyOn(ionicPopup, 'confirm').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(true); // Ok button selected
			return deferred.promise;
		});
		spyOn(ionicPopup, 'alert');

		spyOn(state, 'go');

		// GCS >=9
		vm.eye = 3;
    	vm.verbal = 4;
   	 	vm.motor = 5;
    	vm.total = 12;

		vm.onNext(); // call the click handler

		expect(ionicPopup.confirm).toHaveBeenCalled();

		scope.$apply(); // Propagate 'ionicPopup.confirm' promise			

	    expect(ionicPopup.alert).not.toHaveBeenCalled();

 	    expect(patientCacheService.setGcsScoreEye).toHaveBeenCalledWith(3);		
	    expect(patientCacheService.setGcsScoreVerbal).toHaveBeenCalledWith(4);		
	    expect(patientCacheService.setGcsScoreMotor).toHaveBeenCalledWith(5);		
	    expect(patientCacheService.setGcsScore).toHaveBeenCalledWith(12);		

	    expect(state.go).toHaveBeenCalledWith('tabs.anticoagulant-identification');		
    });

	it("should go to state 'anticoagulant-identification' when data is confirmed #2", function() {
			
		spyOn(patientCacheService, 'setGcsScoreEye');
		spyOn(patientCacheService, 'setGcsScoreVerbal');
		spyOn(patientCacheService, 'setGcsScoreMotor');
		spyOn(patientCacheService, 'setGcsScore');
			
		spyOn(ionicPopup, 'confirm').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve(true); // Ok button selected
			return deferred.promise;
		});
		spyOn(ionicPopup, 'alert').and.callFake(function() {
			var deferred = q.defer();
			deferred.resolve();
			return deferred.promise;
		});

		spyOn(state, 'go');

		// GCS < 9
		vm.eye = 1;
    	vm.verbal = 1;
   	 	vm.motor = 1;
    	vm.total = 3;

		vm.onNext(); // call the click handler

		expect(ionicPopup.confirm).toHaveBeenCalled();

		scope.$apply(); // Propagate 'ionicPopup.confirm' promise			

		expect(ionicPopup.alert).toHaveBeenCalled();

	    expect(patientCacheService.setGcsScoreEye).toHaveBeenCalledWith(1);		
	    expect(patientCacheService.setGcsScoreVerbal).toHaveBeenCalledWith(1);		
	    expect(patientCacheService.setGcsScoreMotor).toHaveBeenCalledWith(1);		
	    expect(patientCacheService.setGcsScore).toHaveBeenCalledWith(3);		

		scope.$apply(); // Propagate 'ionicPopup.alert' promise			

	    expect(state.go).toHaveBeenCalledWith('tabs.anticoagulant-identification');		
    });
});