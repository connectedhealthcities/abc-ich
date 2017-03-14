
describe("PatientStartControllerService", function() {

	var PatientStartControllerService;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_PatientStartControllerService_) {
			 PatientStartControllerService = _PatientStartControllerService_;
		 });

	});

	describe("isShowResumePatient", function() {

		it("should return false if patientId is null", inject(function(PatientStartControllerService) {

			var isShow = PatientStartControllerService.isShowResumePatient(null);
			expect(isShow).toBe(false);
		}));

		it("should return true if patientId is not null", inject(function(PatientStartControllerService) {

			var isShow = PatientStartControllerService.isShowResumePatient("");
			expect(isShow).toBe(true);
		}));
	});

});
