package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TweetRepository extends JpaRepository<Tweet, Long> {

    Page<Tweet> findByAddressedUsernameIsNullOrderByDateTimeDesc(Pageable pageable);

    List<Tweet> findAllByUser(User user);

    List<Tweet> findByScheduledDateLessThanEqual(LocalDateTime scheduledDate);

    List<Tweet> findByUserAndScheduledDateIsNotNullOrderByScheduledDateDesc(User user);

    List<Tweet> findAllByTextIgnoreCaseContaining(String text);

    Page<Tweet> findAllByTextIgnoreCaseContaining(String text, Pageable pageable);

    List<Tweet> findByAddressedUsernameIsNullAndUserOrderByDateTimeDesc(User user);

    Page<Tweet> findByImagesIsNotNullOrderByDateTimeDesc(Pageable pageable);

    Page<Tweet> findByImagesIsNotNullAndUser_IdOrderByDateTimeDesc(Long userId, Pageable pageable);

    List<Tweet> findByQuoteTweet_Id(Long id);

    List<Tweet> findByUserAndAddressedUsernameIsNullOrderByDateTimeDesc(User user);

    List<Tweet> findByUserAndAddressedUsernameIsNotNullOrderByDateTimeDesc(User user);
}
