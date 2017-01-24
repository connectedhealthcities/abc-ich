package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.Inr;
import org.nibhi.strokeapp.repository.InrRepository;
import org.nibhi.strokeapp.service.InrService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.nibhi.strokeapp.domain.enumeration.InrType;
/**
 * Test class for the InrResource REST controller.
 *
 * @see InrResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class InrResourceIntTest {

    private static final Float DEFAULT_VALUE = 1F;

    private static final InrType DEFAULT_INR_TYPE = InrType.POINT_OF_CARE;

    private static final ZonedDateTime DEFAULT_MEASURED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final String DEFAULT_MEASURED_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_MEASURED_DATE_TIME);

    @Inject
    private InrRepository inrRepository;

    @Inject
    private InrService inrService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restInrMockMvc;

    private Inr inr;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        InrResource inrResource = new InrResource();
        ReflectionTestUtils.setField(inrResource, "inrService", inrService);
        this.restInrMockMvc = MockMvcBuilders.standaloneSetup(inrResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Inr createEntity(EntityManager em) {
        Inr inr = new Inr()
                .value(DEFAULT_VALUE)
                .inrType(DEFAULT_INR_TYPE)
                .measuredDateTime(DEFAULT_MEASURED_DATE_TIME);
        return inr;
    }

    @Before
    public void initTest() {
        inr = createEntity(em);
    }

    @Test
    @Transactional
    public void getInr() throws Exception {
        // Initialize the database
        inrRepository.saveAndFlush(inr);

        // Get the inr
        restInrMockMvc.perform(get("/api/inrs/{id}", inr.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(inr.getId().intValue()))
            .andExpect(jsonPath("$.value").value(DEFAULT_VALUE.doubleValue()))
            .andExpect(jsonPath("$.inrType").value(DEFAULT_INR_TYPE.toString()))
            .andExpect(jsonPath("$.measuredDateTime").value(DEFAULT_MEASURED_DATE_TIME_STR));
    }

    @Test
    @Transactional
    public void getNonExistingInr() throws Exception {
        // Get the inr
        restInrMockMvc.perform(get("/api/inrs/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }
}
