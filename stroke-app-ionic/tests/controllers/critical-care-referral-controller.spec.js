'use strict';

describe('CriticalCareReferralController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolB');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {}
			};			

			vm = $controller('CriticalCareReferralController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'mrs-entry' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.mrs-entry');		
    });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });
});