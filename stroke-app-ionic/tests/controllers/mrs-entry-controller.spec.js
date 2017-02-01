'use strict';

describe('MrsEntryController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.protocolC');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('MrsEntryController', {});				
		});
     });

	it("should go to state 'neurosurgery-referral-criteria' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-criteria');		
    });
});