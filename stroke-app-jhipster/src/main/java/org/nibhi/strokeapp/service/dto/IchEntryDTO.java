package org.nibhi.strokeapp.service.dto;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;


/**
 * A DTO for the IchEntry entity.
 */
public class IchEntryDTO implements Serializable {

    private Long id;

    private Float longestAxis;

    private Float longestAxisPerpendicular;

    private Integer numberOfSlices;

    private Float sliceThickness;

    private Float ichVolume;


    private Long patientId;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public Float getLongestAxis() {
        return longestAxis;
    }

    public void setLongestAxis(Float longestAxis) {
        this.longestAxis = longestAxis;
    }
    public Float getLongestAxisPerpendicular() {
        return longestAxisPerpendicular;
    }

    public void setLongestAxisPerpendicular(Float longestAxisPerpendicular) {
        this.longestAxisPerpendicular = longestAxisPerpendicular;
    }
    public Integer getNumberOfSlices() {
        return numberOfSlices;
    }

    public void setNumberOfSlices(Integer numberOfSlices) {
        this.numberOfSlices = numberOfSlices;
    }
    public Float getSliceThickness() {
        return sliceThickness;
    }

    public void setSliceThickness(Float sliceThickness) {
        this.sliceThickness = sliceThickness;
    }
    public Float getIchVolume() {
        return ichVolume;
    }

    public void setIchVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
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

        IchEntryDTO ichEntryDTO = (IchEntryDTO) o;

        if ( ! Objects.equals(id, ichEntryDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "IchEntryDTO{" +
            "id=" + id +
            ", longestAxis='" + longestAxis + "'" +
            ", longestAxisPerpendicular='" + longestAxisPerpendicular + "'" +
            ", numberOfSlices='" + numberOfSlices + "'" +
            ", sliceThickness='" + sliceThickness + "'" +
            ", ichVolume='" + ichVolume + "'" +
            '}';
    }
}
