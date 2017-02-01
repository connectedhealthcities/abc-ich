'use strict';

describe('GcsEntryController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('GcsEntryController', {});				
		});
     });

	it("should go to state 'anticoagulant-identification' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.anticoagulant-identification');		
    });
});