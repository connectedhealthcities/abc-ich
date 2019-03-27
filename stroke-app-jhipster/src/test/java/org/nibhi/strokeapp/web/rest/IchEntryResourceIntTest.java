package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.IchEntry;
import org.nibhi.strokeapp.repository.IchEntryRepository;
import org.nibhi.strokeapp.service.IchEntryService;
import org.nibhi.strokeapp.service.dto.IchEntryDTO;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.nibhi.strokeapp.service.mapper.IchEntryMapper;

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
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the IchEntryResource REST controller.
 *
 * @see IchEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class IchEntryResourceIntTest {

    private static final Float DEFAULT_LONGEST_AXIS = 1F;
    private static final Float UPDATED_LONGEST_AXIS = 2F;

    private static final Float DEFAULT_LONGEST_AXIS_PERPENDICULAR = 1F;
    private static final Float UPDATED_LONGEST_AXIS_PERPENDICULAR = 2F;

    private static final Integer DEFAULT_NUMBER_OF_SLICES = 1;
    private static final Integer UPDATED_NUMBER_OF_SLICES = 2;

    private static final Float DEFAULT_SLICE_THICKNESS = 1F;
    private static final Float UPDATED_SLICE_THICKNESS = 2F;

    private static final Float DEFAULT_ICH_VOLUME = 1F;
    private static final Float UPDATED_ICH_VOLUME = 2F;

    @Inject
    private IchEntryRepository ichEntryRepository;

    @Inject
    private PatientRepository patientRepository;

    @Inject
    private IchEntryMapper ichEntryMapper;

    @Inject
    private IchEntryService ichEntryService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restIchEntryMockMvc;

    private IchEntry ichEntry;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        IchEntryResource ichEntryResource = new IchEntryResource();
        ReflectionTestUtils.setField(ichEntryResource, "ichEntryService", ichEntryService);
        this.restIchEntryMockMvc = MockMvcBuilders.standaloneSetup(ichEntryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static IchEntry createEntity(EntityManager em) {
        IchEntry ichEntry = new IchEntry()
                .longestAxis(DEFAULT_LONGEST_AXIS)
                .longestAxisPerpendicular(DEFAULT_LONGEST_AXIS_PERPENDICULAR)
                .numberOfSlices(DEFAULT_NUMBER_OF_SLICES)
                .sliceThickness(DEFAULT_SLICE_THICKNESS)
                .ichVolume(DEFAULT_ICH_VOLUME);
        return ichEntry;
    }

    @Before
    public void initTest() {
        ichEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void getAllIchEntries() throws Exception {
        // Initialize the database
        Patient patient = patientRepository.saveAndFlush(new Patient());
        ichEntry.setPatient(patient);
        ichEntryRepository.saveAndFlush(ichEntry);

        // Get all the bpManagementEntries
        String url = "/api/ich-entries?sort=id,desc";
        restIchEntryMockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].longestAxis").value(hasItem(DEFAULT_LONGEST_AXIS.doubleValue())))
                .andExpect(jsonPath("$.[*].longestAxisPerpendicular").value(hasItem(DEFAULT_LONGEST_AXIS_PERPENDICULAR.doubleValue())))
                .andExpect(jsonPath("$.[*].numberOfSlices").value(hasItem(DEFAULT_NUMBER_OF_SLICES)))
                .andExpect(jsonPath("$.[*].sliceThickness").value(hasItem(DEFAULT_SLICE_THICKNESS.doubleValue())))
                .andExpect(jsonPath("$.[*].ichVolume").value(hasItem(DEFAULT_ICH_VOLUME.doubleValue())));
    }

    @Test
    @Transactional
    public void getIchEntryByPatient() throws Exception {
        // Initialize the database
        Patient patient = patientRepository.saveAndFlush(new Patient());
        ichEntry.setPatient(patient);
        ichEntryRepository.saveAndFlush(ichEntry);

        // Get all the bpManagementEntries
        String url = "/api/ich-entries/patient/" + patient.getId() + "?sort=id,desc";
        restIchEntryMockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(ichEntry.getId().intValue())))
                .andExpect(jsonPath("$.[*].longestAxis").value(hasItem(DEFAULT_LONGEST_AXIS.doubleValue())))
                .andExpect(jsonPath("$.[*].longestAxisPerpendicular").value(hasItem(DEFAULT_LONGEST_AXIS_PERPENDICULAR.doubleValue())))
                .andExpect(jsonPath("$.[*].numberOfSlices").value(hasItem(DEFAULT_NUMBER_OF_SLICES)))
                .andExpect(jsonPath("$.[*].sliceThickness").value(hasItem(DEFAULT_SLICE_THICKNESS.doubleValue())))
                .andExpect(jsonPath("$.[*].ichVolume").value(hasItem(DEFAULT_ICH_VOLUME.doubleValue())));
    }

    @Test
    @Transactional
    public void getNonExistingIchEntry() throws Exception {
        // Get the ichEntry
        restIchEntryMockMvc.perform(get("/api/ich-entries/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }
}
