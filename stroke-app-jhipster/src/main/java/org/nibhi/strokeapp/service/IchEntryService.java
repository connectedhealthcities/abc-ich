package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.IchEntryDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing IchEntry.
 */
public interface IchEntryService {

	/**
     *  Get all the hospitals.
     *  
     *  @return the list of entities
     */
    List<IchEntryDTO> findAll();
    
    /**
     *  Get the ichEntryDTO for a patient.
     *  
     *  @return the list of entities
     */
    List<IchEntryDTO> findByPatient(long patientId);
}
