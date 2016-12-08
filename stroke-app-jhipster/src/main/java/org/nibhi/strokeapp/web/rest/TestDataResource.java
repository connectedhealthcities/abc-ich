package org.nibhi.strokeapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import org.nibhi.strokeapp.service.TestDataService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.net.URISyntaxException;

/**
 * REST controller for adding test data.
 */
@RestController
@RequestMapping("/api")
public class TestDataResource {

    private final Logger log = LoggerFactory.getLogger(TestDataResource.class);
        
    @Inject
    private TestDataService testDataService;

    /**
     * POST  /addtestdata : Add test data.
     *
     * @return //cjd the ResponseEntity with status 201 (Created) and with body the new hospitalDTO, or with status 400 (Bad Request) if the hospital has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/addtestdata")
    @Timed
    public ResponseEntity<String> addTestData() throws URISyntaxException {
        log.debug("REST request to add test data");
        
        testDataService.addTestData();
        return ResponseEntity.ok().body("success");
    }
}
