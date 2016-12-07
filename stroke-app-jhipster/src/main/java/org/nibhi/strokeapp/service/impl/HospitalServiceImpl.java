package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.HospitalService;
import org.nibhi.strokeapp.domain.Hospital;
import org.nibhi.strokeapp.repository.HospitalRepository;
import org.nibhi.strokeapp.service.dto.HospitalDTO;
import org.nibhi.strokeapp.service.mapper.HospitalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Hospital.
 */
@Service
@Transactional
public class HospitalServiceImpl implements HospitalService{

    private final Logger log = LoggerFactory.getLogger(HospitalServiceImpl.class);
    
    @Inject
    private HospitalRepository hospitalRepository;

    @Inject
    private HospitalMapper hospitalMapper;

    /**
     * Save a hospital.
     *
     * @param hospitalDTO the entity to save
     * @return the persisted entity
     */
    public HospitalDTO save(HospitalDTO hospitalDTO) {
        log.debug("Request to save Hospital : {}", hospitalDTO);
        Hospital hospital = hospitalMapper.hospitalDTOToHospital(hospitalDTO);
        hospital = hospitalRepository.save(hospital);
        HospitalDTO result = hospitalMapper.hospitalToHospitalDTO(hospital);
        return result;
    }

    /**
     *  Get all the hospitals.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<HospitalDTO> findAll() {
        log.debug("Request to get all Hospitals");
        List<HospitalDTO> result = hospitalRepository.findAll().stream()
            .map(hospitalMapper::hospitalToHospitalDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one hospital by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public HospitalDTO findOne(Long id) {
        log.debug("Request to get Hospital : {}", id);
        Hospital hospital = hospitalRepository.findOne(id);
        HospitalDTO hospitalDTO = hospitalMapper.hospitalToHospitalDTO(hospital);
        return hospitalDTO;
    }

    /**
     *  Delete the  hospital by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Hospital : {}", id);
        hospitalRepository.delete(id);
    }
}
