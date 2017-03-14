'use strict';

angular.module('utils').service('EmailService', EmailService);

EmailService.$inject = ['$http', 'EmailCacheService', 'PatientCacheService', 'DateTimeService'];

function EmailService($http, EmailCacheService, PatientCacheService, DateTimeService) {
    
    var _PatientDisplayLabelsAndValues;
    var _BloodPressureDisplayLabelAndValue = { "label": "Bp Measurement Entries", "getter": PatientCacheService.getBpMeasurementEntries };

    var service = {
        sendEmail: sendEmail,
        sendTestEmail: sendTestEmail,
        setPatientDisplayLabelsAndValues: setPatientDisplayLabelsAndValues
     };

    return service;

    function setPatientDisplayLabelsAndValues(patient) {
        _PatientDisplayLabelsAndValues = [
            { "label": "App  Start  Date  Time", "value": patient.getAppStartDateTime(), "isDateTime": true },
            { "label": "Initials", "value": patient.getInitials() },
            { "label": "Birth Date", "value": patient.getBirthDate(), isBirthDate: true },
            { "label": "Estimated Age", "value": patient.getEstimatedAge() },
            { "label": "External Scan Hospital Name", "value": patient.getExternalScanHospitalName() },
            { "label": "Scan Date Time", "value": patient.getScanDateTime(), "isDateTime": true },
            { "label": "Door Date Time", "value": patient.getDoorDateTime(), "isDateTime": true },
            { "label": "Onset Date Time", "value": patient.getOnsetDateTime(), "isDateTime": true },
            { "label": "Is Last Seen Well Onset", "value": patient.getIsLastSeenWellOnset() },
            { "label": "Is Best Estimate Onset", "value": patient.getIsBestEstimateOnset() },
            { "label": "Gcs Score", "value": patient.getGcsScore() },
            { "label": "Gcs Score Eye", "value": patient.getGcsScoreEye() },
            { "label": "Gcs Score Verbal", "value": patient.getGcsScoreVerbal() },
            { "label": "Gcs Score Motor", "value": patient.getGcsScoreMotor() },
            { "label": "Summary Email Address", "value": patient.getSummaryEmailAddress() },
            { "label": "Anticoagulant Type", "value": patient.getAnticoagulantType() },
            { "label": "Anticoagulant Name", "value": patient.getAnticoagulantName() },
            { "label": "Estimated Weight In Kg", "value": patient.getEstimatedWeightInKg() },
            { "label": "Calculated Beriplex Dose", "value": patient.getCalculatedBeriplexDose() },
            { "label": "Inr Value", "value": patient.getInrValue() },
            { "label": "Inr Type", "value": patient.getInrType() },
            { "label": "Inr Date Time", "value": patient.getInrDateTime(), "isDateTime": true },
            { "label": "Administer Beriplex When Unknown", "value": patient.getAdministerBeriplexWhenUnknown() },
            { "label": "Is Weight Given In Kg", "value": patient.getIsWeightGivenInKg() },
            { "label": "Actual Beriplex Dose", "value": patient.getActualBeriplexDose() },
            { "label": "Beriplex Start Date Time", "value": patient.getBeriplexStartDateTime(), "isDateTime": true },
            { "label": "Vitamink Date Time", "value": patient.getVitaminkDateTime(), "isDateTime": true },
            { "label": "Is Infusion Instructions Viewed", "value": patient.getIsInfusionInstructionsViewed() },
            { "label": "Reversal Agent Type", "value": patient.getReversalAgentType() },
            { "label": "Reversal Agent Date Time", "value": patient.getReversalAgentDateTime(), "isDateTime": true },
            { "label": "Bp Target Reached Date Time", "value": patient.getBpTargetReachedDateTime(), "isDateTime": true },
            { "label": "Bp Treatment Threshold", "value": patient.getBpTreatmentThreshold() },
            { "label": "Bp Target", "value": patient.getBpTarget() },
            { "label": "Destination", "value": patient.getDestination() },
            { "label": "Other Destination", "value": patient.getOtherDestination() },
            { "label": "Premorbid Mrs Score", "value": patient.getPremorbidMrsScore() },
            { "label": "Ich Volume", "value": patient.getIchVolume() },
            { "label": "Is Posterior Fossa Ich ", "value": patient.getIsPosteriorFossaIch() },
            { "label": "Is Ventricle Obstructed", "value": patient.getIsVentricleObstructed() },
            { "label": "Ich Longest Axis", "value": patient.getIchLongestAxis() },
            { "label": "Ich Perpendicular Axis", "value": patient.getIchPerpendicularAxis() },
            { "label": "Ich Num Slices", "value": patient.getIchNumSlices() },
            { "label": "Ich Slice Thickness", "value": patient.getIchSliceThickness() },
            { "label": "Referral To Neurosurgery Date Time", "value": patient.getReferralToNeurosurgeryDateTime(), "isDateTime": true },
            { "label": "Neurosurgeon Name", "value": patient.getNeurosurgeonName() },
            { "label": "Is Referral To Neurosurgery Accepted", "value": patient.getIsReferralToNeurosurgeryAccepted() },
            { "label": "Is For Active Treatment", "value": patient.getIsForActiveTreatment() }
        ];
    }

    function sendEmail(emailDone_Callback, emailClientNotInstalledOnDevice_Callback) {
        var body = createEmailBody();
        var attachment = createEmailAttachment();
        var emailSubject = "New Stroke app patient data";
        var emailRecipient = EmailCacheService.getEmail();//No need to check email is set here. Email address must be set before user can begin registering patient. 

        var email = {
            to: [emailRecipient],
            subject: emailSubject,
            body: body,
            attachments: attachment,
            isHtml: true
        };

        if (window.plugin) { //checks we're running on device
            window.plugin.email.isAvailable( //checks an email client is configured and available
                function (isAvailable) {
                    if (isAvailable) {
                        window.plugin.email.open(email, function () {
                            emailDone_Callback(); //this doesnt imply email has been sent. just that the plug-in has sucessfully deligated responsibilty for creating a new email to the operating system.
                        });
                    } else {
                         emailClientNotInstalledOnDevice_Callback();
                    }
                });
        } else { // view email and contents even when using the desktop browser to debug.
            console.log(email);
        }
    }

    function sendTestEmail(emailRecipient, emailOK_Callback, emailClientNotInstalledOnDevice_Callback) {
        var body = createTestEmailBody();
        var emailSubject = "Stroke app test Email";

        var email = {
            to: [emailRecipient],
            subject: emailSubject,
            body: body,
            isHtml: true
        };

        if (window.plugin) { //checks we're running on device
            window.plugin.email.isAvailable( //checks an email client is available
                function (isAvailable) {
                    if (isAvailable) {
                        window.plugin.email.open(email, function (result) {
                            if (result === "OK") { //is OK when an email client has been opened and user has returned to stroke app
                                emailOK_Callback();
                            }
                        });
                    } else {
                        //show popup that email client is not installed on device
                        emailClientNotInstalledOnDevice_Callback();
                    }
                });
        } else { // view email and contents even when using the desktop browser to debug.
            console.log(email);
        }
    }

    function createTestEmailBody() {

        var emailIntro = "Hello,<br><br>This is a test email sent by the Stroke app.<br>Email has been configured correctly on your device.<br><br>";

        var signature = "From,<br>The stroke app.<br><br>This is an automated message and this mail box is not monitored.<br>Please do not reply to this email address."
        var emailBody = emailIntro + signature;

        return emailBody;
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

    function patientToRtfFormat() {
        var rtfBody = "\\ul \\fs56 Stroke app\\ulnone \\fs22 \\par"
        rtfBody += "\\fs48 Patient data for \\b " + PatientCacheService.getUniqueId() + ": \\b0 \\fs26 \\par"
        for (var i = 0; i < _PatientDisplayLabelsAndValues.length; i++) {
            var propertyValue = _PatientDisplayLabelsAndValues[i].value;
            var propertyLabel = _PatientDisplayLabelsAndValues[i].label;
            if (propertyValue) {
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