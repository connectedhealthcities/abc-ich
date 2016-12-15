package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.InrService;
import org.nibhi.strokeapp.domain.Inr;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.repository.InrRepository;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.nibhi.strokeapp.service.dto.InrDTO;
import org.nibhi.strokeapp.service.mapper.InrMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Inr.
 */
@Service
@Transactional
public class InrServiceImpl implements InrService{

    private final Logger log = LoggerFactory.getLogger(InrServiceImpl.class);
    
    @Inject
    private InrRepository inrRepository;

    @Inject
    private PatientRepository patientRepository;

    @Inject
    private InrMapper inrMapper;

    /**
     * Save a inr.
     *
     * @param inrDTO the entity to save
     * @return the persisted entity
     */
    public InrDTO save(InrDTO inrDTO) {
        log.debug("Request to save Inr : {}", inrDTO);
        Inr inr = inrMapper.inrDTOToInr(inrDTO);
        inr = inrRepository.save(inr);
        InrDTO result = inrMapper.inrToInrDTO(inr);
        return result;
    }

    /**
     *  Get all the inrs.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<InrDTO> findAll() {
        log.debug("Request to get all Inrs");
        List<InrDTO> result = inrRepository.findAll().stream()
            .map(inrMapper::inrToInrDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get the inrs for a patient.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<InrDTO> findByPatient(long patientId) {
        log.debug("Request to get inrs for a patient with id : {}", patientId);
        
        Patient patient = patientRepository.findOne(patientId);
        List<InrDTO> result = inrRepository.findByPatient(patient).stream()
            .map(inrMapper::inrToInrDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one inr by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public InrDTO findOne(Long id) {
        log.debug("Request to get Inr : {}", id);
        Inr inr = inrRepository.findOne(id);
        InrDTO inrDTO = inrMapper.inrToInrDTO(inr);
        return inrDTO;
    }

    /**
     *  Delete the  inr by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Inr : {}", id);
        inrRepository.delete(id);
    }
}
