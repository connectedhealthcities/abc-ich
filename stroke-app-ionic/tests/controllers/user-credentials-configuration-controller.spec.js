'use strict';

describe("UserCredentialsConfigurationController", function() {

    var vm;
	var $q;
	var $window;
    var scopeMock, ionicLoadingMock, ionicPopupMock, userCredentialsConfigurationControllerServiceMock; 
    var userCredentialsCacheServiceMock, authenticationServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$window_, _$q_) {
			scopeMock = $rootScope.$new();
			$q = _$q_;
			$window = _$window_;
			ionicLoadingMock = jasmine.createSpyObj('$ionicLoading spy', ['show', 'hide']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['alert']);
			userCredentialsConfigurationControllerServiceMock = jasmine.createSpyObj('UserCredentialsConfigurationControllerService spy', ['isTestLoginButtonEnabled']);
			userCredentialsCacheServiceMock = jasmine.createSpyObj('UserCredentialsCacheService spy', ['getUsername', 'setUsername', 'getPassword', 'setPassword', 'getServerAddress', 'setServerAddress']);
			authenticationServiceMock = jasmine.createSpyObj('AuthenticationService spy', ['testAuthentication']);

			vm = $controller('UserCredentialsConfigurationController', {
				'$window': $window,
				'$ionicLoading': ionicLoadingMock,
				'$ionicPopup': ionicPopupMock,
				'UserCredentialsConfigurationControllerService': userCredentialsConfigurationControllerServiceMock,
				'UserCredentialsCacheService': userCredentialsCacheServiceMock,
				'AuthenticationService': authenticationServiceMock
			});
		});				
	});				
 
	it("should initialise the view model correctly", function() {
				
		expect(userCredentialsCacheServiceMock.getUsername).toHaveBeenCalled();
		expect(userCredentialsCacheServiceMock.getPassword).toHaveBeenCalled();
         
		expect(vm.onCancel).toBeDefined();
		expect(vm.onSave).toBeDefined();
		expect(vm.onTestLogin).toBeDefined();
		expect(vm.isTestLoginButtonEnabled).toBeDefined();
	});

	it("should delegate isTestLoginButtonEnabled to controller.service", function() {

		vm.username = "username";
		vm.password = "password";
		vm.serverAddress = "server-address";
		vm.isTestLoginButtonEnabled();
		expect(userCredentialsConfigurationControllerServiceMock.isTestLoginButtonEnabled).toHaveBeenCalledWith("username", "password", "server-address");				
	});

	it("should save data when 'Save' button selected", function() {

		vm.onSave();        
		expect(userCredentialsCacheServiceMock.setUsername).toHaveBeenCalled();
		expect(userCredentialsCacheServiceMock.setPassword).toHaveBeenCalled();
 	});

	it("should call $window.history.back when 'Save' button selected", function() {

 		spyOn($window.history, 'back');

		vm.onSave();        
		expect($window.history.back).toHaveBeenCalled();
 	});

	it("should not save data when 'Cancel' button selected", function() {

		vm.onCancel();        
		expect(userCredentialsCacheServiceMock.setUsername).not.toHaveBeenCalled();
		expect(userCredentialsCacheServiceMock.setPassword).not.toHaveBeenCalled();
  	});

	it("should call $window.history.back when 'Cancel' button selected", function() {

 		spyOn($window.history, 'back');

		vm.onCancel();        
		expect($window.history.back).toHaveBeenCalled();
 	});

	it("should display 'success' popup when test login is successful", function() {

		authenticationServiceMock.testAuthentication.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // success
			return deferred.promise;
		});					
 
		vm.onTestLogin();

		expect(ionicLoadingMock.show).toHaveBeenCalled();
		expect(authenticationServiceMock.testAuthentication).toHaveBeenCalled();

		scopeMock.$apply(); // Propagate promise resolution for async testAuthentication.				

		expect(ionicLoadingMock.hide).toHaveBeenCalled();
		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].template).toBe("Success");
 	});

	it("should display 'failure' popup when test login fails", function() {
 
		authenticationServiceMock.testAuthentication.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // failure
			return deferred.promise;
		});					
 
		vm.onTestLogin();

		expect(ionicLoadingMock.show).toHaveBeenCalled();
		expect(authenticationServiceMock.testAuthentication).toHaveBeenCalled();

		scopeMock.$apply(); // Propagate promise resolution for async testAuthentication.				

		expect(ionicLoadingMock.hide).toHaveBeenCalled();
		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].template).toBe("Failure");
 	});

});
