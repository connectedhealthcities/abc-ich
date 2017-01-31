angular.module('app.routes', ['ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('registerPatient', {
    url: '/s1',
    templateUrl: 'templates/registerPatient.html',
    controller: 'registerPatientCtrl'
  })

  .state('registerPatientPart2', {
    url: '/s2',
    templateUrl: 'templates/registerPatientPart2.html',
    controller: 'registerPatientPart2Ctrl'
  })

  .state('appConfig', {
    url: '/config',
    templateUrl: 'templates/appConfig.html',
    controller: 'appConfigCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.antiCoagulant'
      2) Using $state.go programatically:
        $state.go('tabsController.antiCoagulant');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s6
      /page1/tab2/s6
      /page1/tab3/s6
  */
  .state('tabsController.antiCoagulant', {
    url: '/s6',
	params: {
		antiCoagSelection: "-1"		
},
    views: {
      'tab1': {
        templateUrl: 'templates/antiCoagulant.html',
        controller: 'antiCoagulantCtrl'
      },
      'tab2': {
        templateUrl: 'templates/antiCoagulant.html',
        controller: 'antiCoagulantCtrl'
      },
      'tab3': {
        templateUrl: 'templates/antiCoagulant.html',
        controller: 'antiCoagulantCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.dOACsIdentification'
      2) Using $state.go programatically:
        $state.go('tabsController.dOACsIdentification');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p3
      /page1/tab2/p3
      /page1/tab3/p3
  */
  .state('tabsController.dOACsIdentification', {
    url: '/p3',
    views: {
      'tab1': {
        templateUrl: 'templates/dOACsIdentification.html',
        controller: 'dOACsIdentificationCtrl'
      },
      'tab2': {
        templateUrl: 'templates/dOACsIdentification.html',
        controller: 'dOACsIdentificationCtrl'
      },
      'tab3': {
        templateUrl: 'templates/dOACsIdentification.html',
        controller: 'dOACsIdentificationCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.contactHaematology'
      2) Using $state.go programatically:
        $state.go('tabsController.contactHaematology');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p4
      /page1/tab2/p4
      /page1/tab3/p4
  */
  .state('tabsController.contactHaematology', {
    url: '/p4',
    views: {
      'tab1': {
        templateUrl: 'templates/contactHaematology.html',
        controller: 'contactHaematologyCtrl'
      },
      'tab2': {
        templateUrl: 'templates/contactHaematology.html',
        controller: 'contactHaematologyCtrl'
      },
      'tab3': {
        templateUrl: 'templates/contactHaematology.html',
        controller: 'contactHaematologyCtrl'
      }
    }
  })

  .state('contactHaematology2', {
    url: '/page15',
    templateUrl: 'templates/contactHaematology2.html',
    controller: 'contactHaematology2Ctrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.iNRDosing'
      2) Using $state.go programatically:
        $state.go('tabsController.iNRDosing');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s9
      /page1/tab2/s9
      /page1/tab3/s9
  */
  .state('tabsController.iNRDosing', {
    url: '/s9',
	params: {
		dose: ""		
},
    views: {
      'tab1': {
        templateUrl: 'templates/iNRDosing.html',
        controller: 'iNRDosingCtrl'
      },
      'tab2': {
        templateUrl: 'templates/iNRDosing.html',
        controller: 'iNRDosingCtrl'
      },
      'tab3': {
        templateUrl: 'templates/iNRDosing.html',
        controller: 'iNRDosingCtrl'
      }
    }
  })

  .state('repeatINR', {
    url: '/page14',
	params: {
		dose: ""		
},
    templateUrl: 'templates/repeatINR.html',
    controller: 'repeatINRCtrl'
  })

  .state('confirmDose', {
    url: '/s8',
    templateUrl: 'templates/confirmDose.html',
    controller: 'confirmDoseCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.prescribeAndAdminister'
      2) Using $state.go programatically:
        $state.go('tabsController.prescribeAndAdminister');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s11
      /page1/tab2/s11
      /page1/tab3/s11
  */
  .state('tabsController.prescribeAndAdminister', {
    url: '/s11',
    views: {
      'tab1': {
        templateUrl: 'templates/prescribeAndAdminister.html',
        controller: 'prescribeAndAdministerCtrl'
      },
      'tab2': {
        templateUrl: 'templates/prescribeAndAdminister.html',
        controller: 'prescribeAndAdministerCtrl'
      },
      'tab3': {
        templateUrl: 'templates/prescribeAndAdminister.html',
        controller: 'prescribeAndAdministerCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.antiCoagulentUnknown'
      2) Using $state.go programatically:
        $state.go('tabsController.antiCoagulentUnknown');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p5
      /page1/tab2/p5
      /page1/tab3/p5
  */
  .state('tabsController.antiCoagulentUnknown', {
    url: '/p5',
    views: {
      'tab1': {
        templateUrl: 'templates/antiCoagulentUnknown.html',
        controller: 'antiCoagulentUnknownCtrl'
      },
      'tab2': {
        templateUrl: 'templates/antiCoagulentUnknown.html',
        controller: 'antiCoagulentUnknownCtrl'
      },
      'tab3': {
        templateUrl: 'templates/antiCoagulentUnknown.html',
        controller: 'antiCoagulentUnknownCtrl'
      }
    }
  })

  .state('template', {
    url: '/page17',
    templateUrl: 'templates/template.html',
    controller: 'templateCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWSCREENS7'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWSCREENS7');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s7 
      /page1/tab2/s7 
      /page1/tab3/s7 
  */
  .state('tabsController.nEWSCREENS7', {
    url: '/s7 ',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWSCREENS7.html',
        controller: 'nEWSCREENS7Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWSCREENS7.html',
        controller: 'nEWSCREENS7Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWSCREENS7.html',
        controller: 'nEWSCREENS7Ctrl'
      }
    }
  })

  .state('nEWPOPUPP1', {
    url: '/p1',
    templateUrl: 'templates/nEWPOPUPP1.html',
    controller: 'nEWPOPUPP1Ctrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWPOPUPP7'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWPOPUPP7');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p7
      /page1/tab2/p7
      /page1/tab3/p7
  */
  .state('tabsController.nEWPOPUPP7', {
    url: '/p7',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWPOPUPP7.html',
        controller: 'nEWPOPUPP7Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWPOPUPP7.html',
        controller: 'nEWPOPUPP7Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWPOPUPP7.html',
        controller: 'nEWPOPUPP7Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWPOPUPP8'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWPOPUPP8');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p8
      /page1/tab2/p8
      /page1/tab3/p8
  */
  .state('tabsController.nEWPOPUPP8', {
    url: '/p8',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWPOPUPP8.html',
        controller: 'nEWPOPUPP8Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWPOPUPP8.html',
        controller: 'nEWPOPUPP8Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWPOPUPP8.html',
        controller: 'nEWPOPUPP8Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWPOPUPP10'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWPOPUPP10');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p10
      /page1/tab2/p10
      /page1/tab3/p10
  */
  .state('tabsController.nEWPOPUPP10', {
    url: '/p10',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWPOPUPP10.html',
        controller: 'nEWPOPUPP10Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWPOPUPP10.html',
        controller: 'nEWPOPUPP10Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWPOPUPP10.html',
        controller: 'nEWPOPUPP10Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWPOPUPP11'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWPOPUPP11');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p11
      /page1/tab2/p11
      /page1/tab3/p11
  */
  .state('tabsController.nEWPOPUPP11', {
    url: '/p11',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWPOPUPP11.html',
        controller: 'nEWPOPUPP11Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWPOPUPP11.html',
        controller: 'nEWPOPUPP11Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWPOPUPP11.html',
        controller: 'nEWPOPUPP11Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.nEWPOPUPP13'
      2) Using $state.go programatically:
        $state.go('tabsController.nEWPOPUPP13');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p13
      /page1/tab2/p13
      /page1/tab3/p13
  */
  .state('tabsController.nEWPOPUPP13', {
    url: '/p13',
    views: {
      'tab1': {
        templateUrl: 'templates/nEWPOPUPP13.html',
        controller: 'nEWPOPUPP13Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/nEWPOPUPP13.html',
        controller: 'nEWPOPUPP13Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/nEWPOPUPP13.html',
        controller: 'nEWPOPUPP13Ctrl'
      }
    }
  })

  .state('nEWPOPUPP18', {
    url: '/p18',
    templateUrl: 'templates/nEWPOPUPP18.html',
    controller: 'nEWPOPUPP18Ctrl'
  })

  .state('nEWPOPUPP19', {
    url: '/p19',
    templateUrl: 'templates/nEWPOPUPP19.html',
    controller: 'nEWPOPUPP19Ctrl'
  })

  .state('nEWPOPUPP20', {
    url: '/p20',
    templateUrl: 'templates/nEWPOPUPP20.html',
    controller: 'nEWPOPUPP20Ctrl'
  })

  .state('nEWSCREENS14', {
    url: '/s14',
    templateUrl: 'templates/nEWSCREENS14.html',
    controller: 'nEWSCREENS14Ctrl'
  })

  .state('nEWPOPUPP16', {
    url: '/p16',
    templateUrl: 'templates/nEWPOPUPP16.html',
    controller: 'nEWPOPUPP16Ctrl'
  })

  .state('glasgowComaScore', {
    url: '/s3',
    templateUrl: 'templates/glasgowComaScore.html',
    controller: 'glasgowComaScoreCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.acuteBloodPressureManagement'
      2) Using $state.go programatically:
        $state.go('tabsController.acuteBloodPressureManagement');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s10
      /page1/tab2/s10
      /page1/tab3/s10
  */
  .state('tabsController.acuteBloodPressureManagement', {
    url: '/s10',
    views: {
      'tab1': {
        templateUrl: 'templates/acuteBloodPressureManagement.html',
        controller: 'acuteBloodPressureManagementCtrl'
      },
      'tab2': {
        templateUrl: 'templates/acuteBloodPressureManagement.html',
        controller: 'acuteBloodPressureManagementCtrl'
      },
      'tab3': {
        templateUrl: 'templates/acuteBloodPressureManagement.html',
        controller: 'acuteBloodPressureManagementCtrl'
      }
    }
  })

  .state('howToDrawUpBeriplex', {
    url: '/p6',
    templateUrl: 'templates/howToDrawUpBeriplex.html',
    controller: 'howToDrawUpBeriplexCtrl'
  })

  .state('bloodPressureControlProtocol', {
    url: '/p10',
    templateUrl: 'templates/bloodPressureControlProtocol.html',
    controller: 'bloodPressureControlProtocolCtrl'
  })

  .state('bloodPressureControlProtocol2', {
    url: '/p11',
    templateUrl: 'templates/bloodPressureControlProtocol2.html',
    controller: 'bloodPressureControlProtocol2Ctrl'
  })

  .state('referToCriticalCare', {
    url: '/s4',
    templateUrl: 'templates/referToCriticalCare.html',
    controller: 'referToCriticalCareCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.patientReferal'
      2) Using $state.go programatically:
        $state.go('tabsController.patientReferal');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s13
      /page1/tab2/s13
      /page1/tab3/s13
  */
  .state('tabsController.patientReferal', {
    url: '/s13',
    views: {
      'tab1': {
        templateUrl: 'templates/patientReferal.html',
        controller: 'patientReferalCtrl'
      },
      'tab2': {
        templateUrl: 'templates/patientReferal.html',
        controller: 'patientReferalCtrl'
      },
      'tab3': {
        templateUrl: 'templates/patientReferal.html',
        controller: 'patientReferalCtrl'
      }
    }
  })

  .state('maintainence', {
    url: '/page24',
    templateUrl: 'templates/maintainence.html',
    controller: 'maintainenceCtrl'
  })

  .state('maintanance', {
    url: '/page19',
    templateUrl: 'templates/maintanance.html',
    controller: 'maintananceCtrl'
  })

  .state('protocolSelector', {
    url: '/page21',
    templateUrl: 'templates/protocolSelector.html',
    controller: 'protocolSelectorCtrl'
  })

  .state('targetAchieved', {
    url: '/p12',
    templateUrl: 'templates/targetAchieved.html',
    controller: 'targetAchievedCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.repeatBloodPressure'
      2) Using $state.go programatically:
        $state.go('tabsController.repeatBloodPressure');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p9
      /page1/tab2/p9
      /page1/tab3/p9
  */
  .state('tabsController.repeatBloodPressure', {
    url: '/p9',
    views: {
      'tab1': {
        templateUrl: 'templates/repeatBloodPressure.html',
        controller: 'repeatBloodPressureCtrl'
      },
      'tab2': {
        templateUrl: 'templates/repeatBloodPressure.html',
        controller: 'repeatBloodPressureCtrl'
      },
      'tab3': {
        templateUrl: 'templates/repeatBloodPressure.html',
        controller: 'repeatBloodPressureCtrl'
      }
    }
  })

  .state('stabiliseThePatient', {
    url: '/p2',
    templateUrl: 'templates/stabiliseThePatient.html',
    controller: 'stabiliseThePatientCtrl'
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.premorbidMRS'
      2) Using $state.go programatically:
        $state.go('tabsController.premorbidMRS');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s5
      /page1/tab2/s5
      /page1/tab3/s5
  */
  .state('tabsController.premorbidMRS', {
    url: '/s5',
    views: {
      'tab1': {
        templateUrl: 'templates/premorbidMRS.html',
        controller: 'premorbidMRSCtrl'
      },
      'tab2': {
        templateUrl: 'templates/premorbidMRS.html',
        controller: 'premorbidMRSCtrl'
      },
      'tab3': {
        templateUrl: 'templates/premorbidMRS.html',
        controller: 'premorbidMRSCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.referralToNeurosurgery'
      2) Using $state.go programatically:
        $state.go('tabsController.referralToNeurosurgery');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s12
      /page1/tab2/s12
      /page1/tab3/s12
  */
  .state('tabsController.referralToNeurosurgery', {
    url: '/s12',
    views: {
      'tab1': {
        templateUrl: 'templates/referralToNeurosurgery.html',
        controller: 'referralToNeurosurgeryCtrl'
      },
      'tab2': {
        templateUrl: 'templates/referralToNeurosurgery.html',
        controller: 'referralToNeurosurgeryCtrl'
      },
      'tab3': {
        templateUrl: 'templates/referralToNeurosurgery.html',
        controller: 'referralToNeurosurgeryCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.refer'
      2) Using $state.go programatically:
        $state.go('tabsController.refer');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p14
      /page1/tab2/p14
      /page1/tab3/p14
  */
  .state('tabsController.refer', {
    url: '/p14',
    views: {
      'tab1': {
        templateUrl: 'templates/refer.html',
        controller: 'referCtrl'
      },
      'tab2': {
        templateUrl: 'templates/refer.html',
        controller: 'referCtrl'
      },
      'tab3': {
        templateUrl: 'templates/refer.html',
        controller: 'referCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.refer2'
      2) Using $state.go programatically:
        $state.go('tabsController.refer2');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/p15
      /page1/tab2/p15
      /page1/tab3/p15
  */
  .state('tabsController.refer2', {
    url: '/p15',
    views: {
      'tab1': {
        templateUrl: 'templates/refer2.html',
        controller: 'refer2Ctrl'
      },
      'tab2': {
        templateUrl: 'templates/refer2.html',
        controller: 'refer2Ctrl'
      },
      'tab3': {
        templateUrl: 'templates/refer2.html',
        controller: 'refer2Ctrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.homePage'
      2) Using $state.go programatically:
        $state.go('tabsController.homePage');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/page32
      /page1/tab2/page32
      /page1/tab3/page32
  */
  .state('tabsController.homePage', {
    url: '/page32',
    views: {
      'tab1': {
        templateUrl: 'templates/homePage.html',
        controller: 'homePageCtrl'
      },
      'tab2': {
        templateUrl: 'templates/homePage.html',
        controller: 'homePageCtrl'
      },
      'tab3': {
        templateUrl: 'templates/homePage.html',
        controller: 'homePageCtrl'
      }
    }
  })

  /* 
    The IonicUIRouter.js UI-Router Modification is being used for this route.
    To navigate to this route, do NOT use a URL. Instead use one of the following:
      1) Using the ui-sref HTML attribute:
        ui-sref='tabsController.neurosurgeryReferralSummary'
      2) Using $state.go programatically:
        $state.go('tabsController.neurosurgeryReferralSummary');
    This allows your app to figure out which Tab to open this page in on the fly.
    If you're setting a Tabs default page or modifying the .otherwise for your app and
    must use a URL, use one of the following:
      /page1/tab1/s13
      /page1/tab2/s13
      /page1/tab3/s13
  */
  .state('tabsController.neurosurgeryReferralSummary', {
    url: '/s13',
    views: {
      'tab1': {
        templateUrl: 'templates/neurosurgeryReferralSummary.html',
        controller: 'neurosurgeryReferralSummaryCtrl'
      },
      'tab2': {
        templateUrl: 'templates/neurosurgeryReferralSummary.html',
        controller: 'neurosurgeryReferralSummaryCtrl'
      },
      'tab3': {
        templateUrl: 'templates/neurosurgeryReferralSummary.html',
        controller: 'neurosurgeryReferralSummaryCtrl'
      }
    }
  })

  .state('page', {
    url: '/page58',
    templateUrl: 'templates/page.html',
    controller: 'pageCtrl'
  })

$urlRouterProvider.otherwise('/s1')

  

});