package org.nibhi.strokeapp.service.dto;

import java.io.Serializable;
import java.util.Objects;


/**
 * A DTO for the Hospital entity.
 */
public class HospitalDTO implements Serializable {

    private Long id;

    private String uniqueId;

    private String name;


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
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        HospitalDTO hospitalDTO = (HospitalDTO) o;

        if ( ! Objects.equals(id, hospitalDTO.id)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "HospitalDTO{" +
            "id=" + id +
            ", uniqueId='" + uniqueId + "'" +
            ", name='" + name + "'" +
            '}';
    }
}
