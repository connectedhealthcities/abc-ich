(function() {
    'use strict';

    // Make lodash available via dependency injection
    angular
        .module('strokeApp')
        .factory('_', LodashFactory);

    LodashFactory.$inject = ['$window'];

    function LodashFactory ($window) {
    	return $window._;
    }
})();
