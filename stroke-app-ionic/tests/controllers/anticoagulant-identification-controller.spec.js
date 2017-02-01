'use strict';

describe('AnticoagulantIdentificationController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getAnticogulantType: function() {}
			};			

			vm = $controller('AnticoagulantIdentificationController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'doac-reversal-agent-details' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getAnticogulantType').and.returnValue("DOAC");
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.doac-reversal-agent-details');		
    });

	it("should go to state 'calculate-beriplex-dose' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getAnticogulantType').and.returnValue("VITK");
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.calculate-beriplex-dose');		
    });
});