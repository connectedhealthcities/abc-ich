package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.PatientDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing Patient.
 */
public interface PatientService {

    /**
     * Create a patient.
     *
     * @param patientDTO the entity to create
     * @return the persisted entity
     */
    PatientDTO create(PatientDTO patientDTO);

    /**
     * Update a patient.
     *
     * @param patientDTO the entity to update
     * @return the persisted entity
     */
    PatientDTO update(PatientDTO patientDTO);

    /**
     *  Get all the patients.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    Page<PatientDTO> findAll(Pageable pageable);

    /**
     *  Get all the patients for the hospital.
     *  
     *  @param pageable the pagination information
     *  @param hospitalId the unique id of the hospital
     *  @return the list of entities
     */
    Page<PatientDTO> findAllByHospital(Pageable pageable, String hospitalId);

    /**
     *  Get all the patients.
     *  
     *  @return the list of entities
     */
    List<PatientDTO> findAll();

    /**
     *  Get all the patients for the hospital.
     *  
     *  @param hospitalId the unique id of the hospital
     *  @return the list of entities
     */
    List<PatientDTO> findAllByHospital(String hospitalId);
   

    /**
     *  Get the "id" patient.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    PatientDTO findOne(Long id);

    /**
     *  Delete the "id" patient.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
