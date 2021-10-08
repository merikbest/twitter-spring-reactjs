package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    List<Tweet> findByAddressedUsernameIsNullOrderByDateTimeDesc();

    List<Tweet> findAllByUser(User user);

    List<Tweet> findAllByTextIgnoreCaseContaining(String text);

    List<Tweet> findByAddressedUsernameIsNullAndUserOrderByDateTimeDesc(User user);

    List<Tweet> findByImagesIsNotNullOrderByDateTimeDesc();

    List<Tweet> findByImagesIsNotNullAndUserOrderByDateTimeDesc(User user);

    List<Tweet> findByQuoteTweet_Id(Long id);
}
