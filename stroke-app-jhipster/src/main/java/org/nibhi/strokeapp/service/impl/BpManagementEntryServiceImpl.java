package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.BpManagementEntryService;
import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.repository.BpManagementEntryRepository;
import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;
import org.nibhi.strokeapp.service.mapper.BpManagementEntryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing BpManagementEntry.
 */
@Service
@Transactional
public class BpManagementEntryServiceImpl implements BpManagementEntryService{

    private final Logger log = LoggerFactory.getLogger(BpManagementEntryServiceImpl.class);
    
    @Inject
    private BpManagementEntryRepository bpManagementEntryRepository;

    @Inject
    private BpManagementEntryMapper bpManagementEntryMapper;

    /**
     * Save a bpManagementEntry.
     *
     * @param bpManagementEntryDTO the entity to save
     * @return the persisted entity
     */
    public BpManagementEntryDTO save(BpManagementEntryDTO bpManagementEntryDTO) {
        log.debug("Request to save BpManagementEntry : {}", bpManagementEntryDTO);
        BpManagementEntry bpManagementEntry = bpManagementEntryMapper.bpManagementEntryDTOToBpManagementEntry(bpManagementEntryDTO);
        bpManagementEntry = bpManagementEntryRepository.save(bpManagementEntry);
        BpManagementEntryDTO result = bpManagementEntryMapper.bpManagementEntryToBpManagementEntryDTO(bpManagementEntry);
        return result;
    }

    /**
     *  Get all the bpManagementEntries.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<BpManagementEntryDTO> findAll() {
        log.debug("Request to get all BpManagementEntries");
        List<BpManagementEntryDTO> result = bpManagementEntryRepository.findAll().stream()
            .map(bpManagementEntryMapper::bpManagementEntryToBpManagementEntryDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one bpManagementEntry by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public BpManagementEntryDTO findOne(Long id) {
        log.debug("Request to get BpManagementEntry : {}", id);
        BpManagementEntry bpManagementEntry = bpManagementEntryRepository.findOne(id);
        BpManagementEntryDTO bpManagementEntryDTO = bpManagementEntryMapper.bpManagementEntryToBpManagementEntryDTO(bpManagementEntry);
        return bpManagementEntryDTO;
    }

    /**
     *  Delete the  bpManagementEntry by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete BpManagementEntry : {}", id);
        bpManagementEntryRepository.delete(id);
    }
}
