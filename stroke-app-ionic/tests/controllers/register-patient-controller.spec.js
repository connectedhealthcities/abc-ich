'use strict';

describe('RegisterPatientController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('RegisterPatientController', {});				
		});
     });

	it("should go to state 'patient-details' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-details');		
    });
});