'use strict';

angular.module('app.general').service('PatientEndControllerService', PatientEndControllerService);

PatientEndControllerService.$inject = ['PatientCacheService'];

function PatientEndControllerService(PatientCacheService) {
 
     var service = {
        getPatient: getPatient
    };

    return service

    function getPatient() {
        var patient = {};

        patient.id = PatientCacheService.getId();
        patient.appStartDateTime = PatientCacheService.getAppStartDateTime();

        patient.uniqueId = PatientCacheService.getUniqueId();
        patient.initials = PatientCacheService.getInitials();
        patient.birthDate = PatientCacheService.getBirthDate();
        patient.estimatedAge = PatientCacheService.getEstimatedAge();
        patient.scanDateTime = PatientCacheService.getScanDateTime();
        patient.externalScanHospitalName = PatientCacheService.getExternalScanHospitalName();

        patient.onsetDateTime = PatientCacheService.getOnsetDateTime();
        patient.doorDateTime = PatientCacheService.getDoorDateTime();
        patient.lastSeenWellOnset = PatientCacheService.getIsLastSeenWellOnset();
        patient.bestEstimateOnset = PatientCacheService.getIsBestEstimateOnset();

        patient.gcsScore = PatientCacheService.getGcsScore();
        patient.gcsScoreEye = PatientCacheService.getGcsScoreEye();
        patient.gcsScoreVerbal = PatientCacheService.getGcsScoreVerbal();
        patient.gcsScoreMotor = PatientCacheService.getGcsScoreMotor();

        patient.anticoagulantType = PatientCacheService.getAnticoagulantType();
        patient.anticoagulantName = PatientCacheService.getAnticoagulantName();

        patient.estimatedWeightInKg = PatientCacheService.getEstimatedWeightInKg();
        patient.inrValue = PatientCacheService.getInrValue();
        patient.inrType = PatientCacheService.getInrType();
        patient.inrDateTime = PatientCacheService.getInrDateTime();
        patient.calculatedBeriplexDose = PatientCacheService.getCalculatedBeriplexDose();
        patient.administerBeriplexWhenAnticoagulantUnknown = PatientCacheService.getAdministerBeriplexWhenUnknown();

        patient.actualBeriplexDose = PatientCacheService.getActualBeriplexDose();

        patient.beriplexStartDateTime = PatientCacheService.getBeriplexStartDateTime();
        patient.vitaminkDateTime = PatientCacheService.getVitaminkDateTime();
        patient.infusionInstructionsViewed = PatientCacheService.getIsInfusionInstructionsViewed();

        patient.doacReversalAgentType = PatientCacheService.getDoacReversalAgentType();
        patient.doacReversalAgentDateTime = PatientCacheService.getDoacReversalAgentDateTime();

        patient.bpTargetReachedDateTime = PatientCacheService.getBpTargetReachedDateTime();
        patient.bpTreatmentThreshold = PatientCacheService.getBpTreatmentThreshold();
        patient.bpTarget = PatientCacheService.getBpTarget();
        patient.bpManagementEntries = PatientCacheService.getBpMeasurementEntries();

        patient.destination = PatientCacheService.getDestination();
        patient.otherDestination = PatientCacheService.getOtherDestination();

        patient.premorbidMrsScore = PatientCacheService.getPremorbidMrsScore();    

        patient.ichVolume = PatientCacheService.getIchVolume();
        patient.posteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
        patient.ventricleObstructed = PatientCacheService.getIsVentricleObstructed();

        patient.referralToNeurosurgeryDateTime = PatientCacheService.getReferralToNeurosurgeryDateTime();
        patient.neurosurgeonName = PatientCacheService.getNeurosurgeonName();
        patient.referralToNeurosurgeryAccepted = PatientCacheService.getIsReferralToNeurosurgeryAccepted();
        patient.forActiveTreatment = PatientCacheService.getIsForActiveTreatment();

        patient.summaryEmailAddress = PatientCacheService.getSummaryEmailAddress();

        return patient;
    }

}