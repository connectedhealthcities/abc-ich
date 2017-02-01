'use strict';

describe('CalculateBeriplexDoseController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {},
				getInrValue: function() {}
			};			

			vm = $controller('CalculateBeriplexDoseController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'confirm-beriplex-dose' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.3);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.confirm-beriplex-dose');		
    });

	it("should go to state 'bp-management' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.1);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.bp-management');		
    });

	it("should go to state 'mrs-entry' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.1);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.mrs-entry');		
    });
});