'use strict';

describe('PatientEndController', function() {

    var vm;
	var $q;
	var STATE_PATIENT_END_MOCK, STATE_PATIENT_START_MOCK;
    var scopeMock, stateMock, ionicPopupMock, patientEndControllerServiceMock; 
    var patientCacheServiceMock, stateCacheServiceMock, demoModeCacheServiceMock, bpStateCacheServiceMock, patientHttpServiceMock, printServiceMock;

    beforeEach(function() {

        module('app.general');

		angular.mock.inject(function($controller, $rootScope, _$q_) {
			$q = _$q_;
			STATE_PATIENT_END_MOCK = "state-patient-end-mock";
            STATE_PATIENT_START_MOCK = "state-patient-start-mock";
			scopeMock = $rootScope.$new();
			stateMock = jasmine.createSpyObj('$state spy', ['go']);
			ionicPopupMock = jasmine.createSpyObj('$ionicPopup spy', ['confirm', 'alert']);
			patientEndControllerServiceMock = jasmine.createSpyObj('PatientEndControllerService spy', ['getPatient']);
			patientCacheServiceMock = jasmine.createSpyObj('PatientCacheService spy', ['getUniqueId', 'clearAll']);
			stateCacheServiceMock = jasmine.createSpyObj('StateCacheService spy', ['setCurrentState', 'clearAll']);
 			demoModeCacheServiceMock = jasmine.createSpyObj('DemoModeCacheService spy', ['getIsDemoMode']);
			bpStateCacheServiceMock = jasmine.createSpyObj('BpStateCacheService spy', ['clearAll']);
            patientHttpServiceMock = jasmine.createSpyObj('PatientHttpService spy', ['updatePatient']);
            printServiceMock = jasmine.createSpyObj('PrintService spy', ['printPatient']);
			
			vm = $controller('PatientEndController', {
				'$scope': scopeMock,
				'$state': stateMock,
				'$ionicPopup': ionicPopupMock,
				'PatientEndControllerService': patientEndControllerServiceMock,
				'PatientCacheService': patientCacheServiceMock,
				'StateCacheService': stateCacheServiceMock, 
				'DemoModeCacheService': demoModeCacheServiceMock,
                'BpStateCacheService': bpStateCacheServiceMock,
                'PatientHttpService': patientHttpServiceMock,
                'PrintService': printServiceMock,
				'STATE_PATIENT_END': STATE_PATIENT_END_MOCK,
				'STATE_PATIENT_START': STATE_PATIENT_START_MOCK                
			});
		});				
	});				

	it("should initialise the view model correctly", function() {
				
		expect(stateCacheServiceMock.setCurrentState).toHaveBeenCalledWith(STATE_PATIENT_END_MOCK);
		expect(patientCacheServiceMock.getUniqueId).toHaveBeenCalled();
		expect(demoModeCacheServiceMock.getIsDemoMode).toHaveBeenCalled();		        
		expect(vm.onFinish).toBeDefined();
	});

	it("should reset data when user selects 'Finish' in Demo mode", function() {
 
        vm.isDemoMode = true;
		vm.onFinish();
		expect(patientCacheServiceMock.clearAll).toHaveBeenCalled();				
		expect(stateCacheServiceMock.clearAll).toHaveBeenCalled();				
		expect(bpStateCacheServiceMock.clearAll).toHaveBeenCalled();				
	});

	it("should go to state STATE_PATIENT_START when user selects 'Finish' in Demo mode", function() {
 
        vm.isDemoMode = true;
		vm.onFinish();
		expect(stateMock.go).toHaveBeenCalledWith(STATE_PATIENT_START_MOCK);				
	});

	it("should send data to server when user selects 'Finish'", function() { 
        patientHttpServiceMock.updatePatient.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // Success
			return deferred.promise;
		});					

        vm.isDemoMode = false;
		vm.onFinish();
		expect(patientEndControllerServiceMock.getPatient).toHaveBeenCalled();				
		expect(patientHttpServiceMock.updatePatient).toHaveBeenCalled();
	});

	it("should display 'upload success' and 'print' popups when data upload succeeds", function() { 
        patientHttpServiceMock.updatePatient.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // Success
			return deferred.promise;
		});					

       ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User dismisses upload success popup 
			return deferred.promise;
		});					

       ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok on print popup
			return deferred.promise;
		});					

        vm.isDemoMode = false;
		vm.onFinish();
        scopeMock.$apply(); // Propagate promise resolution for http request.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient save succeeded");

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Print");
	});

	it("should display 'upload failure' popup when data upload fails", function() { 
        patientHttpServiceMock.updatePatient.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // Failure
			return deferred.promise;
		});					

       ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User dismisses upload failure popup 
			return deferred.promise;
		});					

        vm.isDemoMode = false;
		vm.onFinish();
        scopeMock.$apply(); // Propagate promise resolution for http request.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient save failed");
        expect(ionicPopupMock.confirm).not.toHaveBeenCalled();		
	});

	it("should print patient when user selects 'Ok' on print popup", function() { 
        patientHttpServiceMock.updatePatient.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // Success
			return deferred.promise;
		});					

       ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User dismisses upload success popup 
			return deferred.promise;
		});					

       ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // User selects Ok on print popup
			return deferred.promise;
		});					

        vm.isDemoMode = false;
		vm.onFinish();
        scopeMock.$apply(); // Propagate promise resolution for http request.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient save succeeded");

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Print");

        expect(printServiceMock.printPatient).toHaveBeenCalled();
 	});

	it("should not print patient when user selects 'Cancel' on print popup", function() { 
        patientHttpServiceMock.updatePatient.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(true); // Success
			return deferred.promise;
		});					

       ionicPopupMock.alert.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(); // User dismisses upload success popup 
			return deferred.promise;
		});					

       ionicPopupMock.confirm.and.callFake(function() {
			var deferred = $q.defer();
			deferred.resolve(false); // User selects Cancel on print popup
			return deferred.promise;
		});					

        vm.isDemoMode = false;
		vm.onFinish();
        scopeMock.$apply(); // Propagate promise resolution for http request.				

		expect(ionicPopupMock.alert).toHaveBeenCalled();		
		expect(ionicPopupMock.alert.calls.mostRecent().args[0].title).toBe("Patient save succeeded");

		expect(ionicPopupMock.confirm).toHaveBeenCalled();		
		expect(ionicPopupMock.confirm.calls.mostRecent().args[0].title).toBe("Print");

        expect(printServiceMock.printPatient).not.toHaveBeenCalled();
 	});    

});
