'use strict';

describe('PatientEndController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('PatientEndController', {});				
		});
     });

	it("should go to state 'patient-start' on 'Finish' button click", function() {
			
		spyOn(state, 'go');

		vm.onFinish(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('patient-start');		
    });
});