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

    @Column(name = "unique_id")
    private String uniqueId;

    @Column(name = "initials")
    private String initials;

    @Column(name = "birth_date")
    private LocalDate birthDate;

    @Column(name = "estimated_age")
    private Integer estimatedAge;

    @Column(name = "onset_date_time")
    private ZonedDateTime onsetDateTime;

    @Column(name = "bp_start_treatment_date_time")
    private ZonedDateTime bpStartTreatmentDateTime;

    @Column(name = "door_date_time")
    private ZonedDateTime doorDateTime;

    @Column(name = "app_start_date_time")
    private ZonedDateTime appStartDateTime;

    @Min(value = 3)
    @Max(value = 15)
    @Column(name = "gcs_score")
    private Integer gcsScore;

    @Enumerated(EnumType.STRING)
    @Column(name = "anti_coagulant")
    private AntiCoagulant antiCoagulant;

    @Column(name = "weight_in_kg")
    private Float weightInKg;

    @Min(value = 750)
    @Max(value = 5000)
    @Column(name = "calculated_beriplex_dose")
    private Integer calculatedBeriplexDose;

    @Column(name = "actual_beriplex_dose")
    private Integer actualBeriplexDose;

    @Column(name = "is_beriplex_administered")
    private Boolean isBeriplexAdministered;

    @Column(name = "beriplex_start_date_time")
    private ZonedDateTime beriplexStartDateTime;

    @Column(name = "is_vitamink_administered")
    private Boolean isVitaminkAdministered;

    @Column(name = "vitamink_date_time")
    private ZonedDateTime vitaminkDateTime;

    @Column(name = "is_infusion_instructions_viewed")
    private Boolean isInfusionInstructionsViewed;

    @Min(value = 0)
    @Max(value = 5)
    @Column(name = "premorbid_mrs_score")
    private Integer premorbidMrsScore;

    @Column(name = "is_posterior_fossa_ich")
    private Boolean isPosteriorFossaIch;

    @Column(name = "is_ventricle_obstructed")
    private Boolean isVentricleObstructed;

    @Column(name = "ich_volume")
    private Float ichVolume;

    @Column(name = "is_referred_to_neurosurgery")
    private Boolean isReferredToNeurosurgery;

    @Column(name = "is_for_active_treatment")
    private Boolean isForActiveTreatment;

    @Enumerated(EnumType.STRING)
    @Column(name = "destination")
    private Destination destination;

    @Column(name = "other_destination")
    private String otherDestination;

    @OneToOne
    @JoinColumn(unique = true)
    private Hospital hospital;

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private Set<Inr> inrs = new HashSet<>();

    @OneToMany(mappedBy = "patient")
    @JsonIgnore
    private Set<BpManagementEntry> bpManagementEntries = new HashSet<>();

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

    public ZonedDateTime getBpStartTreatmentDateTime() {
        return bpStartTreatmentDateTime;
    }

    public Patient bpStartTreatmentDateTime(ZonedDateTime bpStartTreatmentDateTime) {
        this.bpStartTreatmentDateTime = bpStartTreatmentDateTime;
        return this;
    }

    public void setBpStartTreatmentDateTime(ZonedDateTime bpStartTreatmentDateTime) {
        this.bpStartTreatmentDateTime = bpStartTreatmentDateTime;
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

    public Float getWeightInKg() {
        return weightInKg;
    }

    public Patient weightInKg(Float weightInKg) {
        this.weightInKg = weightInKg;
        return this;
    }

    public void setWeightInKg(Float weightInKg) {
        this.weightInKg = weightInKg;
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

    public Boolean isIsBeriplexAdministered() {
        return isBeriplexAdministered;
    }

    public Patient isBeriplexAdministered(Boolean isBeriplexAdministered) {
        this.isBeriplexAdministered = isBeriplexAdministered;
        return this;
    }

    public void setIsBeriplexAdministered(Boolean isBeriplexAdministered) {
        this.isBeriplexAdministered = isBeriplexAdministered;
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

    public Boolean isIsVitaminkAdministered() {
        return isVitaminkAdministered;
    }

    public Patient isVitaminkAdministered(Boolean isVitaminkAdministered) {
        this.isVitaminkAdministered = isVitaminkAdministered;
        return this;
    }

    public void setIsVitaminkAdministered(Boolean isVitaminkAdministered) {
        this.isVitaminkAdministered = isVitaminkAdministered;
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

    public Boolean isIsInfusionInstructionsViewed() {
        return isInfusionInstructionsViewed;
    }

    public Patient isInfusionInstructionsViewed(Boolean isInfusionInstructionsViewed) {
        this.isInfusionInstructionsViewed = isInfusionInstructionsViewed;
        return this;
    }

    public void setIsInfusionInstructionsViewed(Boolean isInfusionInstructionsViewed) {
        this.isInfusionInstructionsViewed = isInfusionInstructionsViewed;
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

    public Boolean isIsPosteriorFossaIch() {
        return isPosteriorFossaIch;
    }

    public Patient isPosteriorFossaIch(Boolean isPosteriorFossaIch) {
        this.isPosteriorFossaIch = isPosteriorFossaIch;
        return this;
    }

    public void setIsPosteriorFossaIch(Boolean isPosteriorFossaIch) {
        this.isPosteriorFossaIch = isPosteriorFossaIch;
    }

    public Boolean isIsVentricleObstructed() {
        return isVentricleObstructed;
    }

    public Patient isVentricleObstructed(Boolean isVentricleObstructed) {
        this.isVentricleObstructed = isVentricleObstructed;
        return this;
    }

    public void setIsVentricleObstructed(Boolean isVentricleObstructed) {
        this.isVentricleObstructed = isVentricleObstructed;
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

    public Boolean isIsReferredToNeurosurgery() {
        return isReferredToNeurosurgery;
    }

    public Patient isReferredToNeurosurgery(Boolean isReferredToNeurosurgery) {
        this.isReferredToNeurosurgery = isReferredToNeurosurgery;
        return this;
    }

    public void setIsReferredToNeurosurgery(Boolean isReferredToNeurosurgery) {
        this.isReferredToNeurosurgery = isReferredToNeurosurgery;
    }

    public Boolean isIsForActiveTreatment() {
        return isForActiveTreatment;
    }

    public Patient isForActiveTreatment(Boolean isForActiveTreatment) {
        this.isForActiveTreatment = isForActiveTreatment;
        return this;
    }

    public void setIsForActiveTreatment(Boolean isForActiveTreatment) {
        this.isForActiveTreatment = isForActiveTreatment;
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

    public Set<Inr> getInrs() {
        return inrs;
    }

    public Patient inrs(Set<Inr> inrs) {
        this.inrs = inrs;
        return this;
    }

    public Patient addInrs(Inr inr) {
        inrs.add(inr);
        inr.setPatient(this);
        return this;
    }

    public Patient removeInrs(Inr inr) {
        inrs.remove(inr);
        inr.setPatient(null);
        return this;
    }

    public void setInrs(Set<Inr> inrs) {
        this.inrs = inrs;
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
            ", bpStartTreatmentDateTime='" + bpStartTreatmentDateTime + "'" +
            ", doorDateTime='" + doorDateTime + "'" +
            ", appStartDateTime='" + appStartDateTime + "'" +
            ", gcsScore='" + gcsScore + "'" +
            ", antiCoagulant='" + antiCoagulant + "'" +
            ", weightInKg='" + weightInKg + "'" +
            ", calculatedBeriplexDose='" + calculatedBeriplexDose + "'" +
            ", actualBeriplexDose='" + actualBeriplexDose + "'" +
            ", isBeriplexAdministered='" + isBeriplexAdministered + "'" +
            ", beriplexStartDateTime='" + beriplexStartDateTime + "'" +
            ", isVitaminkAdministered='" + isVitaminkAdministered + "'" +
            ", vitaminkDateTime='" + vitaminkDateTime + "'" +
            ", isInfusionInstructionsViewed='" + isInfusionInstructionsViewed + "'" +
            ", premorbidMrsScore='" + premorbidMrsScore + "'" +
            ", isPosteriorFossaIch='" + isPosteriorFossaIch + "'" +
            ", isVentricleObstructed='" + isVentricleObstructed + "'" +
            ", ichVolume='" + ichVolume + "'" +
            ", isReferredToNeurosurgery='" + isReferredToNeurosurgery + "'" +
            ", isForActiveTreatment='" + isForActiveTreatment + "'" +
            ", destination='" + destination + "'" +
            ", otherDestination='" + otherDestination + "'" +
            '}';
    }
}
