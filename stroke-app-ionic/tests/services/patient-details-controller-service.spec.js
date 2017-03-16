
describe("PatientDetailsControllerService", function() {

	var PatientDetailsControllerService;

	beforeEach(function() {

		 angular.mock.module('app.general');

		 // Inject the service to test.
		 // The underscores are stripped when angular looks up the matching service.
		 angular.mock.inject(function(_PatientDetailsControllerService_) {
			 PatientDetailsControllerService = _PatientDetailsControllerService_;
		 });

	});

	describe("isNextButtonEnabled", function() {

		it("should return false if doorDate is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled(null, "not-null", "not-null", "not-null", "not-null", "not-null");
			expect(isShow).toBe(false);
		}));

		it("should return false if doorTime is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled("not-null", null, "not-null", "not-null", "not-null", "not-null");
			expect(isShow).toBe(false);
		}));

		it("should return false if onsetDate is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled("not-null", "not-null", null, "not-null", "not-null", "not-null");
			expect(isShow).toBe(false);
		}));

		it("should return false if onsetTime is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled("not-null", "not-null", "not-null", null, "not-null", "not-null");
			expect(isShow).toBe(false);
		}));

		it("should return false if isOnsetLastSeenWell is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled("not-null", "not-null", "not-null", "not-null", null, "not-null");
			expect(isShow).toBe(false);
		}));

		it("should return false if isOnsetBestEstimate is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isNextButtonEnabled("not-null", "not-null", "not-null", "not-null", "not-null", null);
			expect(isShow).toBe(false);
		}));

		it("should return true if none are null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isShowTimeSinceOnsetText("not-null", "not-null", "not-null", "not-null", "not-null", "not-null");
			expect(isShow).toBe(true);
		}));
	});

	describe("isShowTimeSinceOnsetText", function() {

		it("should return false if timeSinceOnsetText is null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isShowTimeSinceOnsetText(null);
			expect(isShow).toBe(false);
		}));

		it("should return true if timeSinceOnsetText is not null", inject(function(PatientDetailsControllerService) {

			var isShow = PatientDetailsControllerService.isShowTimeSinceOnsetText("not-null");
			expect(isShow).toBe(true);
		}));
	});

});
