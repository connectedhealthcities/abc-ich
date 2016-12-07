package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.InrDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Inr and its DTO InrDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InrMapper {

    @Mapping(source = "patient.id", target = "patientId")
    InrDTO inrToInrDTO(Inr inr);

    List<InrDTO> inrsToInrDTOs(List<Inr> inrs);

    @Mapping(source = "patientId", target = "patient")
    Inr inrDTOToInr(InrDTO inrDTO);

    List<Inr> inrDTOsToInrs(List<InrDTO> inrDTOs);

    default Patient patientFromId(Long id) {
        if (id == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }
}
