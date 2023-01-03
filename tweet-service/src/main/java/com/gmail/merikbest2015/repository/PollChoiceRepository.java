package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.models.PollChoice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollChoiceRepository extends JpaRepository<PollChoice, Long> {
}
