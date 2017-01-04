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

import org.nibhi.strokeapp.domain.enumeration.AntiCoagulant;

import org.nibhi.strokeapp.domain.enumeration.Destination;

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

    @Column(name = "unique_id", unique=true)
    private String uniqueId;

    @Column(name = "initials")
    private String initials;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "estimated_age")
    private Integer estimatedAge;

    @Column(name = "onset_date_time")
    private ZonedDateTime onsetDateTime;

    @Column(name = "door_date_time")
    private ZonedDateTime doorDateTime;

    @Column(name = "app_start_date_time")
    private ZonedDateTime appStartDateTime;

    @Column(name = "bp_target_reached_date_time")
    private ZonedDateTime bpTargetReachedDateTime;

    @Min(value = 3)
    @Max(value = 15)
    @Column(name = "gcs_score")
    private Integer gcsScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "anti_coagulant")
    private AntiCoagulant antiCoagulant;

    @Column(name = "estimated_weight_in_kg")
    private Float estimatedWeightInKg;

    @Min(value = 750)
    @Max(value = 5000)
    @Column(name = "calculated_beriplex_dose")
    private Integer calculatedBeriplexDose;

    @Column(name = "actual_beriplex_dose")
    private Integer actualBeriplexDose;

    @Column(name = "beriplex_start_date_time")
    private ZonedDateTime beriplexStartDateTime;

    @Column(name = "vitamink_date_time")
    private ZonedDateTime vitaminkDateTime;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "premorbid_mrs_score")
    private Integer premorbidMrsScore;

    @Column(name = "ich_volume")
    private Float ichVolume;

    @Enumerated(EnumType.STRING)
    @Column(name = "destination")
    private Destination destination;

    @Column(name = "other_destination")
    private String otherDestination;

    @Column(name = "scan_date_time")
    private ZonedDateTime scanDateTime;

    @Column(name = "beriplex_administered")
    private Boolean beriplexAdministered;

    @Column(name = "vitamink_administered")
    private Boolean vitaminkAdministered;

    @Column(name = "infusion_instructions_viewed")
    private Boolean infusionInstructionsViewed;

    @Column(name = "posterior_fossa_ich")
    private Boolean posteriorFossaIch;

    @Column(name = "ventricle_obstructed")
    private Boolean ventricleObstructed;

    @Column(name = "referred_to_neurosurgery")
    private Boolean referredToNeurosurgery;

    @Column(name = "for_active_treatment")
    private Boolean forActiveTreatment;

    @Column(name = "external_scan")
    private Boolean externalScan;

    @Column(name = "last_seen_well_onset")
    private Boolean lastSeenWellOnset;

    @Column(name = "best_estimate_onset")
    private Boolean bestEstimateOnset;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private Set<BpManagementEntry> bpManagementEntries = new HashSet<>();

    @ManyToOne
    private Hospital hospital;

    @OneToOne
    @JoinColumn(unique = true)
    private Inr inr;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public AntiCoagulant getAntiCoagulant() {
        return antiCoagulant;
    }

    public Patient antiCoagulant(AntiCoagulant antiCoagulant) {
        this.antiCoagulant = antiCoagulant;
        return this;
    }

    public void setAntiCoagulant(AntiCoagulant antiCoagulant) {
        this.antiCoagulant = antiCoagulant;
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

    public Boolean isBeriplexAdministered() {
        return beriplexAdministered;
    }

    public Patient beriplexAdministered(Boolean beriplexAdministered) {
        this.beriplexAdministered = beriplexAdministered;
        return this;
    }

    public void setBeriplexAdministered(Boolean beriplexAdministered) {
        this.beriplexAdministered = beriplexAdministered;
    }

    public Boolean isVitaminkAdministered() {
        return vitaminkAdministered;
    }

    public Patient vitaminkAdministered(Boolean vitaminkAdministered) {
        this.vitaminkAdministered = vitaminkAdministered;
        return this;
    }

    public void setVitaminkAdministered(Boolean vitaminkAdministered) {
        this.vitaminkAdministered = vitaminkAdministered;
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

    public Boolean isReferredToNeurosurgery() {
        return referredToNeurosurgery;
    }

    public Patient referredToNeurosurgery(Boolean referredToNeurosurgery) {
        this.referredToNeurosurgery = referredToNeurosurgery;
        return this;
    }

    public void setReferredToNeurosurgery(Boolean referredToNeurosurgery) {
        this.referredToNeurosurgery = referredToNeurosurgery;
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

    public Boolean isExternalScan() {
        return externalScan;
    }

    public Patient externalScan(Boolean externalScan) {
        this.externalScan = externalScan;
        return this;
    }

    public void setExternalScan(Boolean externalScan) {
        this.externalScan = externalScan;
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

    public Inr getInr() {
        return inr;
    }

    public Patient inr(Inr inr) {
        this.inr = inr;
        return this;
    }

    public void setInr(Inr inr) {
        this.inr = inr;
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
            ", uniqueId='" + uniqueId + "'" +
            ", initials='" + initials + "'" +
            ", birthDate='" + birthDate + "'" +
            ", estimatedAge='" + estimatedAge + "'" +
            ", onsetDateTime='" + onsetDateTime + "'" +
            ", doorDateTime='" + doorDateTime + "'" +
            ", appStartDateTime='" + appStartDateTime + "'" +
            ", bpTargetReachedDateTime='" + bpTargetReachedDateTime + "'" +
            ", gcsScore='" + gcsScore + "'" +
            ", antiCoagulant='" + antiCoagulant + "'" +
            ", estimatedWeightInKg='" + estimatedWeightInKg + "'" +
            ", calculatedBeriplexDose='" + calculatedBeriplexDose + "'" +
            ", actualBeriplexDose='" + actualBeriplexDose + "'" +
            ", beriplexStartDateTime='" + beriplexStartDateTime + "'" +
            ", vitaminkDateTime='" + vitaminkDateTime + "'" +
            ", premorbidMrsScore='" + premorbidMrsScore + "'" +
            ", ichVolume='" + ichVolume + "'" +
            ", destination='" + destination + "'" +
            ", otherDestination='" + otherDestination + "'" +
            ", scanDateTime='" + scanDateTime + "'" +
            ", beriplexAdministered='" + beriplexAdministered + "'" +
            ", vitaminkAdministered='" + vitaminkAdministered + "'" +
            ", infusionInstructionsViewed='" + infusionInstructionsViewed + "'" +
            ", posteriorFossaIch='" + posteriorFossaIch + "'" +
            ", ventricleObstructed='" + ventricleObstructed + "'" +
            ", referredToNeurosurgery='" + referredToNeurosurgery + "'" +
            ", forActiveTreatment='" + forActiveTreatment + "'" +
            ", externalScan='" + externalScan + "'" +
            ", lastSeenWellOnset='" + lastSeenWellOnset + "'" +
            ", bestEstimateOnset='" + bestEstimateOnset + "'" +
            '}';
    }
}
