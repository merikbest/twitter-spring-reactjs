package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    List<Tweet> findAllByOrderByDateTimeDesc();

    List<Tweet> findAllByUser(User user);

    List<Tweet> findAllByTextContaining(String text);

    List<Tweet> findAllByUserOrderByDateTimeDesc(User user);
}
