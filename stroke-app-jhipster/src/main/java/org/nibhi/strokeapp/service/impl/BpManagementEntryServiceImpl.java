package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.BpManagementEntryService;
import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.repository.BpManagementEntryRepository;
import org.nibhi.strokeapp.repository.PatientRepository;
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
    private PatientRepository patientRepository;

    @Inject
    private BpManagementEntryMapper bpManagementEntryMapper;



    /**
     *  Get the bpManagementEntries for a patient.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<BpManagementEntryDTO> findByPatient(long patientId) {
        log.debug("Request to get bpManagementEntries for a patient with id : {}", patientId);
        
        Patient patient = patientRepository.findOne(patientId);
        List<BpManagementEntryDTO> result = bpManagementEntryRepository.findByPatient(patient).stream()
                .map(bpManagementEntryMapper::bpManagementEntryToBpManagementEntryDTO)
                .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }
}
