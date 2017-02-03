'use strict';

describe('ConfirmBeriplexDoseController', function() {

    var vm;
    var tabStateCacheService, state;

    beforeEach(function() {

        module('app.protocolA');
		module('ui.router');

		angular.mock.inject(function($controller, _$state_) {

			state = _$state_;
			tabStateCacheService = {
				setStateTabA: function() {}
			};			

			vm = $controller('ConfirmBeriplexDoseController', {'TabStateCacheService': tabStateCacheService});				
		});
     });

	it("should go to state 'administer-beriplex' on 'Next' button click", function() {
			
		spyOn(tabStateCacheService, 'setStateTabA');
		spyOn(state, 'go');

		vm.onNext(); // call the click handler

	    expect(tabStateCacheService.setStateTabA).toHaveBeenCalledWith('tabs.administer-beriplex');		
	    expect(state.go).toHaveBeenCalledWith('tabs.administer-beriplex');		
    });
});