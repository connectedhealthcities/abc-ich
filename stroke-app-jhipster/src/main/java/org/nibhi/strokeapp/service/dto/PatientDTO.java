package org.nibhi.strokeapp.service.dto;

import java.time.LocalDate;
import java.time.ZonedDateTime;

import javax.persistence.Column;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.enumeration.AnticoagulantType;
import org.nibhi.strokeapp.domain.enumeration.ReversalAgentType;
import org.nibhi.strokeapp.domain.enumeration.InrType;

/**
 * A DTO for the Patient entity.
 */
public class PatientDTO implements Serializable {

    private Long id;
    
    private Boolean isDuplicate;
    
    private Boolean isDuplicateAllowed;

    private String uniqueId;

    private String initials;

    private LocalDate birthDate;

    private Integer estimatedAge;

    private ZonedDateTime onsetDateTime;

    private ZonedDateTime doorDateTime;

    private ZonedDateTime appStartDateTime;

    private ZonedDateTime bpTargetReachedDateTime;

    @Min(value = 3)
    @Max(value = 15)
    private Integer gcsScore;

    private Float estimatedWeightInKg;

    @Min(value = 750)
    @Max(value = 5000)
    private Integer calculatedBeriplexDose;

    private Integer actualBeriplexDose;

    private ZonedDateTime vitaminkDateTime;

    @Min(value = 0)
    @Max(value = 5)
    private Integer premorbidMrsScore;

    private Float ichVolume;

    private Boolean infusionInstructionsViewed;

    private ZonedDateTime scanDateTime;

    private Boolean referredToCriticalCare;

    private Boolean posteriorFossaIch;

    private Boolean ventricleObstructed;

    private Boolean forActiveTreatment;

    private Boolean lastSeenWellOnset;

    private Boolean bestEstimateOnset;

    private String externalScanHospitalName;

    private Integer gcsScoreEye;

    private Integer gcsScoreVerbal;

    private Integer gcsScoreMotor;

    private AnticoagulantType anticoagulantType;

    private Boolean administerBeriplexWhenAnticoagulantUnknown;

    private Boolean reversalAgentAdministeredAtExternalHospital;

    private Boolean reversalAgentAdministeredTimeKnown;

    private Boolean administerBeriplexWithoutInr;

    private ReversalAgentType reversalAgentType;

    private ZonedDateTime reversalAgentStartDateTime;

    private Integer bpTreatmentThreshold;

    private Integer bpTarget;

    private ZonedDateTime referralToNeurosurgeryDateTime;

    private String neurosurgeonName;

    private Boolean referralToNeurosurgeryAccepted;

    private String summaryEmailAddress;

    private String anticoagulantName;

    private Float inrValue;

    private InrType inrType;

    private ZonedDateTime inrDateTime;


    private Long hospitalId;
    

    private String hospitalUniqueId;
    
    private Set<BpManagementEntry> bpManagementEntries = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsDuplicate() {
        return isDuplicate;
    }

    public void setIsDuplicate(Boolean isDuplicate) {
        this.isDuplicate = isDuplicate;
    }

    public Boolean getIsDuplicateAllowed() {
        return isDuplicateAllowed;
    }

    public void setIsDuplicateAllowed(Boolean isDuplicateAllowed) {
        this.isDuplicateAllowed = isDuplicateAllowed;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }
    
