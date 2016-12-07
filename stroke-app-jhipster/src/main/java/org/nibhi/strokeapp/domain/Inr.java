package org.nibhi.strokeapp.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

import org.nibhi.strokeapp.domain.enumeration.InrType;

/**
 * A Inr.
 */
@Entity
@Table(name = "inr")
public class Inr implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "value")
    private Float value;

    @Enumerated(EnumType.STRING)
    @Column(name = "inr_type")
    private InrType inrType;

    @Column(name = "measured_date_time")
    private ZonedDateTime measuredDateTime;

    @ManyToOne
    private Patient patient;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Float getValue() {
        return value;
    }

    public Inr value(Float value) {
        this.value = value;
        return this;
    }

    public void setValue(Float value) {
        this.value = value;
    }

    public InrType getInrType() {
        return inrType;
    }

    public Inr inrType(InrType inrType) {
        this.inrType = inrType;
        return this;
    }

    public void setInrType(InrType inrType) {
        this.inrType = inrType;
    }

    public ZonedDateTime getMeasuredDateTime() {
        return measuredDateTime;
    }

    public Inr measuredDateTime(ZonedDateTime measuredDateTime) {
        this.measuredDateTime = measuredDateTime;
        return this;
    }

    public void setMeasuredDateTime(ZonedDateTime measuredDateTime) {
        this.measuredDateTime = measuredDateTime;
    }

    public Patient getPatient() {
        return patient;
    }

    public Inr patient(Patient patient) {
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
        Inr inr = (Inr) o;
        if(inr.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, inr.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Inr{" +
            "id=" + id +
            ", value='" + value + "'" +
            ", inrType='" + inrType + "'" +
            ", measuredDateTime='" + measuredDateTime + "'" +
            '}';
    }
}
