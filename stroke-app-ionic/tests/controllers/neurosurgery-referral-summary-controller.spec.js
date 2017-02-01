'use strict';

describe('NeurosurgeryReferralSummaryController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolC');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {}
			};			

			vm = $controller('NeurosurgeryReferralSummaryController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });

	it("should go to state 'bp-management' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.bp-management');		
    });
});