package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.HospitalDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Hospital and its DTO HospitalDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface HospitalMapper {

    HospitalDTO hospitalToHospitalDTO(Hospital hospital);

    List<HospitalDTO> hospitalsToHospitalDTOs(List<Hospital> hospitals);

    Hospital hospitalDTOToHospital(HospitalDTO hospitalDTO);

    List<Hospital> hospitalDTOsToHospitals(List<HospitalDTO> hospitalDTOs);
}
