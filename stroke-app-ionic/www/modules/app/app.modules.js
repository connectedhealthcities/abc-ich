'use strict';

angular.module('app.general', []);

angular.module('app.protocolA', []);

angular.module('app.protocolB', []);

angular.module('app.protocolC', []);

angular.module('utils', []);

angular.module('app', ['ionic', 'ionicUIRouter', 'utils', 'app.general', 'app.protocolA', 'app.protocolB', 'app.protocolC']);