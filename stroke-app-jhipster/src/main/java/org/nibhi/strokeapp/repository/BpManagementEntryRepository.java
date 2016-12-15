package org.nibhi.strokeapp.repository;

import org.nibhi.strokeapp.domain.BpManagementEntry;
import org.nibhi.strokeapp.domain.Patient;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the BpManagementEntry entity.
 */
@SuppressWarnings("unused")
public interface BpManagementEntryRepository extends JpaRepository<BpManagementEntry,Long> {

	  List<BpManagementEntry> findByPatient(Patient patient);
}
