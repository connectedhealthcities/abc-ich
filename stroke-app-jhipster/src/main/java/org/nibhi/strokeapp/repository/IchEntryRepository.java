package org.nibhi.strokeapp.repository;

import org.nibhi.strokeapp.domain.IchEntry;
import org.nibhi.strokeapp.domain.Patient;
import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the IchEntry entity.
 */
public interface IchEntryRepository extends JpaRepository<IchEntry,Long> {

	List<IchEntry> findAll();

	List<IchEntry> findByPatient(Patient patient);
}
