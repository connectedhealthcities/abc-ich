package org.nibhi.strokeapp.service.mapper;

import org.nibhi.strokeapp.domain.*;
import org.nibhi.strokeapp.service.dto.InrDTO;

import org.mapstruct.*;
import java.util.List;

/**
 * Mapper for the entity Inr and its DTO InrDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface InrMapper {

    InrDTO inrToInrDTO(Inr inr);

    List<InrDTO> inrsToInrDTOs(List<Inr> inrs);

    Inr inrDTOToInr(InrDTO inrDTO);

    List<Inr> inrDTOsToInrs(List<InrDTO> inrDTOs);
}
