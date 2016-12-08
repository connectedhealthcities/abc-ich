package org.nibhi.strokeapp.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the BpManagementEntry entity.
 */
public class BpManagementEntryDTO implements Serializable {

    private Long id;

    private ZonedDateTime dateTime;

    private Integer systolicBp;

    private Float gtnRate;

    private Integer labetalolDose;

    private Integer heartRate;


    private Long patientId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }
    public Integer getSystolicBp() {
        return systolicBp;
    }

    public void setSystolicBp(Integer systolicBp) {
        this.systolicBp = systolicBp;
    }
    public Float getGtnRate() {
        return gtnRate;
    }

    public void setGtnRate(Float gtnRate) {
        this.gtnRate = gtnRate;
    }
    public Integer getLabetalolDose() {
        return labetalolDose;
    }

    public void setLabetalolDose(Integer labetalolDose) {
        this.labetalolDose = labetalolDose;
    }
    public Integer getHeartRate() {
        return heartRate;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        BpManagementEntryDTO bpManagementEntryDTO = (BpManagementEntryDTO) o;

        if ( ! Objects.equals(id, bpManagementEntryDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "BpManagementEntryDTO{" +
            "id=" + id +
            ", dateTime='" + dateTime + "'" +
            ", systolicBp='" + systolicBp + "'" +
            ", gtnRate='" + gtnRate + "'" +
            ", labetalolDose='" + labetalolDose + "'" +
            ", heartRate='" + heartRate + "'" +
            '}';
    }
}
