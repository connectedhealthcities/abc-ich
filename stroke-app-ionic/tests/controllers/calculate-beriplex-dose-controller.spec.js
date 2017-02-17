'use strict';

describe('CalculateBeriplexDoseController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {},
				getInrValue: function() {},
				getAnticoagulantType: function() {},
				getAdministerBeriplexWhenUnknown: function() {}
			};			
			tabStateCacheService = {
				setStateTabA: function() {},
				getStateTabB: function() {},
				getStateTabC: function() {}
			};			

			vm = $controller('CalculateBeriplexDoseController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'confirm-beriplex-dose' on 'Next' button click #1", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.3);
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("VITK");
		spyOn(tabStateCacheService, 'setStateTabA');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabA).toHaveBeenCalledWith('tabs.confirm-beriplex-dose');		
	    expect(state.go).toHaveBeenCalledWith('tabs.confirm-beriplex-dose');		
    });

	it("should go to state 'confirm-beriplex-dose' on 'Next' button click #2", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.3);
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("UNKNOWN");
		spyOn(patientCacheService, 'getAdministerBeriplexWhenUnknown').and.returnValue(true);
		spyOn(tabStateCacheService, 'setStateTabA');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabA).toHaveBeenCalledWith('tabs.confirm-beriplex-dose');		
	    expect(state.go).toHaveBeenCalledWith('tabs.confirm-beriplex-dose');		
    });

	it("should go to state 'current state tab B' on 'Next' button click #1", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.2);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(tabStateCacheService, 'getStateTabB').and.returnValue('current-state-tab-b');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-b');		
    });

	it("should go to state 'current state tab B' on 'Next' button click #2", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.3);
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("UNKNOWN");
		spyOn(patientCacheService, 'getAdministerBeriplexWhenUnknown').and.returnValue(false);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(tabStateCacheService, 'getStateTabB').and.returnValue('current-state-tab-b');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-b');		
    });

	it("should go to state 'current state tab C' on 'Next' button click #1", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.2);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(tabStateCacheService, 'getStateTabC').and.returnValue('current-state-tab-c');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-c');		
    });

	it("should go to state 'current state tab C' on 'Next' button click #2", function() {
			
		spyOn(patientCacheService, 'getInrValue').and.returnValue(1.3);
		spyOn(patientCacheService, 'getAnticoagulantType').and.returnValue("UNKNOWN");
		spyOn(patientCacheService, 'getAdministerBeriplexWhenUnknown').and.returnValue(false);
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(tabStateCacheService, 'getStateTabC').and.returnValue('current-state-tab-c');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-c');		
    });
});