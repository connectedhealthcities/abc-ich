package org.nibhi.strokeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.nibhi.strokeapp.service.IchEntryService;
import org.nibhi.strokeapp.web.rest.util.HeaderUtil;
import org.nibhi.strokeapp.service.dto.IchEntryDTO;
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
 * REST controller for managing IchEntry.
 */
@RestController
@RequestMapping("/api")
public class IchEntryResource {

    private final Logger log = LoggerFactory.getLogger(IchEntryResource.class);
        
    @Inject
    private IchEntryService ichEntryService;

    /**
     * GET  /ich-entries : get all ichEntries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ichEntries in body
     */
    @GetMapping("/ich-entries")
    @Timed
    public List<IchEntryDTO> getAllIchEntries() {
        log.debug("REST request to get all IchEntries");
        return ichEntryService.findAll();
    }

    /**
     * GET  /ich-entries/patient/:patientId : get the ichEntries for a patient.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of ichEntries in body
     */
    @GetMapping("/ich-entries/patient/{patientId}")
    @Timed
    public List<IchEntryDTO> getIchEntriesByPatient(@PathVariable Long patientId) {
        log.debug("REST request to get IchEntries for patient : {}", patientId);
        return ichEntryService.findByPatient(patientId);
    }

}
