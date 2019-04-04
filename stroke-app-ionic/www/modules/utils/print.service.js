'use strict';

angular.module('utils').service('PrintService', PrintService);

PrintService.$inject = ['PatientCacheService', 'DateTimeService', '$ionicLoading'];

function PrintService(PatientCacheService, DateTimeService, $ionicLoading) {

  var service = {
    printPatient: printPatient,
    printTestPage: printTestPage
  };

  return service;

  function printPatient(callback) {

    var printData = getPrintData();
    var html = createHtmlDocument(printData);

    if (window.plugin) { //checks we're running on device

      // printer.check is failing, see https://github.com/katzer/cordova-plugin-printer/issues/122
      $ionicLoading.show();
      window.plugin.printer.print(html, printData.patientUniqueId, function (res) {
        $ionicLoading.hide();
        callback();
      });
    } else {
      // output to console when running in desktop browser.
      console.log(html);
      callback();
    }
  }

  function printTestPage(callback) {

    var html = '<h1>ABC-ICH Test Print</h1><p>This is a test page created by the ABC-ICH tablet application.</p>';

    if (window.plugin) { //checks we're running on device

      // printer.check is failing, see https://github.com/katzer/cordova-plugin-printer/issues/122
      $ionicLoading.show();
      window.plugin.printer.print(html, 'ABC-ICH Test Print', function (res) {
        $ionicLoading.hide();
        callback();
      });
    } else {
      // output to console when running in desktop browser.
      console.log(html);
    }
  }

  function createHtmlDocument(printData) {

    var html = '<h1>Patient data for ' + printData.patientUniqueId + '</h1>';
    html += patientToHtml(printData.patientDisplayLabelsAndValues);

    html += '<h2>BP Management Entries:</h2>';
    html += bloodPressureEntriesToHtml(printData.bpDisplayLabelsAndValues);

    html += '<h2>ICH Entries:</h2>';
    html += ichEntriesToHtml(printData.ichDisplayLabelsAndValues);

    return html;
  }

  function patientToHtml(patientDisplayLabelsAndValues) {
    var html = '<table style="width:100%">';
    for (var i = 0; i < patientDisplayLabelsAndValues.length; i++) {
      var propertyValue = patientDisplayLabelsAndValues[i].value;
      var propertyLabel = patientDisplayLabelsAndValues[i].label;
      if (propertyLabel !== "BP Measurement Entries" && propertyValue !== null) {
        if (patientDisplayLabelsAndValues[i].isDateTime) {
          propertyValue = DateTimeService.formatDateTimeForPrint(propertyValue);
        } else if (patientDisplayLabelsAndValues[i].isBirthDate) {
          propertyValue = DateTimeService.formatBirthDateForPrint(propertyValue);
        }
        html += '<tr><td>' + propertyLabel + '</td><td>' + propertyValue + '</td></tr>';
      }
    }
    html += '</table>';

    return html;
  }

  function bloodPressureEntriesToHtml(bpDisplayLabelsAndValues) {

    var tableTag = "<table style='width:100%; border: 1px solid black; border-collapse: collapse;'>";
    var thTag = "<th style='border: 1px solid black; border-collapse: collapse;'>";
    var tdTag = "<td style='border: 1px solid black; border-collapse: collapse;'>";

    var html = tableTag + '<tr align="center">' + thTag + 'Date/Time</th>' + thTag + 'SBP (mmHg)</th>' + thTag + 'DBP (mmHg)</th>' + thTag + 'IV GTN rate (ml/h)</th>' + thTag + 'Labetalol dose (mg)</th>' + thTag + 'Pulse (BPM)</th></tr>';

    var bloodPresureEntries = bpDisplayLabelsAndValues.value;

    for (var i = 0; i < bloodPresureEntries.length; i++) {
      var bloodPressureEntry = bloodPresureEntries[i];

      var row = '<tr align="center">' + tdTag + DateTimeService.formatDateTimeForPrint(bloodPressureEntry.dateTime) + '</td>' 
      + tdTag + bloodPressureEntry.systolicBp + '</td>'
      + tdTag + bloodPressureEntry.diastolicBp + '</td>';

      var gtnRateStr = bloodPressureEntry.gtnRate !== null ? "" + bloodPressureEntry.gtnRate : "";
      row += tdTag + gtnRateStr + '</td>';

      var labetalolDoseStr = bloodPressureEntry.labetalolDose !== null ? "" + bloodPressureEntry.labetalolDose : "";
      row += tdTag + labetalolDoseStr + '</td>';

      var heartRateStr = bloodPressureEntry.heartRate !== null ? "" + bloodPressureEntry.heartRate : "";
      row += tdTag + heartRateStr + '</td>';

      row += '</tr>';

      html += row;
    }

    html += '</table>';

    return html;
  }

  function ichEntriesToHtml(ichDisplayLabelsAndValues){
    var tableTag = "<table style='width:100%; border: 1px solid black; border-collapse: collapse;'>";
    var thTag = "<th style='border: 1px solid black; border-collapse: collapse;'>";
    var tdTag = "<td style='border: 1px solid black; border-collapse: collapse;'>";

    var html = tableTag + '<tr align="center">' + thTag + 'A - longest axis (cm)</th>' + thTag + 'B - longest axis perpendicular to A (cm)</th>' + thTag + 'Number of slices</th>' + thTag + 'Slice thickness (cm)</th>' + thTag + 'ICH volume (ml)</th></tr>';

    var ichEntries = ichDisplayLabelsAndValues.value;

    for (var i = 0; i < ichEntries.length; i++) {
      var ichEntry = ichEntries[i];

      var row = '<tr align="center">'
      + tdTag + ichEntry.longestAxis + '</td>'
      + tdTag + ichEntry.longestAxisPerpendicular + '</td>'
      + tdTag + ichEntry.numberOfSlices + '</td>'
      + tdTag + ichEntry.sliceThickness + '</td>'
      + tdTag + ichEntry.ichVolume + '</td>'

      row += '</tr>';

      html += row;
    }

    html += '</table>';

    return html;
  }

  function getPrintData(patient) {
    var patientDisplayLabelsAndValues = [
      {"label": "Print Time", "value": Date.now(), "isDateTime": true},
      {"label": "App Start Date Time", "value": PatientCacheService.getAppStartDateTime(), "isDateTime": true},
      {"label": "ID", "value": PatientCacheService.getId()},
      {"label": "Unique ID", "value": PatientCacheService.getUniqueId()},
      {"label": "Initials", "value": PatientCacheService.getInitials()},
      {"label": "Birth Date", "value": PatientCacheService.getBirthDate(), "isBirthDate": true},
      {"label": "Estimated Age", "value": PatientCacheService.getEstimatedAge()},
      {"label": "External Scan Hospital Name", "value": PatientCacheService.getExternalScanHospitalName()},
      {"label": "Scan Date Time", "value": PatientCacheService.getScanDateTime(), "isDateTime": true},
      {"label": "Door Date Time", "value": PatientCacheService.getDoorDateTime(), "isDateTime": true},
      {"label": "Onset Date Time", "value": PatientCacheService.getOnsetDateTime(), "isDateTime": true},
      {"label": "Is Last Seen Well Onset", "value": PatientCacheService.getIsLastSeenWellOnset()},
      {"label": "Is Best Estimate Onset", "value": PatientCacheService.getIsBestEstimateOnset()},
      {"label": "GCS Score", "value": PatientCacheService.getGcsScore()},
      {"label": "GCS Score Eye", "value": PatientCacheService.getGcsScoreEye()},
      {"label": "GCS Score Verbal", "value": PatientCacheService.getGcsScoreVerbal()},
      {"label": "GCS Score Motor", "value": PatientCacheService.getGcsScoreMotor()},
      {"label": "Anticoagulant Type", "value": PatientCacheService.getAnticoagulantType()},
      {"label": "Anticoagulant Name", "value": PatientCacheService.getAnticoagulantName()},
      {
        "label": "Reversal Agent Administered at External Hospital",
        "value": PatientCacheService.getReversalAgentAdministeredAtExternalHospital()
      },
      {
        "label": "Reversal Agent Administered Time Known",
        "value": PatientCacheService.getReversalAgentAdministeredTimeKnown()
      },
      {"label": "Selected PCC Type", "value": PatientCacheService.getSelectedPCCType()},
      {"label": "Administer PCC Without INR", "value": PatientCacheService.getAdministerBeriplexWithoutInr()},
      {"label": "Estimated Weight in kg", "value": PatientCacheService.getEstimatedWeightInKg()},
      {"label": "Calculated PCC Dose", "value": PatientCacheService.getCalculatedBeriplexDose()},
      {"label": "INR Value", "value": PatientCacheService.getInrValue()},
      {"label": "INR Type", "value": PatientCacheService.getInrType()},
      {"label": "INR Date Time", "value": PatientCacheService.getInrDateTime(), "isDateTime": true},
      {"label": "Administer PCC When Unknown", "value": PatientCacheService.getAdministerBeriplexWhenUnknown()},
      {"label": "Is Weight Given in kg", "value": PatientCacheService.getIsWeightGivenInKg()},
      {"label": "Actual PCC Dose", "value": PatientCacheService.getActualBeriplexDose()},
      {"label": "Is Vitamin K Administered", "value": PatientCacheService.getIsVitaminkAdministered()},
      {"label": "Vitamin K Date Time", "value": PatientCacheService.getVitaminkDateTime(), "isDateTime": true},
      {"label": "Is Infusion Instructions Viewed", "value": PatientCacheService.getIsInfusionInstructionsViewed()},
      {"label": "Reversal Agent Type", "value": PatientCacheService.getReversalAgentType()},
      {
        "label": "Reversal Agent Start Date Time",
        "value": PatientCacheService.getReversalAgentStartDateTime(),
        "isDateTime": true
      },
      {
        "label": "BP Target Reached Date Time",
        "value": PatientCacheService.getBpTargetReachedDateTime(),
        "isDateTime": true
      },
      {"label": "BP Treatment Threshold", "value": PatientCacheService.getBpTreatmentThreshold()},
      {"label": "BP Target", "value": PatientCacheService.getBpTarget()},
      {"label": "BP Measurement Entries", "value": PatientCacheService.getBpMeasurementEntries()},
      {"label": "Is Referred to Critical Care", "value": PatientCacheService.getIsReferredToCriticalCare()},
      {"label": "Premorbid mRS Score", "value": PatientCacheService.getPremorbidMrsScore()},
      {"label": "Is Posterior Fossa ICH", "value": PatientCacheService.getIsPosteriorFossaIch()},
      {"label": "Is Ventricle Obstructed", "value": PatientCacheService.getIsVentricleObstructed()},
      {
        "label": "Referral to Neurosurgery Date Time",
        "value": PatientCacheService.getReferralToNeurosurgeryDateTime(),
        "isDateTime": true
      },
      {"label": "Neurosurgeon Name", "value": PatientCacheService.getNeurosurgeonName()},
      {
        "label": "Is Referral to Neurosurgery Accepted",
        "value": PatientCacheService.getIsReferralToNeurosurgeryAccepted()
      }

    ];
    var patientUniqueId = PatientCacheService.getUniqueId();
    var bpDisplayLabelsAndValues = {
      "label": "BP Measurement Entries",
      "value": PatientCacheService.getBpMeasurementEntries()
    };
    var ichDisplayLabelsAndValues = {
      "labels": "ICH Entries",
      "value": PatientCacheService.getIchEntries()
    };

    var printData = {
      "patientDisplayLabelsAndValues": patientDisplayLabelsAndValues,
      "patientUniqueId": patientUniqueId,
      "bpDisplayLabelsAndValues": bpDisplayLabelsAndValues,
      "ichDisplayLabelsAndValues": ichDisplayLabelsAndValues
    };

    return printData;
  }

}
