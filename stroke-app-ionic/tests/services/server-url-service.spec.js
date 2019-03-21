describe("ServerUrlService", function() {

	var userCredentialsCacheServiceMock;
	var service;

	beforeEach(function() {

		angular.mock.module('utils');

		// Inject the service to test.
		// The underscores are stripped when angular looks up the matching service.
		angular.mock.inject(function(_ServerUrlService_) {
			service = _ServerUrlService_;
		});
	});

	describe("getUrlPrefix", function() {

		it("should return the server url with the app name included when the scheme is set to 'https'", function() {

			service.setAppName("abc-ich");
			service.setScheme("https");
			var serverAddress = "localhost:8080";
			var expectedUrl = "https://localhost:8080/abc-ich";

			var urlPrefix = service.getUrlPrefix(serverAddress);
			expect(urlPrefix).toEqual(expectedUrl);
		});

		it("should return the server url with the app name excluded when the scheme is set to 'http'", function() {

			service.setAppName("abc-ich");
			service.setScheme("http");
			var serverAddress = "localhost:8080";
			var expectedUrl = "http://localhost:8080";

			var urlPrefix = service.getUrlPrefix(serverAddress);
			expect(urlPrefix).toEqual(expectedUrl);
		});

	});

});