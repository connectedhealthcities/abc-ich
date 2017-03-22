'use strict';

angular.module('utils').service('EmailService', EmailService);

EmailService.$inject = ['$http', 'EmailCacheService', 'PatientCacheService', 'DateTimeService'];

function EmailService($http, EmailCacheService, PatientCacheService, DateTimeService) {
    
    

    var service = {
        sendEmail: sendEmail,
        sendTestEmail: sendTestEmail,
        getEmailData: getEmailData
     };

    return service;

    function getEmailData() {
        var patientDisplayLabelsAndValues = [
            { "label": "App  Start  Date  Time", "value": PatientCacheService.getAppStartDateTime(), "isDateTime": true },
            { "label": "Initials", "value": PatientCacheService.getInitials() },
            { "label": "Birth Date", "value": PatientCacheService.getBirthDate(), isBirthDate: true },
            { "label": "Estimated Age", "value": PatientCacheService.getEstimatedAge() },
            { "label": "External Scan Hospital Name", "value": PatientCacheService.getExternalScanHospitalName() },
            { "label": "Scan Date Time", "value": PatientCacheService.getScanDateTime(), "isDateTime": true },
            { "label": "Door Date Time", "value": PatientCacheService.getDoorDateTime(), "isDateTime": true },
            { "label": "Onset Date Time", "value": PatientCacheService.getOnsetDateTime(), "isDateTime": true },
            { "label": "Is Last Seen Well Onset", "value": PatientCacheService.getIsLastSeenWellOnset() },
            { "label": "Is Best Estimate Onset", "value": PatientCacheService.getIsBestEstimateOnset() },
            { "label": "Gcs Score", "value": PatientCacheService.getGcsScore() },
            { "label": "Gcs Score Eye", "value": PatientCacheService.getGcsScoreEye() },
            { "label": "Gcs Score Verbal", "value": PatientCacheService.getGcsScoreVerbal() },
            { "label": "Gcs Score Motor", "value": PatientCacheService.getGcsScoreMotor() },
            { "label": "Summary Email Address", "value": PatientCacheService.getSummaryEmailAddress() },
            { "label": "Anticoagulant Type", "value": PatientCacheService.getAnticoagulantType() },
            { "label": "Anticoagulant Name", "value": PatientCacheService.getAnticoagulantName() },
            { "label": "Estimated Weight In Kg", "value": PatientCacheService.getEstimatedWeightInKg() },
            { "label": "Calculated Beriplex Dose", "value": PatientCacheService.getCalculatedBeriplexDose() },
            { "label": "Inr Value", "value": PatientCacheService.getInrValue() },
            { "label": "Inr Type", "value": PatientCacheService.getInrType() },
            { "label": "Inr Date Time", "value": PatientCacheService.getInrDateTime(), "isDateTime": true },
            { "label": "Administer Beriplex When Unknown", "value": PatientCacheService.getAdministerBeriplexWhenUnknown() },
            { "label": "Is Weight Given In Kg", "value": PatientCacheService.getIsWeightGivenInKg() },
            { "label": "Actual Beriplex Dose", "value": PatientCacheService.getActualBeriplexDose() },
            { "label": "Beriplex Start Date Time", "value": PatientCacheService.getBeriplexStartDateTime(), "isDateTime": true },
            { "label": "Vitamink Date Time", "value": PatientCacheService.getVitaminkDateTime(), "isDateTime": true },
            { "label": "Is Infusion Instructions Viewed", "value": PatientCacheService.getIsInfusionInstructionsViewed() },
            { "label": "Reversal Agent Type", "value": PatientCacheService.getReversalAgentType() },
            { "label": "Reversal Agent Date Time", "value": PatientCacheService.getReversalAgentDateTime(), "isDateTime": true },
            { "label": "Bp Target Reached Date Time", "value": PatientCacheService.getBpTargetReachedDateTime(), "isDateTime": true },
            { "label": "Bp Treatment Threshold", "value": PatientCacheService.getBpTreatmentThreshold() },
            { "label": "Bp Target", "value": PatientCacheService.getBpTarget() },
            { "label": "Destination", "value": PatientCacheService.getDestination() },
            { "label": "Other Destination", "value": PatientCacheService.getOtherDestination() },
            { "label": "Premorbid Mrs Score", "value": PatientCacheService.getPremorbidMrsScore() },
            { "label": "Ich Volume", "value": PatientCacheService.getIchVolume() },
            { "label": "Is Posterior Fossa Ich ", "value": PatientCacheService.getIsPosteriorFossaIch() },
            { "label": "Is Ventricle Obstructed", "value": PatientCacheService.getIsVentricleObstructed() },
            { "label": "Ich Longest Axis", "value": PatientCacheService.getIchLongestAxis() },
            { "label": "Ich Perpendicular Axis", "value": PatientCacheService.getIchPerpendicularAxis() },
            { "label": "Ich Num Slices", "value": PatientCacheService.getIchNumSlices() },
            { "label": "Ich Slice Thickness", "value": PatientCacheService.getIchSliceThickness() },
            { "label": "Referral To Neurosurgery Date Time", "value": PatientCacheService.getReferralToNeurosurgeryDateTime(), "isDateTime": true },
            { "label": "Neurosurgeon Name", "value": PatientCacheService.getNeurosurgeonName() },
            { "label": "Is Referral To Neurosurgery Accepted", "value": PatientCacheService.getIsReferralToNeurosurgeryAccepted() },
            { "label": "Is For Active Treatment", "value": PatientCacheService.getIsForActiveTreatment() }
        ];
        var patientUniqueId = PatientCacheService.getUniqueId();
        var bpDisplayLabelsAndValues = { "label": "Bp Measurement Entries", "value": PatientCacheService.getBpMeasurementEntries() };

        var emailData = {
            "patientDisplayLabelsAndValues": patientDisplayLabelsAndValues,
            "patientUniqueId": patientUniqueId,
            "bpDisplayLabelsAndValues": bpDisplayLabelsAndValues
        };

        return emailData;
    }

    function sendEmail(emailData, emailDone_Callback, emailClientNotInstalledOnDevice_Callback) {
        var body = createEmailBody(emailData.patientUniqueId);
        var attachment = createEmailAttachment(emailData);
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
                            emailDone_Callback(); //this doesnt imply email has been sent. just that the app has sucessfully deligated responsibilty for creating a new email to the plug-in.
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

    function createEmailAttachment(emailData) {
        var attachmentName = "patient - " + emailData.patientUniqueId + ".rtf";

        var rtfDocument = createRtfDocument(emailData);
        var rtfBase64 = btoa(rtfDocument);
        
        var attachment = "base64:" + attachmentName + "//" + rtfBase64;
        return attachment;
    }

    function createRtfDocument(emailData) {
        var rtfDocument;
        var rtfMeta = "{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}}\n";
        rtfMeta += "{\\*\\generator Msftedit 5.41.21.2510;}\\viewkind4\\uc1\\pard\\sa200\\sl276\\slmult1\\lang9\\f0\\fs22\\par\n";
        rtfDocument = rtfMeta;
        rtfDocument += patientToRtfFormat(emailData.patientDisplayLabelsAndValues);
        rtfDocument += bloodPressureEntriesToRtfFormat(emailData.bpDisplayLabelsAndValues);
        rtfDocument += "\n}\0";

        return rtfDocument;
    }

    function createEmailBody(patientUniqueId) { 

        var emailIntro = "Hello,<br><br> You have received a new patient record (" + patientUniqueId + ").<br><br>";
        
        var signature = "From,<br>The stroke app.<br><br>This is an automated message and this mail box is not monitored.<br>Please do not reply to this email address."
        var emailBody = emailIntro + signature;

        return emailBody;
    }

    function patientToRtfFormat(patientDisplayLabelsAndValues) {
        var rtfBody = "\\ul \\fs56 Stroke app\\ulnone \\fs22 \\par"
        rtfBody += "\\fs48 Patient data for \\b " + PatientCacheService.getUniqueId() + ": \\b0 \\fs26 \\par"
        for (var i = 0; i < patientDisplayLabelsAndValues.length; i++) {
            var propertyValue = patientDisplayLabelsAndValues[i].value;
            var propertyLabel = patientDisplayLabelsAndValues[i].label;
            if (propertyValue !== null) {
                if (patientDisplayLabelsAndValues[i].isDateTime) {
                    propertyValue = DateTimeService.formatDateTimeForRtf(propertyValue);
                } else if (patientDisplayLabelsAndValues[i].isBirthDate) {
                    propertyValue = DateTimeService.formatBirthDateForRtf(propertyValue);
                }
                rtfBody += "\\b " + propertyLabel + ": \\b0 " + propertyValue + "\\par \n";
            }
        }

        return rtfBody;
    }

    function bloodPressureEntriesToRtfFormat(bpDisplayLabelsAndValues) {
        var rtfBody = "\\par\\ul \\fs40 BP Entries:\\ulnone \\fs26 \\par";
        var bloodPresureEntries = bpDisplayLabelsAndValues.value;
        for (var i = 0; i < bloodPresureEntries.length; i++) {
            var bloodPressureEntry = bloodPresureEntries[i];
            if (bloodPressureEntry) {

                if (bloodPressureEntry.dateTime !== null) {
                    rtfBody += "\\b " + DateTimeService.formatDateTimeForRtf(bloodPressureEntry.dateTime) + " \\b0 \\par \n";
                }

                if (bloodPressureEntry.systolicBp !== null) {
                    rtfBody += "\\b Systolic BP: \\b0 " + bloodPressureEntry.systolicBp + "\\par \n";
                }

                if (bloodPressureEntry.heartRate !== null) {
                    rtfBody += "\\b Heart Rate: \\b0 " + bloodPressureEntry.heartRate + "\\par \n";
                }

                if (bloodPressureEntry.gtnRate !== null) {
                    rtfBody += "\\b GTN Rate: \\b0 " + bloodPressureEntry.gtnRate + "\\par \n";
                }

                if (bloodPressureEntry.labetalolDose !== null) {
                    rtfBody += "\\b Labetalol Dose: \\b0 " + bloodPressureEntry.labetalolDose + "\\par \n";
                }


                rtfBody += "------ \\par \n";
            }
        }

        return rtfBody;
    }
    
}