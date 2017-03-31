'use strict';

// This file contains the following tests
//
// 		it should initialise the view model correctly
//		it should delegate isSendTestEmailButtonEnabled to controller.service
// 		it should save data when 'Save' button selected
// 		it should call $window.history.back when 'Save' button selected
// 		it should not save data when 'Cancel' button selected
// 		it should call $window.history.back when 'cancel' button selected
//		it should display 'success' popup when send test email is successful
//		it should display 'failure' popup when send test email fails

describe("EmailConfigurationController", function() {

    var vm;
	var $window;
    var scopeMock, ionicPopupMock, emailConfigurationControllerServiceMock; 
    var emailCacheServiceMock, emailServiceMock;


    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$window_) {
			$window = _$window_;
			scopeMock = $rootScope.$new();
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
			emailConfigurationControllerServiceMock = jasmine.createSpyObj('EmailConfigurationControllerService spy', ['isSendTestEmailButtonEnabled']);
			emailCacheServiceMock = jasmine.createSpyObj('EmailCacheService spy', ['getEmail', 'setEmail']);
			emailServiceMock = jasmine.createSpyObj('EmailService spy', ['sendTestEmail']);
 			
			vm = $controller('EmailConfigurationController', {
				'$window': $window,
				'$scope': scopeMock,
				'$ionicPopup': ionicPopupMock,
				'EmailConfigurationControllerService': emailConfigurationControllerServiceMock,
				'EmailCacheService': emailCacheServiceMock,
				'EmailService': emailServiceMock
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(emailCacheServiceMock.getEmail).toHaveBeenCalled();
         
		expect(vm.onCancel).toBeDefined();
		expect(vm.onSave).toBeDefined();
		expect(vm.onSendTestEmail).toBeDefined();
		expect(vm.isSendTestEmailButtonEnabled).toBeDefined();
	});

	it("should delegate isSendTestEmailButtonEnabled to controller.service", function() {

		vm.email = "email-address";
		vm.isSendTestEmailButtonEnabled();
		expect(emailConfigurationControllerServiceMock.isSendTestEmailButtonEnabled).toHaveBeenCalledWith("email-address");				
	});

	it("should save data when 'Save' button selected", function() {

		vm.onSave();        
		expect(emailCacheServiceMock.setEmail).toHaveBeenCalled();
 	});

	it("should call $window.history.back when 'Save' button selected", function() {

 		spyOn($window.history, 'back');

		vm.onSave();        
		expect($window.history.back).toHaveBeenCalled();
 	});

	it("should not save data when 'Cancel' button selected", function() {

		vm.onCancel();        
		expect(emailCacheServiceMock.setEmail).not.toHaveBeenCalled();
 	});

	it("should call $window.history.back when 'Cancel' button selected", function() {

 		spyOn($window.history, 'back');

		vm.onCancel();        
		expect($window.history.back).toHaveBeenCalled();
 	});

	it("should display 'success' popup when send test email is successful", function() {
 
		vm.onSendTestEmail();

		expect(emailServiceMock.sendTestEmail).toHaveBeenCalled();

		var success_callback = emailServiceMock.sendTestEmail.calls.argsFor(0)[1];

		success_callback();

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Email configuration");
 	});

	it("should display 'failure' popup when send test email fails", function() {
 
		vm.onSendTestEmail();

		expect(emailServiceMock.sendTestEmail).toHaveBeenCalled();

		var failure_callback = emailServiceMock.sendTestEmail.calls.argsFor(0)[2];

		failure_callback();

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Email error");
 	});

});
