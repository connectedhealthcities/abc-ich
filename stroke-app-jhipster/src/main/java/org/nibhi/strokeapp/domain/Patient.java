package org.nibhi.strokeapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.nibhi.strokeapp.domain.enumeration.Destination;

import org.nibhi.strokeapp.domain.enumeration.AnticoagulantType;

import org.nibhi.strokeapp.domain.enumeration.ReversalAgentType;

import org.nibhi.strokeapp.domain.enumeration.InrType;

/**
 * A Patient.
 */
@Entity
@Table(name = "patient")
public class Patient implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    
    @ManyToOne
    private Hospital hospital;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Hospital getHospital() {
        return hospital;
    }

    public Patient hospital(Hospital hospital) {
        this.hospital = hospital;
        return this;
    }

    public void setHospital(Hospital hospital) {
        this.hospital = hospital;
    }

    
    //
    // patient-start //////////////////////////////////////////////////////////////////////////////
    
    @Column(name = "app_start_date_time")
    private ZonedDateTime appStartDateTime;

    public ZonedDateTime getAppStartDateTime() {
        return appStartDateTime;
    }

    public Patient appStartDateTime(ZonedDateTime appStartDateTime) {
        this.appStartDateTime = appStartDateTime;
        return this;
    }

    public void setAppStartDateTime(ZonedDateTime appStartDateTime) {
        this.appStartDateTime = appStartDateTime;
    }

    //
    // register-patient ///////////////////////////////////////////////////////////////////////////

    @Column(name = "unique_id", unique=true)
    private String uniqueId;

    @Column(name = "initials")
    private String initials;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "estimated_age")
    private Integer estimatedAge;
    
    @Column(name = "scan_date_time")
    private ZonedDateTime scanDateTime;
    
    @Column(name = "external_scan_hospital_name")
    private String externalScanHospitalName;

    public String getUniqueId() {
        return uniqueId;
    }

    public Patient uniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
        return this;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getInitials() {
        return initials;
    }

    public Patient initials(String initials) {
        this.initials = initials;
        return this;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public Patient birthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
        return this;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public Integer getEstimatedAge() {
        return estimatedAge;
    }

    public Patient estimatedAge(Integer estimatedAge) {
        this.estimatedAge = estimatedAge;
        return this;
    }

    public void setEstimatedAge(Integer estimatedAge) {
        this.estimatedAge = estimatedAge;
    }

    public ZonedDateTime getScanDateTime() {
        return scanDateTime;
    }

    public Patient scanDateTime(ZonedDateTime scanDateTime) {
        this.scanDateTime = scanDateTime;
        return this;
    }

    public void setScanDateTime(ZonedDateTime scanDateTime) {
        this.scanDateTime = scanDateTime;
    }

    public String getExternalScanHospitalName() {
        return externalScanHospitalName;
    }

    public Patient externalScanHospitalName(String externalScanHospitalName) {
        this.externalScanHospitalName = externalScanHospitalName;
        return this;
    }

    public void setExternalScanHospitalName(String externalScanHospitalName) {
        this.externalScanHospitalName = externalScanHospitalName;
    }

    
    //
    // patient-details ////////////////////////////////////////////////////////////////////////////
    
    @Column(name = "onset_date_time")
    private ZonedDateTime onsetDateTime;

    @Column(name = "door_date_time")
    private ZonedDateTime doorDateTime;
   
    @Column(name = "last_seen_well_onset")
    private Boolean lastSeenWellOnset;

    @Column(name = "best_estimate_onset")
    private Boolean bestEstimateOnset;

    public ZonedDateTime getOnsetDateTime() {
        return onsetDateTime;
    }

    public Patient onsetDateTime(ZonedDateTime onsetDateTime) {
        this.onsetDateTime = onsetDateTime;
        return this;
    }

    public void setOnsetDateTime(ZonedDateTime onsetDateTime) {
        this.onsetDateTime = onsetDateTime;
    }

    public ZonedDateTime getDoorDateTime() {
        return doorDateTime;
    }

    public Patient doorDateTime(ZonedDateTime doorDateTime) {
        this.doorDateTime = doorDateTime;
        return this;
    }

    public void setDoorDateTime(ZonedDateTime doorDateTime) {
        this.doorDateTime = doorDateTime;
    }

    public Boolean isLastSeenWellOnset() {
        return lastSeenWellOnset;
    }

    public Patient lastSeenWellOnset(Boolean lastSeenWellOnset) {
        this.lastSeenWellOnset = lastSeenWellOnset;
        return this;
    }

    public void setLastSeenWellOnset(Boolean lastSeenWellOnset) {
        this.lastSeenWellOnset = lastSeenWellOnset;
    }

    public Boolean isBestEstimateOnset() {
        return bestEstimateOnset;
    }

    public Patient bestEstimateOnset(Boolean bestEstimateOnset) {
        this.bestEstimateOnset = bestEstimateOnset;
        return this;
    }

    public void setBestEstimateOnset(Boolean bestEstimateOnset) {
        this.bestEstimateOnset = bestEstimateOnset;
    }

    
    //
    // gcs-entry //////////////////////////////////////////////////////////////////////////////////

    @Min(value = 3)
    @Max(value = 15)
    @Column(name = "gcs_score")
    private Integer gcsScore;

    @Column(name = "gcs_score_eye")
    private Integer gcsScoreEye;

    @Column(name = "gcs_score_verbal")
    private Integer gcsScoreVerbal;

    @Column(name = "gcs_score_motor")
    private Integer gcsScoreMotor;

    public Integer getGcsScore() {
        return gcsScore;
    }

    public Patient gcsScore(Integer gcsScore) {
        this.gcsScore = gcsScore;
        return this;
    }

    public void setGcsScore(Integer gcsScore) {
        this.gcsScore = gcsScore;
    }

    public Integer getGcsScoreEye() {
        return gcsScoreEye;
    }

    public Patient gcsScoreEye(Integer gcsScoreEye) {
        this.gcsScoreEye = gcsScoreEye;
        return this;
    }

    public void setGcsScoreEye(Integer gcsScoreEye) {
        this.gcsScoreEye = gcsScoreEye;
    }

    public Integer getGcsScoreVerbal() {
        return gcsScoreVerbal;
    }

    public Patient gcsScoreVerbal(Integer gcsScoreVerbal) {
        this.gcsScoreVerbal = gcsScoreVerbal;
        return this;
    }

    public void setGcsScoreVerbal(Integer gcsScoreVerbal) {
        this.gcsScoreVerbal = gcsScoreVerbal;
    }

    public Integer getGcsScoreMotor() {
        return gcsScoreMotor;
    }

    public Patient gcsScoreMotor(Integer gcsScoreMotor) {
        this.gcsScoreMotor = gcsScoreMotor;
        return this;
    }

    public void setGcsScoreMotor(Integer gcsScoreMotor) {
        this.gcsScoreMotor = gcsScoreMotor;
    }

    
    //
    // anticoagulant-identification ///////////////////////////////////////////////////////////////

    @Enumerated(EnumType.STRING)
    @Column(name = "anticoagulant_type")
    private AnticoagulantType anticoagulantType;
    
    @Column(name = "anticoagulant_name")
    private String anticoagulantName;
    
    public AnticoagulantType getAnticoagulantType() {
        return anticoagulantType;
    }

    public Patient anticoagulantType(AnticoagulantType anticoagulantType) {
        this.anticoagulantType = anticoagulantType;
        return this;
    }

    public void setAnticoagulantType(AnticoagulantType anticoagulantType) {
        this.anticoagulantType = anticoagulantType;
    }

    public String getAnticoagulantName() {
        return anticoagulantName;
    }

    public Patient anticoagulantName(String anticoagulantName) {
        this.anticoagulantName = anticoagulantName;
        return this;
    }

    public void setAnticoagulantName(String anticoagulantName) {
        this.anticoagulantName = anticoagulantName;
    }

    
    //
    // calculate-beriplex-dose ////////////////////////////////////////////////////////////////////
    
    @Column(name = "reversal_agent_administered_at_external_hospital")
    private Boolean reversalAgentAdministeredAtExternalHospital;

    @Column(name = "reversal_agent_administered_time_known")
    private Boolean reversalAgentAdministeredTimeKnown;

    @Column(name = "administer_beriplex_without_inr")
    private Boolean administerBeriplexWithoutInr;

    @Column(name = "estimated_weight_in_kg")
    private Float estimatedWeightInKg;

    @Column(name = "inr_value")
    private Float inrValue;

    @Enumerated(EnumType.STRING)
    @Column(name = "inr_type")
    private InrType inrType;

    @Column(name = "inr_date_time")
    private ZonedDateTime inrDateTime;

    @Min(value = 750)
    @Max(value = 5000)
    @Column(name = "calculated_beriplex_dose")
    private Integer calculatedBeriplexDose;

    @Column(name = "administer_beriplex_when_anticoagulant_unknown")
    private Boolean administerBeriplexWhenAnticoagulantUnknown;

    public Boolean isReversalAgentAdministeredAtExternalHospital() {
        return reversalAgentAdministeredAtExternalHospital;
    }

    public Patient reversalAgentAdministeredAtExternalHospital(Boolean reversalAgentAdministeredAtExternalHospital) {
        this.reversalAgentAdministeredAtExternalHospital = reversalAgentAdministeredAtExternalHospital;
        return this;
    }

    public void setReversalAgentAdministeredAtExternalHospital(Boolean reversalAgentAdministeredAtExternalHospital) {
        this.reversalAgentAdministeredAtExternalHospital = reversalAgentAdministeredAtExternalHospital;
    }

    public Boolean isReversalAgentAdministeredTimeKnown() {
        return reversalAgentAdministeredTimeKnown;
    }

    public Patient reversalAgentAdministeredTimeKnown(Boolean reversalAgentAdministeredTimeKnown) {
        this.reversalAgentAdministeredTimeKnown = reversalAgentAdministeredTimeKnown;
        return this;
    }

    public void setReversalAgentAdministeredTimeKnown(Boolean reversalAgentAdministeredTimeKnown) {
        this.reversalAgentAdministeredTimeKnown = reversalAgentAdministeredTimeKnown;
    }

    public Boolean isAdministerBeriplexWithoutInr() {
        return administerBeriplexWithoutInr;
    }

    public Patient administerBeriplexWithoutInr(Boolean administerBeriplexWithoutInr) {
        this.administerBeriplexWithoutInr = administerBeriplexWithoutInr;
        return this;
    }

    public void setAdministerBeriplexWithoutInr(Boolean administerBeriplexWithoutInr) {
        this.administerBeriplexWithoutInr = administerBeriplexWithoutInr;
    }

    public Float getEstimatedWeightInKg() {
        return estimatedWeightInKg;
    }

    public Patient estimatedWeightInKg(Float estimatedWeightInKg) {
        this.estimatedWeightInKg = estimatedWeightInKg;
        return this;
    }

    public void setEstimatedWeightInKg(Float estimatedWeightInKg) {
        this.estimatedWeightInKg = estimatedWeightInKg;
    }
    
    public Float getInrValue() {
        return inrValue;
    }

    public Patient inrValue(Float inrValue) {
        this.inrValue = inrValue;
        return this;
    }

    public void setInrValue(Float inrValue) {
        this.inrValue = inrValue;
    }

    public InrType getInrType() {
        return inrType;
    }

    public Patient inrType(InrType inrType) {
        this.inrType = inrType;
        return this;
    }

    public void setInrType(InrType inrType) {
        this.inrType = inrType;
    }

    public ZonedDateTime getInrDateTime() {
        return inrDateTime;
    }

    public Patient inrDateTime(ZonedDateTime inrDateTime) {
        this.inrDateTime = inrDateTime;
        return this;
    }

    public void setInrDateTime(ZonedDateTime inrDateTime) {
        this.inrDateTime = inrDateTime;
    }

    public Integer getCalculatedBeriplexDose() {
        return calculatedBeriplexDose;
    }

    public Patient calculatedBeriplexDose(Integer calculatedBeriplexDose) {
        this.calculatedBeriplexDose = calculatedBeriplexDose;
        return this;
    }

    public void setCalculatedBeriplexDose(Integer calculatedBeriplexDose) {
        this.calculatedBeriplexDose = calculatedBeriplexDose;
    }

    public Boolean isAdministerBeriplexWhenAnticoagulantUnknown() {
        return administerBeriplexWhenAnticoagulantUnknown;
    }

    public Patient administerBeriplexWhenAnticoagulantUnknown(Boolean administerBeriplexWhenAnticoagulantUnknown) {
        this.administerBeriplexWhenAnticoagulantUnknown = administerBeriplexWhenAnticoagulantUnknown;
        return this;
    }

    public void setAdministerBeriplexWhenAnticoagulantUnknown(Boolean administerBeriplexWhenAnticoagulantUnknown) {
        this.administerBeriplexWhenAnticoagulantUnknown = administerBeriplexWhenAnticoagulantUnknown;
    }

    
    //
    // confirm-beriplex-dose //////////////////////////////////////////////////////////////////////

    @Column(name = "actual_beriplex_dose")
    private Integer actualBeriplexDose;
    
    public Integer getActualBeriplexDose() {
        return actualBeriplexDose;
    }

    public Patient actualBeriplexDose(Integer actualBeriplexDose) {
        this.actualBeriplexDose = actualBeriplexDose;
        return this;
    }

    public void setActualBeriplexDose(Integer actualBeriplexDose) {
        this.actualBeriplexDose = actualBeriplexDose;
    }

    
    //
    // administer-beriplex ////////////////////////////////////////////////////////////////////////

    @Column(name = "beriplex_start_date_time")
    private ZonedDateTime beriplexStartDateTime;

    @Column(name = "vitamink_date_time")
    private ZonedDateTime vitaminkDateTime;

    @Column(name = "infusion_instructions_viewed")
    private Boolean infusionInstructionsViewed;

    public ZonedDateTime getBeriplexStartDateTime() {
        return beriplexStartDateTime;
    }

    public Patient beriplexStartDateTime(ZonedDateTime beriplexStartDateTime) {
        this.beriplexStartDateTime = beriplexStartDateTime;
        return this;
    }

    public void setBeriplexStartDateTime(ZonedDateTime beriplexStartDateTime) {
        this.beriplexStartDateTime = beriplexStartDateTime;
    }

    public ZonedDateTime getVitaminkDateTime() {
        return vitaminkDateTime;
    }

    public Patient vitaminkDateTime(ZonedDateTime vitaminkDateTime) {
        this.vitaminkDateTime = vitaminkDateTime;
        return this;
    }

    public void setVitaminkDateTime(ZonedDateTime vitaminkDateTime) {
        this.vitaminkDateTime = vitaminkDateTime;
    }

    public Boolean isInfusionInstructionsViewed() {
        return infusionInstructionsViewed;
    }

    public Patient infusionInstructionsViewed(Boolean infusionInstructionsViewed) {
        this.infusionInstructionsViewed = infusionInstructionsViewed;
        return this;
    }

    public void setInfusionInstructionsViewed(Boolean infusionInstructionsViewed) {
        this.infusionInstructionsViewed = infusionInstructionsViewed;
    }

    
    //
    // doac-reversal-agent-details ////////////////////////////////////////////////////////////////

    @Enumerated(EnumType.STRING)
    @Column(name = "reversal_agent_type")
    private ReversalAgentType reversalAgentType;

    @Column(name = "reversal_agent_date_time")
    private ZonedDateTime reversalAgentDateTime;

    public ReversalAgentType getReversalAgentType() {
        return reversalAgentType;
    }

    public Patient reversalAgentType(ReversalAgentType reversalAgentType) {
        this.reversalAgentType = reversalAgentType;
        return this;
    }

    public void setReversalAgentType(ReversalAgentType reversalAgentType) {
        this.reversalAgentType = reversalAgentType;
    }

    public ZonedDateTime getReversalAgentDateTime() {
        return reversalAgentDateTime;
    }

    public Patient reversalAgentDateTime(ZonedDateTime reversalAgentDateTime) {
        this.reversalAgentDateTime = reversalAgentDateTime;
        return this;
    }

    public void setReversalAgentDateTime(ZonedDateTime reversalAgentDateTime) {
        this.reversalAgentDateTime = reversalAgentDateTime;
    }

    
    //
    // bp-management //////////////////////////////////////////////////////////////////////////////

    @Column(name = "bp_target_reached_date_time")
    private ZonedDateTime bpTargetReachedDateTime;

    @Column(name = "bp_treatment_threshold")
    private Integer bpTreatmentThreshold;

    @Column(name = "bp_target")
    private Integer bpTarget;

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "patient")
    @JsonIgnore
    private Set<BpManagementEntry> bpManagementEntries = new HashSet<>();

    public ZonedDateTime getBpTargetReachedDateTime() {
        return bpTargetReachedDateTime;
    }

    public Patient bpTargetReachedDateTime(ZonedDateTime bpTargetReachedDateTime) {
        this.bpTargetReachedDateTime = bpTargetReachedDateTime;
        return this;
    }

    public void setBpTargetReachedDateTime(ZonedDateTime bpTargetReachedDateTime) {
        this.bpTargetReachedDateTime = bpTargetReachedDateTime;
    }

    public Integer getBpTreatmentThreshold() {
        return bpTreatmentThreshold;
    }

    public Patient bpTreatmentThreshold(Integer bpTreatmentThreshold) {
        this.bpTreatmentThreshold = bpTreatmentThreshold;
        return this;
    }

    public void setBpTreatmentThreshold(Integer bpTreatmentThreshold) {
        this.bpTreatmentThreshold = bpTreatmentThreshold;
    }

    public Integer getBpTarget() {
        return bpTarget;
    }

    public Patient bpTarget(Integer bpTarget) {
        this.bpTarget = bpTarget;
        return this;
    }

    public void setBpTarget(Integer bpTarget) {
        this.bpTarget = bpTarget;
    }

    public Set<BpManagementEntry> getBpManagementEntries() {
        return bpManagementEntries;
    }

    public Patient bpManagementEntries(Set<BpManagementEntry> bpManagementEntries) {
        this.bpManagementEntries = bpManagementEntries;
        return this;
    }

    public Patient addBpManagementEntries(BpManagementEntry bpManagementEntry) {
        bpManagementEntries.add(bpManagementEntry);
        bpManagementEntry.setPatient(this);
        return this;
    }

    public Patient removeBpManagementEntries(BpManagementEntry bpManagementEntry) {
        bpManagementEntries.remove(bpManagementEntry);
        bpManagementEntry.setPatient(null);
        return this;
    }

    public void setBpManagementEntries(Set<BpManagementEntry> bpManagementEntries) {
        this.bpManagementEntries = bpManagementEntries;
    }

    
    //
    // critical-care-referral /////////////////////////////////////////////////////////////////////
    
    @Enumerated(EnumType.STRING)
    @Column(name = "destination")
    private Destination destination;

    @Column(name = "other_destination")
    private String otherDestination;

    public Destination getDestination() {
        return destination;
    }

    public Patient destination(Destination destination) {
        this.destination = destination;
        return this;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }

    public String getOtherDestination() {
        return otherDestination;
    }

    public Patient otherDestination(String otherDestination) {
        this.otherDestination = otherDestination;
        return this;
    }

    public void setOtherDestination(String otherDestination) {
        this.otherDestination = otherDestination;
    }

    
    //
    // mrs-entry //////////////////////////////////////////////////////////////////////////////////

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "premorbid_mrs_score")
    private Integer premorbidMrsScore;    

    public Integer getPremorbidMrsScore() {
        return premorbidMrsScore;
    }

    public Patient premorbidMrsScore(Integer premorbidMrsScore) {
        this.premorbidMrsScore = premorbidMrsScore;
        return this;
    }

    public void setPremorbidMrsScore(Integer premorbidMrsScore) {
        this.premorbidMrsScore = premorbidMrsScore;
    }

        
    //
    // neurosurgery-referral-criteria /////////////////////////////////////////////////////////////

    @Column(name = "ich_volume")
    private Float ichVolume;

    @Column(name = "posterior_fossa_ich")
    private Boolean posteriorFossaIch;

    @Column(name = "ventricle_obstructed")
    private Boolean ventricleObstructed;
 
    public Float getIchVolume() {
        return ichVolume;
    }

    public Patient ichVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
        return this;
    }

    public void setIchVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
    }

    public Boolean isPosteriorFossaIch() {
        return posteriorFossaIch;
    }

    public Patient posteriorFossaIch(Boolean posteriorFossaIch) {
        this.posteriorFossaIch = posteriorFossaIch;
        return this;
    }

    public void setPosteriorFossaIch(Boolean posteriorFossaIch) {
        this.posteriorFossaIch = posteriorFossaIch;
    }

    public Boolean isVentricleObstructed() {
        return ventricleObstructed;
    }

    public Patient ventricleObstructed(Boolean ventricleObstructed) {
        this.ventricleObstructed = ventricleObstructed;
        return this;
    }

    public void setVentricleObstructed(Boolean ventricleObstructed) {
        this.ventricleObstructed = ventricleObstructed;
    }

    
    //
    // neurosurgery-referral-summary //////////////////////////////////////////////////////////////

    @Column(name = "referral_to_neurosurgery_date_time")
    private ZonedDateTime referralToNeurosurgeryDateTime;

    @Column(name = "neurosurgeon_name")
    private String neurosurgeonName;

    @Column(name = "referral_to_neurosurgery_accepted")
    private Boolean referralToNeurosurgeryAccepted;

    @Column(name = "for_active_treatment")
    private Boolean forActiveTreatment;

    public ZonedDateTime getReferralToNeurosurgeryDateTime() {
        return referralToNeurosurgeryDateTime;
    }

    public Patient referralToNeurosurgeryDateTime(ZonedDateTime referralToNeurosurgeryDateTime) {
        this.referralToNeurosurgeryDateTime = referralToNeurosurgeryDateTime;
        return this;
    }

    public void setReferralToNeurosurgeryDateTime(ZonedDateTime referralToNeurosurgeryDateTime) {
        this.referralToNeurosurgeryDateTime = referralToNeurosurgeryDateTime;
    }

    public String getNeurosurgeonName() {
        return neurosurgeonName;
    }

    public Patient neurosurgeonName(String neurosurgeonName) {
        this.neurosurgeonName = neurosurgeonName;
        return this;
    }

    public void setNeurosurgeonName(String neurosurgeonName) {
        this.neurosurgeonName = neurosurgeonName;
    }

    public Boolean isReferralToNeurosurgeryAccepted() {
        return referralToNeurosurgeryAccepted;
    }

    public Patient referralToNeurosurgeryAccepted(Boolean referralToNeurosurgeryAccepted) {
        this.referralToNeurosurgeryAccepted = referralToNeurosurgeryAccepted;
        return this;
    }

    public void setReferralToNeurosurgeryAccepted(Boolean referralToNeurosurgeryAccepted) {
        this.referralToNeurosurgeryAccepted = referralToNeurosurgeryAccepted;
    }
          
    public Boolean isForActiveTreatment() {
        return forActiveTreatment;
    }

    public Patient forActiveTreatment(Boolean forActiveTreatment) {
        this.forActiveTreatment = forActiveTreatment;
        return this;
    }

    public void setForActiveTreatment(Boolean forActiveTreatment) {
        this.forActiveTreatment = forActiveTreatment;
    }

    
    //
    // patient-end ////////////////////////////////////////////////////////////////////////////////

    @Column(name = "summary_email_address")
    private String summaryEmailAddress;
    
    public String getSummaryEmailAddress() {
        return summaryEmailAddress;
    }

    public Patient summaryEmailAddress(String summaryEmailAddress) {
        this.summaryEmailAddress = summaryEmailAddress;
        return this;
    }

    public void setSummaryEmailAddress(String summaryEmailAddress) {
        this.summaryEmailAddress = summaryEmailAddress;
    }
    
    
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Patient patient = (Patient) o;
        if(patient.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, patient.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Patient{" +
            "id=" + id +
            ", appStartDateTime='" + appStartDateTime + "'" +
            ", uniqueId='" + uniqueId + "'" +
            ", initials='" + initials + "'" +
            ", birthDate='" + birthDate + "'" +
            ", estimatedAge='" + estimatedAge + "'" +
            ", scanDateTime='" + scanDateTime + "'" +
            ", externalScanHospitalName='" + externalScanHospitalName + "'" +
            ", onsetDateTime='" + onsetDateTime + "'" +
            ", doorDateTime='" + doorDateTime + "'" +
            ", lastSeenWellOnset='" + lastSeenWellOnset + "'" +
            ", bestEstimateOnset='" + bestEstimateOnset + "'" +
            ", gcsScore='" + gcsScore + "'" +
            ", gcsScoreEye='" + gcsScoreEye + "'" +
            ", gcsScoreVerbal='" + gcsScoreVerbal + "'" +
            ", gcsScoreMotor='" + gcsScoreMotor + "'" +
            ", anticoagulantType='" + anticoagulantType + "'" +
            ", anticoagulantName='" + anticoagulantName + "'" +                        
            ", reversalAgentAdministeredAtExternalHospital='" + reversalAgentAdministeredAtExternalHospital + "'" +
            ", reversalAgentAdministeredTimeKnown='" + reversalAgentAdministeredTimeKnown + "'" +
            ", administerBeriplexWithoutInr='" + administerBeriplexWithoutInr + "'" +
            ", estimatedWeightInKg='" + estimatedWeightInKg + "'" +
            ", inrValue='" + inrValue + "'" +
            ", inrType='" + inrType + "'" +
            ", inrDateTime='" + inrDateTime + "'" +
            ", calculatedBeriplexDose='" + calculatedBeriplexDose + "'" +
            ", administerBeriplexWhenAnticoagulantUnknown='" + administerBeriplexWhenAnticoagulantUnknown + "'" +
            ", actualBeriplexDose='" + actualBeriplexDose + "'" +
            ", beriplexStartDateTime='" + beriplexStartDateTime + "'" +
            ", vitaminkDateTime='" + vitaminkDateTime + "'" +
            ", infusionInstructionsViewed='" + infusionInstructionsViewed + "'" +
            ", reversalAgentType='" + reversalAgentType + "'" +
            ", reversalAgentDateTime='" + reversalAgentDateTime + "'" +
            ", bpTargetReachedDateTime='" + bpTargetReachedDateTime + "'" +
            ", bpTreatmentThreshold='" + bpTreatmentThreshold + "'" +
            ", bpTarget='" + bpTarget + "'" +
            ", destination='" + destination + "'" +
            ", otherDestination='" + otherDestination + "'" +
            ", premorbidMrsScore='" + premorbidMrsScore + "'" +
            ", ichVolume='" + ichVolume + "'" +
            ", posteriorFossaIch='" + posteriorFossaIch + "'" +
            ", ventricleObstructed='" + ventricleObstructed + "'" +
            ", referralToNeurosurgeryDateTime='" + referralToNeurosurgeryDateTime + "'" +
            ", neurosurgeonName='" + neurosurgeonName + "'" +
            ", referralToNeurosurgeryAccepted='" + referralToNeurosurgeryAccepted + "'" +
            ", forActiveTreatment='" + forActiveTreatment + "'" +
            ", summaryEmailAddress='" + summaryEmailAddress + "'" +
            '}';
    }
}
