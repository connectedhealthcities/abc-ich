'use strict';

describe('RegisterPatient1Controller', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('RegisterPatient1Controller', {});				
		});
     });

	it("should go to state 'register-patient-2' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('register-patient-2');		
    });
});