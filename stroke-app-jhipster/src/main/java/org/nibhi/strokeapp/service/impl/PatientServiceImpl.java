package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.PatientService;
import org.nibhi.strokeapp.service.UserService;
import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.IchEntry;
import org.nibhi.strokeapp.domain.Hospital;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.domain.User;
import org.nibhi.strokeapp.repository.HospitalRepository;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.nibhi.strokeapp.service.dto.PatientDTO;
import org.nibhi.strokeapp.service.mapper.PatientMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import javax.inject.Inject;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing Patient.
 */
@Service
@Transactional
public class PatientServiceImpl implements PatientService{

    private final Logger log = LoggerFactory.getLogger(PatientServiceImpl.class);
    
    @Inject
    private PatientRepository patientRepository;

    @Inject
    private HospitalRepository hospitalRepository;

    @Inject
    private UserService userService;

    @Inject
    private PatientMapper patientMapper;

    /**
     * Create a patient.
     *
     * @param patientDTO the entity to create
     * @return the persisted entity
     */
    public PatientDTO create(PatientDTO patientDTO) {
        log.debug("Request to create Patient : {}", patientDTO);
        
        User user = userService.getUserWithAuthorities();
        String hospitalId = user.getHospitalId();
        String candidateId = getCandidateUniqueId(patientDTO, hospitalId);
        List<Patient> matchingPatients = patientRepository.findAllByUniqueIdStartingWith(candidateId);
        Hospital hospital = hospitalRepository.findByUniqueId(hospitalId);
        
        PatientDTO result = patientDTO;
        if (patientDTO.getIsDuplicateAllowed()) {
        	if (matchingPatients.size() > 0) {
            	String duplicateId = getDuplicateUniqueId(matchingPatients, candidateId);
        		patientDTO.setUniqueId(duplicateId);
        	}
        	else {
        		patientDTO.setUniqueId(candidateId);
        	}
            Patient patient = patientMapper.patientDTOToPatient(patientDTO);
            patient.setHospital(hospital);
            patient = patientRepository.save(patient);
            result = patientMapper.patientToPatientDTO(patient);
    		result.setIsDuplicate(true);
        }
        else {
        	if (matchingPatients.size() > 0) {
        		result.setUniqueId(candidateId);
        		result.setIsDuplicate(true);
        	}
        	else {
        		patientDTO.setUniqueId(candidateId);
                Patient patient = patientMapper.patientDTOToPatient(patientDTO);
                patient.setHospital(hospital);
                patient = patientRepository.save(patient);
                result = patientMapper.patientToPatientDTO(patient);
        		result.setIsDuplicate(false);
            }
        }

        return result;
    }

    private String getCandidateUniqueId(PatientDTO patientDTO, String hospitalId) {
    	 
        String initials = patientDTO.getInitials();
        LocalDate birthDate = patientDTO.getBirthDate();
        Integer age = null;
        if (birthDate != null) {
        	LocalDate now = LocalDate.now();
        	age = Period.between(birthDate, now).getYears();
        }
        else {
        	age = patientDTO.getEstimatedAge();
        }
        
        List<String> elements = new ArrayList<String>();
        if (hospitalId != null) elements.add(hospitalId);
        if (initials != null) elements.add(initials);
        if (age != null) elements.add(age.toString());
        
        String candidateId = String.join("-", elements);
    	
    	return candidateId;
    }

    private String getDuplicateUniqueId(List<Patient> matchingPatients, String canditateId) {
    	
    	int postFix = matchingPatients.size() + 1;
    	String duplicateId = canditateId + "_" + postFix;
    	return duplicateId; 
    }

    /**
     * Update a patient.
     * 
     * @param patientDTO the entity to update
     * @return the persisted entity
     */
    public PatientDTO update(PatientDTO patientDTO) {
        log.debug("Request to update Patient : {}", patientDTO);
        
        User user = userService.getUserWithAuthorities();
        String hospitalId = user.getHospitalId();
        Hospital hospital = hospitalRepository.findByUniqueId(hospitalId);

        Patient patient = patientMapper.patientDTOToPatient(patientDTO);
        patient.setHospital(hospital);
        
        for(BpManagementEntry bpManagementEntry : patient.getBpManagementEntries()) {
        	bpManagementEntry.setPatient(patient);
        }

        for(IchEntry ichEntry : patient.getIchEntries()){
            ichEntry.setPatient(patient);
        }
        
        patient = patientRepository.save(patient);
        PatientDTO result = patientMapper.patientToPatientDTO(patient);
        return result;
    }
        

    /**
     *  Get all the patients.
     *  
     *  @param pageable the pagination information
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<PatientDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Patients, pageable");
        Page<Patient> result = patientRepository.findAll(pageable);
        return result.map(patient -> patientMapper.patientToPatientDTO(patient));
    }

    /**
     *  Get all the patients for the hospital.
     *  
     *  @param pageable the pagination information
     *  @param hospitalId the unique id of the hospital
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public Page<PatientDTO> findAllByHospital(Pageable pageable, String hospitalId) {
        log.debug("Request to get all Patients by hospital, pageable");
        Hospital hospital = hospitalRepository.findByUniqueId(hospitalId);
        Page<Patient> result = patientRepository.findAllByHospital(pageable, hospital);
        return result.map(patient -> patientMapper.patientToPatientDTO(patient));
    }
    
    /**
     *  Get all the patients.
     *  
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<PatientDTO> findAll() {
        log.debug("Request to get all Patients");
        List<PatientDTO> result = patientRepository.findAll().stream()
            .map(patientMapper::patientToPatientDTO)
            .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get all the patients for the hospital.
     *  
     *  @param hospitalId the unique id of the hospital
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<PatientDTO> findAllByHospital(String hospitalId) {
        log.debug("Request to get all Patients by hospital");
        Hospital hospital = hospitalRepository.findByUniqueId(hospitalId);
    	
        List<PatientDTO> result = patientRepository.findAllByHospital(hospital).stream()
                .map(patientMapper::patientToPatientDTO)
                .collect(Collectors.toCollection(LinkedList::new));

        return result;
    }

    /**
     *  Get one patient by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Transactional(readOnly = true) 
    public PatientDTO findOne(Long id) {
        log.debug("Request to get Patient : {}", id);
        Patient patient = patientRepository.findOne(id);
        PatientDTO patientDTO = patientMapper.patientToPatientDTO(patient);
        return patientDTO;
    }

    /**
     *  Delete the  patient by id.
     *
     *  @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Patient : {}", id);
        patientRepository.delete(id);
    }
}
