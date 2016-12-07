package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing BpManagementEntry.
 */
public interface BpManagementEntryService {

    /**
     * Save a bpManagementEntry.
     *
     * @param bpManagementEntryDTO the entity to save
     * @return the persisted entity
     */
    BpManagementEntryDTO save(BpManagementEntryDTO bpManagementEntryDTO);

    /**
     *  Get all the bpManagementEntries.
     *  
     *  @return the list of entities
     */
    List<BpManagementEntryDTO> findAll();

    /**
     *  Get the "id" bpManagementEntry.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    BpManagementEntryDTO findOne(Long id);

    /**
     *  Delete the "id" bpManagementEntry.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
