// 'use strict';

// describe('MrsEntryController', function() {

//     var vm;
//     var tabStateCacheService, state;

//     beforeEach(function() {

//         module('app.protocolC');
// 		module('ui.router');

// 		angular.mock.inject(function($controller, _$state_) {

// 			state = _$state_;
// 			tabStateCacheService = {
// 				setStateTabC: function() {}
// 			};			

// 			vm = $controller('MrsEntryController', {'TabStateCacheService': tabStateCacheService});				
// 		});
//      });

// 	it("should go to state 'neurosurgery-referral-criteria' on 'Next' button click", function() {
			
// 		spyOn(tabStateCacheService, 'setStateTabC');
// 		spyOn(state, 'go');

// 		vm.onNext(); // call the click handler

// 	    expect(tabStateCacheService.setStateTabC).toHaveBeenCalledWith('tabs.neurosurgery-referral-criteria');		
// 	    expect(state.go).toHaveBeenCalledWith('tabs.neurosurgery-referral-criteria');		
//     });
// });