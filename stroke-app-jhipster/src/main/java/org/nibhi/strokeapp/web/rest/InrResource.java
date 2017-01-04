package org.nibhi.strokeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.nibhi.strokeapp.service.InrService;
import org.nibhi.strokeapp.web.rest.util.HeaderUtil;
import org.nibhi.strokeapp.service.dto.InrDTO;
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
 * REST controller for managing Inr.
 */
@RestController
@RequestMapping("/api")
public class InrResource {

    private final Logger log = LoggerFactory.getLogger(InrResource.class);
        
    @Inject
    private InrService inrService;

    /**
     * POST  /inrs : Create a new inr.
     *
     * @param inrDTO the inrDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new inrDTO, or with status 400 (Bad Request) if the inr has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/inrs")
    @Timed
    public ResponseEntity<InrDTO> createInr(@RequestBody InrDTO inrDTO) throws URISyntaxException {
        log.debug("REST request to save Inr : {}", inrDTO);
        if (inrDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("inr", "idexists", "A new inr cannot already have an ID")).body(null);
        }
        InrDTO result = inrService.save(inrDTO);
        return ResponseEntity.created(new URI("/api/inrs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("inr", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /inrs : Updates an existing inr.
     *
     * @param inrDTO the inrDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated inrDTO,
     * or with status 400 (Bad Request) if the inrDTO is not valid,
     * or with status 500 (Internal Server Error) if the inrDTO couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/inrs")
    @Timed
    public ResponseEntity<InrDTO> updateInr(@RequestBody InrDTO inrDTO) throws URISyntaxException {
        log.debug("REST request to update Inr : {}", inrDTO);
        if (inrDTO.getId() == null) {
            return createInr(inrDTO);
        }
        InrDTO result = inrService.save(inrDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("inr", inrDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /inrs : get all the inrs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of inrs in body
     */
    @GetMapping("/inrs")
    @Timed
    public List<InrDTO> getAllInrs() {
        log.debug("REST request to get all Inrs");
        return inrService.findAll();
    }

    /**
     * GET  /inrs/:id : get the "id" inr.
     *
     * @param id the id of the inrDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the inrDTO, or with status 404 (Not Found)
     */
    @GetMapping("/inrs/{id}")
    @Timed
    public ResponseEntity<InrDTO> getInr(@PathVariable Long id) {
        log.debug("REST request to get Inr : {}", id);
        InrDTO inrDTO = inrService.findOne(id);
        return Optional.ofNullable(inrDTO)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /inrs/:id : delete the "id" inr.
     *
     * @param id the id of the inrDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/inrs/{id}")
    @Timed
    public ResponseEntity<Void> deleteInr(@PathVariable Long id) {
        log.debug("REST request to delete Inr : {}", id);
        inrService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("inr", id.toString())).build();
    }

}
