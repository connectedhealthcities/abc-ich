package org.nibhi.strokeapp.service.impl;

import org.nibhi.strokeapp.service.TestDataService;
import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.Hospital;
import org.nibhi.strokeapp.domain.Patient;
import org.nibhi.strokeapp.domain.enumeration.AnticoagulantType;
import org.nibhi.strokeapp.domain.enumeration.ReversalAgentType;
import org.nibhi.strokeapp.domain.enumeration.InrType;
import org.nibhi.strokeapp.repository.BpManagementEntryRepository;
import org.nibhi.strokeapp.repository.HospitalRepository;
import org.nibhi.strokeapp.repository.PatientRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import javax.inject.Inject;
import javax.persistence.Column;


/**
 * Service Implementation for adding test data.
 */
@Service
@Transactional
public class TestDataServiceImpl implements TestDataService{

    private final Logger log = LoggerFactory.getLogger(TestDataServiceImpl.class);

	static final long MILLISECONDS_PER_YEAR = 365*24*60*60*1000L;
	static final long MILLISECONDS_PER_DAY = 24*60*60*1000L;
	static final long MILLISECONDS_PER_MINUTE = 60*1000L;
		
    ZonedDateTime referenceDateTime = ZonedDateTime.parse("2016-06-30T06:00:00Z[UTC]");


    @Inject
    private HospitalRepository hospitalRepository;

    @Inject
    private PatientRepository patientRepository;

    @Inject
    private BpManagementEntryRepository bpManagementEntryRepository;


    /**
     * Add test data.
     *
     * @return void
     */
    public void addTestData() {
        log.debug("Request to add test data");
             
        Hospital hospital1 = hospitalRepository.findOne((long) 1);       
        Hospital hospital2 = hospitalRepository.findOne((long) 2);       
        addPatients(hospital1, hospital2);        	
    }
        
    private void addPatients(Hospital hospital1, Hospital hospital2) {
    	
        for (int i = 0; i < 50; i++) {        	
           	ZonedDateTime doorDateTime = getPastRandomDateTimeWithinOneYear(referenceDateTime);
           	addPatient(i, hospital1, doorDateTime);        	
        }

        for (int i = 50; i < 100; i++) {        	
           	ZonedDateTime doorDateTime = getPastRandomDateTimeWithinOneYear(referenceDateTime);
        	addPatient(i, hospital2, doorDateTime);        	
        }
    }

