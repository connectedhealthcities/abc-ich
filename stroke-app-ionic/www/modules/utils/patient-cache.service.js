'use strict';

angular.module('utils').service('PatientCacheService', PatientCacheService);

PatientCacheService.$inject = ['LocalStorageService'];

function PatientCacheService(LocalStorageService) {
 
    //
    // general
    //

    // patient-start 
    var app_start_date_time_key = "patient-app-start-date-time";
    // register-patient
    var id_key = "patient-id";
    var unique_id_key = "patient-unique-id";
    var initials_key = "patient-initials";
    var birth_date_key = "patient-birth-date";
    var estimated_age_key = "patient-estimated-age";
    var external_scan_hospital_name_key = "patient-external-scan-hospital-name";
    var scan_date_time_key = "patient-scan-date-time";
    // patient-details
    var door_date_time_key = "patient-door-date-time";
    var onset_date_time_key = "patient-onset-date-time";
    var is_last_seen_well_onset_key = "patient-is-last-seen-well-onset";
    var is_best_estimate_onset_key = "patient-is-best-estimate-onset";
    // gcs-entry
    var gcs_score_key = "patient-gcs-score";
    var gcs_score_eye_key = "patient-gcs-score-eye";
    var gcs_score_verbal_key = "patient-gcs-score-verbal";
    var gcs_score_motor_key = "patient-gcs-score-motor";

    //
    // protocol A
    //

    // anticoagulant-identification
    var anticoagulant_type_key = "patient-anticoagulant-type";
    var anticoagulant_name_key = "patient-anticoagulant-name";
    // calculate-beriplex-dose
    var reversal_agent_administered_at_external_hospital_key = "patient-reversal-agent-administered-at-external-hospital";
    var reversal_agent_administered_time_known_key = "patient-reversal-agent-administered-time-known";    
    var administer_beriplex_without_inr_key = "patient-administer-beriplex-without-inr";
    var estimated_weight_in_kg_key = "patient-estimated-weight-in-kg";
    var calculated_beriplex_dose_key = "patient-calculated-beriplex-dose";
    var inr_value_key = "patient-inr-value";
    var inr_type_key = "patient-inr-type";
    var inr_date_time_key = "patient-inr-date-time";
    var administer_beriplex_when_unknown_key = "patient-administer-beriplex-when-unknown";
    var is_weight_given_in_kg_key = "patient-is-weight-given-in-kg"; // Local
    // confirm-beriplex-dose
    var selected_pcc_type_key = "selected-pcc-type";
    var actual_beriplex_dose_key = "patient-actual-beriplex-dose";
    // administer-beriplex
    var is_vitamink_administered_key = "patient-is-vitamink-administered"; // Local
    var vitamink_date_time_key = "patient-vitamink-date-time";
    var is_infusion_instructions_viewed_key = "patient-is-infusion-instructions-viewed";
    var topup_dose_key = "topup-dose";
    // reversal-agent-details
    var reversal_agent_type_key = "patient-reversal-agent-type";
    var reversal_agent_start_date_time_key = "patient-reversal-agent-start-date-time";
    var has_doac_been_taken_key = "has-doac-been-taken";

    //
    // protocol B
    //

    // bp-management
    var bp_target_reached_date_time_key = "patient-bp-target-reached-date-time";
    var bp_treatment_threshold_key = "patient-bp-treatment-threshold";
    var bp_target_key = "patient-bp-target";
    var bp_measurement_entries_key = "patient-bp-measurement-entries";
    // critical-care-referral
    var is_referred_to_critical_care_key = "patient-is-referred-to-critical-care";

    //
    // protocol C
    //

    // mrs-entry
    var premorbid_mrs_score_key = "patient-premorbid-mrs-score";
    // neurosurgery-referral-criteria
    var is_posterior_fossa_ich_key = "patient-is-posterior-fossa-ich";
    var is_ventricle_obstructed_key = "patient-is-ventricle-obstructed";
    var ich_entries_key = "patient_ich_entries";

    // neurosurgery-referral-summary
    var is_referred_to_neurosurgery_key = "patient-is-referred-to-neurosurgery"; //local
    var referral_to_neurosurgery_date_time_key = "patient-referral-to-neurosurgery-date-time";
    var neurosurgeon_name_key = "patient-neurosurgeon-name";
    var is_referral_to_neurosurgery_accepted_key = "patient-is-referral-to-neurosurgery-accepted";

    var service = {

        //
        // general
        //

        // patient-start 
        getAppStartDateTime: getAppStartDateTime,
        setAppStartDateTime: setAppStartDateTime,

        // register-patient
        getId: getId,
        setId: setId,

        getUniqueId: getUniqueId,
        setUniqueId: setUniqueId,

        getInitials: getInitials,
        setInitials: setInitials,
 
        getBirthDate: getBirthDate,
        setBirthDate: setBirthDate,

        getEstimatedAge: getEstimatedAge,
        setEstimatedAge: setEstimatedAge,

        getExternalScanHospitalName: getExternalScanHospitalName,
        setExternalScanHospitalName: setExternalScanHospitalName,

        getScanDateTime: getScanDateTime,
        setScanDateTime: setScanDateTime,

        // patient-details
        getDoorDateTime: getDoorDateTime,
        setDoorDateTime: setDoorDateTime,
 
        getOnsetDateTime: getOnsetDateTime,
        setOnsetDateTime: setOnsetDateTime,

        getIsLastSeenWellOnset: getIsLastSeenWellOnset,
        setIsLastSeenWellOnset: setIsLastSeenWellOnset,

        getIsBestEstimateOnset: getIsBestEstimateOnset,
        setIsBestEstimateOnset: setIsBestEstimateOnset,

        // gcs-entry
        getGcsScore: getGcsScore,
        setGcsScore: setGcsScore,

        getGcsScoreEye: getGcsScoreEye,
        setGcsScoreEye: setGcsScoreEye,

        getGcsScoreVerbal: getGcsScoreVerbal,
        setGcsScoreVerbal: setGcsScoreVerbal,

        getGcsScoreMotor: getGcsScoreMotor,
        setGcsScoreMotor: setGcsScoreMotor,

        //
        // protocol A
        //

        // anticoagulant-identification
        // Enum: DOAC, Vitamin K antagonist, Unknown, None
        getAnticoagulantType: getAnticoagulantType,
        setAnticoagulantType: setAnticoagulantType,

        getAnticoagulantName: getAnticoagulantName,
        setAnticoagulantName: setAnticoagulantName,

        // calculate-beriplex-dose
        getReversalAgentAdministeredAtExternalHospital: getReversalAgentAdministeredAtExternalHospital,
        setReversalAgentAdministeredAtExternalHospital: setReversalAgentAdministeredAtExternalHospital,

        getReversalAgentAdministeredTimeKnown: getReversalAgentAdministeredTimeKnown,
        setReversalAgentAdministeredTimeKnown: setReversalAgentAdministeredTimeKnown,

        getAdministerBeriplexWithoutInr: getAdministerBeriplexWithoutInr,
        setAdministerBeriplexWithoutInr: setAdministerBeriplexWithoutInr,
        
        getEstimatedWeightInKg: getEstimatedWeightInKg,
        setEstimatedWeightInKg: setEstimatedWeightInKg,

        getCalculatedBeriplexDose: getCalculatedBeriplexDose,
        setCalculatedBeriplexDose: setCalculatedBeriplexDose,

        getInrValue: getInrValue,
        setInrValue: setInrValue,

        // Enum: Point of care, Laboratory
        getInrType: getInrType,
        setInrType: setInrType,

        getInrDateTime: getInrDateTime,
        setInrDateTime: setInrDateTime,

        getAdministerBeriplexWhenUnknown: getAdministerBeriplexWhenUnknown,
        setAdministerBeriplexWhenUnknown: setAdministerBeriplexWhenUnknown,

        getIsWeightGivenInKg: getIsWeightGivenInKg,
        setIsWeightGivenInKg: setIsWeightGivenInKg,

        // confirm-beriplex-dose
        getSelectedPCCType: getSelectedPCCType,
        setSelectedPCCType: setSelectedPCCType,

        getActualBeriplexDose: getActualBeriplexDose,
        setActualBeriplexDose: setActualBeriplexDose,

        // administer-beriplex
        getIsVitaminkAdministered: getIsVitaminkAdministered,
        setIsVitaminkAdministered: setIsVitaminkAdministered,

        getVitaminkDateTime: getVitaminkDateTime,
        setVitaminkDateTime: setVitaminkDateTime,

        getIsInfusionInstructionsViewed: getIsInfusionInstructionsViewed,
        setIsInfusionInstructionsViewed: setIsInfusionInstructionsViewed,

        getTopupDose: getTopupDose,
        setTopupDose: setTopupDose,

        // reversal-agent-details
        // Enum: Idarucizumab, PCC, None
        getReversalAgentType: getReversalAgentType,
        setReversalAgentType: setReversalAgentType,

        getReversalAgentStartDateTime: getReversalAgentStartDateTime,
        setReversalAgentStartDateTime: setReversalAgentStartDateTime,

        getHasDoacBeenTaken: getHasDoacBeenTaken,
        setHasDoacBeenTaken: setHasDoacBeenTaken,

        //
        // protocol B
        //

        // bp-management
        getBpTargetReachedDateTime: getBpTargetReachedDateTime,
        setBpTargetReachedDateTime: setBpTargetReachedDateTime,

        getBpTreatmentThreshold: getBpTreatmentThreshold,
        setBpTreatmentThreshold: setBpTreatmentThreshold,

        getBpTarget: getBpTarget,
        setBpTarget: setBpTarget,

        getBpMeasurementEntries: getBpMeasurementEntries,
        addBpMeasurementEntry: addBpMeasurementEntry,

        // critical-care-referral
        getIsReferredToCriticalCare: getIsReferredToCriticalCare,
        setIsReferredToCriticalCare: setIsReferredToCriticalCare,

        //
        // protocol C
        //

        // mrs-entry
        getPremorbidMrsScore: getPremorbidMrsScore,
        setPremorbidMrsScore: setPremorbidMrsScore,

        // neurosurgery-referral-criteria
        getIsPosteriorFossaIch: getIsPosteriorFossaIch,
        setIsPosteriorFossaIch: setIsPosteriorFossaIch,
  
        getIsVentricleObstructed: getIsVentricleObstructed,
        setIsVentricleObstructed: setIsVentricleObstructed,

        getIchEntries: getIchEntries,
        addIchEntry: addIchEntry,

        getTotalIchVolume: getTotalIchVolume,

        // neurosurgery-referral-summary
        getIsReferredToNeurosurgery: getIsReferredToNeurosurgery,
        setIsReferredToNeurosurgery: setIsReferredToNeurosurgery,

        getReferralToNeurosurgeryDateTime: getReferralToNeurosurgeryDateTime,
        setReferralToNeurosurgeryDateTime: setReferralToNeurosurgeryDateTime,
 
        getNeurosurgeonName: getNeurosurgeonName,
        setNeurosurgeonName: setNeurosurgeonName,

        getIsReferralToNeurosurgeryAccepted: getIsReferralToNeurosurgeryAccepted,
        setIsReferralToNeurosurgeryAccepted: setIsReferralToNeurosurgeryAccepted,

        // reset all data to null
        clearAll: clearAll
    };

    return service;

    //
    // general
    //


    // patient-start
    function getAppStartDateTime() {
        return getDate(app_start_date_time_key);
    }

    function setAppStartDateTime(appStartDateTime) {
        LocalStorageService.setItem(app_start_date_time_key, appStartDateTime);
    }
    
    // register-patient
    function getId() {
        return LocalStorageService.getItem(id_key);
    }

    function setId(id) {
        LocalStorageService.setItem(id_key, id);
    }

    function getUniqueId() {
        return LocalStorageService.getItem(unique_id_key);
    }

    function setUniqueId(uniqueId) {
        LocalStorageService.setItem(unique_id_key, uniqueId);
    }
    
    function getInitials() {
        return LocalStorageService.getItem(initials_key);
    }

    function setInitials(initials) {
        LocalStorageService.setItem(initials_key, initials);
    }

    function getBirthDate() {
        return getDate(birth_date_key);
    }

    function setBirthDate(birthDate) {
        LocalStorageService.setItem(birth_date_key, birthDate);
    }

    function getEstimatedAge() {
        return LocalStorageService.getItem(estimated_age_key);
    }

    function setEstimatedAge(estimatedAge) {
         LocalStorageService.setItem(estimated_age_key, estimatedAge);
   }

    function getExternalScanHospitalName() {
       return LocalStorageService.getItem(external_scan_hospital_name_key);
    }

    function setExternalScanHospitalName(externalScanHospitalName) {
        LocalStorageService.setItem(external_scan_hospital_name_key, externalScanHospitalName);
    }
    
    function getScanDateTime() {
        return getDate(scan_date_time_key);
    }

    function setScanDateTime(scanDateTime) {
        LocalStorageService.setItem(scan_date_time_key, scanDateTime);
    }
    
    // patient-details
    function getDoorDateTime() {
        return getDate(door_date_time_key);
    }

    function setDoorDateTime(doorDateTime) {
        LocalStorageService.setItem(door_date_time_key, doorDateTime);
    }

    function getOnsetDateTime() {
        return getDate(onset_date_time_key);
    }

    function setOnsetDateTime(onsetDateTime) {
        LocalStorageService.setItem(onset_date_time_key, onsetDateTime);
    }

    function getIsLastSeenWellOnset() {
       return LocalStorageService.getItem(is_last_seen_well_onset_key);
    }

    function setIsLastSeenWellOnset(isLastSeenWellOnset) {
        LocalStorageService.setItem(is_last_seen_well_onset_key, isLastSeenWellOnset);
    }

    function getIsBestEstimateOnset() {
        return LocalStorageService.getItem(is_best_estimate_onset_key);
    }

    function setIsBestEstimateOnset(isBestEstimateOnset) {
         LocalStorageService.setItem(is_best_estimate_onset_key, isBestEstimateOnset);
    }
   
    // gcs-entry
    function getGcsScore() {
        return LocalStorageService.getItem(gcs_score_key);
    }
    
    function setGcsScore(gcsScore) {
        LocalStorageService.setItem(gcs_score_key, gcsScore);
    }
    
    function getGcsScoreEye() {
        return LocalStorageService.getItem(gcs_score_eye_key);
    }

    function setGcsScoreEye(gcsScoreEye) {
        LocalStorageService.setItem(gcs_score_eye_key, gcsScoreEye);
    }
    
    function getGcsScoreVerbal() {
        return LocalStorageService.getItem(gcs_score_verbal_key);
    }
    
    function setGcsScoreVerbal(gcsScoreVerbal) {
        LocalStorageService.setItem(gcs_score_verbal_key, gcsScoreVerbal);
    }

    function getGcsScoreMotor() {
        return LocalStorageService.getItem(gcs_score_motor_key);
    }

    function setGcsScoreMotor(gcsScoreMotor) {
        LocalStorageService.setItem(gcs_score_motor_key, gcsScoreMotor);
    }
   
    //
    // protocol A
    //


    // anticoagulant-identification
    function getAnticoagulantType() {
        return LocalStorageService.getItem(anticoagulant_type_key);
    }

    function setAnticoagulantType(anticoagulantType) {
        LocalStorageService.setItem(anticoagulant_type_key, anticoagulantType);
    }
    
    function getAnticoagulantName() {
        return LocalStorageService.getItem(anticoagulant_name_key);
    }
    
    function setAnticoagulantName(anticoagulantName) {
        LocalStorageService.setItem(anticoagulant_name_key, anticoagulantName);
    }

    // calculate-beriplex-dose

    function getReversalAgentAdministeredAtExternalHospital() {
        return LocalStorageService.getItem(reversal_agent_administered_at_external_hospital_key);
    }
    
    function setReversalAgentAdministeredAtExternalHospital(reversalAgentAdministeredAtExternalHospital) {
        LocalStorageService.setItem(reversal_agent_administered_at_external_hospital_key, reversalAgentAdministeredAtExternalHospital);
    }

    function getReversalAgentAdministeredTimeKnown() {
        return LocalStorageService.getItem(reversal_agent_administered_time_known_key);
    }
    
    function setReversalAgentAdministeredTimeKnown(reversalAgentAdministeredTimeKnown) {
        LocalStorageService.setItem(reversal_agent_administered_time_known_key, reversalAgentAdministeredTimeKnown);
    }

    function getAdministerBeriplexWithoutInr() {
        return LocalStorageService.getItem(administer_beriplex_without_inr_key);
    }
    
    function setAdministerBeriplexWithoutInr(administerBeriplexWithoutInr) {
        LocalStorageService.setItem(administer_beriplex_without_inr_key, administerBeriplexWithoutInr);
    }

    function getEstimatedWeightInKg() {
        return LocalStorageService.getItem(estimated_weight_in_kg_key);
    }
    
    function setEstimatedWeightInKg(estimatedWeightInKg) {
        LocalStorageService.setItem(estimated_weight_in_kg_key, estimatedWeightInKg);
    }
    
    function getCalculatedBeriplexDose() {
        return LocalStorageService.getItem(calculated_beriplex_dose_key);
    }
    
    function setCalculatedBeriplexDose(calculatedBeriplexDose) {
        LocalStorageService.setItem(calculated_beriplex_dose_key, calculatedBeriplexDose);
    }
    
    function getInrValue() {
        return LocalStorageService.getItem(inr_value_key);
    }
    
    function setInrValue(inrValue) {
        LocalStorageService.setItem(inr_value_key, inrValue);
    }
    
    function getInrType() {
        return LocalStorageService.getItem(inr_type_key);
    }
    
    function setInrType(inrType) {
        LocalStorageService.setItem(inr_type_key, inrType);
    }
    
    function getInrDateTime() {
        return getDate(inr_date_time_key);
    }
    
    function setInrDateTime(inrDateTime) {
        LocalStorageService.setItem(inr_date_time_key, inrDateTime);
    }

    function getAdministerBeriplexWhenUnknown() {
         return LocalStorageService.getItem(administer_beriplex_when_unknown_key);
    }
    
    function setAdministerBeriplexWhenUnknown(shouldAdministerBeriplexWhenAnticoagulantUnknown) {
        LocalStorageService.setItem(administer_beriplex_when_unknown_key, shouldAdministerBeriplexWhenAnticoagulantUnknown);
    }

    function getIsWeightGivenInKg() {
        return LocalStorageService.getItem(is_weight_given_in_kg_key);
    }

    function setIsWeightGivenInKg(isWeightGivenInKg) {
        LocalStorageService.setItem(is_weight_given_in_kg_key, isWeightGivenInKg);
    }

    // confirm-beriplex-dose
    function getSelectedPCCType(){
        return LocalStorageService.getItem(selected_pcc_type_key);
    }

    function setSelectedPCCType(selectedPCCType){
        LocalStorageService.setItem(selected_pcc_type_key, selectedPCCType);
    }

    function getActualBeriplexDose() {
        return LocalStorageService.getItem(actual_beriplex_dose_key);
    }

    function setActualBeriplexDose(actualBeriplexDose) {
        LocalStorageService.setItem(actual_beriplex_dose_key, actualBeriplexDose);
    }

    // administer-beriplex

    function getIsVitaminkAdministered() {
        return LocalStorageService.getItem(is_vitamink_administered_key);
    }
    
    function setIsVitaminkAdministered(isVitaminkAdministered) {
        LocalStorageService.setItem(is_vitamink_administered_key, isVitaminkAdministered);
    }

    function getVitaminkDateTime() {
         return getDate(vitamink_date_time_key);
   }
    
    function setVitaminkDateTime(vitaminkDateTime) {
        LocalStorageService.setItem(vitamink_date_time_key, vitaminkDateTime);
    }
    
    function getIsInfusionInstructionsViewed() {
        return LocalStorageService.getItem(is_infusion_instructions_viewed_key);
    }
    
    function setIsInfusionInstructionsViewed(isInfusionInstructionsViewed) {
        LocalStorageService.setItem(is_infusion_instructions_viewed_key, isInfusionInstructionsViewed);
    }

    function getTopupDose(){
        return LocalStorageService.getItem(topup_dose_key);
    }

    function setTopupDose(topupDose){
        LocalStorageService.setItem(topup_dose_key, topupDose);
    }

    // reversal-agent-details
    function getReversalAgentType() {
        return LocalStorageService.getItem(reversal_agent_type_key);
    }
    
    function setReversalAgentType(reversalAgentType) {
        LocalStorageService.setItem(reversal_agent_type_key, reversalAgentType);
    }

    function getReversalAgentStartDateTime() {
        return getDate(reversal_agent_start_date_time_key);
    }

    function setReversalAgentStartDateTime(reversalAgentStartDateTime) {
        LocalStorageService.setItem(reversal_agent_start_date_time_key, reversalAgentStartDateTime);
    }

    function getHasDoacBeenTaken(){
        return LocalStorageService.getItem(has_doac_been_taken_key);
    }

    function setHasDoacBeenTaken(has_doac_been_taken){
        LocalStorageService.setItem(has_doac_been_taken_key, has_doac_been_taken);
    }

    //
    // protocol B
    //

    
    // bp-management
    function getBpTargetReachedDateTime() {
        return getDate(bp_target_reached_date_time_key);
    }
    
    function setBpTargetReachedDateTime(bpTargetReachedDateTime) {
        LocalStorageService.setItem(bp_target_reached_date_time_key, bpTargetReachedDateTime);
    }
    
    function getBpTreatmentThreshold() {
        return LocalStorageService.getItem(bp_treatment_threshold_key);
    }
    
    function setBpTreatmentThreshold(bpTreatmentThreshold) {
        LocalStorageService.setItem(bp_treatment_threshold_key, bpTreatmentThreshold);
    }
    
    function getBpTarget() {
        return LocalStorageService.getItem(bp_target_key);
    }
    
    function setBpTarget(bpTarget) {
        LocalStorageService.setItem(bp_target_key, bpTarget);
    }

    function getBpMeasurementEntries() {
        var entries =  LocalStorageService.getItem(bp_measurement_entries_key);
        if (entries === null) {
            entries = [];
        }
        else {
            for(var i = 0; i < entries.length; i++) {
                entries[i].dateTime = new Date(entries[i].dateTime);
            }
        }
        return entries;
    }

    function addBpMeasurementEntry(bpMeasurementEntry) {
        var entries = getBpMeasurementEntries();
        entries.push(bpMeasurementEntry);
        LocalStorageService.setItem(bp_measurement_entries_key, entries);
    }
    
    // critical-care-referral
    function getIsReferredToCriticalCare() {
        return LocalStorageService.getItem(is_referred_to_critical_care_key);
    }
    
    function setIsReferredToCriticalCare(isReferredToCriticalCare) {
        LocalStorageService.setItem(is_referred_to_critical_care_key, isReferredToCriticalCare);
    }
    
    //
    // protocol C
    //


    // mrs-entry
    function getPremorbidMrsScore() {
        return LocalStorageService.getItem(premorbid_mrs_score_key);
    }

    function setPremorbidMrsScore(premorbidMrsScore) {
        LocalStorageService.setItem(premorbid_mrs_score_key, premorbidMrsScore);
    }

    // neurosurgery-referral-criteria  
    function getIsPosteriorFossaIch() {
        return LocalStorageService.getItem(is_posterior_fossa_ich_key);
    }
    
    function setIsPosteriorFossaIch(isPosteriorFossaIch) {
        LocalStorageService.setItem(is_posterior_fossa_ich_key, isPosteriorFossaIch);
    }
    
    function getIsVentricleObstructed() {
        return LocalStorageService.getItem(is_ventricle_obstructed_key);
    }
    
    function setIsVentricleObstructed(isVentricleObstructed) {
        LocalStorageService.setItem(is_ventricle_obstructed_key, isVentricleObstructed);
    }

    function getIchEntries(){
        var entries = LocalStorageService.getItem(ich_entries_key);
        if(entries === null){
            entries = [];
        }
        return entries;
    }

    function addIchEntry(ichEntry){
        var entries = getIchEntries();
        entries.push(ichEntry);
        LocalStorageService.setItem(ich_entries_key, entries);
    }

    function getTotalIchVolume(){
        var entries = getIchEntries();
        var totalVolume = 0.0;
        for(var i = 0; i < entries.length; i++){
            totalVolume += parseFloat(entries[i].ichVolume);
        }
        return totalVolume.toFixed(2);
    }

    // neurosurgery-referral-summary
    
        
    function getIsReferredToNeurosurgery() {
        return LocalStorageService.getItem(is_referred_to_neurosurgery_key);
    }

    function setIsReferredToNeurosurgery(isReferredToNeurosurgery) {
        LocalStorageService.setItem(is_referred_to_neurosurgery_key, isReferredToNeurosurgery);
    }
     
    function getReferralToNeurosurgeryDateTime() {
        return getDate(referral_to_neurosurgery_date_time_key);
    }
    
    function setReferralToNeurosurgeryDateTime(referralToNeurosurgeryDateTime) {
        LocalStorageService.setItem(referral_to_neurosurgery_date_time_key, referralToNeurosurgeryDateTime);
    }
    
    function getNeurosurgeonName() {
        return LocalStorageService.getItem(neurosurgeon_name_key);
    }
    
    function setNeurosurgeonName(neurosurgeonName) {
        LocalStorageService.setItem(neurosurgeon_name_key, neurosurgeonName);
    }

    function getIsReferralToNeurosurgeryAccepted() {
        return LocalStorageService.getItem(is_referral_to_neurosurgery_accepted_key);
    }
    
    function setIsReferralToNeurosurgeryAccepted(isReferralToNeurosurgeryAccepted) {
        LocalStorageService.setItem(is_referral_to_neurosurgery_accepted_key, isReferralToNeurosurgeryAccepted);
    }

    function clearAll() {
        LocalStorageService.setItem(app_start_date_time_key, null);
        LocalStorageService.setItem(id_key, null);
        LocalStorageService.setItem(unique_id_key, null);
        LocalStorageService.setItem(initials_key, null);
        LocalStorageService.setItem(birth_date_key, null);
        LocalStorageService.setItem(estimated_age_key, null);
        LocalStorageService.setItem(external_scan_hospital_name_key, null);
        LocalStorageService.setItem(scan_date_time_key, null);
        LocalStorageService.setItem(door_date_time_key, null);
        LocalStorageService.setItem(onset_date_time_key, null);
        LocalStorageService.setItem(is_last_seen_well_onset_key, null);
        LocalStorageService.setItem(is_best_estimate_onset_key, null);
        LocalStorageService.setItem(gcs_score_key, null);
        LocalStorageService.setItem(gcs_score_eye_key, null);
        LocalStorageService.setItem(gcs_score_verbal_key, null);
        LocalStorageService.setItem(gcs_score_motor_key, null);
        LocalStorageService.setItem(anticoagulant_type_key, null);
        LocalStorageService.setItem(anticoagulant_name_key, null); 
        LocalStorageService.setItem(reversal_agent_administered_at_external_hospital_key, null);
        LocalStorageService.setItem(reversal_agent_administered_time_known_key, null);
        LocalStorageService.setItem(administer_beriplex_without_inr_key, null);
        LocalStorageService.setItem(estimated_weight_in_kg_key, null);
        LocalStorageService.setItem(calculated_beriplex_dose_key, null);
        LocalStorageService.setItem(inr_value_key, null);
        LocalStorageService.setItem(inr_type_key, null);
        LocalStorageService.setItem(inr_date_time_key, null);
        LocalStorageService.setItem(administer_beriplex_when_unknown_key, null);
        LocalStorageService.setItem(is_weight_given_in_kg_key, null);        
        LocalStorageService.setItem(actual_beriplex_dose_key, null);           
        LocalStorageService.setItem(is_vitamink_administered_key, null);
        LocalStorageService.setItem(vitamink_date_time_key, null);
        LocalStorageService.setItem(is_infusion_instructions_viewed_key, null);
        LocalStorageService.setItem(reversal_agent_type_key, null);
        LocalStorageService.setItem(reversal_agent_start_date_time_key, null);
        LocalStorageService.setItem(bp_target_reached_date_time_key, null);
        LocalStorageService.setItem(bp_treatment_threshold_key, null);
        LocalStorageService.setItem(bp_target_key, null);
        LocalStorageService.setItem(bp_measurement_entries_key, null);
        LocalStorageService.setItem(is_referred_to_critical_care_key, null);
        LocalStorageService.setItem(premorbid_mrs_score_key, null);
        LocalStorageService.setItem(is_posterior_fossa_ich_key, null);
        LocalStorageService.setItem(is_ventricle_obstructed_key, null);
        LocalStorageService.setItem(ich_entries_key, null);    
        LocalStorageService.setItem(is_referred_to_neurosurgery_key, null);
        LocalStorageService.setItem(referral_to_neurosurgery_date_time_key, null);
        LocalStorageService.setItem(neurosurgeon_name_key, null);
        LocalStorageService.setItem(is_referral_to_neurosurgery_accepted_key, null);
        LocalStorageService.setItem(selected_pcc_type_key, null);
        LocalStorageService.setItem(topup_dose_key, null);
        LocalStorageService.setItem(has_doac_been_taken_key, null);
    }

    function getDate(key) {
        var date = LocalStorageService.getItem(key);
        if (date !== null) {
            date = new Date(date);
        }
        return date;
    }

}