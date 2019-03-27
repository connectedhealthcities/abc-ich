package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.IchEntryDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity IchEntry and its DTO IchEntryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface IchEntryMapper {

    @Mapping(source = "patient.id", target = "patientId")
    IchEntryDTO ichEntryToIchEntryDTO(IchEntry ichEntry);

    List<IchEntryDTO> ichEntriesToIchEntryDTOs(List<IchEntry> ichEntries);

    @Mapping(source = "patientId", target = "patient")
    IchEntry ichEntryDTOToIchEntry(IchEntryDTO ichEntryDTO);

    List<IchEntry> ichEntryDTOsToIchEntries(List<IchEntryDTO> ichEntryDTOs);

    default Patient patientFromId(Long id) {
        if (id == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }
}
