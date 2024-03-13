package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Poll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {

    @Query("""
            SELECT poll FROM Poll poll
            LEFT JOIN poll.pollChoices pollChoice
            WHERE poll.id = :pollId
            AND pollChoice.id = :pollChoiceId
            """)
    Optional<Poll> getPollByPollChoiceId(@Param("pollId") Long pollId, @Param("pollChoiceId") Long pollChoiceId);
}
