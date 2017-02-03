'use strict';

describe('AnticoagulantIdentificationController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getAnticoagulantType: function() {}
			};			
			tabStateCacheService = {
				setStateTabA: function() {}
			};			

			vm = $controller('AnticoagulantIdentificationController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'doac-reversal-agent-details' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("DOAC");
		spyOn(tabStateCacheService, 'setStateTabA');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabA).toHaveBeenCalledWith('tabs.doac-reversal-agent-details');		
	    expect(state.go).toHaveBeenCalledWith('tabs.doac-reversal-agent-details');		
    });

	it("should go to state 'calculate-beriplex-dose' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("VITK");
		spyOn(tabStateCacheService, 'setStateTabA');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabA).toHaveBeenCalledWith('tabs.calculate-beriplex-dose');		
	    expect(state.go).toHaveBeenCalledWith('tabs.calculate-beriplex-dose');		
    });
});