'use strict';

describe('DoacReversalAgentDetailsController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {}
			};			
			tabStateCacheService = {
				getStateTabB: function() {},
				getStateTabC: function() {}
			};			

			vm = $controller('DoacReversalAgentDetailsController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'current state tab B' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(tabStateCacheService, 'getStateTabB').and.returnValue('current-state-tab-b');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-b');		
    });

	it("should go to state 'current state tab C' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(tabStateCacheService, 'getStateTabC').and.returnValue('current-state-tab-c');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-c');		
    });
});