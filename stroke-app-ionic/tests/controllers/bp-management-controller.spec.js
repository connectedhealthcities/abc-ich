'use strict';

describe('BpManagementController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolB');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {},
				getBpTargetReachedDateTime: function() {}
			};			
			tabStateCacheService = {
				setStateTabB: function() {},
				getStateTabC: function() {}
			};			

			vm = $controller('BpManagementController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'critical-care-referral' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getBpTargetReachedDateTime').and.returnValue(null);
		spyOn(tabStateCacheService, 'setStateTabB');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabB).toHaveBeenCalledWith('tabs.critical-care-referral');		
	    expect(state.go).toHaveBeenCalledWith('tabs.critical-care-referral');		
    });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getBpTargetReachedDateTime').and.returnValue("NOT NULL");
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });

	it("should go to state 'current state tab C' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getBpTargetReachedDateTime').and.returnValue("NOT NULL");
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(tabStateCacheService, 'getStateTabC').and.returnValue('current-state-tab-c');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('current-state-tab-c');		
    });
});