    private void addPatient(int index, Hospital hospital, ZonedDateTime doorDateTime) {
    	
    	// onsetDateTime				- 	entered on patient registration 2
    	// scanDateTime					-	entered on patient registration 1
    	// appStartDateTime				-	captured automatically when Patient registration 1 is viewed
    	// inrDateTimes					-	entered explicitly (initial and after 30 minutes)
    	// reversalAgentStartDateTime	-	entered explicitly - it's the date/time that the infusion of reversal agent is started
    	// vitaminkDateTime				-	entered explicitly - it's the date/time that the vitamink is administered
    	// bpDateTimes					-	entered explicitly - every 5 minutes
    	
        ZonedDateTime onsetDateTime = getOnsetDateTime(doorDateTime); 								// random time within the previous 24 hours of the doorDateTime
        ZonedDateTime scanDateTime = getScanDateTime(doorDateTime);									// random time between 30 and 60 minutes after the doorDateTime     
        ZonedDateTime appStartDateTime = getAppStartDateTime(scanDateTime);							// scanDateTime + 5 minutes
        // ZonedDateTime inrDateTime_1																// appStartDateTime + 1 minute
        ZonedDateTime reversalAgentStartDateTime = getReversalAgentStartDateTime(appStartDateTime);	// appStartDateTime + 5 minutes
        ZonedDateTime vitaminkDateTime = getVitaminkDateTime(reversalAgentStartDateTime);			// appStartDateTime + 6 minutes
        // ZonedDateTime bpDateTime_1																// appStartDateTime + 7 minutes 	i=0, GTN=1.5, lab=0
        // ZonedDateTime bpDateTime_2																// appStartDateTime + 12 minutes 	i=1, GTN=2.5, lab=0
        // ZonedDateTime bpDateTime_3																// appStartDateTime + 17 minutes 	i=2, GTN=3.5, lab=0
        // ZonedDateTime bpDateTime_4																// appStartDateTime + 22 minutes 	i=3, GTN=4.5, lab=0
        // ZonedDateTime bpDateTime_5																// appStartDateTime + 27 minutes 	i=4, GTN=5.5, lab=0
        // ZonedDateTime inrDateTime_2																// appStartDateTime + 31 minutes 	
        // ZonedDateTime bpDateTime_6																// appStartDateTime + 32 minutes 	i=5, GTN=6.5, lab=0
        // ZonedDateTime bpDateTime_7																// appStartDateTime + 37 minutes 	i=6, GTN=7.5, lab=10
        // ZonedDateTime bpDateTime_8																// appStartDateTime + 42 minutes 	i=7, GTN=7.5, lab=10
        // ZonedDateTime bpDateTime_9																// appStartDateTime + 47 minutes 	i=8, GTN=7.5, lab=20
        // ZonedDateTime bpDateTime_10																// appStartDateTime + 52 minutes 	i=9, GTN=7.5, lab=40
        // ZonedDateTime bpDateTime_11																// appStartDateTime + 57 minutes 	i=10, GTN=7.5, lab=40
        // ZonedDateTime bpDateTime_12																// appStartDateTime + 62 minutes 	i=11, GTN=7.5, lab=40
        // ZonedDateTime bpDateTime_13																// appStartDateTime + 67 minutes 	i=12, GTN=7.5, lab=40

        ZonedDateTime bpTargetReachedDateTime = getBpTargetReachedDateTime(vitaminkDateTime); // captured automatically as BpManagementEntries are added
        ZonedDateTime referralToNeurosurgeryDateTime = getReferralToNeurosurgeryDateTime(bpTargetReachedDateTime); // random time within 30 minutes after bpTargetReachedDateTime
        
        Patient patient = new Patient();
 
        patient.setOnsetDateTime(onsetDateTime);
        patient.setLastSeenWellOnset(false);
        patient.setBestEstimateOnset(false);
        patient.setDoorDateTime(doorDateTime);
        patient.setScanDateTime(scanDateTime);
        patient.setAppStartDateTime(appStartDateTime);                       
        patient.setBpTargetReachedDateTime(bpTargetReachedDateTime);
        patient.setReversalAgentStartDateTime(reversalAgentStartDateTime);
        patient.setVitaminkDateTime(vitaminkDateTime);

        patient.setUniqueId("Patient_" + (index+1));
        patient.setInitials("PT" + (index+1));
        // patient.setBirthDate(birthDate);
        patient.setEstimatedAge(70);
        patient.setExternalScanHospitalName("Dummy external hospital");
        int gcsEye = ThreadLocalRandom.current().nextInt(1, 4 + 1);
        int gcsVerbal = ThreadLocalRandom.current().nextInt(1, 5 + 1);
        int gcsMotor = ThreadLocalRandom.current().nextInt(1, 6 + 1);
        patient.setGcsScoreEye(gcsEye);
        patient.setGcsScoreVerbal(gcsVerbal);
        patient.setGcsScoreMotor(gcsMotor);
        patient.setGcsScore(gcsEye + gcsVerbal + gcsMotor);
         
        patient.setAnticoagulantName("Warfarin");
        patient.setAnticoagulantType(AnticoagulantType.VITK);
        //cjd patient.setReversalAgentAdministeredAtExternalHospital(true);
        //cjd patient.setReversalAgentAdministeredTimeKnown(true);
        //cjd patient.setAdministerBeriplexWithoutInr(true);

        patient.setEstimatedWeightInKg(75.0f);
        patient.setCalculatedBeriplexDose(3500);
        patient.setActualBeriplexDose(3500);
        patient.setInfusionInstructionsViewed(true);
        patient.setReversalAgentType(ReversalAgentType.NONE);

        patient.setBpTreatmentThreshold(200);//cjd
        patient.setBpTarget(180);//cjd

        patient.setPremorbidMrsScore(ThreadLocalRandom.current().nextInt(0, 5 + 1));
        patient.setPosteriorFossaIch(ThreadLocalRandom.current().nextBoolean());
        patient.setVentricleObstructed(ThreadLocalRandom.current().nextBoolean());
        patient.setIchVolume(ThreadLocalRandom.current().nextInt(20, 40 + 1) * 1.0f);
        
        boolean isReferredToNeurosurgery = ThreadLocalRandom.current().nextBoolean();
        if (isReferredToNeurosurgery) {
        	patient.setReferralToNeurosurgeryDateTime(referralToNeurosurgeryDateTime);
        	patient.setNeurosurgeonName("Dummy neurosurgeon name");
        	patient.setReferralToNeurosurgeryAccepted(ThreadLocalRandom.current().nextBoolean());
            patient.setReferredToCriticalCare(true);      	
        }
        else {
            patient.setReferredToCriticalCare(false);
        }
        
        patient.setHospital(hospital);
         
      	patient.setInrValue(6.1f);
      	patient.setInrType(InrType.POINT_OF_CARE);
      	patient.setInrDateTime(getInrDateTime(appStartDateTime));

        patient = patientRepository.save(patient);

      	for (int i = 0; i < 12; i++) {
      		addBpManagementEntry(i, patient, vitaminkDateTime);
      	}
      
    }
    
