'use strict';

describe('ConfirmBeriplexDoseController', function() {

    var vm;
    var state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			vm = $controller('ConfirmBeriplexDoseController', {});				
		});
     });

	it("should go to state 'administer-beriplex' on 'Next' button click", function() {
			
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(state.go).toHaveBeenCalledWith('tabs.administer-beriplex');		
    });
});