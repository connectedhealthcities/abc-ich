'use strict';

angular.module('utils').service('EmailService', EmailService);

EmailService.$inject = ['$http', 'EmailCacheService', 'PatientCacheService', 'DateTimeService'];

function EmailService($http, EmailCacheService, PatientCacheService, DateTimeService) {
    
    var _PatientDisplayLabelsAndValues = [
        { "label": "App  Start  Date  Time", "getter": PatientCacheService.getAppStartDateTime, "isDateTime": true },
        { "label": "Initials", "getter": PatientCacheService.getInitials },
        { "label": "Birth Date", "getter": PatientCacheService.getBirthDate, isBirthDate: true },
        { "label": "Estimated Age", "getter": PatientCacheService.getEstimatedAge },
        { "label": "External Scan Hospital Name", "getter": PatientCacheService.getExternalScanHospitalName },
        { "label": "Scan Date Time", "getter": PatientCacheService.getScanDateTime, "isDateTime": true },
        { "label": "Door Date Time", "getter": PatientCacheService.getDoorDateTime, "isDateTime": true },
        { "label": "Onset Date Time", "getter": PatientCacheService.getOnsetDateTime, "isDateTime": true },
        { "label": "Is Last Seen Well Onset", "getter": PatientCacheService.getIsLastSeenWellOnset },
        { "label": "Is Best Estimate Onset", "getter": PatientCacheService.getIsBestEstimateOnset },
        { "label": "Gcs Score", "getter": PatientCacheService.getGcsScore },
        { "label": "Gcs Score Eye", "getter": PatientCacheService.getGcsScoreEye },
        { "label": "Gcs Score Verbal", "getter": PatientCacheService.getGcsScoreVerbal },
        { "label": "Gcs Score Motor", "getter": PatientCacheService.getGcsScoreMotor },
        { "label": "Summary Email Address", "getter": PatientCacheService.getSummaryEmailAddress },
        { "label": "Anticoagulant Type", "getter": PatientCacheService.getAnticoagulantType },
        { "label": "Anticoagulant Name", "getter": PatientCacheService.getAnticoagulantName },
        { "label": "Estimated Weight In Kg", "getter": PatientCacheService.getEstimatedWeightInKg },
        { "label": "Calculated Beriplex Dose", "getter": PatientCacheService.getCalculatedBeriplexDose },
        { "label": "Inr Value", "getter": PatientCacheService.getInrValue },
        { "label": "Inr Type", "getter": PatientCacheService.getInrType },
        { "label": "Inr Date Time", "getter": PatientCacheService.getInrDateTime, "isDateTime": true },
        { "label": "Administer Beriplex When Unknown", "getter": PatientCacheService.getAdministerBeriplexWhenUnknown },
        { "label": "Is Weight Given In Kg", "getter": PatientCacheService.getIsWeightGivenInKg },
        { "label": "Actual Beriplex Dose", "getter": PatientCacheService.getActualBeriplexDose },
        { "label": "Beriplex Start Date Time", "getter": PatientCacheService.getBeriplexStartDateTime, "isDateTime": true },
        { "label": "Vitamink Date Time", "getter": PatientCacheService.getVitaminkDateTime, "isDateTime": true },
        { "label": "Is Infusion Instructions Viewed", "getter": PatientCacheService.getIsInfusionInstructionsViewed },
        { "label": "Doac Reversal Agent Type", "getter": PatientCacheService.getDoacReversalAgentType },
        { "label": "Doac Reversal Agent Date Time", "getter": PatientCacheService.getDoacReversalAgentDateTime, "isDateTime": true },
        { "label": "Bp Target Reached Date Time", "getter": PatientCacheService.getBpTargetReachedDateTime, "isDateTime": true },
        { "label": "Bp Treatment Threshold", "getter": PatientCacheService.getBpTreatmentThreshold },
        { "label": "Bp Target", "getter": PatientCacheService.getBpTarget },
        { "label": "Destination", "getter": PatientCacheService.getDestination },
        { "label": "Other Destination", "getter": PatientCacheService.getOtherDestination },
        { "label": "Premorbid Mrs Score", "getter": PatientCacheService.getPremorbidMrsScore },
        { "label": "Ich Volume", "getter": PatientCacheService.getIchVolume },
        { "label": "Is Posterior Fossa Ich ", "getter": PatientCacheService.getIsPosteriorFossaIch },
        { "label": "Is Ventricle Obstructed", "getter": PatientCacheService.getIsVentricleObstructed },
        { "label": "Ich Longest Axis", "getter": PatientCacheService.getIchLongestAxis },
        { "label": "Ich Perpendicular Axis", "getter": PatientCacheService.getIchPerpendicularAxis },
        { "label": "Ich Num Slices", "getter": PatientCacheService.getIchNumSlices },
        { "label": "Ich Slice Thickness", "getter": PatientCacheService.getIchSliceThickness },
        { "label": "Referral To Neurosurgery Date Time", "getter": PatientCacheService.getReferralToNeurosurgeryDateTime, "isDateTime": true },
        { "label": "Neurosurgeon Name", "getter": PatientCacheService.getNeurosurgeonName },
        { "label": "Is Referral To Neurosurgery Accepted", "getter": PatientCacheService.getIsReferralToNeurosurgeryAccepted },
        { "label": "Is For Active Treatment", "getter": PatientCacheService.getIsForActiveTreatment }
    ];
    var _BloodPressureDisplayLabelAndValue = { "label": "Bp Measurement Entries", "getter": PatientCacheService.getBpMeasurementEntries };

    var service = {
        sendEmail: sendEmail
     };

    return service;

    function sendEmail() {
        var body = createEmailBody();
        var attachment = createEmailAttachment();
        var emailSubject = "New Stroke app patient data";
        var emailRecipients = [EmailCacheService.getEmail()];
        var email = {
            to: emailRecipients,
            subject: emailSubject,
            body: body,
            attachments: attachment,
            isHtml: true
        };
        if (window.plugin) {
            window.plugin.email.open(email);
        } else { // view email and contents even when using the desktop browser to debug.
            console.log(email);
        }
    }

    function createEmailAttachment() {
        var attachmentName = "patient - " + PatientCacheService.getUniqueId() + ".rtf";

        var rtfDocument = createRtfDocument();
        var rtfBase64 = btoa(rtfDocument);
        
        var attachment = "base64:" + attachmentName + "//" + rtfBase64;
        return attachment;
    }

    function createRtfDocument() {
        var rtfDocument;
        var rtfMeta = "{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\n";
        rtfMeta += "{\\*\\generator Msftedit 5.41.21.2510;}\\viewkind4\\uc1\\pard\\sa200\\sl276\\slmult1\\lang9\\f0\\fs22\\par\n";
        rtfDocument = rtfMeta;
        rtfDocument += patientToRtfFormat();
        rtfDocument += bloodPressureEntriesToRtfFormat();
        rtfDocument += "\n}\0";

        return rtfDocument;
    }

    function createEmailBody() { 

        var emailIntro = "Hello,<br><br> You have received a new patient record (" + PatientCacheService.getUniqueId() + ").<br><br>";
        
        var signature = "From,<br>The stroke app.<br><br>This is an automated message and this mail box is not monitored.<br>Please do not reply to this email address."
        var emailBody = emailIntro + signature;

        return emailBody;
    }

    //Can we refactor these out into an RTF or Document service?
    function patientToRtfFormat() {
        var rtfBody = "\\ul \\fs56 Stroke app\\ulnone \\fs22 \\par"
        rtfBody += "\\fs48 Patient data for \\b " + PatientCacheService.getUniqueId() + ": \\b0 \\fs26 \\par"
        for (var i = 0; i < _PatientDisplayLabelsAndValues.length; i++) {
            var propertyValue = _PatientDisplayLabelsAndValues[i].getter();
            var propertyLabel = _PatientDisplayLabelsAndValues[i].label;
            if (propertyValue) { //EMT: Do we really want to exclude keys that havent been incomplete
                if (_PatientDisplayLabelsAndValues[i].isDateTime) {
                    propertyValue = DateTimeService.formatDateTimeForRtf(propertyValue);
                } else if (_PatientDisplayLabelsAndValues[i].isBirthDate) {
                    propertyValue = DateTimeService.formatBirthDateForRtf(propertyValue);
                }
                rtfBody += "\\b " + propertyLabel + ": \\b0 " + propertyValue + "\\par \n";
            }
        }

        return rtfBody;
    }

    function bloodPressureEntriesToRtfFormat() {
        var rtfBody = "\\par\\ul \\fs40 BP Entries:\\ulnone \\fs26 \\par";
        var bloodPresureEntries = _BloodPressureDisplayLabelAndValue.getter();
        for (var i = 0; i < bloodPresureEntries.length; i++) {
            var bloodPressureEntry = bloodPresureEntries[i];
            if (bloodPressureEntry) {

                if (bloodPressureEntry.dateTime) {
                    rtfBody += "\\b " + DateTimeService.formatDateTimeForRtf(bloodPressureEntry.dateTime) + " \\b0 \\par \n";
                }

                if (bloodPressureEntry.systolicBp) {
                    rtfBody += "\\b Systolic BP: \\b0 " + bloodPressureEntry.systolicBp + "\\par \n";
                }

                if (bloodPressureEntry.gtnRate) {
                    rtfBody += "\\b GTN Rate: \\b0 " + bloodPressureEntry.gtnRate + "\\par \n";
                }

                if (bloodPressureEntry.labetalolDose) {
                    rtfBody += "\\b Labetalol Dose: \\b0 " + bloodPressureEntry.labetalolDose + "\\par \n";
                }               

                rtfBody += "------ \\par \n";
            }
        }

        return rtfBody;
    }
    
}