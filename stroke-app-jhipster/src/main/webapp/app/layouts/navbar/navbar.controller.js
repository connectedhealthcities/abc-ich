(function() {
    'use strict';

    angular
        .module('strokeApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$state', 'Auth', 'Principal', 'ProfileService', 'LoginService', '$http'];

    function NavbarController ($state, Auth, Principal, ProfileService, LoginService, $http) {
        var vm = this;

        vm.isNavbarCollapsed = true;
        vm.isAuthenticated = Principal.isAuthenticated;

        ProfileService.getProfileInfo().then(function(response) {
            vm.inProduction = response.inProduction;
            vm.swaggerEnabled = response.swaggerEnabled;
        });

        vm.login = login;
        vm.logout = logout;
        vm.toggleNavbar = toggleNavbar;
        vm.collapseNavbar = collapseNavbar;
        vm.$state = $state;
        vm.addTestData = addTestData;

        function login() {
            collapseNavbar();
            LoginService.open();
        }

        function logout() {
            collapseNavbar();
            Auth.logout();
            $state.go('home');
        }

        function toggleNavbar() {
            vm.isNavbarCollapsed = !vm.isNavbarCollapsed;
        }

        function collapseNavbar() {
            vm.isNavbarCollapsed = true;
        }
        
    	//cjd ?? The server restricts this to ROLE_ADMIN
    	function addTestData() {
    		vm.collapseNavbar();
    		// This should be replaced with an nicer angularjs progress dialog.
    		var r=confirm("Warning! You are about to add test data to this database.\n"
    				+"Are you sure it is OK to proceed?");
    		if (r==true){
    		      $http.post('api/addtestdata').success(function() {	
    		    	  alert("test data added.");
    		      });
    		}
    	};

    }
})();
