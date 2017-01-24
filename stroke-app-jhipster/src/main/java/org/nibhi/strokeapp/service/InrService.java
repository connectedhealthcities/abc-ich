package org.nibhi.strokeapp.service;

import org.nibhi.strokeapp.service.dto.InrDTO;

import java.util.LinkedList;
import java.util.List;

/**
 * Service Interface for managing Inr.
 */
public interface InrService {

    /**
     *  Get the "id" inr.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    InrDTO findOne(Long id);
}
