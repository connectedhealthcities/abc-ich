package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.InrDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing Inr.
 */
public interface InrService {

    /**
     * Save a inr.
     *
     * @param inrDTO the entity to save
     * @return the persisted entity
     */
    InrDTO save(InrDTO inrDTO);

    /**
     *  Get all the inrs.
     *  
     *  @return the list of entities
     */
    List<InrDTO> findAll();

    /**
     *  Get the inrs for a patient.
     *  
     *  @return the list of entities
     */
    List<InrDTO> findByPatient(long patientId);

    /**
     *  Get the "id" inr.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    InrDTO findOne(Long id);

    /**
     *  Delete the "id" inr.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