	private ZonedDateTime getPastRandomDateTimeWithinOneYear(ZonedDateTime referenceDateTime) {
		
		// Generate a random date-time within a year of the supplied reference date-time 
		return getPastRandomDateTimeWithinAnIntervalOfReferenceDateTime(referenceDateTime, MILLISECONDS_PER_YEAR);
	}
	
	private ZonedDateTime getOnsetDateTime(ZonedDateTime doorDateTime) {

		// Generate a random onset date-time within a day of the door date-time 
		return getPastRandomDateTimeWithinAnIntervalOfReferenceDateTime(doorDateTime, MILLISECONDS_PER_DAY);
	}

	private ZonedDateTime getScanDateTime(ZonedDateTime doorDateTime) {

		// Generate a random date-time between 30 minutes and  1 hour of the door date-time
		long MILLISECONDS_PER_30_MINUTES = 30 * MILLISECONDS_PER_MINUTE;
		ZonedDateTime doorDateTimePlus30 = addIntervalToDateTime(doorDateTime, MILLISECONDS_PER_30_MINUTES);
		return getFutureRandomDateTimeWithinAnIntervalOfReferenceDateTime(doorDateTimePlus30, MILLISECONDS_PER_30_MINUTES);
	}

	private ZonedDateTime getAppStartDateTime(ZonedDateTime scanDateTime) {

		// Hard code the app start time to be 5 minutes after the scan time for now!
		long MILLISECONDS_PER_5_MINUTES = 5 * MILLISECONDS_PER_MINUTE;
		return addIntervalToDateTime(scanDateTime, MILLISECONDS_PER_5_MINUTES);
	}

	private ZonedDateTime getReversalAgentStartDateTime(ZonedDateTime appStartDateTime) {

		// Hard code the reversal agent start time to be 5 minutes after the app start time for now!
		long MILLISECONDS_PER_5_MINUTES = 5 * MILLISECONDS_PER_MINUTE;
		return addIntervalToDateTime(appStartDateTime, MILLISECONDS_PER_5_MINUTES);
	}

	private ZonedDateTime getVitaminkDateTime(ZonedDateTime reversalAgentStartDateTime) {

		// Hard code the vitamink time to be 1 minute after the reversal agent start time for now!
		return addIntervalToDateTime(reversalAgentStartDateTime, MILLISECONDS_PER_MINUTE);
	}

	private ZonedDateTime getInrDateTime(ZonedDateTime appStartDateTime) {
		
		return addIntervalToDateTime(appStartDateTime, MILLISECONDS_PER_MINUTE);
	}

	private ZonedDateTime getBpDateTime(ZonedDateTime vitaminkDateTime, int index) {
		
		long numMinutes = 1L;
		if (index > 0) {
			numMinutes += (long)(index * 5);
		}
		
		long interval = numMinutes * MILLISECONDS_PER_MINUTE;
		return addIntervalToDateTime(vitaminkDateTime, interval);
	}

	private ZonedDateTime getBpTargetReachedDateTime(ZonedDateTime vitaminkDateTime) {

		// Generate a random date-time up to 300 minutes after the vitamink date-time
		long MILLISECONDS_PER_300_MINUTES = 300 * MILLISECONDS_PER_MINUTE;
		return getFutureRandomDateTimeWithinAnIntervalOfReferenceDateTime(vitaminkDateTime, MILLISECONDS_PER_300_MINUTES);
	}

	private ZonedDateTime getReferralToNeurosurgeryDateTime(ZonedDateTime bpTargetReachedDateTime) {

		// Generate a random date-time up to 30 minutes after the vitamink date-time
		long MILLISECONDS_PER_30_MINUTES = 30 * MILLISECONDS_PER_MINUTE;
		return getFutureRandomDateTimeWithinAnIntervalOfReferenceDateTime(bpTargetReachedDateTime, MILLISECONDS_PER_30_MINUTES);
	}

	private Integer getSbp(int index) {
		
		Integer sbp = null;
		switch(index) {
		
		case 0:
			sbp = 210;
			break;			
		case 1:
			sbp = 205;
			break;			
		case 2:
			sbp = 200;
			break;			
		case 3:
			sbp = 195;
			break;			
		case 4:
			sbp = 190;
			break;			
		case 5:
			sbp = 185;
			break;			
		case 6:
			sbp = 180;
			break;			
		case 7:
			sbp = 175;
			break;			
		case 8:
			sbp = 170;
			break;			
		case 9:
			sbp = 165;
			break;			
		case 10:
			sbp = 160;
			break;			
		case 11:
			sbp = 155;
			break;			
		case 12:
			sbp = 150;
			break;			
		default:
			sbp = 150;
			break;
		
		}
		
		return sbp;
	}

