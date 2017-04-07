'use strict';

describe('PatientStartController', function() {

    var vm;
	var $q;
	var STATE_REGISTER_PATIENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, stateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock, userCredentialsCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient', 'isAppConfigured']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			userCredentialsCacheServiceMock = jasmine.createSpyObj('UserCredentialsCacheService spy', ['getUsername', 'setUsername', 'getPassword', 'setPassword', 'isUserCredentialsSet']);
			
			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK,
				'UserCredentialsCacheService': userCredentialsCacheServiceMock
			});
		});				
	});

	it("should initialise the view model correctly", function() {
				
		expect(demoModeCacheServiceMock.setIsDemoMode).toHaveBeenCalledWith(false);		
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();		
		expect(userCredentialsCacheServiceMock.getUsername).toHaveBeenCalled();
		expect(userCredentialsCacheServiceMock.getPassword).toHaveBeenCalled();
		expect(vm.onNewPatient).toBeDefined();
		expect(vm.onResumePatient).toBeDefined();
		expect(vm.isShowResumePatient).toBeDefined();
	});

	it("should delegate isShowResumePatient to controller.service", function() {

		vm.patientId = "patient-id";
		vm.isShowResumePatient();
		expect(patientStartControllerServiceMock.isShowResumePatient).toHaveBeenCalledWith("patient-id");				
	});

	it("should delegate isAppConfigured to controller.service", function() {

		vm.username = "username";
		vm.password = "password";
		vm.isAppConfigured();
		expect(patientStartControllerServiceMock.isAppConfigured).toHaveBeenCalledWith("username", "password");				
	});

	it("should reset data when user selects 'New patient' button and no patient is in progress", function() {

		vm.patientId = null;				
		vm.onNewPatient(); // call the click handler

		expect(patientCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(stateCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).toHaveBeenCalled();		
	});

	it("should save data when user selects 'New patient' button and no patient is in progress", function() {
				
		vm.patientId = null;				
		vm.onNewPatient(); // call the click handler

		expect(patientCacheServiceMock.setAppStartDateTime).toHaveBeenCalled();		
	});

	it("should go to state STATE_REGISTER_PATIENT when user selects 'New patient' button and no patient is in progress", function() {
				
		vm.patientId = null;				
		vm.onNewPatient(); // call the click handler

		expect(stateMock.go).toHaveBeenCalledWith(STATE_REGISTER_PATIENT_MOCK);		
	});

	it("should reset data when user selects Ok to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					

		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(stateCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).toHaveBeenCalled();		
	});

	it("should save data when user selects Ok to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					
				
		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.setAppStartDateTime).toHaveBeenCalled();		
	});

	it("should go to state STATE_REGISTER_PATIENT when user selects Ok to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok
			return deferred.promise;
		});					
				
		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_REGISTER_PATIENT_MOCK);		
	});

	it("should not reset data when user selects Cancel to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects cancel
			return deferred.promise;
		});					

		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.clearAll).not.toHaveBeenCalled();		
		expect(stateCacheServiceMock.clearAll).not.toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).not.toHaveBeenCalled();		
	});

	it("should not save data when user selects Cancel to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects cancel
			return deferred.promise;
		});					
				
		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.setAppStartDateTime).not.toHaveBeenCalled();		
	});

	it("should not change state when user selects Cancel to 'confirm new patient' popup", function() {
		ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects cancel
			return deferred.promise;
		});					
				
		vm.patientId = "not-null";				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(stateMock.go).not.toHaveBeenCalled();		
	});

	it("should resume at the state when the app was closed when user selects 'resume patient'", function() {
				
		vm.onResumePatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(stateCacheServiceMock.goCurrentState).toHaveBeenCalled();		
	});

});
