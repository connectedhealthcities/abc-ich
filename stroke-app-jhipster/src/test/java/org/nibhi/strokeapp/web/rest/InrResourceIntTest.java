package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.Inr;
import org.nibhi.strokeapp.repository.InrRepository;
import org.nibhi.strokeapp.service.InrService;
import org.nibhi.strokeapp.service.dto.InrDTO;
import org.nibhi.strokeapp.service.mapper.InrMapper;

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
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
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
    private static final Float UPDATED_VALUE = 2F;

    private static final InrType DEFAULT_INR_TYPE = InrType.POINT_OF_CARE;
    private static final InrType UPDATED_INR_TYPE = InrType.LABORATORY;

    private static final ZonedDateTime DEFAULT_MEASURED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_MEASURED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_MEASURED_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_MEASURED_DATE_TIME);

    @Inject
    private InrRepository inrRepository;

    @Inject
    private InrMapper inrMapper;

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
    public void createInr() throws Exception {
        int databaseSizeBeforeCreate = inrRepository.findAll().size();

        // Create the Inr
        InrDTO inrDTO = inrMapper.inrToInrDTO(inr);

        restInrMockMvc.perform(post("/api/inrs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(inrDTO)))
                .andExpect(status().isCreated());

        // Validate the Inr in the database
        List<Inr> inrs = inrRepository.findAll();
        assertThat(inrs).hasSize(databaseSizeBeforeCreate + 1);
        Inr testInr = inrs.get(inrs.size() - 1);
        assertThat(testInr.getValue()).isEqualTo(DEFAULT_VALUE);
        assertThat(testInr.getInrType()).isEqualTo(DEFAULT_INR_TYPE);
        assertThat(testInr.getMeasuredDateTime()).isEqualTo(DEFAULT_MEASURED_DATE_TIME);
    }

    @Test
    @Transactional
    public void getAllInrs() throws Exception {
        // Initialize the database
        inrRepository.saveAndFlush(inr);

        // Get all the inrs
        restInrMockMvc.perform(get("/api/inrs?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(inr.getId().intValue())))
                .andExpect(jsonPath("$.[*].value").value(hasItem(DEFAULT_VALUE.doubleValue())))
                .andExpect(jsonPath("$.[*].inrType").value(hasItem(DEFAULT_INR_TYPE.toString())))
                .andExpect(jsonPath("$.[*].measuredDateTime").value(hasItem(DEFAULT_MEASURED_DATE_TIME_STR)));
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

    @Test
    @Transactional
    public void updateInr() throws Exception {
        // Initialize the database
        inrRepository.saveAndFlush(inr);
        int databaseSizeBeforeUpdate = inrRepository.findAll().size();

        // Update the inr
        Inr updatedInr = inrRepository.findOne(inr.getId());
        updatedInr
                .value(UPDATED_VALUE)
                .inrType(UPDATED_INR_TYPE)
                .measuredDateTime(UPDATED_MEASURED_DATE_TIME);
        InrDTO inrDTO = inrMapper.inrToInrDTO(updatedInr);

        restInrMockMvc.perform(put("/api/inrs")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(inrDTO)))
                .andExpect(status().isOk());

        // Validate the Inr in the database
        List<Inr> inrs = inrRepository.findAll();
        assertThat(inrs).hasSize(databaseSizeBeforeUpdate);
        Inr testInr = inrs.get(inrs.size() - 1);
        assertThat(testInr.getValue()).isEqualTo(UPDATED_VALUE);
        assertThat(testInr.getInrType()).isEqualTo(UPDATED_INR_TYPE);
        assertThat(testInr.getMeasuredDateTime()).isEqualTo(UPDATED_MEASURED_DATE_TIME);
    }

    @Test
    @Transactional
    public void deleteInr() throws Exception {
        // Initialize the database
        inrRepository.saveAndFlush(inr);
        int databaseSizeBeforeDelete = inrRepository.findAll().size();

        // Get the inr
        restInrMockMvc.perform(delete("/api/inrs/{id}", inr.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<Inr> inrs = inrRepository.findAll();
        assertThat(inrs).hasSize(databaseSizeBeforeDelete - 1);
    }
}