	private Integer getDbp(int index) {
		Integer dbp = null;
		switch(index) {
		
		case 0:
			dbp = 210;
			break;			
		case 1:
			dbp = 205;
			break;			
		case 2:
			dbp = 200;
			break;			
		case 3:
			dbp = 195;
			break;			
		case 4:
			dbp = 190;
			break;			
		case 5:
			dbp = 185;
			break;			
		case 6:
			dbp = 180;
			break;			
		case 7:
			dbp = 175;
			break;			
		case 8:
			dbp = 170;
			break;			
		case 9:
			dbp = 165;
			break;			
		case 10:
			dbp = 160;
			break;			
		case 11:
			dbp = 155;
			break;			
		case 12:
			dbp = 150;
			break;			
		default:
			dbp = 150;
			break;
		
		}
		
		return dbp;
	}

	private Float getGtnRate(int index) {
		
		Float gtnRate = null;
		switch(index) {
		
		case 0:
			gtnRate = 1.5f;
			break;			
		case 1:
			gtnRate = 2.5f;
			break;			
		case 2:
			gtnRate = 3.5f;
			break;			
		case 3:
			gtnRate = 4.5f;
			break;			
		case 4:
			gtnRate = 5.5f;
			break;			
		case 5:
			gtnRate = 6.5f;
			break;			
		case 6:
			gtnRate = 7.5f;
			break;			
		default:
			gtnRate = 7.5f;
			break;
		
		}
		
		return gtnRate;
	}

	private Integer getLabetalolDose(int index) {
		
		Integer labetalolDose = null;

		switch(index) {
		
		case 6:
			labetalolDose = 10;
			break;			
		case 7:
			labetalolDose = 10;
			break;			
		case 8:
			labetalolDose = 20;
			break;			
		case 9:
			labetalolDose = 40;
			break;			
		case 10:
			labetalolDose = 40;
			break;			
		case 11:
			labetalolDose = 40;
			break;			
		case 12:
			labetalolDose = 40;
			break;			
		default:
			labetalolDose = null;
			break;
		
		}
		
		return labetalolDose;
	}

	private void addBpManagementEntry(int index, Patient patient, ZonedDateTime vitaminkDateTime) {
		
      	BpManagementEntry bpManagementEntry = new BpManagementEntry();
      	bpManagementEntry.setPatient(patient);
      	bpManagementEntry.setDateTime(getBpDateTime(vitaminkDateTime, index));
      	bpManagementEntry.setSystolicBp(getSbp(index));
      	bpManagementEntry.setDiastolicBp(getDbp(index));
      	bpManagementEntry.setGtnRate(getGtnRate(index));
      	bpManagementEntry.setLabetalolDose(getLabetalolDose(index));
      	bpManagementEntry.setHeartRate(80);
      	
      	bpManagementEntryRepository.save(bpManagementEntry);
	}

	private ZonedDateTime getPastRandomDateTimeWithinAnIntervalOfReferenceDateTime(ZonedDateTime referenceDateTime, long intervalInMilliseconds) {

		long offset = Math.abs(ThreadLocalRandom.current().nextLong()) % intervalInMilliseconds;
		
		Instant instant = Instant.ofEpochMilli(referenceDateTime.toInstant().toEpochMilli() - offset);
		ZonedDateTime dateTime = ZonedDateTime.ofInstant(instant, ZoneId.of("UTC") ) ;

		return dateTime;
	}

	private ZonedDateTime getFutureRandomDateTimeWithinAnIntervalOfReferenceDateTime(ZonedDateTime referenceDateTime, long intervalInMilliseconds) {

		long offset = Math.abs(ThreadLocalRandom.current().nextLong()) % intervalInMilliseconds;
		
		Instant instant = Instant.ofEpochMilli(referenceDateTime.toInstant().toEpochMilli() + offset);
		ZonedDateTime dateTime = ZonedDateTime.ofInstant(instant, ZoneId.of("UTC") ) ;

		return dateTime;
	}

	private ZonedDateTime addIntervalToDateTime(ZonedDateTime referenceDateTime, long intervalInMilliseconds) {

		Instant instant = Instant.ofEpochMilli(referenceDateTime.toInstant().toEpochMilli() + intervalInMilliseconds);
		ZonedDateTime dateTime = ZonedDateTime.ofInstant(instant, ZoneId.of("UTC") ) ;

		return dateTime;
	}


}
