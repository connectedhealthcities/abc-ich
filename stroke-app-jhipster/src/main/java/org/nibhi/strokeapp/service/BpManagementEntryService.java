package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing BpManagementEntry.
 */
public interface BpManagementEntryService {


    /**
     *  Get the bpManagementEntries for a patient.
     *  
     *  @return the list of entities
     */
    List<BpManagementEntryDTO> findByPatient(long patientId);

}
