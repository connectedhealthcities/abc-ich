package org.nibhi.strokeapp.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A BpManagementEntry.
 */
@Entity
@Table(name = "bp_management_entry")
public class BpManagementEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "date_time")
    private ZonedDateTime dateTime;

    @Column(name = "systolic_bp")
    private Integer systolicBp;

    @Column(name = "gtn_rate")
    private Float gtnRate;

    @Column(name = "labetalol_dose")
    private Integer labetalolDose;

    @Column(name = "heart_rate")
    private Integer heartRate;

    @ManyToOne
    private Patient patient;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public BpManagementEntry dateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
        return this;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public Integer getSystolicBp() {
        return systolicBp;
    }

    public BpManagementEntry systolicBp(Integer systolicBp) {
        this.systolicBp = systolicBp;
        return this;
    }

    public void setSystolicBp(Integer systolicBp) {
        this.systolicBp = systolicBp;
    }

    public Float getGtnRate() {
        return gtnRate;
    }

    public BpManagementEntry gtnRate(Float gtnRate) {
        this.gtnRate = gtnRate;
        return this;
    }

    public void setGtnRate(Float gtnRate) {
        this.gtnRate = gtnRate;
    }

    public Integer getLabetalolDose() {
        return labetalolDose;
    }

    public BpManagementEntry labetalolDose(Integer labetalolDose) {
        this.labetalolDose = labetalolDose;
        return this;
    }

    public void setLabetalolDose(Integer labetalolDose) {
        this.labetalolDose = labetalolDose;
    }

    public Integer getHeartRate() {
        return heartRate;
    }

    public BpManagementEntry heartRate(Integer heartRate) {
        this.heartRate = heartRate;
        return this;
    }

    public void setHeartRate(Integer heartRate) {
        this.heartRate = heartRate;
    }

    public Patient getPatient() {
        return patient;
    }

    public BpManagementEntry patient(Patient patient) {
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
        BpManagementEntry bpManagementEntry = (BpManagementEntry) o;
        if(bpManagementEntry.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, bpManagementEntry.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "BpManagementEntry{" +
            "id=" + id +
            ", dateTime='" + dateTime + "'" +
            ", systolicBp='" + systolicBp + "'" +
            ", gtnRate='" + gtnRate + "'" +
            ", labetalolDose='" + labetalolDose + "'" +
            ", heartRate='" + heartRate + "'" +
            '}';
    }
}
