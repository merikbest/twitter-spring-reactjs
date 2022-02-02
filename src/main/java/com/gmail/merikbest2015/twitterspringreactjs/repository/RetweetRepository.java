package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Retweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RetweetRepository extends JpaRepository<Retweet, Long> {

    @Query("SELECT retweet FROM Retweet retweet WHERE retweet.user.id = :userId ORDER BY retweet.retweetDate DESC")
    List<Retweet> findRetweetsByUserId(Long userId);
}
