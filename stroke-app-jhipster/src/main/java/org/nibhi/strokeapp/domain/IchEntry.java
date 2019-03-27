package org.nibhi.strokeapp.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A IchEntry.
 */
@Entity
@Table(name = "ich_entry")
public class IchEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "longest_axis")
    private Float longestAxis;

    @Column(name = "longest_axis_perpendicular")
    private Float longestAxisPerpendicular;

    @Column(name = "number_of_slices")
    private Integer numberOfSlices;

    @Column(name = "slice_thickness")
    private Float sliceThickness;

    @Column(name = "ich_volume")
    private Float ichVolume;

    @ManyToOne
    private Patient patient;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getLongestAxis() {
        return longestAxis;
    }

    public IchEntry longestAxis(Float longestAxis) {
        this.longestAxis = longestAxis;
        return this;
    }

    public void setLongestAxis(Float longestAxis) {
        this.longestAxis = longestAxis;
    }

    public Float getLongestAxisPerpendicular() {
        return longestAxisPerpendicular;
    }

    public IchEntry longestAxisPerpendicular(Float longestAxisPerpendicular) {
        this.longestAxisPerpendicular = longestAxisPerpendicular;
        return this;
    }

    public void setLongestAxisPerpendicular(Float longestAxisPerpendicular) {
        this.longestAxisPerpendicular = longestAxisPerpendicular;
    }

    public Integer getNumberOfSlices() {
        return numberOfSlices;
    }

    public IchEntry numberOfSlices(Integer numberOfSlices) {
        this.numberOfSlices = numberOfSlices;
        return this;
    }

    public void setNumberOfSlices(Integer numberOfSlices) {
        this.numberOfSlices = numberOfSlices;
    }

    public Float getSliceThickness() {
        return sliceThickness;
    }

    public IchEntry sliceThickness(Float sliceThickness) {
        this.sliceThickness = sliceThickness;
        return this;
    }

    public void setSliceThickness(Float sliceThickness) {
        this.sliceThickness = sliceThickness;
    }

    public Float getIchVolume() {
        return ichVolume;
    }

    public IchEntry ichVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
        return this;
    }

    public void setIchVolume(Float ichVolume) {
        this.ichVolume = ichVolume;
    }

    public Patient getPatient() {
        return patient;
    }

    public IchEntry patient(Patient patient) {
        this.patient = patient;
        return this;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        IchEntry ichEntry = (IchEntry) o;
        if(ichEntry.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, ichEntry.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "IchEntry{" +
            "id=" + id +
            ", longestAxis='" + longestAxis + "'" +
            ", longestAxisPerpendicular='" + longestAxisPerpendicular + "'" +
            ", numberOfSlices='" + numberOfSlices + "'" +
            ", sliceThickness='" + sliceThickness + "'" +
            ", ichVolume='" + ichVolume + "'" +
            '}';
    }
}
