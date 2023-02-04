package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MuteUserService {

    Page<MutedUserProjection> getMutedList(Pageable pageable);

    Boolean processMutedList(Long userId);
}
