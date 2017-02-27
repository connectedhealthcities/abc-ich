package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.PatientDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Patient and its DTO PatientDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PatientMapper {

    @Mapping(source = "hospital.id", target = "hospitalId")
    @Mapping(source = "hospital.uniqueId", target = "hospitalUniqueId")
    PatientDTO patientToPatientDTO(Patient patient);

    @Mapping(target = "isDuplicate", ignore = true)
    @Mapping(target = "isDuplicateAllowed", ignore = true)
    List<PatientDTO> patientsToPatientDTOs(List<Patient> patients);

    @Mapping(source = "hospitalId", target = "hospital")
    Patient patientDTOToPatient(PatientDTO patientDTO);

    List<Patient> patientDTOsToPatients(List<PatientDTO> patientDTOs);

    default Hospital hospitalFromId(Long id) {
        if (id == null) {
            return null;
        }
        Hospital hospital = new Hospital();
        hospital.setId(id);
        return hospital;
    }
}
