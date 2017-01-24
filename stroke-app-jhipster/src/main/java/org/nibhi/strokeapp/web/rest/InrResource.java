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

}
