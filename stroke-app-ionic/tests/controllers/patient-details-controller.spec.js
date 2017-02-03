'use strict';

describe('PatientDetailsController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('PatientDetailsController', {});				
		});
     });

	it("should go to state 'gcs-entry' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('gcs-entry');		
    });
});