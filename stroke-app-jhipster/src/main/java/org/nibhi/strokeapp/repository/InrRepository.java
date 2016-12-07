package org.nibhi.strokeapp.repository;

import org.nibhi.strokeapp.domain.Inr;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Inr entity.
 */
@SuppressWarnings("unused")
public interface InrRepository extends JpaRepository<Inr,Long> {

}
