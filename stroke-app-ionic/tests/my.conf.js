// Karma configuration
// Generated on Thu Feb 02 2017 11:05:17 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      '../www/lib/ionic/js/angular/angular.js',
      '../www/lib/ionic/js/angular-ui/angular-ui-router.js',

      '../www/modules/app/app.modules.js',

      '../www/modules/general/about/about.controller.js',
      '../www/modules/general/gcs-entry/gcs-entry.controller.js',
      '../www/modules/general/gcs-entry/gcs-entry-controller.service.js',
      '../www/modules/general/patient-details/patient-details.controller.js',
      '../www/modules/general/patient-details/patient-details-controller.service.js',
      '../www/modules/general/patient-end/patient-end.controller.js',
      '../www/modules/general/patient-end/patient-end-controller.service.js',
      '../www/modules/general/patient-start/patient-start.controller.js',
      '../www/modules/general/patient-start/patient-start-controller.service.js',
      '../www/modules/general/register-patient/register-patient.controller.js',
      '../www/modules/general/register-patient/register-patient-controller.service.js',
      '../www/modules/general/user-credentials-configuration/user-credentials-configuration.controller.js',
      '../www/modules/general/user-credentials-configuration/user-credentials-configuration-controller.service.js',

      '../www/modules/menu/menu.controller.js',

      '../www/modules/protocol-a/administer-beriplex/administer-beriplex.controller.js',
      '../www/modules/protocol-a/administer-beriplex/administer-beriplex-controller.service.js',
      '../www/modules/protocol-a/administer-topup-dose/administer-topup-dose.controller.js',
      '../www/modules/protocol-a/administer-topup-dose/administer-topup-dose-controller.service.js',
      '../www/modules/protocol-a/anticoagulant-identification/anticoagulant-identification.controller.js',
      '../www/modules/protocol-a/anticoagulant-identification/anticoagulant-identification-controller.service.js',
      '../www/modules/protocol-a/calculate-beriplex-dose/calculate-beriplex-dose.controller.js',
      '../www/modules/protocol-a/calculate-beriplex-dose/calculate-beriplex-dose-controller.service.js',
      '../www/modules/protocol-a/confirm-beriplex-dose/confirm-beriplex-dose.controller.js',
      '../www/modules/protocol-a/confirm-beriplex-dose/confirm-beriplex-dose-controller.service.js',
      '../www/modules/protocol-a/reversal-agent-details/reversal-agent-details.controller.js',
      '../www/modules/protocol-a/reversal-agent-details/reversal-agent-details-controller.service.js',
 
      '../www/modules/protocol-b/bp-management/bp-management.controller.js',
      '../www/modules/protocol-b/bp-management/bp-management-controller.service.js',
      '../www/modules/protocol-b/critical-care-referral/critical-care-referral.controller.js',
      '../www/modules/protocol-b/critical-care-referral/critical-care-referral-controller.service.js',

      '../www/modules/protocol-c/mrs-entry/mrs-entry.controller.js',
      '../www/modules/protocol-c/mrs-entry/mrs-entry-controller.service.js',
      '../www/modules/protocol-c/neurosurgery-referral-criteria/neurosurgery-referral-criteria.controller.js',
      '../www/modules/protocol-c/neurosurgery-referral-criteria/neurosurgery-referral-criteria-controller.service.js',
      '../www/modules/protocol-c/neurosurgery-referral-summary/neurosurgery-referral-summary.controller.js',
      '../www/modules/protocol-c/neurosurgery-referral-summary/neurosurgery-referral-summary-controller.service.js',

     '../www/modules/tabs/tabs.controller.js',

     '../www/modules/utils/authentication.service.js',
     '../www/modules/utils/bp-state-cache.service.js',
     '../www/modules/utils/bp-notification.service.js',
     '../www/modules/utils/date-time.service.js',
     '../www/modules/utils/demo-mode-cache.service.js',
     '../www/modules/utils/enum.service.js',
     '../www/modules/utils/hospital-http.service.js',
     '../www/modules/utils/local-storage.service.js',
     '../www/modules/utils/patient-cache.service.js',
     '../www/modules/utils/patient-http.service.js',
     '../www/modules/utils/pcc-dose-table.service.js',
     '../www/modules/utils/print.service.js',
     '../www/modules/utils/server-url.service.js',
     '../www/modules/utils/state-cache.service.js',
     '../www/modules/utils/user-credentials-cache.service.js',
     
      '../www/lib/angular-mocks/angular-mocks.js',

      // load all tests
      '**/*spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '../www/modules/**/!(patient-end-controller.service.js)': ['coverage']

    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'html'],

    htmlReporter: {
      outputFile: 'test-report/unit-tests.html',
            
      // Optional 
      pageTitle: 'ABC-ICH Unit Tests',
      groupSuites: true,
      useCompactStyle: false,
      useLegacyStyle: false
    },

    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
