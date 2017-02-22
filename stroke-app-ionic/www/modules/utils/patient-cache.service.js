'use strict';

angular.module('utils').service('PatientCacheService', PatientCacheService);

PatientCacheService.$inject = ['LocalStorageService'];

function PatientCacheService(LocalStorageService) {
 
    //
    // general
    //

    // patient-start 
    var app_start_date_time_key = "app_start_date_time_key";
    // register-patient
    var unique_id_key = "unique_id_key";
    var initials_key = "initials_key";
    var birth_date_key = "birth_date_key";
    var estimated_age_key = "estimated_age_key";
    var external_scan_hospital_name_key = "external_scan_hospital_name_key";
    var scan_date_time_key = "scan_date_time_key";
    var hospital_unique_id_key = "hospital_unique_id_key";
    // patient-details
    var door_date_time_key = "door_date_time_key";
    var onset_date_time_key = "onset_date_time_key";
    var is_last_seen_well_onset_key = "is_last_seen_well_onset_key";
    var is_best_estimate_onset_key = "is_best_estimate_onset_key";
    // gcs-entry
    var gcs_score_key = "gcs_score_key";
    var gcs_score_eye_key = "gcs_score_eye_key";
    var gcs_score_verbal_key = "gcs_score_verbal_key";
    var gcs_score_motor_key = "gcs_score_motor_key";
    // patient-end
    var summary_email_address_key = "summary_email_address_key";

    //
    // protocol A
    //

    // anticoagulant-identification
    var anticoagulant_type_key = "anticoagulant_type_key";
    var anticoagulant_name_key = "anticoagulant_name_key";
    // calculate-beriplex-dose
    var estimated_weight_in_kg_key = "estimated_weight_in_kg_key";
    var calculated_beriplex_dose_key = "calculated_beriplex_dose_key";
    var inr_value_key = "inr_value_key";
    var inr_type_key = "inr_type_key";
    var inr_date_time_key = "inr_date_time_key";
    var administer_beriplex_when_unknown_key = "administer_beriplex_when_unknown_key";
    var is_weight_given_in_kg_key = "is_weight_given_in_kg_key";
    // confirm-beriplex-dose
    var actual_beriplex_dose_key = "actual_beriplex_dose_key";
    // administer-beriplex
    var beriplex_start_date_time_key = "beriplex_start_date_time_key";
    var vitamink_date_time_key = "vitamink_date_time_key";
    var is_infusion_instructions_viewed_key = "is_infusion_instructions_viewed_key";
    // doac-reversal-agent-details
    var doac_reversal_agent_type_key = "doac_reversal_agent_type_key";
    var doac_reversal_agent_date_time_key = "doac_reversal_agent_date_time_key";


    //
    // protocol B
    //

    // bp-management
    var bp_target_reached_date_time_key = "bp_target_reached_date_time_key";
    var bp_treatment_threshold_key = "bp_treatment_threshold_key";
    var bp_target_key = "bp_target_key";
    var bp_measurement_entries_key = "bp_measurement_entries_key";
    // critical-care-referral
    var destination_key = "destination_key";
    var other_destination_key = "other_destination_key";


    //
    // protocol C
    //

    // mrs-entry
    var premorbid_mrs_score_key = "premorbid_mrs_score_key";
    // neurosurgery-referral-criteria
    var ich_volume_key = "ich_volume_key";
    var is_posterior_fossa_ich_key = "is_posterior_fossa_ich_key";
    var is_ventricle_obstructed_key = "is_ventricle_obstructed_key";
    var ich_longest_axis_key = "ich_longest_axis_key";
    var ich_perpendicular_axis_key = "ich_perpendicular_axis_key";
    var ich_num_slices_key = "ich_num_slices_key";
    var ich_slice_thickness_key = "ich_slice_thickness_key";

    // neurosurgery-referral-summary
    var referral_to_neurosurgery_date_time_key = "referral_to_neurosurgery_date_time_key";
    var neurosurgeon_name_key = "neurosurgeon_name_key";
    var is_referral_to_neurosurgery_accepted_key = "is_referral_to_neurosurgery_accepted_key";
    var is_for_active_treatment_key = "is_for_active_treatment_key";

    var service = {

        //
        // general
        //

        // patient-start 
        getAppStartDateTime: getAppStartDateTime,
        setAppStartDateTime: setAppStartDateTime,

        // register-patient
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

        getHospitalUniqueId: getHospitalUniqueId,
        setHospitalUniqueId: setHospitalUniqueId,

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

        // patient-end
        getSummaryEmailAddress: getSummaryEmailAddress,
        setSummaryEmailAddress: setSummaryEmailAddress,

        //
        // protocol A
        //

        // anticoagulant-identification
        //DOAC, VITK, UNKNOWN, NONE
        getAnticoagulantType: getAnticoagulantType,
        setAnticoagulantType: setAnticoagulantType,

        getAnticoagulantName: getAnticoagulantName,
        setAnticoagulantName: setAnticoagulantName,

        // calculate-beriplex-dose
        getEstimatedWeightInKg: getEstimatedWeightInKg,
        setEstimatedWeightInKg: setEstimatedWeightInKg,

        getCalculatedBeriplexDose: getCalculatedBeriplexDose,
        setCalculatedBeriplexDose: setCalculatedBeriplexDose,

        getInrValue: getInrValue,
        setInrValue: setInrValue,

        getInrType: getInrType,
        setInrType: setInrType,

        getInrDateTime: getInrDateTime,
        setInrDateTime: setInrDateTime,

        getAdministerBeriplexWhenUnknown: getAdministerBeriplexWhenUnknown,
        setAdministerBeriplexWhenUnknown: setAdministerBeriplexWhenUnknown,

        getIsWeightGivenInKg: getIsWeightGivenInKg,
        setIsWeightGivenInKg: setIsWeightGivenInKg,

        // confirm-beriplex-dose
        getActualBeriplexDose: getActualBeriplexDose,
        setActualBeriplexDose: setActualBeriplexDose,

        // administer-beriplex
        getBeriplexStartDateTime: getBeriplexStartDateTime,
        setBeriplexStartDateTime: setBeriplexStartDateTime,

        getVitaminkDateTime: getVitaminkDateTime,
        setVitaminkDateTime: setVitaminkDateTime,

        getIsInfusionInstructionsViewed: getIsInfusionInstructionsViewed,
        setIsInfusionInstructionsViewed: setIsInfusionInstructionsViewed,

        // doac-reversal-agent-details
        getDoacReversalAgentType: getDoacReversalAgentType,
        setDoacReversalAgentType: setDoacReversalAgentType,

        getDoacReversalAgentDateTime: getDoacReversalAgentDateTime,
        setDoacReversalAgentDateTime: setDoacReversalAgentDateTime,

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
        getDestination: getDestination,
        setDestination: setDestination,

        getOtherDestination: getOtherDestination,
        setOtherDestination: setOtherDestination,

        //
        // protocol C
        //

        // mrs-entry
        getPremorbidMrsScore: getPremorbidMrsScore,
        setPremorbidMrsScore: setPremorbidMrsScore,

        // neurosurgery-referral-criteria
        getIchVolume: getIchVolume,
        setIchVolume: setIchVolume,

        getIsPosteriorFossaIch: getIsPosteriorFossaIch,
        setIsPosteriorFossaIch: setIsPosteriorFossaIch,
 
        getIsVentricleObstructed: getIsVentricleObstructed,
        setIsVentricleObstructed: setIsVentricleObstructed,

        getIchLongestAxis: getIchLongestAxis,
        setIchLongestAxis: setIchLongestAxis,

        getIchPerpendicularAxis: getIchPerpendicularAxis,
        setIchPerpendicularAxis: setIchPerpendicularAxis,

        getIchNumSlices: getIchNumSlices,
        setIchNumSlices: setIchNumSlices,

        getIchSliceThickness: getIchSliceThickness,
        SetIchSliceThickness: SetIchSliceThickness,

        // neurosurgery-referral-summary
        getReferralToNeurosurgeryDateTime: getReferralToNeurosurgeryDateTime,
        setReferralToNeurosurgeryDateTime: setReferralToNeurosurgeryDateTime,
 
        getNeurosurgeonName: getNeurosurgeonName,
        setNeurosurgeonName: setNeurosurgeonName,

        getIsReferralToNeurosurgeryAccepted: getIsReferralToNeurosurgeryAccepted,
        setIsReferralToNeurosurgeryAccepted: setIsReferralToNeurosurgeryAccepted,

        getIsForActiveTreatment: getIsForActiveTreatment,
        setIsForActiveTreatment: setIsForActiveTreatment,

        // reset all data to null
        clearAll: clearAll
    };

    return service;

    //
    // general
    //


    // patient-start
    function getAppStartDateTime() {
        return new Date(LocalStorageService.getItem(app_start_date_time_key));
    }

    function setAppStartDateTime(appStartDateTime) {
        LocalStorageService.setItem(app_start_date_time_key, appStartDateTime);
    }
    
    // register-patient
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

    function getHospitalUniqueId() {
        return LocalStorageService.getItem(hospital_unique_id_key);
    }

    function setHospitalUniqueId(hospitalUniqueId) {
       LocalStorageService.setItem(hospital_unique_id_key, hospitalUniqueId);
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
   
    // patient-end
    function getSummaryEmailAddress() {
        return LocalStorageService.getItem(summary_email_address_key);
    }
    
    function setSummaryEmailAddress(summaryEmailAddress) {
        LocalStorageService.setItem(summary_email_address_key, summaryEmailAddress);
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
    function getActualBeriplexDose() {
        return LocalStorageService.getItem(actual_beriplex_dose_key);
    }

    function setActualBeriplexDose(actualBeriplexDose) {
        LocalStorageService.setItem(actual_beriplex_dose_key, actualBeriplexDose);
    }

    // administer-beriplex
    function getBeriplexStartDateTime() {
        return getDate(beriplex_start_date_time_key);
    }
    
    function setBeriplexStartDateTime(beriplexStartDateTime) {
        LocalStorageService.setItem(beriplex_start_date_time_key, beriplexStartDateTime);
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

    // doac-reversal-agent-details
    function getDoacReversalAgentType() {
        return LocalStorageService.getItem(doac_reversal_agent_type_key);
    }
    
    function setDoacReversalAgentType(doacReversalAgentType) {
        LocalStorageService.setItem(doac_reversal_agent_type_key, doacReversalAgentType);
    }

    function getDoacReversalAgentDateTime() {
        return getDate(doac_reversal_agent_date_time_key);
    }

    function setDoacReversalAgentDateTime(doacReversalAgentDateTime) {
        LocalStorageService.setItem(doac_reversal_agent_date_time_key, doacReversalAgentDateTime);
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
    function getDestination() {
        return LocalStorageService.getItem(destination_key);
    }
    
    function setDestination(destination) {
        LocalStorageService.setItem(destination_key, destination);
    }
    
    function getOtherDestination() {
        return LocalStorageService.getItem(other_destination_key);
    }
    
    function setOtherDestination(otherDestination) {
        LocalStorageService.setItem(other_destination_key, otherDestination);
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
    function getIchVolume() {
        return LocalStorageService.getItem(ich_volume_key);
    }
    
    function setIchVolume(ichVolume) {
        LocalStorageService.setItem(ich_volume_key, ichVolume);
    }

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

    function getIchLongestAxis() {
        return LocalStorageService.getItem(ich_longest_axis_key);
    }
    
    function setIchLongestAxis(ichLongestAxis) {
        LocalStorageService.setItem(ich_longest_axis_key, ichLongestAxis);
    }

    function getIchPerpendicularAxis() {
        return LocalStorageService.getItem(ich_perpendicular_axis_key);
    }
    
    function setIchPerpendicularAxis(ichPerpendicularAxis) {
        LocalStorageService.setItem(ich_perpendicular_axis_key, ichPerpendicularAxis);
    }

    function getIchNumSlices() {
        return LocalStorageService.getItem(ich_num_slices_key);
    }
    
    function setIchNumSlices(ichNumSlices) {
        LocalStorageService.setItem(ich_num_slices_key, ichNumSlices);
    }

    function getIchSliceThickness() {
        return LocalStorageService.getItem(ich_slice_thickness_key);
    }
    
    function SetIchSliceThickness(ichSliceThickness) {
        LocalStorageService.setItem(ich_slice_thickness_key, ichSliceThickness);
    }

    // neurosurgery-referral-summary        
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
    
    function getIsForActiveTreatment() {
         return LocalStorageService.getItem(is_for_active_treatment_key);
   }
    
    function setIsForActiveTreatment(isForActiveTreatment) {
        LocalStorageService.setItem(is_for_active_treatment_key, isForActiveTreatment);
    }

    function clearAll() {
        LocalStorageService.setItem(app_start_date_time_key, null);
        LocalStorageService.setItem(unique_id_key, null);
        LocalStorageService.setItem(initials_key, null);
        LocalStorageService.setItem(birth_date_key, null);
        LocalStorageService.setItem(estimated_age_key, null);
        LocalStorageService.setItem(external_scan_hospital_name_key, null);
        LocalStorageService.setItem(scan_date_time_key, null);
        LocalStorageService.setItem(hospital_unique_id_key, null);
        LocalStorageService.setItem(door_date_time_key, null);
        LocalStorageService.setItem(onset_date_time_key, null);
        LocalStorageService.setItem(is_last_seen_well_onset_key, null);
        LocalStorageService.setItem(is_best_estimate_onset_key, null);
        LocalStorageService.setItem(gcs_score_key, null);
        LocalStorageService.setItem(gcs_score_eye_key, null);
        LocalStorageService.setItem(gcs_score_verbal_key, null);
        LocalStorageService.setItem(gcs_score_motor_key, null);
        LocalStorageService.setItem(summary_email_address_key, null);
        LocalStorageService.setItem(anticoagulant_type_key, null);
        LocalStorageService.setItem(anticoagulant_name_key, null);
        LocalStorageService.setItem(estimated_weight_in_kg_key, null);
        LocalStorageService.setItem(calculated_beriplex_dose_key, null);
        LocalStorageService.setItem(inr_value_key, null);
        LocalStorageService.setItem(inr_type_key, null);
        LocalStorageService.setItem(inr_date_time_key, null);
        LocalStorageService.setItem(administer_beriplex_when_unknown_key, null);
        LocalStorageService.setItem(is_weight_given_in_kg_key, null);        
        LocalStorageService.setItem(actual_beriplex_dose_key, null);
        LocalStorageService.setItem(beriplex_start_date_time_key, null);
        LocalStorageService.setItem(vitamink_date_time_key, null);
        LocalStorageService.setItem(is_infusion_instructions_viewed_key, null);
        LocalStorageService.setItem(doac_reversal_agent_type_key, null);
        LocalStorageService.setItem(doac_reversal_agent_date_time_key, null);
        LocalStorageService.setItem(bp_target_reached_date_time_key, null);
        LocalStorageService.setItem(bp_treatment_threshold_key, null);
        LocalStorageService.setItem(bp_target_key, null);
        LocalStorageService.setItem(bp_measurement_entries_key, null);
        LocalStorageService.setItem(destination_key, null);
        LocalStorageService.setItem(other_destination_key, null);
        LocalStorageService.setItem(premorbid_mrs_score_key, null);
        LocalStorageService.setItem(ich_volume_key, null);
        LocalStorageService.setItem(is_posterior_fossa_ich_key, null);
        LocalStorageService.setItem(is_ventricle_obstructed_key, null);
        LocalStorageService.setItem(ich_longest_axis_key, null);
        LocalStorageService.setItem(ich_perpendicular_axis_key, null);
        LocalStorageService.setItem(ich_num_slices_key, null);
        LocalStorageService.setItem(ich_slice_thickness_key, null);
        LocalStorageService.setItem(referral_to_neurosurgery_date_time_key, null);
        LocalStorageService.setItem(neurosurgeon_name_key, null);
        LocalStorageService.setItem(is_referral_to_neurosurgery_accepted_key, null);
        LocalStorageService.setItem(is_for_active_treatment_key, null);
    }

    function getDate(key) {
        var date = LocalStorageService.getItem(key);
        if (date !== null) {
            date = new Date(date);
        }
        return date;
    }

}