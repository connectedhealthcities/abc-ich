//'use strict';
//
//describe('Controller Tests', function() {
//
//    describe('Patient Management Detail Controller', function() {
//        var $scope, $rootScope;
//        var MockEntity, MockPreviousState, MockPatient, MockBpManagementEntries, MockHospital, MockInr;
//        var createController;
//
//        beforeEach(inject(function($injector) {
//            $rootScope = $injector.get('$rootScope');
//            $scope = $rootScope.$new();
//            MockEntity = jasmine.createSpy('MockEntity');
//            MockPreviousState = jasmine.createSpy('MockPreviousState');
//            MockPatient = jasmine.createSpy('MockPatient');
//            MockBpManagementEntries = jasmine.createSpy('MockBpManagementEntries');
//            MockHospital = jasmine.createSpy('MockHospital');
//            MockInr = jasmine.createSpy('MockInr');
//            
//
//            var locals = {
//                '$scope': $scope,
//                '$rootScope': $rootScope,
//                'entity': MockEntity,
//                'previousState': MockPreviousState,
//                'Patient': MockPatient,
//                'bpManagementEntries': MockBpManagementEntries,
//                'Hospital': MockHospital,
//                'Inr': MockInr
//            };
//            createController = function() {
//                $injector.get('$controller')("PatientDetailController", locals);
//            };
//        }));
//
//
//        describe('Root Scope Listening', function() {
//            it('Unregisters root scope listener upon scope destruction', function() {
//                var eventType = 'strokeApp:patientUpdate';
//
//                createController();
//                expect($rootScope.$$listenerCount[eventType]).toEqual(1);
//
//                $scope.$destroy();
//                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
//            });
//        });
//    });
//
//});
