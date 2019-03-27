package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.IchEntryService;
import org.nibhi.strokeapp.domain.IchEntry;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.repository.IchEntryRepository;
import org.nibhi.strokeapp.service.dto.IchEntryDTO;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.nibhi.strokeapp.service.mapper.IchEntryMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing IchEntry.
 */
@Service
@Transactional
public class IchEntryServiceImpl implements IchEntryService{

    private final Logger log = LoggerFactory.getLogger(IchEntryServiceImpl.class);
    
    @Inject
    private IchEntryRepository ichEntryRepository;

    @Inject
    private PatientRepository patientRepository;

    @Inject
    private IchEntryMapper ichEntryMapper;

    /**
     *  Get all ichEntries
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<IchEntryDTO> findAll() {
        log.debug("Request to get all ichEntries");
        
        List<IchEntryDTO> result = ichEntryRepository.findAll().stream()
                .map(ichEntryMapper::ichEntryToIchEntryDTO)
                .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get the ichEntries for a patient.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<IchEntryDTO> findByPatient(long patientId) {
        log.debug("Request to get ichEntries for a patient with id : {}", patientId);
        
        Patient patient = patientRepository.findOne(patientId);
        List<IchEntryDTO> result = ichEntryRepository.findByPatient(patient).stream()
                .map(ichEntryMapper::ichEntryToIchEntryDTO)
                .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }
}
