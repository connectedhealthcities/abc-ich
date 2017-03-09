//package org.nibhi.strokeapp.web.rest;
//
//import org.nibhi.strokeapp.StrokeApp;
//
//import org.nibhi.strokeapp.domain.Patient;
//import org.nibhi.strokeapp.repository.PatientRepository;
//import org.nibhi.strokeapp.service.PatientService;
//import org.nibhi.strokeapp.service.UserService;
//import org.nibhi.strokeapp.service.dto.PatientDTO;
//import org.nibhi.strokeapp.service.mapper.PatientMapper;
//
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import static org.hamcrest.Matchers.hasItem;
//import org.mockito.MockitoAnnotations;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.http.MediaType;
//import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
//import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.util.ReflectionTestUtils;
//import org.springframework.test.web.servlet.MockMvc;
//import org.springframework.test.web.servlet.setup.MockMvcBuilders;
//import org.springframework.transaction.annotation.Transactional;
//
//import javax.inject.Inject;
//import javax.persistence.EntityManager;
//import java.time.LocalDate;
//import java.time.Instant;
//import java.time.ZonedDateTime;
//import java.time.ZoneOffset;
//import java.time.format.DateTimeFormatter;
//import java.time.ZoneId;
//import java.util.List;
//
//import static org.assertj.core.api.Assertions.assertThat;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//import org.nibhi.strokeapp.domain.enumeration.Destination;
//import org.nibhi.strokeapp.domain.enumeration.AnticoagulantType;
//import org.nibhi.strokeapp.domain.enumeration.DoacReversalAgentType;
//import org.nibhi.strokeapp.domain.enumeration.InrType;
///**
// * Test class for the PatientResource REST controller.
// *
// * @see PatientResource
// */
//@RunWith(SpringRunner.class)
//@SpringBootTest(classes = StrokeApp.class)
//public class PatientResourceIntTest {
//
//    private static final String DEFAULT_UNIQUE_ID = "AAAAAAAAAA";
//    private static final String UPDATED_UNIQUE_ID = "BBBBBBBBBB";
//
//    private static final String DEFAULT_INITIALS = "AAAAAAAAAA";
//    private static final String UPDATED_INITIALS = "BBBBBBBBBB";
//
//    private static final LocalDate DEFAULT_BIRTH_DATE = LocalDate.ofEpochDay(0L);
//    private static final LocalDate UPDATED_BIRTH_DATE = LocalDate.now(ZoneId.systemDefault());
//
//    private static final Integer DEFAULT_ESTIMATED_AGE = 1;
//    private static final Integer UPDATED_ESTIMATED_AGE = 2;
//
//    private static final ZonedDateTime DEFAULT_ONSET_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_ONSET_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_ONSET_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_ONSET_DATE_TIME);
//
//    private static final ZonedDateTime DEFAULT_DOOR_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_DOOR_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_DOOR_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_DOOR_DATE_TIME);
//
//    private static final ZonedDateTime DEFAULT_APP_START_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_APP_START_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_APP_START_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_APP_START_DATE_TIME);
//
//    private static final ZonedDateTime DEFAULT_BP_TARGET_REACHED_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_BP_TARGET_REACHED_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_BP_TARGET_REACHED_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_BP_TARGET_REACHED_DATE_TIME);
//
//    private static final Integer DEFAULT_GCS_SCORE = 3;
//    private static final Integer UPDATED_GCS_SCORE = 4;
//
//    private static final Float DEFAULT_ESTIMATED_WEIGHT_IN_KG = 1F;
//    private static final Float UPDATED_ESTIMATED_WEIGHT_IN_KG = 2F;
//
//    private static final Integer DEFAULT_CALCULATED_BERIPLEX_DOSE = 750;
//    private static final Integer UPDATED_CALCULATED_BERIPLEX_DOSE = 751;
//
//    private static final Integer DEFAULT_ACTUAL_BERIPLEX_DOSE = 1;
//    private static final Integer UPDATED_ACTUAL_BERIPLEX_DOSE = 2;
//
//    private static final ZonedDateTime DEFAULT_BERIPLEX_START_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_BERIPLEX_START_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_BERIPLEX_START_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_BERIPLEX_START_DATE_TIME);
//
//    private static final ZonedDateTime DEFAULT_VITAMINK_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_VITAMINK_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_VITAMINK_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_VITAMINK_DATE_TIME);
//
//    private static final Integer DEFAULT_PREMORBID_MRS_SCORE = 0;
//    private static final Integer UPDATED_PREMORBID_MRS_SCORE = 1;
//
//    private static final Float DEFAULT_ICH_VOLUME = 1F;
//    private static final Float UPDATED_ICH_VOLUME = 2F;
//
//    private static final Destination DEFAULT_DESTINATION = Destination.ICU;
//    private static final Destination UPDATED_DESTINATION = Destination.HDU;
//
//    private static final String DEFAULT_OTHER_DESTINATION = "AAAAAAAAAA";
//    private static final String UPDATED_OTHER_DESTINATION = "BBBBBBBBBB";
//
//    private static final ZonedDateTime DEFAULT_SCAN_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_SCAN_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_SCAN_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_SCAN_DATE_TIME);
//
//    private static final Boolean DEFAULT_INFUSION_INSTRUCTIONS_VIEWED = false;
//    private static final Boolean UPDATED_INFUSION_INSTRUCTIONS_VIEWED = true;
//
//    private static final Boolean DEFAULT_POSTERIOR_FOSSA_ICH = false;
//    private static final Boolean UPDATED_POSTERIOR_FOSSA_ICH = true;
//
//    private static final Boolean DEFAULT_VENTRICLE_OBSTRUCTED = false;
//    private static final Boolean UPDATED_VENTRICLE_OBSTRUCTED = true;
//
//    private static final Boolean DEFAULT_FOR_ACTIVE_TREATMENT = false;
//    private static final Boolean UPDATED_FOR_ACTIVE_TREATMENT = true;
//
//    private static final Boolean DEFAULT_LAST_SEEN_WELL_ONSET = false;
//    private static final Boolean UPDATED_LAST_SEEN_WELL_ONSET = true;
//
//    private static final Boolean DEFAULT_BEST_ESTIMATE_ONSET = false;
//    private static final Boolean UPDATED_BEST_ESTIMATE_ONSET = true;
//
//    private static final String DEFAULT_EXTERNAL_SCAN_HOSPITAL_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_EXTERNAL_SCAN_HOSPITAL_NAME = "BBBBBBBBBB";
//
//    private static final Integer DEFAULT_GCS_SCORE_EYE = 1;
//    private static final Integer UPDATED_GCS_SCORE_EYE = 2;
//
//    private static final Integer DEFAULT_GCS_SCORE_VERBAL = 1;
//    private static final Integer UPDATED_GCS_SCORE_VERBAL = 2;
//
//    private static final Integer DEFAULT_GCS_SCORE_MOTOR = 1;
//    private static final Integer UPDATED_GCS_SCORE_MOTOR = 2;
//
//    private static final AnticoagulantType DEFAULT_ANTICOAGULANT_TYPE = AnticoagulantType.DOAC;
//    private static final AnticoagulantType UPDATED_ANTICOAGULANT_TYPE = AnticoagulantType.VITK;
//
//    private static final Boolean DEFAULT_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN = false;
//    private static final Boolean UPDATED_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN = true;
//
//    private static final Boolean DEFAULT_ADMINISTER_BERIPLEX_WITHOUT_INR = false;
//    private static final Boolean UPDATED_ADMINISTER_BERIPLEX_WITHOUT_INR = true;
//
//    private static final DoacReversalAgentType DEFAULT_DOAC_REVERSAL_AGENT_TYPE = DoacReversalAgentType.NONE;
//    private static final DoacReversalAgentType UPDATED_DOAC_REVERSAL_AGENT_TYPE = DoacReversalAgentType.IDARUCIZUMAB;
//
//    private static final ZonedDateTime DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_DOAC_REVERSAL_AGENT_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME);
//
//    private static final Integer DEFAULT_BP_TREATMENT_THRESHOLD = 1;
//    private static final Integer UPDATED_BP_TREATMENT_THRESHOLD = 2;
//
//    private static final Integer DEFAULT_BP_TARGET = 1;
//    private static final Integer UPDATED_BP_TARGET = 2;
//
//    private static final ZonedDateTime DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_REFERRAL_TO_NEUROSURGERY_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME);
//
//    private static final String DEFAULT_NEUROSURGEON_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_NEUROSURGEON_NAME = "BBBBBBBBBB";
//
//    private static final Boolean DEFAULT_REFERRAL_TO_NEUROSURGERY_ACCEPTED = false;
//    private static final Boolean UPDATED_REFERRAL_TO_NEUROSURGERY_ACCEPTED = true;
//
//    private static final String DEFAULT_SUMMARY_EMAIL_ADDRESS = "AAAAAAAAAA";
//    private static final String UPDATED_SUMMARY_EMAIL_ADDRESS = "BBBBBBBBBB";
//
//    private static final String DEFAULT_ANTICOAGULANT_NAME = "AAAAAAAAAA";
//    private static final String UPDATED_ANTICOAGULANT_NAME = "BBBBBBBBBB";
//
//    private static final Float DEFAULT_INR_VALUE = 1F;
//    private static final Float UPDATED_INR_VALUE = 2F;
//
//    private static final InrType DEFAULT_INR_TYPE = InrType.POINT_OF_CARE;
//    private static final InrType UPDATED_INR_TYPE = InrType.LABORATORY;
//
//    private static final ZonedDateTime DEFAULT_INR_DATE_TIME = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
//    private static final ZonedDateTime UPDATED_INR_DATE_TIME = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);
//    private static final String DEFAULT_INR_DATE_TIME_STR = DateTimeFormatter.ISO_INSTANT.format(DEFAULT_INR_DATE_TIME);
//
//    @Inject
//    private PatientRepository patientRepository;
//
//    @Inject
//    private PatientMapper patientMapper;
//
//    @Inject
//    private PatientService patientService;
//    
//    @Inject
//    private UserService userService;
//
//    @Inject
//    private MappingJackson2HttpMessageConverter jacksonMessageConverter;
//
//    @Inject
//    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;
//
//    @Inject
//    private EntityManager em;
//
//    private MockMvc restPatientMockMvc;
//
//    private Patient patient;
//
//    @Before
//    public void setup() {
//        MockitoAnnotations.initMocks(this);
//        PatientResource patientResource = new PatientResource();
//        ReflectionTestUtils.setField(patientResource, "patientService", patientService);
//        ReflectionTestUtils.setField(patientResource, "userService", userService);
//        this.restPatientMockMvc = MockMvcBuilders.standaloneSetup(patientResource)
//            .setCustomArgumentResolvers(pageableArgumentResolver)
//            .setMessageConverters(jacksonMessageConverter).build();
//    }
//
//    /**
//     * Create an entity for this test.
//     *
//     * This is a static method, as tests for other entities might also need it,
//     * if they test an entity which requires the current entity.
//     */
//    public static Patient createEntity(EntityManager em) {
//        Patient patient = new Patient()
//                .uniqueId(DEFAULT_UNIQUE_ID)
//                .initials(DEFAULT_INITIALS)
//                .birthDate(DEFAULT_BIRTH_DATE)
//                .estimatedAge(DEFAULT_ESTIMATED_AGE)
//                .onsetDateTime(DEFAULT_ONSET_DATE_TIME)
//                .doorDateTime(DEFAULT_DOOR_DATE_TIME)
//                .appStartDateTime(DEFAULT_APP_START_DATE_TIME)
//                .bpTargetReachedDateTime(DEFAULT_BP_TARGET_REACHED_DATE_TIME)
//                .gcsScore(DEFAULT_GCS_SCORE)
//                .estimatedWeightInKg(DEFAULT_ESTIMATED_WEIGHT_IN_KG)
//                .calculatedBeriplexDose(DEFAULT_CALCULATED_BERIPLEX_DOSE)
//                .actualBeriplexDose(DEFAULT_ACTUAL_BERIPLEX_DOSE)
//                .beriplexStartDateTime(DEFAULT_BERIPLEX_START_DATE_TIME)
//                .vitaminkDateTime(DEFAULT_VITAMINK_DATE_TIME)
//                .premorbidMrsScore(DEFAULT_PREMORBID_MRS_SCORE)
//                .ichVolume(DEFAULT_ICH_VOLUME)
//                .destination(DEFAULT_DESTINATION)
//                .otherDestination(DEFAULT_OTHER_DESTINATION)
//                .scanDateTime(DEFAULT_SCAN_DATE_TIME)
//                .infusionInstructionsViewed(DEFAULT_INFUSION_INSTRUCTIONS_VIEWED)
//                .posteriorFossaIch(DEFAULT_POSTERIOR_FOSSA_ICH)
//                .ventricleObstructed(DEFAULT_VENTRICLE_OBSTRUCTED)
//                .forActiveTreatment(DEFAULT_FOR_ACTIVE_TREATMENT)
//                .lastSeenWellOnset(DEFAULT_LAST_SEEN_WELL_ONSET)
//                .bestEstimateOnset(DEFAULT_BEST_ESTIMATE_ONSET)
//                .externalScanHospitalName(DEFAULT_EXTERNAL_SCAN_HOSPITAL_NAME)
//                .gcsScoreEye(DEFAULT_GCS_SCORE_EYE)
//                .gcsScoreVerbal(DEFAULT_GCS_SCORE_VERBAL)
//                .gcsScoreMotor(DEFAULT_GCS_SCORE_MOTOR)
//                .anticoagulantType(DEFAULT_ANTICOAGULANT_TYPE)
//                .administerBeriplexWhenAnticoagulantUnknown(DEFAULT_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN)
//                .administerBeriplexWithoutInr(DEFAULT_ADMINISTER_BERIPLEX_WITHOUT_INR)
//                .doacReversalAgentType(DEFAULT_DOAC_REVERSAL_AGENT_TYPE)
//                .doacReversalAgentDateTime(DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME)
//                .bpTreatmentThreshold(DEFAULT_BP_TREATMENT_THRESHOLD)
//                .bpTarget(DEFAULT_BP_TARGET)
//                .referralToNeurosurgeryDateTime(DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME)
//                .neurosurgeonName(DEFAULT_NEUROSURGEON_NAME)
//                .referralToNeurosurgeryAccepted(DEFAULT_REFERRAL_TO_NEUROSURGERY_ACCEPTED)
//                .summaryEmailAddress(DEFAULT_SUMMARY_EMAIL_ADDRESS)
//                .anticoagulantName(DEFAULT_ANTICOAGULANT_NAME)
//                .inrValue(DEFAULT_INR_VALUE)
//                .inrType(DEFAULT_INR_TYPE)
//                .inrDateTime(DEFAULT_INR_DATE_TIME);
//        return patient;
//    }
//
//    @Before
//    public void initTest() {
//        patient = createEntity(em);
//    }
//
//    @Test
//    @Transactional
//    public void createPatient() throws Exception {
//        int databaseSizeBeforeCreate = patientRepository.findAll().size();
//
//        // Create the Patient
//        PatientDTO patientDTO = patientMapper.patientToPatientDTO(patient);
//
//        restPatientMockMvc.perform(post("/api/patients")
//                .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                .content(TestUtil.convertObjectToJsonBytes(patientDTO)))
//                .andExpect(status().isCreated());
//
//        // Validate the Patient in the database
//        List<Patient> patients = patientRepository.findAll();
//        assertThat(patients).hasSize(databaseSizeBeforeCreate + 1);
//        Patient testPatient = patients.get(patients.size() - 1);
//        assertThat(testPatient.getUniqueId()).isEqualTo(DEFAULT_UNIQUE_ID);
//        assertThat(testPatient.getInitials()).isEqualTo(DEFAULT_INITIALS);
//        assertThat(testPatient.getBirthDate()).isEqualTo(DEFAULT_BIRTH_DATE);
//        assertThat(testPatient.getEstimatedAge()).isEqualTo(DEFAULT_ESTIMATED_AGE);
//        assertThat(testPatient.getOnsetDateTime()).isEqualTo(DEFAULT_ONSET_DATE_TIME);
//        assertThat(testPatient.getDoorDateTime()).isEqualTo(DEFAULT_DOOR_DATE_TIME);
//        assertThat(testPatient.getAppStartDateTime()).isEqualTo(DEFAULT_APP_START_DATE_TIME);
//        assertThat(testPatient.getBpTargetReachedDateTime()).isEqualTo(DEFAULT_BP_TARGET_REACHED_DATE_TIME);
//        assertThat(testPatient.getGcsScore()).isEqualTo(DEFAULT_GCS_SCORE);
//        assertThat(testPatient.getEstimatedWeightInKg()).isEqualTo(DEFAULT_ESTIMATED_WEIGHT_IN_KG);
//        assertThat(testPatient.getCalculatedBeriplexDose()).isEqualTo(DEFAULT_CALCULATED_BERIPLEX_DOSE);
//        assertThat(testPatient.getActualBeriplexDose()).isEqualTo(DEFAULT_ACTUAL_BERIPLEX_DOSE);
//        assertThat(testPatient.getBeriplexStartDateTime()).isEqualTo(DEFAULT_BERIPLEX_START_DATE_TIME);
//        assertThat(testPatient.getVitaminkDateTime()).isEqualTo(DEFAULT_VITAMINK_DATE_TIME);
//        assertThat(testPatient.getPremorbidMrsScore()).isEqualTo(DEFAULT_PREMORBID_MRS_SCORE);
//        assertThat(testPatient.getIchVolume()).isEqualTo(DEFAULT_ICH_VOLUME);
//        assertThat(testPatient.getDestination()).isEqualTo(DEFAULT_DESTINATION);
//        assertThat(testPatient.getOtherDestination()).isEqualTo(DEFAULT_OTHER_DESTINATION);
//        assertThat(testPatient.getScanDateTime()).isEqualTo(DEFAULT_SCAN_DATE_TIME);
//        assertThat(testPatient.isInfusionInstructionsViewed()).isEqualTo(DEFAULT_INFUSION_INSTRUCTIONS_VIEWED);
//        assertThat(testPatient.isPosteriorFossaIch()).isEqualTo(DEFAULT_POSTERIOR_FOSSA_ICH);
//        assertThat(testPatient.isVentricleObstructed()).isEqualTo(DEFAULT_VENTRICLE_OBSTRUCTED);
//        assertThat(testPatient.isForActiveTreatment()).isEqualTo(DEFAULT_FOR_ACTIVE_TREATMENT);
//        assertThat(testPatient.isLastSeenWellOnset()).isEqualTo(DEFAULT_LAST_SEEN_WELL_ONSET);
//        assertThat(testPatient.isBestEstimateOnset()).isEqualTo(DEFAULT_BEST_ESTIMATE_ONSET);
//        assertThat(testPatient.getExternalScanHospitalName()).isEqualTo(DEFAULT_EXTERNAL_SCAN_HOSPITAL_NAME);
//        assertThat(testPatient.getGcsScoreEye()).isEqualTo(DEFAULT_GCS_SCORE_EYE);
//        assertThat(testPatient.getGcsScoreVerbal()).isEqualTo(DEFAULT_GCS_SCORE_VERBAL);
//        assertThat(testPatient.getGcsScoreMotor()).isEqualTo(DEFAULT_GCS_SCORE_MOTOR);
//        assertThat(testPatient.getAnticoagulantType()).isEqualTo(DEFAULT_ANTICOAGULANT_TYPE);
//        assertThat(testPatient.isAdministerBeriplexWhenAnticoagulantUnknown()).isEqualTo(DEFAULT_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN);
//        assertThat(testPatient.isAdministerBeriplexWithoutInr()).isEqualTo(DEFAULT_ADMINISTER_BERIPLEX_WITHOUT_INR);
//        assertThat(testPatient.getDoacReversalAgentType()).isEqualTo(DEFAULT_DOAC_REVERSAL_AGENT_TYPE);
//        assertThat(testPatient.getDoacReversalAgentDateTime()).isEqualTo(DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME);
//        assertThat(testPatient.getBpTreatmentThreshold()).isEqualTo(DEFAULT_BP_TREATMENT_THRESHOLD);
//        assertThat(testPatient.getBpTarget()).isEqualTo(DEFAULT_BP_TARGET);
//        assertThat(testPatient.getReferralToNeurosurgeryDateTime()).isEqualTo(DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME);
//        assertThat(testPatient.getNeurosurgeonName()).isEqualTo(DEFAULT_NEUROSURGEON_NAME);
//        assertThat(testPatient.isReferralToNeurosurgeryAccepted()).isEqualTo(DEFAULT_REFERRAL_TO_NEUROSURGERY_ACCEPTED);
//        assertThat(testPatient.getSummaryEmailAddress()).isEqualTo(DEFAULT_SUMMARY_EMAIL_ADDRESS);
//        assertThat(testPatient.getAnticoagulantName()).isEqualTo(DEFAULT_ANTICOAGULANT_NAME);
//        assertThat(testPatient.getInrValue()).isEqualTo(DEFAULT_INR_VALUE);
//        assertThat(testPatient.getInrType()).isEqualTo(DEFAULT_INR_TYPE);
//        assertThat(testPatient.getInrDateTime()).isEqualTo(DEFAULT_INR_DATE_TIME);
//    }
//
//    @Test
//    @Transactional
//    public void getAllPatients() throws Exception {
//        // Initialize the database
//        patientRepository.saveAndFlush(patient);
//
//        // Get all the patients
//        restPatientMockMvc.perform(get("/api/patients?sort=id,desc"))
//                .andExpect(status().isOk())
//                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//                .andExpect(jsonPath("$.[*].id").value(hasItem(patient.getId().intValue())))
//                .andExpect(jsonPath("$.[*].uniqueId").value(hasItem(DEFAULT_UNIQUE_ID.toString())))
//                .andExpect(jsonPath("$.[*].initials").value(hasItem(DEFAULT_INITIALS.toString())))
//                .andExpect(jsonPath("$.[*].birthDate").value(hasItem(DEFAULT_BIRTH_DATE.toString())))
//                .andExpect(jsonPath("$.[*].estimatedAge").value(hasItem(DEFAULT_ESTIMATED_AGE)))
//                .andExpect(jsonPath("$.[*].onsetDateTime").value(hasItem(DEFAULT_ONSET_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].doorDateTime").value(hasItem(DEFAULT_DOOR_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].appStartDateTime").value(hasItem(DEFAULT_APP_START_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].bpTargetReachedDateTime").value(hasItem(DEFAULT_BP_TARGET_REACHED_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].gcsScore").value(hasItem(DEFAULT_GCS_SCORE)))
//                .andExpect(jsonPath("$.[*].estimatedWeightInKg").value(hasItem(DEFAULT_ESTIMATED_WEIGHT_IN_KG.doubleValue())))
//                .andExpect(jsonPath("$.[*].calculatedBeriplexDose").value(hasItem(DEFAULT_CALCULATED_BERIPLEX_DOSE)))
//                .andExpect(jsonPath("$.[*].actualBeriplexDose").value(hasItem(DEFAULT_ACTUAL_BERIPLEX_DOSE)))
//                .andExpect(jsonPath("$.[*].beriplexStartDateTime").value(hasItem(DEFAULT_BERIPLEX_START_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].vitaminkDateTime").value(hasItem(DEFAULT_VITAMINK_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].premorbidMrsScore").value(hasItem(DEFAULT_PREMORBID_MRS_SCORE)))
//                .andExpect(jsonPath("$.[*].ichVolume").value(hasItem(DEFAULT_ICH_VOLUME.doubleValue())))
//                .andExpect(jsonPath("$.[*].destination").value(hasItem(DEFAULT_DESTINATION.toString())))
//                .andExpect(jsonPath("$.[*].otherDestination").value(hasItem(DEFAULT_OTHER_DESTINATION.toString())))
//                .andExpect(jsonPath("$.[*].scanDateTime").value(hasItem(DEFAULT_SCAN_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].infusionInstructionsViewed").value(hasItem(DEFAULT_INFUSION_INSTRUCTIONS_VIEWED.booleanValue())))
//                .andExpect(jsonPath("$.[*].posteriorFossaIch").value(hasItem(DEFAULT_POSTERIOR_FOSSA_ICH.booleanValue())))
//                .andExpect(jsonPath("$.[*].ventricleObstructed").value(hasItem(DEFAULT_VENTRICLE_OBSTRUCTED.booleanValue())))
//                .andExpect(jsonPath("$.[*].forActiveTreatment").value(hasItem(DEFAULT_FOR_ACTIVE_TREATMENT.booleanValue())))
//                .andExpect(jsonPath("$.[*].lastSeenWellOnset").value(hasItem(DEFAULT_LAST_SEEN_WELL_ONSET.booleanValue())))
//                .andExpect(jsonPath("$.[*].bestEstimateOnset").value(hasItem(DEFAULT_BEST_ESTIMATE_ONSET.booleanValue())))
//                .andExpect(jsonPath("$.[*].externalScanHospitalName").value(hasItem(DEFAULT_EXTERNAL_SCAN_HOSPITAL_NAME.toString())))
//                .andExpect(jsonPath("$.[*].gcsScoreEye").value(hasItem(DEFAULT_GCS_SCORE_EYE)))
//                .andExpect(jsonPath("$.[*].gcsScoreVerbal").value(hasItem(DEFAULT_GCS_SCORE_VERBAL)))
//                .andExpect(jsonPath("$.[*].gcsScoreMotor").value(hasItem(DEFAULT_GCS_SCORE_MOTOR)))
//                .andExpect(jsonPath("$.[*].anticoagulantType").value(hasItem(DEFAULT_ANTICOAGULANT_TYPE.toString())))
//                .andExpect(jsonPath("$.[*].administerBeriplexWhenAnticoagulantUnknown").value(hasItem(DEFAULT_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN.booleanValue())))
//                .andExpect(jsonPath("$.[*].administerBeriplexWithoutInr").value(hasItem(DEFAULT_ADMINISTER_BERIPLEX_WITHOUT_INR.booleanValue())))
//                .andExpect(jsonPath("$.[*].doacReversalAgentType").value(hasItem(DEFAULT_DOAC_REVERSAL_AGENT_TYPE.toString())))
//                .andExpect(jsonPath("$.[*].doacReversalAgentDateTime").value(hasItem(DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].bpTreatmentThreshold").value(hasItem(DEFAULT_BP_TREATMENT_THRESHOLD)))
//                .andExpect(jsonPath("$.[*].bpTarget").value(hasItem(DEFAULT_BP_TARGET)))
//                .andExpect(jsonPath("$.[*].referralToNeurosurgeryDateTime").value(hasItem(DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME_STR)))
//                .andExpect(jsonPath("$.[*].neurosurgeonName").value(hasItem(DEFAULT_NEUROSURGEON_NAME.toString())))
//                .andExpect(jsonPath("$.[*].referralToNeurosurgeryAccepted").value(hasItem(DEFAULT_REFERRAL_TO_NEUROSURGERY_ACCEPTED.booleanValue())))
//                .andExpect(jsonPath("$.[*].summaryEmailAddress").value(hasItem(DEFAULT_SUMMARY_EMAIL_ADDRESS.toString())))
//                .andExpect(jsonPath("$.[*].anticoagulantName").value(hasItem(DEFAULT_ANTICOAGULANT_NAME.toString())))
//                .andExpect(jsonPath("$.[*].inrValue").value(hasItem(DEFAULT_INR_VALUE.doubleValue())))
//                .andExpect(jsonPath("$.[*].inrType").value(hasItem(DEFAULT_INR_TYPE.toString())))
//                .andExpect(jsonPath("$.[*].inrDateTime").value(hasItem(DEFAULT_INR_DATE_TIME_STR)));
//    }
//
//    @Test
//    @Transactional
//    public void getPatient() throws Exception {
//        // Initialize the database
//        patientRepository.saveAndFlush(patient);
//
//        // Get the patient
//        restPatientMockMvc.perform(get("/api/patients/{id}", patient.getId()))
//            .andExpect(status().isOk())
//            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
//            .andExpect(jsonPath("$.id").value(patient.getId().intValue()))
//            .andExpect(jsonPath("$.uniqueId").value(DEFAULT_UNIQUE_ID.toString()))
//            .andExpect(jsonPath("$.initials").value(DEFAULT_INITIALS.toString()))
//            .andExpect(jsonPath("$.birthDate").value(DEFAULT_BIRTH_DATE.toString()))
//            .andExpect(jsonPath("$.estimatedAge").value(DEFAULT_ESTIMATED_AGE))
//            .andExpect(jsonPath("$.onsetDateTime").value(DEFAULT_ONSET_DATE_TIME_STR))
//            .andExpect(jsonPath("$.doorDateTime").value(DEFAULT_DOOR_DATE_TIME_STR))
//            .andExpect(jsonPath("$.appStartDateTime").value(DEFAULT_APP_START_DATE_TIME_STR))
//            .andExpect(jsonPath("$.bpTargetReachedDateTime").value(DEFAULT_BP_TARGET_REACHED_DATE_TIME_STR))
//            .andExpect(jsonPath("$.gcsScore").value(DEFAULT_GCS_SCORE))
//            .andExpect(jsonPath("$.estimatedWeightInKg").value(DEFAULT_ESTIMATED_WEIGHT_IN_KG.doubleValue()))
//            .andExpect(jsonPath("$.calculatedBeriplexDose").value(DEFAULT_CALCULATED_BERIPLEX_DOSE))
//            .andExpect(jsonPath("$.actualBeriplexDose").value(DEFAULT_ACTUAL_BERIPLEX_DOSE))
//            .andExpect(jsonPath("$.beriplexStartDateTime").value(DEFAULT_BERIPLEX_START_DATE_TIME_STR))
//            .andExpect(jsonPath("$.vitaminkDateTime").value(DEFAULT_VITAMINK_DATE_TIME_STR))
//            .andExpect(jsonPath("$.premorbidMrsScore").value(DEFAULT_PREMORBID_MRS_SCORE))
//            .andExpect(jsonPath("$.ichVolume").value(DEFAULT_ICH_VOLUME.doubleValue()))
//            .andExpect(jsonPath("$.destination").value(DEFAULT_DESTINATION.toString()))
//            .andExpect(jsonPath("$.otherDestination").value(DEFAULT_OTHER_DESTINATION.toString()))
//            .andExpect(jsonPath("$.scanDateTime").value(DEFAULT_SCAN_DATE_TIME_STR))
//            .andExpect(jsonPath("$.infusionInstructionsViewed").value(DEFAULT_INFUSION_INSTRUCTIONS_VIEWED.booleanValue()))
//            .andExpect(jsonPath("$.posteriorFossaIch").value(DEFAULT_POSTERIOR_FOSSA_ICH.booleanValue()))
//            .andExpect(jsonPath("$.ventricleObstructed").value(DEFAULT_VENTRICLE_OBSTRUCTED.booleanValue()))
//            .andExpect(jsonPath("$.forActiveTreatment").value(DEFAULT_FOR_ACTIVE_TREATMENT.booleanValue()))
//            .andExpect(jsonPath("$.lastSeenWellOnset").value(DEFAULT_LAST_SEEN_WELL_ONSET.booleanValue()))
//            .andExpect(jsonPath("$.bestEstimateOnset").value(DEFAULT_BEST_ESTIMATE_ONSET.booleanValue()))
//            .andExpect(jsonPath("$.externalScanHospitalName").value(DEFAULT_EXTERNAL_SCAN_HOSPITAL_NAME.toString()))
//            .andExpect(jsonPath("$.gcsScoreEye").value(DEFAULT_GCS_SCORE_EYE))
//            .andExpect(jsonPath("$.gcsScoreVerbal").value(DEFAULT_GCS_SCORE_VERBAL))
//            .andExpect(jsonPath("$.gcsScoreMotor").value(DEFAULT_GCS_SCORE_MOTOR))
//            .andExpect(jsonPath("$.anticoagulantType").value(DEFAULT_ANTICOAGULANT_TYPE.toString()))
//            .andExpect(jsonPath("$.administerBeriplexWhenAnticoagulantUnknown").value(DEFAULT_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN.booleanValue()))
//            .andExpect(jsonPath("$.administerBeriplexWithoutInr").value(DEFAULT_ADMINISTER_BERIPLEX_WITHOUT_INR.booleanValue()))
//            .andExpect(jsonPath("$.doacReversalAgentType").value(DEFAULT_DOAC_REVERSAL_AGENT_TYPE.toString()))
//            .andExpect(jsonPath("$.doacReversalAgentDateTime").value(DEFAULT_DOAC_REVERSAL_AGENT_DATE_TIME_STR))
//            .andExpect(jsonPath("$.bpTreatmentThreshold").value(DEFAULT_BP_TREATMENT_THRESHOLD))
//            .andExpect(jsonPath("$.bpTarget").value(DEFAULT_BP_TARGET))
//            .andExpect(jsonPath("$.referralToNeurosurgeryDateTime").value(DEFAULT_REFERRAL_TO_NEUROSURGERY_DATE_TIME_STR))
//            .andExpect(jsonPath("$.neurosurgeonName").value(DEFAULT_NEUROSURGEON_NAME.toString()))
//            .andExpect(jsonPath("$.referralToNeurosurgeryAccepted").value(DEFAULT_REFERRAL_TO_NEUROSURGERY_ACCEPTED.booleanValue()))
//            .andExpect(jsonPath("$.summaryEmailAddress").value(DEFAULT_SUMMARY_EMAIL_ADDRESS.toString()))
//            .andExpect(jsonPath("$.anticoagulantName").value(DEFAULT_ANTICOAGULANT_NAME.toString()))
//            .andExpect(jsonPath("$.inrValue").value(DEFAULT_INR_VALUE.doubleValue()))
//            .andExpect(jsonPath("$.inrType").value(DEFAULT_INR_TYPE.toString()))
//            .andExpect(jsonPath("$.inrDateTime").value(DEFAULT_INR_DATE_TIME_STR));
//    }
//
//    @Test
//    @Transactional
//    public void getNonExistingPatient() throws Exception {
//        // Get the patient
//        restPatientMockMvc.perform(get("/api/patients/{id}", Long.MAX_VALUE))
//                .andExpect(status().isNotFound());
//    }
//
//    @Test
//    @Transactional
//    public void updatePatient() throws Exception {
//        // Initialize the database
//        patientRepository.saveAndFlush(patient);
//        int databaseSizeBeforeUpdate = patientRepository.findAll().size();
//
//        // Update the patient
//        Patient updatedPatient = patientRepository.findOne(patient.getId());
//        updatedPatient
//                .uniqueId(UPDATED_UNIQUE_ID)
//                .initials(UPDATED_INITIALS)
//                .birthDate(UPDATED_BIRTH_DATE)
//                .estimatedAge(UPDATED_ESTIMATED_AGE)
//                .onsetDateTime(UPDATED_ONSET_DATE_TIME)
//                .doorDateTime(UPDATED_DOOR_DATE_TIME)
//                .appStartDateTime(UPDATED_APP_START_DATE_TIME)
//                .bpTargetReachedDateTime(UPDATED_BP_TARGET_REACHED_DATE_TIME)
//                .gcsScore(UPDATED_GCS_SCORE)
//                .estimatedWeightInKg(UPDATED_ESTIMATED_WEIGHT_IN_KG)
//                .calculatedBeriplexDose(UPDATED_CALCULATED_BERIPLEX_DOSE)
//                .actualBeriplexDose(UPDATED_ACTUAL_BERIPLEX_DOSE)
//                .beriplexStartDateTime(UPDATED_BERIPLEX_START_DATE_TIME)
//                .vitaminkDateTime(UPDATED_VITAMINK_DATE_TIME)
//                .premorbidMrsScore(UPDATED_PREMORBID_MRS_SCORE)
//                .ichVolume(UPDATED_ICH_VOLUME)
//                .destination(UPDATED_DESTINATION)
//                .otherDestination(UPDATED_OTHER_DESTINATION)
//                .scanDateTime(UPDATED_SCAN_DATE_TIME)
//                .infusionInstructionsViewed(UPDATED_INFUSION_INSTRUCTIONS_VIEWED)
//                .posteriorFossaIch(UPDATED_POSTERIOR_FOSSA_ICH)
//                .ventricleObstructed(UPDATED_VENTRICLE_OBSTRUCTED)
//                .forActiveTreatment(UPDATED_FOR_ACTIVE_TREATMENT)
//                .lastSeenWellOnset(UPDATED_LAST_SEEN_WELL_ONSET)
//                .bestEstimateOnset(UPDATED_BEST_ESTIMATE_ONSET)
//                .externalScanHospitalName(UPDATED_EXTERNAL_SCAN_HOSPITAL_NAME)
//                .gcsScoreEye(UPDATED_GCS_SCORE_EYE)
//                .gcsScoreVerbal(UPDATED_GCS_SCORE_VERBAL)
//                .gcsScoreMotor(UPDATED_GCS_SCORE_MOTOR)
//                .anticoagulantType(UPDATED_ANTICOAGULANT_TYPE)
//                .administerBeriplexWhenAnticoagulantUnknown(UPDATED_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN)
//                .administerBeriplexWithoutInr(UPDATED_ADMINISTER_BERIPLEX_WITHOUT_INR)
//                .doacReversalAgentType(UPDATED_DOAC_REVERSAL_AGENT_TYPE)
//                .doacReversalAgentDateTime(UPDATED_DOAC_REVERSAL_AGENT_DATE_TIME)
//                .bpTreatmentThreshold(UPDATED_BP_TREATMENT_THRESHOLD)
//                .bpTarget(UPDATED_BP_TARGET)
//                .referralToNeurosurgeryDateTime(UPDATED_REFERRAL_TO_NEUROSURGERY_DATE_TIME)
//                .neurosurgeonName(UPDATED_NEUROSURGEON_NAME)
//                .referralToNeurosurgeryAccepted(UPDATED_REFERRAL_TO_NEUROSURGERY_ACCEPTED)
//                .summaryEmailAddress(UPDATED_SUMMARY_EMAIL_ADDRESS)
//                .anticoagulantName(UPDATED_ANTICOAGULANT_NAME)
//                .inrValue(UPDATED_INR_VALUE)
//                .inrType(UPDATED_INR_TYPE)
//                .inrDateTime(UPDATED_INR_DATE_TIME);
//        PatientDTO patientDTO = patientMapper.patientToPatientDTO(updatedPatient);
//
//        restPatientMockMvc.perform(put("/api/patients")
//                .contentType(TestUtil.APPLICATION_JSON_UTF8)
//                .content(TestUtil.convertObjectToJsonBytes(patientDTO)))
//                .andExpect(status().isOk());
//
//        // Validate the Patient in the database
//        List<Patient> patients = patientRepository.findAll();
//        assertThat(patients).hasSize(databaseSizeBeforeUpdate);
//        Patient testPatient = patients.get(patients.size() - 1);
//        assertThat(testPatient.getUniqueId()).isEqualTo(UPDATED_UNIQUE_ID);
//        assertThat(testPatient.getInitials()).isEqualTo(UPDATED_INITIALS);
//        assertThat(testPatient.getBirthDate()).isEqualTo(UPDATED_BIRTH_DATE);
//        assertThat(testPatient.getEstimatedAge()).isEqualTo(UPDATED_ESTIMATED_AGE);
//        assertThat(testPatient.getOnsetDateTime()).isEqualTo(UPDATED_ONSET_DATE_TIME);
//        assertThat(testPatient.getDoorDateTime()).isEqualTo(UPDATED_DOOR_DATE_TIME);
//        assertThat(testPatient.getAppStartDateTime()).isEqualTo(UPDATED_APP_START_DATE_TIME);
//        assertThat(testPatient.getBpTargetReachedDateTime()).isEqualTo(UPDATED_BP_TARGET_REACHED_DATE_TIME);
//        assertThat(testPatient.getGcsScore()).isEqualTo(UPDATED_GCS_SCORE);
//        assertThat(testPatient.getEstimatedWeightInKg()).isEqualTo(UPDATED_ESTIMATED_WEIGHT_IN_KG);
//        assertThat(testPatient.getCalculatedBeriplexDose()).isEqualTo(UPDATED_CALCULATED_BERIPLEX_DOSE);
//        assertThat(testPatient.getActualBeriplexDose()).isEqualTo(UPDATED_ACTUAL_BERIPLEX_DOSE);
//        assertThat(testPatient.getBeriplexStartDateTime()).isEqualTo(UPDATED_BERIPLEX_START_DATE_TIME);
//        assertThat(testPatient.getVitaminkDateTime()).isEqualTo(UPDATED_VITAMINK_DATE_TIME);
//        assertThat(testPatient.getPremorbidMrsScore()).isEqualTo(UPDATED_PREMORBID_MRS_SCORE);
//        assertThat(testPatient.getIchVolume()).isEqualTo(UPDATED_ICH_VOLUME);
//        assertThat(testPatient.getDestination()).isEqualTo(UPDATED_DESTINATION);
//        assertThat(testPatient.getOtherDestination()).isEqualTo(UPDATED_OTHER_DESTINATION);
//        assertThat(testPatient.getScanDateTime()).isEqualTo(UPDATED_SCAN_DATE_TIME);
//        assertThat(testPatient.isInfusionInstructionsViewed()).isEqualTo(UPDATED_INFUSION_INSTRUCTIONS_VIEWED);
//        assertThat(testPatient.isPosteriorFossaIch()).isEqualTo(UPDATED_POSTERIOR_FOSSA_ICH);
//        assertThat(testPatient.isVentricleObstructed()).isEqualTo(UPDATED_VENTRICLE_OBSTRUCTED);
//        assertThat(testPatient.isForActiveTreatment()).isEqualTo(UPDATED_FOR_ACTIVE_TREATMENT);
//        assertThat(testPatient.isLastSeenWellOnset()).isEqualTo(UPDATED_LAST_SEEN_WELL_ONSET);
//        assertThat(testPatient.isBestEstimateOnset()).isEqualTo(UPDATED_BEST_ESTIMATE_ONSET);
//        assertThat(testPatient.getExternalScanHospitalName()).isEqualTo(UPDATED_EXTERNAL_SCAN_HOSPITAL_NAME);
//        assertThat(testPatient.getGcsScoreEye()).isEqualTo(UPDATED_GCS_SCORE_EYE);
//        assertThat(testPatient.getGcsScoreVerbal()).isEqualTo(UPDATED_GCS_SCORE_VERBAL);
//        assertThat(testPatient.getGcsScoreMotor()).isEqualTo(UPDATED_GCS_SCORE_MOTOR);
//        assertThat(testPatient.getAnticoagulantType()).isEqualTo(UPDATED_ANTICOAGULANT_TYPE);
//        assertThat(testPatient.isAdministerBeriplexWhenAnticoagulantUnknown()).isEqualTo(UPDATED_ADMINISTER_BERIPLEX_WHEN_ANTICOAGULANT_UNKNOWN);
//        assertThat(testPatient.isAdministerBeriplexWithoutInr()).isEqualTo(UPDATED_ADMINISTER_BERIPLEX_WITHOUT_INR);
//        assertThat(testPatient.getDoacReversalAgentType()).isEqualTo(UPDATED_DOAC_REVERSAL_AGENT_TYPE);
//        assertThat(testPatient.getDoacReversalAgentDateTime()).isEqualTo(UPDATED_DOAC_REVERSAL_AGENT_DATE_TIME);
//        assertThat(testPatient.getBpTreatmentThreshold()).isEqualTo(UPDATED_BP_TREATMENT_THRESHOLD);
//        assertThat(testPatient.getBpTarget()).isEqualTo(UPDATED_BP_TARGET);
//        assertThat(testPatient.getReferralToNeurosurgeryDateTime()).isEqualTo(UPDATED_REFERRAL_TO_NEUROSURGERY_DATE_TIME);
//        assertThat(testPatient.getNeurosurgeonName()).isEqualTo(UPDATED_NEUROSURGEON_NAME);
//        assertThat(testPatient.isReferralToNeurosurgeryAccepted()).isEqualTo(UPDATED_REFERRAL_TO_NEUROSURGERY_ACCEPTED);
//        assertThat(testPatient.getSummaryEmailAddress()).isEqualTo(UPDATED_SUMMARY_EMAIL_ADDRESS);
//        assertThat(testPatient.getAnticoagulantName()).isEqualTo(UPDATED_ANTICOAGULANT_NAME);
//        assertThat(testPatient.getInrValue()).isEqualTo(UPDATED_INR_VALUE);
//        assertThat(testPatient.getInrType()).isEqualTo(UPDATED_INR_TYPE);
//        assertThat(testPatient.getInrDateTime()).isEqualTo(UPDATED_INR_DATE_TIME);
//    }
//
//    @Test
//    @Transactional
//    public void deletePatient() throws Exception {
//        // Initialize the database
//        patientRepository.saveAndFlush(patient);
//        int databaseSizeBeforeDelete = patientRepository.findAll().size();
//
//        // Get the patient
//        restPatientMockMvc.perform(delete("/api/patients/{id}", patient.getId())
//                .accept(TestUtil.APPLICATION_JSON_UTF8))
//                .andExpect(status().isOk());
//
//        // Validate the database is empty
//        List<Patient> patients = patientRepository.findAll();
//        assertThat(patients).hasSize(databaseSizeBeforeDelete - 1);
//    }
//}
