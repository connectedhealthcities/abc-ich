package org.nibhi.strokeapp.web.rest;

import com.codahale.metrics.annotation.Timed;

import org.nibhi.strokeapp.domain.Authority;
import org.nibhi.strokeapp.domain.User;
import org.nibhi.strokeapp.security.SecurityUtils;
import org.nibhi.strokeapp.service.PatientService;
import org.nibhi.strokeapp.service.UserService;
import org.nibhi.strokeapp.web.rest.util.HeaderUtil;
import org.nibhi.strokeapp.web.rest.util.PaginationUtil;
import org.nibhi.strokeapp.service.dto.PatientDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * REST controller for managing Patient.
 */
@RestController
@RequestMapping("/api")
@PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
public class PatientResource {

    private final Logger log = LoggerFactory.getLogger(PatientResource.class);
        
    @Inject
    private PatientService patientService;
    
    @Inject
    private UserService userService;

    /**
     * POST  /patients : Create a new patient.
     *
     * @param patientDTO the patientDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new patientDTO, or with status 400 (Bad Request) if the patient has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/patients")
    @Timed
    @PreAuthorize("hasRole('ROLE_MOBILE')")
    public ResponseEntity<PatientDTO> createPatient(@Valid @RequestBody PatientDTO patientDTO) throws URISyntaxException {
        log.debug("REST request to save Patient : {}", patientDTO);
        if (patientDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("patient", "idexists", "A new patient cannot already have an ID")).body(null);
        }
        PatientDTO result = patientService.create(patientDTO);
        return ResponseEntity.ok()
                .body(result);
    }

    /**
     * PUT  /patients : Updates an existing patient.
     *
     * @param patientDTO the patientDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated patientDTO,
     * or with status 400 (Bad Request) if the patientDTO is not valid,
     * or with status 500 (Internal Server Error) if the patientDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/patients")
    @Timed
    @PreAuthorize("hasRole('ROLE_MOBILE')")
    public ResponseEntity<PatientDTO> updatePatient(@Valid @RequestBody PatientDTO patientDTO) throws URISyntaxException {
        log.debug("REST request to update Patient : {}", patientDTO);
        if (patientDTO.getId() == null) {
            return createPatient(patientDTO);
        }
        PatientDTO result = patientService.update(patientDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("patient", patientDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /patients : get all the patients.
     *
     * <p>
     *     Returns patients across all hospitals if the current user has role "ROLE_ADMIN".
     *     Otherwise only patients for the current user's hospital are returned.
     * </p>
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of patients in body
     * @throws URISyntaxException if there is an error to generate the pagination HTTP headers
     */
    @GetMapping("/patients")
    @Timed
    public ResponseEntity<List<PatientDTO>> getAllPatients(Pageable pageable)
        throws URISyntaxException {
        log.debug("REST request to get a page of Patients");

        Page<PatientDTO> page = null;
        
        if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) {
        	page = patientService.findAll(pageable);
        }
        else {
            User user = userService.getUserWithAuthorities();
            //cjd This if/else added to ensure integration tests pass
            // When time permits we should modify the tests so that we control the user's role
            if (user != null) {
                String hospitalId = user.getHospitalId();
            	page = patientService.findAllByHospital(pageable, hospitalId);
            }
            else {
            	page = patientService.findAll(pageable);
            }
        }

        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/patients");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /patients-all : get all the patients.
     *
     * <p>
     *     Returns patients across all hospitals if the current user has role "ROLE_ADMIN".
     *     Otherwise only patients for the current user's hospital are returned.
     * </p>
     *
     * @return the ResponseEntity with status 200 (OK) and the list of patients in body
     */
    @GetMapping("/patients-all")
    @Timed
    public List<PatientDTO> getAllPatients() {
        log.debug("REST request to get all Patients");
        
        List<PatientDTO> patients = null;
        
        if (SecurityUtils.isCurrentUserInRole("ROLE_ADMIN")) {
        	patients = patientService.findAll();
        }
        else {
            User user = userService.getUserWithAuthorities();
            //cjd This if/else added to ensure integration tests pass
            // When time permits we should modify the tests so that we control the user's role
            if (user != null) {
	            String hospitalId = user.getHospitalId();
	        	patients = patientService.findAllByHospital(hospitalId);
            }
            else {
            	patients = patientService.findAll();
            }
        }
         
        return patients;
    }

    /**
     * GET  /patients/:id : get the "id" patient.
     *
     * @param id the id of the patientDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the patientDTO, or with status 404 (Not Found)
     */
    @GetMapping("/patients/{id}")
    @Timed
    public ResponseEntity<PatientDTO> getPatient(@PathVariable Long id) {
        log.debug("REST request to get Patient : {}", id);
        PatientDTO patientDTO = patientService.findOne(id);
        return Optional.ofNullable(patientDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /patients/:id : delete the "id" patient.
     *
     * @param id the id of the patientDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/patients/{id}")
    @Timed
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        log.debug("REST request to delete Patient : {}", id);
        patientService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("patient", id.toString())).build();
    }

}
