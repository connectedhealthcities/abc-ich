package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.Hospital;
import org.nibhi.strokeapp.repository.HospitalRepository;
import org.nibhi.strokeapp.service.HospitalService;
import org.nibhi.strokeapp.service.dto.HospitalDTO;
import org.nibhi.strokeapp.service.mapper.HospitalMapper;

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
 * Test class for the HospitalResource REST controller.
 *
 * @see HospitalResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class HospitalResourceIntTest {

    private static final String DEFAULT_UNIQUE_ID = "AAAAAAAAAA";
    private static final String UPDATED_UNIQUE_ID = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    @Inject
    private HospitalRepository hospitalRepository;

    @Inject
    private HospitalMapper hospitalMapper;

    @Inject
    private HospitalService hospitalService;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restHospitalMockMvc;

    private Hospital hospital;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        HospitalResource hospitalResource = new HospitalResource();
        ReflectionTestUtils.setField(hospitalResource, "hospitalService", hospitalService);
        this.restHospitalMockMvc = MockMvcBuilders.standaloneSetup(hospitalResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Hospital createEntity(EntityManager em) {
        Hospital hospital = new Hospital()
                .uniqueId(DEFAULT_UNIQUE_ID)
                .email(DEFAULT_EMAIL);
        return hospital;
    }

    @Before
    public void initTest() {
        hospital = createEntity(em);
    }

    @Test
    @Transactional
    public void createHospital() throws Exception {
        int databaseSizeBeforeCreate = hospitalRepository.findAll().size();

        // Create the Hospital
        HospitalDTO hospitalDTO = hospitalMapper.hospitalToHospitalDTO(hospital);

        restHospitalMockMvc.perform(post("/api/hospitals")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(hospitalDTO)))
                .andExpect(status().isCreated());

        // Validate the Hospital in the database
        List<Hospital> hospitals = hospitalRepository.findAll();
        assertThat(hospitals).hasSize(databaseSizeBeforeCreate + 1);
        Hospital testHospital = hospitals.get(hospitals.size() - 1);
        assertThat(testHospital.getUniqueId()).isEqualTo(DEFAULT_UNIQUE_ID);
        assertThat(testHospital.getEmail()).isEqualTo(DEFAULT_EMAIL);
    }

    @Test
    @Transactional
    public void getAllHospitals() throws Exception {
        // Initialize the database
        hospitalRepository.saveAndFlush(hospital);

        // Get all the hospitals
        restHospitalMockMvc.perform(get("/api/hospitals?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(hospital.getId().intValue())))
                .andExpect(jsonPath("$.[*].uniqueId").value(hasItem(DEFAULT_UNIQUE_ID.toString())))
                .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getHospital() throws Exception {
        // Initialize the database
        hospitalRepository.saveAndFlush(hospital);

        // Get the hospital
        restHospitalMockMvc.perform(get("/api/hospitals/{id}", hospital.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(hospital.getId().intValue()))
            .andExpect(jsonPath("$.uniqueId").value(DEFAULT_UNIQUE_ID.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingHospital() throws Exception {
        // Get the hospital
        restHospitalMockMvc.perform(get("/api/hospitals/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateHospital() throws Exception {
        // Initialize the database
        hospitalRepository.saveAndFlush(hospital);
        int databaseSizeBeforeUpdate = hospitalRepository.findAll().size();

        // Update the hospital
        Hospital updatedHospital = hospitalRepository.findOne(hospital.getId());
        updatedHospital
                .uniqueId(UPDATED_UNIQUE_ID)
                .email(UPDATED_EMAIL);
        HospitalDTO hospitalDTO = hospitalMapper.hospitalToHospitalDTO(updatedHospital);

        restHospitalMockMvc.perform(put("/api/hospitals")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(hospitalDTO)))
                .andExpect(status().isOk());

        // Validate the Hospital in the database
        List<Hospital> hospitals = hospitalRepository.findAll();
        assertThat(hospitals).hasSize(databaseSizeBeforeUpdate);
        Hospital testHospital = hospitals.get(hospitals.size() - 1);
        assertThat(testHospital.getUniqueId()).isEqualTo(UPDATED_UNIQUE_ID);
        assertThat(testHospital.getEmail()).isEqualTo(UPDATED_EMAIL);
    }

    @Test
    @Transactional
    public void deleteHospital() throws Exception {
        // Initialize the database
        hospitalRepository.saveAndFlush(hospital);
        int databaseSizeBeforeDelete = hospitalRepository.findAll().size();

        // Get the hospital
        restHospitalMockMvc.perform(delete("/api/hospitals/{id}", hospital.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Hospital> hospitals = hospitalRepository.findAll();
        assertThat(hospitals).hasSize(databaseSizeBeforeDelete - 1);
    }
}
