package org.nibhi.strokeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.nibhi.strokeapp.service.BpManagementEntryService;
import org.nibhi.strokeapp.web.rest.util.HeaderUtil;
import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * REST controller for managing BpManagementEntry.
 */
@RestController
@RequestMapping("/api")
public class BpManagementEntryResource {

    private final Logger log = LoggerFactory.getLogger(BpManagementEntryResource.class);
        
    @Inject
    private BpManagementEntryService bpManagementEntryService;


    /**
     * GET  /bp-management-entries/patient/:patientId : get the bpManagementEntries for a patient.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bpManagementEntries in body
     */
    @GetMapping("/bp-management-entries/patient/{patientId}")
    @Timed
    public List<BpManagementEntryDTO> getBpManagementEntriesByPatient(@PathVariable Long patientId) {
        log.debug("REST request to get BpManagementEntries for patient : {}", patientId);
        return bpManagementEntryService.findByPatient(patientId);
    }


}
