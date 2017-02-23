package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.repository.BpManagementEntryRepository;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.nibhi.strokeapp.service.BpManagementEntryService;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
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

/**
 * Test class for the BpManagementEntryResource REST controller.
 *
 * @see BpManagementEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class BpManagementEntryResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final String DEFAULT_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_DATE_TIME);

    private static final Integer DEFAULT_SYSTOLIC_BP = 1;

    private static final Float DEFAULT_GTN_RATE = 1F;

    private static final Integer DEFAULT_LABETALOL_DOSE = 1;

    private static final Integer DEFAULT_HEART_RATE = 1;

    @Inject
    private BpManagementEntryRepository bpManagementEntryRepository;

    @Inject
    private PatientRepository patientRepository;

    @Inject
    private BpManagementEntryService bpManagementEntryService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restBpManagementEntryMockMvc;

    private BpManagementEntry bpManagementEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        BpManagementEntryResource bpManagementEntryResource = new BpManagementEntryResource();
        ReflectionTestUtils.setField(bpManagementEntryResource, "bpManagementEntryService", bpManagementEntryService);
        this.restBpManagementEntryMockMvc = MockMvcBuilders.standaloneSetup(bpManagementEntryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static BpManagementEntry createEntity(EntityManager em) {
        BpManagementEntry bpManagementEntry = new BpManagementEntry()
                .dateTime(DEFAULT_DATE_TIME)
                .systolicBp(DEFAULT_SYSTOLIC_BP)
                .gtnRate(DEFAULT_GTN_RATE)
                .labetalolDose(DEFAULT_LABETALOL_DOSE)
                .heartRate(DEFAULT_HEART_RATE);
        return bpManagementEntry;
    }

    @Before
    public void initTest() {
        bpManagementEntry = createEntity(em);
    }


    @Test
    @Transactional
    public void getAllBpManagementEntries() throws Exception {
        // Initialize the database
    	Patient patient = patientRepository.saveAndFlush(new Patient());
    	bpManagementEntry.setPatient(patient);
        bpManagementEntryRepository.saveAndFlush(bpManagementEntry);

        // Get all the bpManagementEntries
        String url = "/api/bp-management-entries/patient/" + patient.getId() + "?sort=id,desc";
        restBpManagementEntryMockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(bpManagementEntry.getId().intValue())))
                .andExpect(jsonPath("$.[*].dateTime").value(hasItem(DEFAULT_DATE_TIME_STR)))
                .andExpect(jsonPath("$.[*].systolicBp").value(hasItem(DEFAULT_SYSTOLIC_BP)))
                .andExpect(jsonPath("$.[*].gtnRate").value(hasItem(DEFAULT_GTN_RATE.doubleValue())))
                .andExpect(jsonPath("$.[*].labetalolDose").value(hasItem(DEFAULT_LABETALOL_DOSE)))
                .andExpect(jsonPath("$.[*].heartRate").value(hasItem(DEFAULT_HEART_RATE)));
    }

}
