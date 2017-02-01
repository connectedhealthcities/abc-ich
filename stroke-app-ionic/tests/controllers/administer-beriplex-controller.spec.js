'use strict';

describe('AdministerBeriplexController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {}
			};			

			vm = $controller('AdministerBeriplexController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'bp-management' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.bp-management');		
    });

	it("should go to state 'mrs-entry' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.mrs-entry');		
    });
});