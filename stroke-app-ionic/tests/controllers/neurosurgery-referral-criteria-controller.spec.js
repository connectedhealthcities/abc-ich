'use strict';

describe('NeurosurgeryReferralCriteriaController', function() {

    var vm;
    var patientCacheService, state;

    beforeEach(function() {

        module('app.protocolC');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {},
				getIchVolume: function() {},
				getPosteriorFossaIch: function() {},
				getVentricleObstructed: function() {}								
			};			

			vm = $controller('NeurosurgeryReferralCriteriaController', {'PatientCacheService': patientCacheService});				
		});
     });

	it("should go to state 'neurosurgery-referral-summary' on 'Next' button click #1", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #2", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(31);
		spyOn(patientCacheService, 'getPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getVentricleObstructed').and.returnValue(false);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #3", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getPosteriorFossaIch').and.returnValue(true);
		spyOn(patientCacheService, 'getVentricleObstructed').and.returnValue(false);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #4", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getVentricleObstructed').and.returnValue(true);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getVentricleObstructed').and.returnValue(false);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });
});