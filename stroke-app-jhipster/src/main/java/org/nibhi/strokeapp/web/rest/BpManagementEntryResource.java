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
     * POST  /bp-management-entries : Create a new bpManagementEntry.
     *
     * @param bpManagementEntryDTO the bpManagementEntryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bpManagementEntryDTO, or with status 400 (Bad Request) if the bpManagementEntry has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/bp-management-entries")
    @Timed
    public ResponseEntity<BpManagementEntryDTO> createBpManagementEntry(@RequestBody BpManagementEntryDTO bpManagementEntryDTO) throws URISyntaxException {
        log.debug("REST request to save BpManagementEntry : {}", bpManagementEntryDTO);
        if (bpManagementEntryDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("bpManagementEntry", "idexists", "A new bpManagementEntry cannot already have an ID")).body(null);
        }
        BpManagementEntryDTO result = bpManagementEntryService.save(bpManagementEntryDTO);
        return ResponseEntity.created(new URI("/api/bp-management-entries/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("bpManagementEntry", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /bp-management-entries : Updates an existing bpManagementEntry.
     *
     * @param bpManagementEntryDTO the bpManagementEntryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bpManagementEntryDTO,
     * or with status 400 (Bad Request) if the bpManagementEntryDTO is not valid,
     * or with status 500 (Internal Server Error) if the bpManagementEntryDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/bp-management-entries")
    @Timed
    public ResponseEntity<BpManagementEntryDTO> updateBpManagementEntry(@RequestBody BpManagementEntryDTO bpManagementEntryDTO) throws URISyntaxException {
        log.debug("REST request to update BpManagementEntry : {}", bpManagementEntryDTO);
        if (bpManagementEntryDTO.getId() == null) {
            return createBpManagementEntry(bpManagementEntryDTO);
        }
        BpManagementEntryDTO result = bpManagementEntryService.save(bpManagementEntryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("bpManagementEntry", bpManagementEntryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /bp-management-entries : get all the bpManagementEntries.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of bpManagementEntries in body
     */
    @GetMapping("/bp-management-entries")
    @Timed
    public List<BpManagementEntryDTO> getAllBpManagementEntries() {
        log.debug("REST request to get all BpManagementEntries");
        return bpManagementEntryService.findAll();
    }

    /**
     * GET  /inrs/patient/:patientId : get the bpManagementEntries for a patient.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inrs in body
     */
    @GetMapping("/bp-management-entries/patient/{patientId}")
    @Timed
    public List<BpManagementEntryDTO> getBpManagementEntriesByPatient(@PathVariable Long patientId) {
        log.debug("REST request to get BpManagementEntries for patient : {}", patientId);
        return bpManagementEntryService.findByPatient(patientId);
    }

    /**
     * GET  /bp-management-entries/:id : get the "id" bpManagementEntry.
     *
     * @param id the id of the bpManagementEntryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bpManagementEntryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/bp-management-entries/{id}")
    @Timed
    public ResponseEntity<BpManagementEntryDTO> getBpManagementEntry(@PathVariable Long id) {
        log.debug("REST request to get BpManagementEntry : {}", id);
        BpManagementEntryDTO bpManagementEntryDTO = bpManagementEntryService.findOne(id);
        return Optional.ofNullable(bpManagementEntryDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /bp-management-entries/:id : delete the "id" bpManagementEntry.
     *
     * @param id the id of the bpManagementEntryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/bp-management-entries/{id}")
    @Timed
    public ResponseEntity<Void> deleteBpManagementEntry(@PathVariable Long id) {
        log.debug("REST request to delete BpManagementEntry : {}", id);
        bpManagementEntryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("bpManagementEntry", id.toString())).build();
    }

}
