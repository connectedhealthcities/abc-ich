'use strict';

describe('Controller Tests', function() {

    describe('Patient Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockPatient, MockInr, MockBpManagementEntry, MockHospital;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockPatient = jasmine.createSpy('MockPatient');
            MockInr = jasmine.createSpy('MockInr');
            MockBpManagementEntry = jasmine.createSpy('MockBpManagementEntry');
            MockHospital = jasmine.createSpy('MockHospital');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Patient': MockPatient,
                'Inr': MockInr,
                'BpManagementEntry': MockBpManagementEntry,
                'Hospital': MockHospital
            };
            createController = function() {
                $injector.get('$controller')("PatientDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'strokeApp:patientUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
