package org.nibhi.strokeapp.repository;

import org.nibhi.strokeapp.domain.BpManagementEntry;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the BpManagementEntry entity.
 */
@SuppressWarnings("unused")
public interface BpManagementEntryRepository extends JpaRepository<BpManagementEntry,Long> {

}
