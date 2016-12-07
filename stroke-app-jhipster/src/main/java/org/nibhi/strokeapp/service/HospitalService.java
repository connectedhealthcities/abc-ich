package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.HospitalDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing Hospital.
 */
public interface HospitalService {

    /**
     * Save a hospital.
     *
     * @param hospitalDTO the entity to save
     * @return the persisted entity
     */
    HospitalDTO save(HospitalDTO hospitalDTO);

    /**
     *  Get all the hospitals.
     *  
     *  @return the list of entities
     */
    List<HospitalDTO> findAll();

    /**
     *  Get the "id" hospital.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    HospitalDTO findOne(Long id);

    /**
     *  Delete the "id" hospital.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
