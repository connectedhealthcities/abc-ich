'use strict';

describe('CriticalCareReferralController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolB');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {}
			};			
			tabStateCacheService = {
				getStateTabC: function() {}
			};			

			vm = $controller('CriticalCareReferralController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'current state tab C' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(tabStateCacheService, 'getStateTabC').and.returnValue('current-state-tab-c');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-c');		
    });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });
});