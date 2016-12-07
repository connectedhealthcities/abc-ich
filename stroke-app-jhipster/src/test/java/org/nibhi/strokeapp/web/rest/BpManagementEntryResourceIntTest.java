package org.nibhi.strokeapp.web.rest;

import org.nibhi.strokeapp.StrokeApp;

import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.repository.BpManagementEntryRepository;
import org.nibhi.strokeapp.service.BpManagementEntryService;
import org.nibhi.strokeapp.service.dto.BpManagementEntryDTO;
import org.nibhi.strokeapp.service.mapper.BpManagementEntryMapper;

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

/**
 * Test class for the BpManagementEntryResource REST controller.
 *
 * @see BpManagementEntryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = StrokeApp.class)
public class BpManagementEntryResourceIntTest {

    private static final ZonedDateTime DEFAULT_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
    private static final String DEFAULT_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_DATE_TIME);

    private static final Integer DEFAULT_SYSTOLIC_BP = 1;
    private static final Integer UPDATED_SYSTOLIC_BP = 2;

    private static final Float DEFAULT_GTN_RATE = 1F;
    private static final Float UPDATED_GTN_RATE = 2F;

    private static final Integer DEFAULT_LABETALOL_DOSE = 1;
    private static final Integer UPDATED_LABETALOL_DOSE = 2;

    @Inject
    private BpManagementEntryRepository bpManagementEntryRepository;

    @Inject
    private BpManagementEntryMapper bpManagementEntryMapper;

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
                .labetalolDose(DEFAULT_LABETALOL_DOSE);
        return bpManagementEntry;
    }

    @Before
    public void initTest() {
        bpManagementEntry = createEntity(em);
    }

    @Test
    @Transactional
    public void createBpManagementEntry() throws Exception {
        int databaseSizeBeforeCreate = bpManagementEntryRepository.findAll().size();

        // Create the BpManagementEntry
        BpManagementEntryDTO bpManagementEntryDTO = bpManagementEntryMapper.bpManagementEntryToBpManagementEntryDTO(bpManagementEntry);

        restBpManagementEntryMockMvc.perform(post("/api/bp-management-entries")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bpManagementEntryDTO)))
                .andExpect(status().isCreated());

        // Validate the BpManagementEntry in the database
        List<BpManagementEntry> bpManagementEntries = bpManagementEntryRepository.findAll();
        assertThat(bpManagementEntries).hasSize(databaseSizeBeforeCreate + 1);
        BpManagementEntry testBpManagementEntry = bpManagementEntries.get(bpManagementEntries.size() - 1);
        assertThat(testBpManagementEntry.getDateTime()).isEqualTo(DEFAULT_DATE_TIME);
        assertThat(testBpManagementEntry.getSystolicBp()).isEqualTo(DEFAULT_SYSTOLIC_BP);
        assertThat(testBpManagementEntry.getGtnRate()).isEqualTo(DEFAULT_GTN_RATE);
        assertThat(testBpManagementEntry.getLabetalolDose()).isEqualTo(DEFAULT_LABETALOL_DOSE);
    }

    @Test
    @Transactional
    public void getAllBpManagementEntries() throws Exception {
        // Initialize the database
        bpManagementEntryRepository.saveAndFlush(bpManagementEntry);

        // Get all the bpManagementEntries
        restBpManagementEntryMockMvc.perform(get("/api/bp-management-entries?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(bpManagementEntry.getId().intValue())))
                .andExpect(jsonPath("$.[*].dateTime").value(hasItem(DEFAULT_DATE_TIME_STR)))
                .andExpect(jsonPath("$.[*].systolicBp").value(hasItem(DEFAULT_SYSTOLIC_BP)))
                .andExpect(jsonPath("$.[*].gtnRate").value(hasItem(DEFAULT_GTN_RATE.doubleValue())))
                .andExpect(jsonPath("$.[*].labetalolDose").value(hasItem(DEFAULT_LABETALOL_DOSE)));
    }

    @Test
    @Transactional
    public void getBpManagementEntry() throws Exception {
        // Initialize the database
        bpManagementEntryRepository.saveAndFlush(bpManagementEntry);

        // Get the bpManagementEntry
        restBpManagementEntryMockMvc.perform(get("/api/bp-management-entries/{id}", bpManagementEntry.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(bpManagementEntry.getId().intValue()))
            .andExpect(jsonPath("$.dateTime").value(DEFAULT_DATE_TIME_STR))
            .andExpect(jsonPath("$.systolicBp").value(DEFAULT_SYSTOLIC_BP))
            .andExpect(jsonPath("$.gtnRate").value(DEFAULT_GTN_RATE.doubleValue()))
            .andExpect(jsonPath("$.labetalolDose").value(DEFAULT_LABETALOL_DOSE));
    }

    @Test
    @Transactional
    public void getNonExistingBpManagementEntry() throws Exception {
        // Get the bpManagementEntry
        restBpManagementEntryMockMvc.perform(get("/api/bp-management-entries/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateBpManagementEntry() throws Exception {
        // Initialize the database
        bpManagementEntryRepository.saveAndFlush(bpManagementEntry);
        int databaseSizeBeforeUpdate = bpManagementEntryRepository.findAll().size();

        // Update the bpManagementEntry
        BpManagementEntry updatedBpManagementEntry = bpManagementEntryRepository.findOne(bpManagementEntry.getId());
        updatedBpManagementEntry
                .dateTime(UPDATED_DATE_TIME)
                .systolicBp(UPDATED_SYSTOLIC_BP)
                .gtnRate(UPDATED_GTN_RATE)
                .labetalolDose(UPDATED_LABETALOL_DOSE);
        BpManagementEntryDTO bpManagementEntryDTO = bpManagementEntryMapper.bpManagementEntryToBpManagementEntryDTO(updatedBpManagementEntry);

        restBpManagementEntryMockMvc.perform(put("/api/bp-management-entries")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(bpManagementEntryDTO)))
                .andExpect(status().isOk());

        // Validate the BpManagementEntry in the database
        List<BpManagementEntry> bpManagementEntries = bpManagementEntryRepository.findAll();
        assertThat(bpManagementEntries).hasSize(databaseSizeBeforeUpdate);
        BpManagementEntry testBpManagementEntry = bpManagementEntries.get(bpManagementEntries.size() - 1);
        assertThat(testBpManagementEntry.getDateTime()).isEqualTo(UPDATED_DATE_TIME);
        assertThat(testBpManagementEntry.getSystolicBp()).isEqualTo(UPDATED_SYSTOLIC_BP);
        assertThat(testBpManagementEntry.getGtnRate()).isEqualTo(UPDATED_GTN_RATE);
        assertThat(testBpManagementEntry.getLabetalolDose()).isEqualTo(UPDATED_LABETALOL_DOSE);
    }

    @Test
    @Transactional
    public void deleteBpManagementEntry() throws Exception {
        // Initialize the database
        bpManagementEntryRepository.saveAndFlush(bpManagementEntry);
        int databaseSizeBeforeDelete = bpManagementEntryRepository.findAll().size();

        // Get the bpManagementEntry
        restBpManagementEntryMockMvc.perform(delete("/api/bp-management-entries/{id}", bpManagementEntry.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<BpManagementEntry> bpManagementEntries = bpManagementEntryRepository.findAll();
        assertThat(bpManagementEntries).hasSize(databaseSizeBeforeDelete - 1);
    }
}
