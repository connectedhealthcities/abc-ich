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

    private ZonedDateTime doorDateTime;

    private ZonedDateTime appStartDateTime;

    private ZonedDateTime bpTargetReachedDateTime;

    @Min(value = 3)
    @Max(value = 15)
    private Integer gcsScore;

    private AntiCoagulant antiCoagulant;

    private Float estimatedWeightInKg;

    @Min(value = 750)
    @Max(value = 5000)
    private Integer calculatedBeriplexDose;

    private Integer actualBeriplexDose;

    private ZonedDateTime beriplexStartDateTime;

    private ZonedDateTime vitaminkDateTime;

    @Min(value = 0)
    @Max(value = 5)
    private Integer premorbidMrsScore;

    private Float ichVolume;

    private Destination destination;

    private String otherDestination;

    private ZonedDateTime scanDateTime;

    private Boolean beriplexAdministered;

    private Boolean vitaminkAdministered;

    private Boolean infusionInstructionsViewed;

    private Boolean posteriorFossaIch;

    private Boolean ventricleObstructed;

    private Boolean referredToNeurosurgery;

    private Boolean forActiveTreatment;

    private Boolean externalScan;

    private Boolean lastSeenWellOnset;

    private Boolean bestEstimateOnset;


    private Long hospitalId;
    

    private String hospitalUniqueId;

    private Long inrId;
    
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
    public AntiCoagulant getAntiCoagulant() {
        return antiCoagulant;
    }

    public void setAntiCoagulant(AntiCoagulant antiCoagulant) {
        this.antiCoagulant = antiCoagulant;
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
    public ZonedDateTime getBeriplexStartDateTime() {
        return beriplexStartDateTime;
    }

    public void setBeriplexStartDateTime(ZonedDateTime beriplexStartDateTime) {
        this.beriplexStartDateTime = beriplexStartDateTime;
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
    public ZonedDateTime getScanDateTime() {
        return scanDateTime;
    }

    public void setScanDateTime(ZonedDateTime scanDateTime) {
        this.scanDateTime = scanDateTime;
    }
    public Boolean getBeriplexAdministered() {
        return beriplexAdministered;
    }

    public void setBeriplexAdministered(Boolean beriplexAdministered) {
        this.beriplexAdministered = beriplexAdministered;
    }
    public Boolean getVitaminkAdministered() {
        return vitaminkAdministered;
    }

    public void setVitaminkAdministered(Boolean vitaminkAdministered) {
        this.vitaminkAdministered = vitaminkAdministered;
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
    public Boolean getReferredToNeurosurgery() {
        return referredToNeurosurgery;
    }

    public void setReferredToNeurosurgery(Boolean referredToNeurosurgery) {
        this.referredToNeurosurgery = referredToNeurosurgery;
    }
    public Boolean getForActiveTreatment() {
        return forActiveTreatment;
    }

    public void setForActiveTreatment(Boolean forActiveTreatment) {
        this.forActiveTreatment = forActiveTreatment;
    }
    public Boolean getExternalScan() {
        return externalScan;
    }

    public void setExternalScan(Boolean externalScan) {
        this.externalScan = externalScan;
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

    public Long getInrId() {
        return inrId;
    }

    public void setInrId(Long inrId) {
        this.inrId = inrId;
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
