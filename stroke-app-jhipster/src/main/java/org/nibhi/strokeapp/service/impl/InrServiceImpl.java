package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.InrService;
import org.nibhi.strokeapp.domain.Inr;
import org.nibhi.strokeapp.repository.InrRepository;
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
    private InrMapper inrMapper;

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
}