    public String getInitials() {
        return initials;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }
    
    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }
    
    public Integer getEstimatedAge() {
        return estimatedAge;
    }

    public void setEstimatedAge(Integer estimatedAge) {
        this.estimatedAge = estimatedAge;
    }
    
    public ZonedDateTime getOnsetDateTime() {
        return onsetDateTime;
    }

    public void setOnsetDateTime(ZonedDateTime onsetDateTime) {
        this.onsetDateTime = onsetDateTime;
    }
    
    public ZonedDateTime getDoorDateTime() {
        return doorDateTime;
    }

    public void setDoorDateTime(ZonedDateTime doorDateTime) {
        this.doorDateTime = doorDateTime;
    }
    
    public ZonedDateTime getAppStartDateTime() {
        return appStartDateTime;
    }

    public void setAppStartDateTime(ZonedDateTime appStartDateTime) {
        this.appStartDateTime = appStartDateTime;
    }
    
    public ZonedDateTime getBpTargetReachedDateTime() {
        return bpTargetReachedDateTime;
    }

    public void setBpTargetReachedDateTime(ZonedDateTime bpTargetReachedDateTime) {
        this.bpTargetReachedDateTime = bpTargetReachedDateTime;
    }
    
    public Integer getGcsScore() {
        return gcsScore;
    }

    public void setGcsScore(Integer gcsScore) {
        this.gcsScore = gcsScore;
    }
    
    public Float getEstimatedWeightInKg() {
        return estimatedWeightInKg;
    }

    public void setEstimatedWeightInKg(Float estimatedWeightInKg) {
        this.estimatedWeightInKg = estimatedWeightInKg;
    }
    
    public Integer getCalculatedBeriplexDose() {
        return calculatedBeriplexDose;
    }

    public void setCalculatedBeriplexDose(Integer calculatedBeriplexDose) {
        this.calculatedBeriplexDose = calculatedBeriplexDose;
    }
    
    public Integer getActualBeriplexDose() {
        return actualBeriplexDose;
    }

    public void setActualBeriplexDose(Integer actualBeriplexDose) {
        this.actualBeriplexDose = actualBeriplexDose;
    }
    
    public ZonedDateTime getVitaminkDateTime() {
        return vitaminkDateTime;
    }

    public void setVitaminkDateTime(ZonedDateTime vitaminkDateTime) {
        this.vitaminkDateTime = vitaminkDateTime;
    }
    
    public Integer getPremorbidMrsScore() {
        return premorbidMrsScore;
    }

    public void setPremorbidMrsScore(Integer premorbidMrsScore) {
        this.premorbidMrsScore = premorbidMrsScore;
    }
    
    public Float getIchVolume() {
        return ichVolume;
    }

    public void setIchVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
    }
    
    public Boolean getReferredToCriticalCare() {
        return referredToCriticalCare;
    }

    public void setReferredToCriticalCare(Boolean referredToCriticalCare) {
        this.referredToCriticalCare = referredToCriticalCare;
    }
    
    
    public ZonedDateTime getScanDateTime() {
        return scanDateTime;
    }

    public void setScanDateTime(ZonedDateTime scanDateTime) {
        this.scanDateTime = scanDateTime;
    }
    
    public Boolean getInfusionInstructionsViewed() {
        return infusionInstructionsViewed;
    }

    public void setInfusionInstructionsViewed(Boolean infusionInstructionsViewed) {
        this.infusionInstructionsViewed = infusionInstructionsViewed;
    }
    
    public Boolean getPosteriorFossaIch() {
        return posteriorFossaIch;
    }

    public void setPosteriorFossaIch(Boolean posteriorFossaIch) {
        this.posteriorFossaIch = posteriorFossaIch;
    }
    
    public Boolean getVentricleObstructed() {
        return ventricleObstructed;
    }

    public void setVentricleObstructed(Boolean ventricleObstructed) {
        this.ventricleObstructed = ventricleObstructed;
    }
    
    public Boolean getForActiveTreatment() {
        return forActiveTreatment;
    }

    public void setForActiveTreatment(Boolean forActiveTreatment) {
        this.forActiveTreatment = forActiveTreatment;
    }
    
    public Boolean getLastSeenWellOnset() {
        return lastSeenWellOnset;
    }

    public void setLastSeenWellOnset(Boolean lastSeenWellOnset) {
        this.lastSeenWellOnset = lastSeenWellOnset;
    }
    
    public Boolean getBestEstimateOnset() {
        return bestEstimateOnset;
    }

    public void setBestEstimateOnset(Boolean bestEstimateOnset) {
        this.bestEstimateOnset = bestEstimateOnset;
    }
    
    public String getExternalScanHospitalName() {
        return externalScanHospitalName;
    }

    public void setExternalScanHospitalName(String externalScanHospitalName) {
        this.externalScanHospitalName = externalScanHospitalName;
    }
    
    public Integer getGcsScoreEye() {
        return gcsScoreEye;
    }

    public void setGcsScoreEye(Integer gcsScoreEye) {
        this.gcsScoreEye = gcsScoreEye;
    }
    
    public Integer getGcsScoreVerbal() {
        return gcsScoreVerbal;
    }

    public void setGcsScoreVerbal(Integer gcsScoreVerbal) {
        this.gcsScoreVerbal = gcsScoreVerbal;
    }
    
    public Integer getGcsScoreMotor() {
        return gcsScoreMotor;
    }

    public void setGcsScoreMotor(Integer gcsScoreMotor) {
        this.gcsScoreMotor = gcsScoreMotor;
    }
    
    public AnticoagulantType getAnticoagulantType() {
        return anticoagulantType;
    }

    public void setAnticoagulantType(AnticoagulantType anticoagulantType) {
        this.anticoagulantType = anticoagulantType;
    }
    
    public Boolean getAdministerBeriplexWhenAnticoagulantUnknown() {
        return administerBeriplexWhenAnticoagulantUnknown;
    }

    public void setAdministerBeriplexWhenAnticoagulantUnknown(Boolean administerBeriplexWhenAnticoagulantUnknown) {
        this.administerBeriplexWhenAnticoagulantUnknown = administerBeriplexWhenAnticoagulantUnknown;
    }

    public Boolean getReversalAgentAdministeredAtExternalHospital() {
        return reversalAgentAdministeredAtExternalHospital;
    }

    public void setReversalAgentAdministeredAtExternalHospital(Boolean reversalAgentAdministeredAtExternalHospital) {
        this.reversalAgentAdministeredAtExternalHospital = reversalAgentAdministeredAtExternalHospital;
    }
    
    public Boolean getReversalAgentAdministeredTimeKnown() {
        return reversalAgentAdministeredTimeKnown;
    }

    public void setReversalAgentAdministeredTimeKnown(Boolean reversalAgentAdministeredTimeKnown) {
        this.reversalAgentAdministeredTimeKnown = reversalAgentAdministeredTimeKnown;
    }
   
    public Boolean getAdministerBeriplexWithoutInr() {
        return administerBeriplexWithoutInr;
    }

    public void setAdministerBeriplexWithoutInr(Boolean administerBeriplexWithoutInr) {
        this.administerBeriplexWithoutInr = administerBeriplexWithoutInr;
    }

    public ReversalAgentType getReversalAgentType() {
        return reversalAgentType;
    }

    public void setReversalAgentType(ReversalAgentType reversalAgentType) {
        this.reversalAgentType = reversalAgentType;
    }
    
    public ZonedDateTime getReversalAgentStartDateTime() {
        return reversalAgentStartDateTime;
    }

    public void setReversalAgentStartDateTime(ZonedDateTime reversalAgentStartDateTime) {
        this.reversalAgentStartDateTime = reversalAgentStartDateTime;
    }
    
    public Integer getBpTreatmentThreshold() {
        return bpTreatmentThreshold;
    }

    public void setBpTreatmentThreshold(Integer bpTreatmentThreshold) {
        this.bpTreatmentThreshold = bpTreatmentThreshold;
    }
    
    public Integer getBpTarget() {
        return bpTarget;
    }

    public void setBpTarget(Integer bpTarget) {
        this.bpTarget = bpTarget;
    }
    
    public ZonedDateTime getReferralToNeurosurgeryDateTime() {
        return referralToNeurosurgeryDateTime;
    }

    public void setReferralToNeurosurgeryDateTime(ZonedDateTime referralToNeurosurgeryDateTime) {
        this.referralToNeurosurgeryDateTime = referralToNeurosurgeryDateTime;
    }
    
    public String getNeurosurgeonName() {
        return neurosurgeonName;
    }

    public void setNeurosurgeonName(String neurosurgeonName) {
        this.neurosurgeonName = neurosurgeonName;
    }
    
    public Boolean getReferralToNeurosurgeryAccepted() {
        return referralToNeurosurgeryAccepted;
    }

    public void setReferralToNeurosurgeryAccepted(Boolean referralToNeurosurgeryAccepted) {
        this.referralToNeurosurgeryAccepted = referralToNeurosurgeryAccepted;
    }
    
    public String getSummaryEmailAddress() {
        return summaryEmailAddress;
    }

    public void setSummaryEmailAddress(String summaryEmailAddress) {
        this.summaryEmailAddress = summaryEmailAddress;
    }
    
    public String getAnticoagulantName() {
        return anticoagulantName;
    }

    public void setAnticoagulantName(String anticoagulantName) {
        this.anticoagulantName = anticoagulantName;
    }
    
    public Float getInrValue() {
        return inrValue;
    }

    public void setInrValue(Float inrValue) {
        this.inrValue = inrValue;
    }
    
    public InrType getInrType() {
        return inrType;
    }

    public void setInrType(InrType inrType) {
        this.inrType = inrType;
    }
    
    public ZonedDateTime getInrDateTime() {
        return inrDateTime;
    }

    public void setInrDateTime(ZonedDateTime inrDateTime) {
        this.inrDateTime = inrDateTime;
    }

    public Long getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
    }


    public String getHospitalUniqueId() {
        return hospitalUniqueId;
    }

    public void setHospitalUniqueId(String hospitalUniqueId) {
        this.hospitalUniqueId = hospitalUniqueId;
    }
 
    public Set<BpManagementEntry> getBpManagementEntries() {
        return bpManagementEntries;
    }

    public void setBpManagementEntries(Set<BpManagementEntry> bpManagementEntries) {
        this.bpManagementEntries = bpManagementEntries;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        PatientDTO patientDTO = (PatientDTO) o;

        if ( ! Objects.equals(id, patientDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "PatientDTO{" +
            "id=" + id +
            ", uniqueId='" + uniqueId + "'" +
            ", initials='" + initials + "'" +
            ", birthDate='" + birthDate + "'" +
            ", estimatedAge='" + estimatedAge + "'" +
            ", onsetDateTime='" + onsetDateTime + "'" +
            ", doorDateTime='" + doorDateTime + "'" +
            ", appStartDateTime='" + appStartDateTime + "'" +
            ", bpTargetReachedDateTime='" + bpTargetReachedDateTime + "'" +
            ", gcsScore='" + gcsScore + "'" +
            ", estimatedWeightInKg='" + estimatedWeightInKg + "'" +
            ", calculatedBeriplexDose='" + calculatedBeriplexDose + "'" +
            ", actualBeriplexDose='" + actualBeriplexDose + "'" +
            ", vitaminkDateTime='" + vitaminkDateTime + "'" +
            ", premorbidMrsScore='" + premorbidMrsScore + "'" +
            ", ichVolume='" + ichVolume + "'" +
            ", referredToCriticalCare='" + referredToCriticalCare + "'" +
            ", scanDateTime='" + scanDateTime + "'" +
            ", infusionInstructionsViewed='" + infusionInstructionsViewed + "'" +
            ", posteriorFossaIch='" + posteriorFossaIch + "'" +
            ", ventricleObstructed='" + ventricleObstructed + "'" +
            ", forActiveTreatment='" + forActiveTreatment + "'" +
            ", lastSeenWellOnset='" + lastSeenWellOnset + "'" +
            ", bestEstimateOnset='" + bestEstimateOnset + "'" +
            ", externalScanHospitalName='" + externalScanHospitalName + "'" +
            ", gcsScoreEye='" + gcsScoreEye + "'" +
            ", gcsScoreVerbal='" + gcsScoreVerbal + "'" +
            ", gcsScoreMotor='" + gcsScoreMotor + "'" +
            ", anticoagulantType='" + anticoagulantType + "'" +
            ", administerBeriplexWhenAnticoagulantUnknown='" + administerBeriplexWhenAnticoagulantUnknown + "'" +
    		", reversalAgentAdministeredAtExternalHospital='" + reversalAgentAdministeredAtExternalHospital + "'" +
    		", reversalAgentAdministeredTimeKnown='" + reversalAgentAdministeredTimeKnown + "'" +
            ", administerBeriplexWithoutInr='" + administerBeriplexWithoutInr + "'" +
            ", reversalAgentType='" + reversalAgentType + "'" +
            ", reversalAgentStartDateTime='" + reversalAgentStartDateTime + "'" +
            ", bpTreatmentThreshold='" + bpTreatmentThreshold + "'" +
            ", bpTarget='" + bpTarget + "'" +
            ", referralToNeurosurgeryDateTime='" + referralToNeurosurgeryDateTime + "'" +
            ", neurosurgeonName='" + neurosurgeonName + "'" +
            ", referralToNeurosurgeryAccepted='" + referralToNeurosurgeryAccepted + "'" +
            ", summaryEmailAddress='" + summaryEmailAddress + "'" +
            ", anticoagulantName='" + anticoagulantName + "'" +
            ", inrValue='" + inrValue + "'" +
            ", inrType='" + inrType + "'" +
            ", inrDateTime='" + inrDateTime + "'" +
            '}';
    }
}
