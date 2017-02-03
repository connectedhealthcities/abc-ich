'use strict';

describe('PatientStartController', function() {

    var vm;
    var tabStateCacheService, state;

    beforeEach(function() {

        module('app.general');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			tabStateCacheService = {
				clearAll: function() {}
			};

			vm = $controller('PatientStartController', {'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'register-patient' on 'Next' button click", function() {
			
		spyOn(tabStateCacheService, 'clearAll');
		spyOn(state, 'go');

		vm.onNewPatient(); // call the click handler

	    expect(tabStateCacheService.clearAll).toHaveBeenCalled();		
	    expect(state.go).toHaveBeenCalledWith('register-patient');		
    });
});