'use strict';

// This file contains the following tests
//
// Initialisation
// 		it initialises the view model correctly
//
// No patient in progress - User selects 'New patient' button
// 		it should clear caches
// 		it should save data
// 		it should go to state STATE_REGISTER_PATIENT
//
// Patient is in progress - User selects 'New patient' button and Ok to 'confirm new patient' popup
// 		it should clear caches
// 		it should save data
// 		it should go to state STATE_REGISTER_PATIENT
//
// Patient is in progress - User selects 'New patient' button and Cancel to 'confirm new patient' popup
// 		it should not clear caches
// 		it should not save data
// 		it should not change state
//
// User selects 'Resume patient' button
// 		it should resume at the state when the app was closed

describe('PatientStartController - Initialisation', function() {

    var vm;
	var STATE_REGISTER_PATIENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, tabStateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope) {
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			tabStateCacheServiceMock = jasmine.createSpyObj('TabStateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			
			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'TabStateCacheService': tabStateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK
			});
		});				
	});

	it("initialises the view model correctly", function() {
				
		expect(demoModeCacheServiceMock.setIsDemoMode).toHaveBeenCalledWith(false);		
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(vm.onNewPatient).toBeDefined();
		expect(vm.onResumePatient).toBeDefined();
		expect(vm.isShowResumePatient).toBeDefined();
	});

});

describe("PatientStartController - No patient in progress - User selects 'New patient' button", function() {

    var vm;
	var STATE_REGISTER_PATIENT_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, tabStateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope) {
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			tabStateCacheServiceMock = jasmine.createSpyObj('TabStateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			
			patientCacheServiceMock.getUniqueId.and.returnValue(null);

			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'TabStateCacheService': tabStateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK
			});
		});				
	});

	it("should clear caches", function() {
				
		vm.onNewPatient(); // call the click handler

		expect(patientCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(tabStateCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).toHaveBeenCalled();		
	});

	it("should save data", function() {
				
		vm.onNewPatient(); // call the click handler

		expect(patientCacheServiceMock.setAppStartDateTime).toHaveBeenCalled();		
	});

	it("should go to state 'register-patient'", function() {
				
		vm.onNewPatient(); // call the click handler

		expect(stateMock.go).toHaveBeenCalledWith(STATE_REGISTER_PATIENT_MOCK);		
	});

});


describe("PatientStartController - Patient is in progress - User selects 'New patient' button and Ok to 'confirm new patient' popup", function() {

    var vm;
	var STATE_REGISTER_PATIENT_MOCK;
	var $q;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, tabStateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			tabStateCacheServiceMock = jasmine.createSpyObj('TabStateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			
			patientCacheServiceMock.getUniqueId.and.returnValue("not-null");

			ionicPopupMock.confirm.and.callFake(function() {
				var deferred = $q.defer();
				deferred.resolve(true); // User selects Ok
				return deferred.promise;
			});					

			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'TabStateCacheService': tabStateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK
			});
		});				
	});

	it("should clear caches", function() {

		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(tabStateCacheServiceMock.clearAll).toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).toHaveBeenCalled();		
	});

	it("should save data", function() {
				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.setAppStartDateTime).toHaveBeenCalled();		
	});

	it("should go to state 'register-patient'", function() {
				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(stateMock.go).toHaveBeenCalledWith(STATE_REGISTER_PATIENT_MOCK);		
	});

});

describe("PatientStartController - Patient is in progress - User selects 'New patient' button and Cancel to 'confirm new patient' popup", function() {

    var vm;
	var STATE_REGISTER_PATIENT_MOCK;
	var $q;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, tabStateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			tabStateCacheServiceMock = jasmine.createSpyObj('TabStateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			
			patientCacheServiceMock.getUniqueId.and.returnValue("not-null");

			ionicPopupMock.confirm.and.callFake(function() {
				var deferred = $q.defer();
				deferred.resolve(false); // User selects Cancel
				return deferred.promise;
			});					

			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'TabStateCacheService': tabStateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK
			});
		});				
	});

	it("should not clear caches", function() {

		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.clearAll).not.toHaveBeenCalled();		
		expect(tabStateCacheServiceMock.clearAll).not.toHaveBeenCalled();		
		expect(bpStateCacheServiceMock.clearAll).not.toHaveBeenCalled();		
	});

	it("should not save data", function() {
				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(patientCacheServiceMock.setAppStartDateTime).not.toHaveBeenCalled();		
	});

	it("should not change state", function() {
				
		vm.onNewPatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(stateMock.go).not.toHaveBeenCalled();		
	});

});

describe("PatientStartController - User selects 'Resume patient' button", function() {

    var vm;
	var STATE_REGISTER_PATIENT_MOCK;
	var $q;
    var scopeMock, stateMock, ionicPopupMock, patientStartControllerServiceMock, patientCacheServiceMock, tabStateCacheServiceMock, bpStateCacheServiceMock, demoModeCacheServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			scopeMock = $rootScope.$new();
			STATE_REGISTER_PATIENT_MOCK = "test";
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			patientStartControllerServiceMock = jasmine.createSpyObj('PatientStartControllerService spy', ['isShowResumePatient']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['clearAll', 'setAppStartDateTime', 'getUniqueId']);
			tabStateCacheServiceMock = jasmine.createSpyObj('TabStateCacheService spy', ['clearAll', 'goCurrentState']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['setIsDemoMode']);
			
			vm = $controller('PatientStartController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientStartControllerService': patientStartControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'TabStateCacheService': tabStateCacheServiceMock, 
				'BpStateCacheService': bpStateCacheServiceMock,
				'DemoModeCacheService': demoModeCacheServiceMock,
				'STATE_REGISTER_PATIENT': STATE_REGISTER_PATIENT_MOCK
			});
		});				
	});

	it("should resume at the state when the app was closed", function() {
				
		vm.onResumePatient(); // call the click handler

		scopeMock.$apply(); // Propagate promise resolution to 'then' functions using $apply().				

		expect(tabStateCacheServiceMock.goCurrentState).toHaveBeenCalled();		
	});

});

