'use strict';

angular.module('app.general').service('PatientEndControllerService', PatientEndControllerService);

PatientEndControllerService.$inject = ['PatientCacheService', 'EnumService'];

function PatientEndControllerService(PatientCacheService, EnumService) {
 
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

        patient.anticoagulantType = EnumService.getServerEnumForAnticoagulantType(PatientCacheService.getAnticoagulantType()); // Enum
        patient.anticoagulantName = PatientCacheService.getAnticoagulantName();

        patient.reversalAgentAdministeredAtExternalHospital = PatientCacheService.getReversalAgentAdministeredAtExternalHospital();
        patient.reversalAgentAdministeredTimeKnown = PatientCacheService.getReversalAgentAdministeredTimeKnown();
        patient.administerBeriplexWithoutInr = PatientCacheService.getAdministerBeriplexWithoutInr();
        patient.estimatedWeightInKg = PatientCacheService.getEstimatedWeightInKg();
        patient.inrValue = PatientCacheService.getInrValue();
        patient.inrType = EnumService.getServerEnumForInrType(PatientCacheService.getInrType()); // Enum
        patient.inrDateTime = PatientCacheService.getInrDateTime();
        patient.calculatedBeriplexDose = PatientCacheService.getCalculatedBeriplexDose();
        patient.administerBeriplexWhenAnticoagulantUnknown = PatientCacheService.getAdministerBeriplexWhenUnknown();

        patient.actualBeriplexDose = PatientCacheService.getActualBeriplexDose();

        patient.vitaminkDateTime = PatientCacheService.getVitaminkDateTime();
        patient.infusionInstructionsViewed = PatientCacheService.getIsInfusionInstructionsViewed();

        patient.reversalAgentType = EnumService.getServerEnumForReversalAgentType(PatientCacheService.getReversalAgentType()); // Enum       
        patient.reversalAgentStartDateTime = PatientCacheService.getReversalAgentStartDateTime(); 

        patient.bpTargetReachedDateTime = PatientCacheService.getBpTargetReachedDateTime();
        patient.bpTreatmentThreshold = PatientCacheService.getBpTreatmentThreshold();
        patient.bpTarget = PatientCacheService.getBpTarget();
        patient.bpManagementEntries = PatientCacheService.getBpMeasurementEntries();

        patient.referredToCriticalCare = PatientCacheService.getIsReferredToCriticalCare()
 
        patient.premorbidMrsScore = PatientCacheService.getPremorbidMrsScore();    

        patient.ichVolume = PatientCacheService.getIchVolume();
        patient.posteriorFossaIch = PatientCacheService.getIsPosteriorFossaIch();
        patient.ventricleObstructed = PatientCacheService.getIsVentricleObstructed();

        patient.referralToNeurosurgeryDateTime = PatientCacheService.getReferralToNeurosurgeryDateTime();
        patient.neurosurgeonName = PatientCacheService.getNeurosurgeonName();
        patient.referralToNeurosurgeryAccepted = PatientCacheService.getIsReferralToNeurosurgeryAccepted();

        patient.summaryEmailAddress = PatientCacheService.getSummaryEmailAddress();

        return patient;
    }

}