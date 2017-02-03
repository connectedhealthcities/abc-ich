'use strict';

describe('NeurosurgeryReferralCriteriaController', function() {

    var vm;
    var patientCacheService, tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolC');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			patientCacheService = {
				getGcsScore: function() {},
				getIchVolume: function() {},
				getIsPosteriorFossaIch: function() {},
				getIsVentricleObstructed: function() {}								
			};			
			tabStateCacheService = {
				setStateTabC: function() {}
			};			

			vm = $controller('NeurosurgeryReferralCriteriaController', {'PatientCacheService': patientCacheService, 'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'neurosurgery-referral-summary' on 'Next' button click #1", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(8);
		spyOn(tabStateCacheService, 'setStateTabC');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabC).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #2", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(31);
		spyOn(patientCacheService, 'getIsPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getIsVentricleObstructed').and.returnValue(false);
		spyOn(tabStateCacheService, 'setStateTabC');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabC).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #3", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getIsPosteriorFossaIch').and.returnValue(true);
		spyOn(patientCacheService, 'getIsVentricleObstructed').and.returnValue(false);
		spyOn(tabStateCacheService, 'setStateTabC');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabC).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("hould go to state 'neurosurgery-referral-summary' on 'Next' button click #4", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getIsPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getIsVentricleObstructed').and.returnValue(true);
		spyOn(tabStateCacheService, 'setStateTabC');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabC).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-summary');		
    });

	it("should go to state 'patient-end' on 'Next' button click", function() {
			
		spyOn(patientCacheService, 'getGcsScore').and.returnValue(9);
		spyOn(patientCacheService, 'getIchVolume').and.returnValue(30);
		spyOn(patientCacheService, 'getIsPosteriorFossaIch').and.returnValue(false);
		spyOn(patientCacheService, 'getIsVentricleObstructed').and.returnValue(false);
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-end');		
    });
});