'use strict';

angular.module('utils').service('PatientCacheService', PatientCacheService);

PatientCacheService.$inject = [];

function PatientCacheService() {

    //
    // general
    //

    // patient-start 
    var _appStartDateTime = null;
    // register-patient
    var _uniqueId = null;
    var _initials = null;
    var _birthDate = null;
    var _estimatedAge = null;
    var _externalScanHospitalName = null;
    var _scanDateTime = null;
    var _hospitalUniqueId = null;
    // patient-details
    var _doorDateTime = null;
    var _onsetDateTime = null;
    var _isLastSeenWellOnset = null;
    var _isBestEstimateOnset = null;
    // gcs-entry
    var _gcsScore = 9; //cjd
    var _gcsScoreEye = null;
    var _gcsScoreVerbal = null;
    var _gcsScoreMotor = null;
    // patient-end
    var _summaryEmailAddress = null;

    //
    // protocol A
    //

    // anticoagulant-identification
    var _anticoagulantType = "VITK"; //cjd
    var _antiCoagulantName = null;
    // calculate-beriplex-dose
    var _estimatedWeightInKg = null;
    var _calculatedBeriplexDose = null;
    var _inrValue = 1.3; //cjd
    var _inrType = null;
    var _inrDateTime = null;
    var _shouldAdministerBeriplexWhenAnticoagulatUnknown = null;
    // confirm-beriplex-dose
    var _actualBeriplexDose = null;
    // administer-beriplex
    var _beriplexStartDateTime = null;
    var _vitaminkDateTime = null;
    var _isInfusionInstructionsViewed = null;
    // doac-reversal-agent-details
    var _doacReveralAgentType = null;
    var _doacReveralAgentDateTime = null;

    //
    // protocol B
    //

    // bp-management
    var _bpTargetReachedDateTime = "NOT NULL"; //cjd
    var _bpTreatmentThreshold = null;
    var _bpTarget = null;
    // critical-care-referral
    var _destination = null;
    var _otherDestination = null;

    //
    // protocol C
    //

    // mrs-entry
    var _premorbidMrsScore = null;
    // neurosurgery-referral-criteria
    var _ichVolume = 31; //cjd
    var _isPosteriorFossaIch = false; //cjd
    var _isVentricleObstructed = false; //cjd
    // neurosurgery-referral-summary
    var _referralToNeurosurgeryDateTime = null;
    var _neurosurgeonName = null;
    var _isReferralToNeurosurgeryAccepted = null;
    var _isForActiveTreatment = null;

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

        getAntiCoagulantName: getAntiCoagulantName,
        setAntiCoagulantName: setAntiCoagulantName,

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

        getShouldAdministerBeriplexWhenAnticoagulatUnknown: getShouldAdministerBeriplexWhenAnticoagulatUnknown,
        setShouldAdministerBeriplexWhenAnticoagulatUnknown: setShouldAdministerBeriplexWhenAnticoagulatUnknown,

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
        getDoacReveralAgentType: getDoacReveralAgentType,
        setDoacReveralAgentType: setDoacReveralAgentType,

        getDoacReveralAgentDateTime: getDoacReveralAgentDateTime,
        setDoacReveralAgentDateTime: setDoacReveralAgentDateTime,

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

        //cjd ToDo - collection of BP Measurement entries

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
        return _appStartDateTime;
    }

    function setAppStartDateTime(appStartDateTime) {
        _appStartDateTime = appStartDateTime;
    }
    
    // register-patient
    function getUniqueId() {
        return _uniqueId;
    }

    function setUniqueId(uniqueId) {
        _uniqueId = uniqueId;
    }
    
    function getInitials() {
        return _initials;
    }

    function setInitials(initials) {
        _initials = initials;
    }

    function getBirthDate() {
        return _birthDate;
    }

    function setBirthDate(birthDate) {
        _birthDate = birthDate;
    }

    function getEstimatedAge() {
        return _estimatedAge;
    }

    function setEstimatedAge(estimatedAge) {
        _estimatedAge = estimatedAge;
    }

    function getExternalScanHospitalName() {
        return _externalScanHospitalName;
    }

    function setExternalScanHospitalName(externalScanHospitalName) {
        _externalScanHospitalName = externalScanHospitalName;
    }
    
    function getScanDateTime() {
        return _scanDateTime;
    }

    function setScanDateTime(scanDateTime) {
        _scanDateTime = scanDateTime;
    }

    function getHospitalUniqueId() {
        return _hospitalUniqueId;
    }

    function setHospitalUniqueId(hospitalUniqueId) {
        _hospitalUniqueId = hospitalUniqueId;
    }
    
    // patient-details
    function getDoorDateTime() {
        return _doorDateTime;
    }

    function setDoorDateTime(doorDateTime) {
        _doorDateTime = doorDateTime
    }

    function getOnsetDateTime() {
        return _onsetDateTime;
    }

    function setOnsetDateTime(onsetDateTime) {
        _onsetDateTime = onsetDateTime
    }

    function getIsLastSeenWellOnset() {
        return _isLastSeenWellOnset;
    }

    function setIsLastSeenWellOnset(isLastSeenWellOnset) {
        _isLastSeenWellOnset = isLastSeenWellOnset
    }

    function getIsBestEstimateOnset() {
        return _isBestEstimateOnset;
    }

    function setIsBestEstimateOnset(isBestEstimateOnset) {
        _isBestEstimateOnset = isBestEstimateOnset;
    }
   
    // gcs-entry
    function getGcsScore() {
        return _gcsScore;
    }
    
    function setGcsScore(gcsScore) {
        _gcsScore = gcsScore;
    }
    
    function getGcsScoreEye() {
        return _gcsScoreEye;
    }

    function setGcsScoreEye(gcsScoreEye) {
        _gcsScoreEye = gcsScoreEye;
    }
    
    function getGcsScoreVerbal() {
        return _gcsScoreVerbal;
    }
    
    function setGcsScoreVerbal(gcsScoreVerbal) {
        _gcsScoreVerbal = gcsScoreVerbal;
    }

    function getGcsScoreMotor() {
        return _gcsScoreMotor;
    }

    function setGcsScoreMotor(gcsScoreMotor) {
        _gcsScoreMotor = gcsScoreMotor;
    }
   
    // patient-end
    function getSummaryEmailAddress() {
        return _summaryEmailAddress;
    }
    
    function setSummaryEmailAddress(summaryEmailAddress) {
        _summaryEmailAddress = summaryEmailAddress;
    }

    //
    // protocol A
    //

    // anticoagulant-identification
    function getAnticoagulantType() {
        return _anticoagulantType;
    }

    function setAnticoagulantType(anticoagulantType) {
        _anticoagulantType = anticoagulantType;
    }
    
    function getAntiCoagulantName() {
        return _antiCoagulantName;
    }
    
    function setAntiCoagulantName(antiCoagulantName) {
        _antiCoagulantName = antiCoagulantName;
    }

    // calculate-beriplex-dose
    function getEstimatedWeightInKg() {
        return _estimatedWeightInKg;
    }
    
    function setEstimatedWeightInKg(estimatedWeightInKg) {
        _estimatedWeightInKg = estimatedWeightInKg;
    }
    
    function getCalculatedBeriplexDose() {
        return _calculatedBeriplexDose;
    }
    
    function setCalculatedBeriplexDose(calculatedBeriplexDose) {
        _calculatedBeriplexDose = calculatedBeriplexDose;
    }
    
    function getInrValue() {
        return _inrValue;
    }
    
    function setInrValue(inrValue) {
        _inrValue = inrValue;
    }
    
    function getInrType() {
        return _inrType;
    }
    
    function setInrType(inrType) {
        _inrType = inrType;
    }
    
    function getInrDateTime() {
        return _inrDateTime;
    }
    
    function setInrDateTime(inrDateTime) {
        _inrDateTime = inrDateTime;
    }

    function getShouldAdministerBeriplexWhenAnticoagulatUnknown() {
        return _shouldAdministerBeriplexWhenAnticoagulatUnknown;
    }
    
    function setShouldAdministerBeriplexWhenAnticoagulatUnknown(shouldAdministerBeriplexWhenAnticoagulatUnknown) {
        _shouldAdministerBeriplexWhenAnticoagulatUnknown = shouldAdministerBeriplexWhenAnticoagulatUnknown;
    }

    // confirm-beriplex-dose
    function getActualBeriplexDose() {
        return _actualBeriplexDose;
    }

    function setActualBeriplexDose(actualBeriplexDose) {
        _actualBeriplexDose = actualBeriplexDose;
    }

    // administer-beriplex
    function getBeriplexStartDateTime() {
        return _beriplexStartDateTime;
    }
    
    function setBeriplexStartDateTime(beriplexStartDateTime) {
        _beriplexStartDateTime = beriplexStartDateTime;
    }
    
    function getVitaminkDateTime() {
        return _vitaminkDateTime;
    }
    
    function setVitaminkDateTime(vitaminkDateTime) {
        _vitaminkDateTime = vitaminkDateTime;
    }
    
    function getIsInfusionInstructionsViewed() {
        return _isInfusionInstructionsViewed;
    }
    
    function setIsInfusionInstructionsViewed(isInfusionInstructionsViewed) {
        _isInfusionInstructionsViewed = isInfusionInstructionsViewed;
    }

    // doac-reversal-agent-details
    function getDoacReveralAgentType() {
        return _doacReveralAgentType;
    }
    
    function setDoacReveralAgentType(doacReveralAgentType) {
        _doacReveralAgentType = doacReveralAgentType;
    }

    function getDoacReveralAgentDateTime() {
        return _doacReveralAgentDateTime;
    }

    function setDoacReveralAgentDateTime(doacReveralAgentDateTime) {
        _doacReveralAgentDateTime = doacReveralAgentDateTime;
    }

    //
    // protocol B
    //
    
    // bp-management
    function getBpTargetReachedDateTime() {
        return _bpTargetReachedDateTime;
    }
    
    function setBpTargetReachedDateTime(bpTargetReachedDateTime) {
        _bpTargetReachedDateTime = bpTargetReachedDateTime;
    }
    
    function getBpTreatmentThreshold() {
        return _bpTreatmentThreshold;
    }
    
    function setBpTreatmentThreshold(bpTreatmentThreshold) {
        _bpTreatmentThreshold = bpTreatmentThreshold;
    }
    
    function getBpTarget() {
        return _bpTarget;
    }
    
    function setBpTarget(bpTarget) {
        _bpTarget = bpTarget;
    }
    
    // critical-care-referral
    function getDestination() {
        return _destination;
    }
    
    function setDestination(destination) {
        _destination = destination;
    }
    
    function getOtherDestination() {
        return _otherDestination;
    }
    
    function setOtherDestination(otherDestination) {
        _otherDestination = otherDestination;
    }

    //
    // protocol C
    //

    // mrs-entry
    function getPremorbidMrsScore() {
        return _premorbidMrsScore;
    }

    function setPremorbidMrsScore(premorbidMrsScore) {
        _premorbidMrsScore = premorbidMrsScore;
    }

    // neurosurgery-referral-criteria    
    function getIchVolume() {
        return _ichVolume;
    }
    
    function setIchVolume(ichVolume) {
        _ichVolume = ichVolume;
    }

    function getIsPosteriorFossaIch() {
        return _isPosteriorFossaIch;
    }
    
    function setIsPosteriorFossaIch(isPosteriorFossaIch) {
        _isPosteriorFossaIch = isPosteriorFossaIch;
    }
    
    function getIsVentricleObstructed() {
        return _isVentricleObstructed;
    }
    
    function setIsVentricleObstructed(isVentricleObstructed) {
        _isVentricleObstructed = isVentricleObstructed;
    }
    
    // neurosurgery-referral-summary        
    function getReferralToNeurosurgeryDateTime() {
        return _referralToNeurosurgeryDateTime;
    }
    
    function setReferralToNeurosurgeryDateTime(referralToNeurosurgeryDateTime) {
        _referralToNeurosurgeryDateTime = referralToNeurosurgeryDateTime;
    }
    
    function getNeurosurgeonName() {
        return _neurosurgeonName;
    }
    
    function setNeurosurgeonName(neurosurgeonName) {
        _neurosurgeonName = neurosurgeonName;
    }

    function getIsReferralToNeurosurgeryAccepted() {
        return _isReferralToNeurosurgeryAccepted;
    }
    
    function setIsReferralToNeurosurgeryAccepted(isReferralToNeurosurgeryAccepted) {
        _isReferralToNeurosurgeryAccepted = isReferralToNeurosurgeryAccepted;
    }
    
    function getIsForActiveTreatment() {
        return _isForActiveTreatment;
    }
    
    function setIsForActiveTreatment(isForActiveTreatment) {
        _isForActiveTreatment = isForActiveTreatment;
    }

    function clearAll() {

        _appStartDateTime = null;
        _uniqueId = null;
        _initials = null;
        _birthDate = null;
        _estimatedAge = null;
        _externalScanHospitalName = null;
        _scanDateTime = null;
        _hospitalUniqueId = null;
        _doorDateTime = null;
        _onsetDateTime = null;
        _isLastSeenWellOnset = null;
        _isBestEstimateOnset = null;
        _gcsScore = null;
        _gcsScoreEye = null;
        _gcsScoreVerbal = null;
        _gcsScoreMotor = null;
        _summaryEmailAddress = null;
        _anticoagulantType = null;
        _antiCoagulantName = null;
        _estimatedWeightInKg = null;
        _calculatedBeriplexDose = null;
        _inrValue = null;
        _inrType = null;
        _inrDateTime = null;
        _shouldAdministerBeriplexWhenAnticoagulatUnknown = null;
        _actualBeriplexDose = null;
        _beriplexStartDateTime = null;
        _vitaminkDateTime = null;
        _isInfusionInstructionsViewed = null;
        _doacReveralAgentType = null;
        _doacReveralAgentDateTime = null;
        _bpTargetReachedDateTime = null;
        _bpTreatmentThreshold = null;
        _bpTarget = null;
        _destination = null;
        _otherDestination = null;
        _premorbidMrsScore = null;
        _ichVolume = null;
        _isPosteriorFossaIch = null;
        _isVentricleObstructed = null;
        _referralToNeurosurgeryDateTime = null;
        _neurosurgeonName = null;
        _isReferralToNeurosurgeryAccepted = null;
        _isForActiveTreatment = null;
    }

}