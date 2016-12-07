package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity BpManagementEntry and its DTO BpManagementEntryDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface BpManagementEntryMapper {

    @Mapping(source = "patient.id", target = "patientId")
    BpManagementEntryDTO bpManagementEntryToBpManagementEntryDTO(BpManagementEntry bpManagementEntry);

    List<BpManagementEntryDTO> bpManagementEntriesToBpManagementEntryDTOs(List<BpManagementEntry> bpManagementEntries);

    @Mapping(source = "patientId", target = "patient")
    BpManagementEntry bpManagementEntryDTOToBpManagementEntry(BpManagementEntryDTO bpManagementEntryDTO);

    List<BpManagementEntry> bpManagementEntryDTOsToBpManagementEntries(List<BpManagementEntryDTO> bpManagementEntryDTOs);

    default Patient patientFromId(Long id) {
        if (id == null) {
            return null;
        }
        Patient patient = new Patient();
        patient.setId(id);
        return patient;
    }
}
