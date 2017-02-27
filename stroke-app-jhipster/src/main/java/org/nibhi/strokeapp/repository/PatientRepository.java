package org.nibhi.strokeapp.repository;

import org.nibhi.strokeapp.domain.Hospital;
import org.nibhi.strokeapp.domain.Patient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Patient entity.
 */
@SuppressWarnings("unused")
public interface PatientRepository extends JpaRepository<Patient,Long> {
	
	Page<Patient> findAllByHospital(Pageable pageable, Hospital hospital);
	List<Patient> findAllByHospital(Hospital hospital);
	List<Patient> findAllByUniqueIdStartingWith(String startingWith);
}
