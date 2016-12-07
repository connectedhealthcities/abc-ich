package org.nibhi.strokeapp.service.dto;

import java.time.ZonedDateTime;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import org.nibhi.strokeapp.domain.enumeration.InrType;

/**
 * A DTO for the Inr entity.
 */
public class InrDTO implements Serializable {

    private Long id;

    private Float value;

    private InrType inrType;

    private ZonedDateTime measuredDateTime;


    private Long patientId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Float getValue() {
        return value;
    }

    public void setValue(Float value) {
        this.value = value;
    }
    public InrType getInrType() {
        return inrType;
    }

    public void setInrType(InrType inrType) {
        this.inrType = inrType;
    }
    public ZonedDateTime getMeasuredDateTime() {
        return measuredDateTime;
    }

    public void setMeasuredDateTime(ZonedDateTime measuredDateTime) {
        this.measuredDateTime = measuredDateTime;
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

        InrDTO inrDTO = (InrDTO) o;

        if ( ! Objects.equals(id, inrDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "InrDTO{" +
            "id=" + id +
            ", value='" + value + "'" +
            ", inrType='" + inrType + "'" +
            ", measuredDateTime='" + measuredDateTime + "'" +
            '}';
    }
}
