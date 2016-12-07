package org.nibhi.strokeapp.service.dto;

import java.time.LocalDate;
import java.time.ZonedDateTime;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.nibhi.strokeapp.domain.enumeration.AntiCoagulant;
import org.nibhi.strokeapp.domain.enumeration.Destination;

/**
 * A DTO for the Patient entity.
 */
public class PatientDTO implements Serializable {

    private Long id;

    private String uniqueId;

    private String initials;

    private LocalDate birthDate;

    private Integer estimatedAge;

    private ZonedDateTime onsetDateTime;

    private ZonedDateTime bpStartTreatmentDateTime;

    private ZonedDateTime doorDateTime;

    private ZonedDateTime appStartDateTime;

    @Min(value = 3)
    @Max(value = 15)
    private Integer gcsScore;

    private AntiCoagulant antiCoagulant;

    private Float weightInKg;

    @Min(value = 750)
    @Max(value = 5000)
    private Integer calculatedBeriplexDose;

    private Integer actualBeriplexDose;

    private Boolean isBeriplexAdministered;

    private ZonedDateTime beriplexStartDateTime;

    private Boolean isVitaminkAdministered;

    private ZonedDateTime vitaminkDateTime;

    private Boolean isInfusionInstructionsViewed;

    @Min(value = 0)
    @Max(value = 5)
    private Integer premorbidMrsScore;

    private Boolean isPosteriorFossaIch;

    private Boolean isVentricleObstructed;

    private Float ichVolume;

    private Boolean isReferredToNeurosurgery;

    private Boolean isForActiveTreatment;

    private Destination destination;

    private String otherDestination;


    private Long hospitalId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
    public ZonedDateTime getBpStartTreatmentDateTime() {
        return bpStartTreatmentDateTime;
    }

    public void setBpStartTreatmentDateTime(ZonedDateTime bpStartTreatmentDateTime) {
        this.bpStartTreatmentDateTime = bpStartTreatmentDateTime;
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
    public Integer getGcsScore() {
        return gcsScore;
    }

    public void setGcsScore(Integer gcsScore) {
        this.gcsScore = gcsScore;
    }
    public AntiCoagulant getAntiCoagulant() {
        return antiCoagulant;
    }

    public void setAntiCoagulant(AntiCoagulant antiCoagulant) {
        this.antiCoagulant = antiCoagulant;
    }
    public Float getWeightInKg() {
        return weightInKg;
    }

    public void setWeightInKg(Float weightInKg) {
        this.weightInKg = weightInKg;
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
    public Boolean getIsBeriplexAdministered() {
        return isBeriplexAdministered;
    }

    public void setIsBeriplexAdministered(Boolean isBeriplexAdministered) {
        this.isBeriplexAdministered = isBeriplexAdministered;
    }
    public ZonedDateTime getBeriplexStartDateTime() {
        return beriplexStartDateTime;
    }

    public void setBeriplexStartDateTime(ZonedDateTime beriplexStartDateTime) {
        this.beriplexStartDateTime = beriplexStartDateTime;
    }
    public Boolean getIsVitaminkAdministered() {
        return isVitaminkAdministered;
    }

    public void setIsVitaminkAdministered(Boolean isVitaminkAdministered) {
        this.isVitaminkAdministered = isVitaminkAdministered;
    }
    public ZonedDateTime getVitaminkDateTime() {
        return vitaminkDateTime;
    }

    public void setVitaminkDateTime(ZonedDateTime vitaminkDateTime) {
        this.vitaminkDateTime = vitaminkDateTime;
    }
    public Boolean getIsInfusionInstructionsViewed() {
        return isInfusionInstructionsViewed;
    }

    public void setIsInfusionInstructionsViewed(Boolean isInfusionInstructionsViewed) {
        this.isInfusionInstructionsViewed = isInfusionInstructionsViewed;
    }
    public Integer getPremorbidMrsScore() {
        return premorbidMrsScore;
    }

    public void setPremorbidMrsScore(Integer premorbidMrsScore) {
        this.premorbidMrsScore = premorbidMrsScore;
    }
    public Boolean getIsPosteriorFossaIch() {
        return isPosteriorFossaIch;
    }

    public void setIsPosteriorFossaIch(Boolean isPosteriorFossaIch) {
        this.isPosteriorFossaIch = isPosteriorFossaIch;
    }
    public Boolean getIsVentricleObstructed() {
        return isVentricleObstructed;
    }

    public void setIsVentricleObstructed(Boolean isVentricleObstructed) {
        this.isVentricleObstructed = isVentricleObstructed;
    }
    public Float getIchVolume() {
        return ichVolume;
    }

    public void setIchVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
    }
    public Boolean getIsReferredToNeurosurgery() {
        return isReferredToNeurosurgery;
    }

    public void setIsReferredToNeurosurgery(Boolean isReferredToNeurosurgery) {
        this.isReferredToNeurosurgery = isReferredToNeurosurgery;
    }
    public Boolean getIsForActiveTreatment() {
        return isForActiveTreatment;
    }

    public void setIsForActiveTreatment(Boolean isForActiveTreatment) {
        this.isForActiveTreatment = isForActiveTreatment;
    }
    public Destination getDestination() {
        return destination;
    }

    public void setDestination(Destination destination) {
        this.destination = destination;
    }
    public String getOtherDestination() {
        return otherDestination;
    }

    public void setOtherDestination(String otherDestination) {
        this.otherDestination = otherDestination;
    }

    public Long getHospitalId() {
        return hospitalId;
    }

    public void setHospitalId(Long hospitalId) {
        this.hospitalId = hospitalId;
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
