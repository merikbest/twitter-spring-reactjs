package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.PollChoiceVoted;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PollChoiceVotedRepository extends JpaRepository<PollChoiceVoted, Long> {
}
