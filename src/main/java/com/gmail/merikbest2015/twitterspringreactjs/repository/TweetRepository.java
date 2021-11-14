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

    Page<Tweet> findByAddressedUsernameIsNullAndScheduledDateIsNullOrderByDateTimeDesc(Pageable pageable);

    List<Tweet> findAllByUserAndScheduledDateIsNull(User user);

    List<Tweet> findByScheduledDateLessThanEqual(LocalDateTime scheduledDate);

    List<Tweet> findByUserAndScheduledDateIsNotNullOrderByScheduledDateDesc(User user);

    List<Tweet> findAllByScheduledDateIsNullAndTextIgnoreCaseContaining(String text);

    Page<Tweet> findAllByScheduledDateIsNullAndTextIgnoreCaseContaining(String text, Pageable pageable);

    List<Tweet> findByAddressedUsernameIsNullAndUserOrderByDateTimeDesc(User user); // TODO delete?

    Page<Tweet> findByScheduledDateIsNullAndImagesIsNotNullOrderByDateTimeDesc(Pageable pageable);

    Page<Tweet> findByScheduledDateIsNullAndImagesIsNotNullAndUser_IdOrderByDateTimeDesc(Long userId, Pageable pageable);

    List<Tweet> findByQuoteTweet_Id(Long id);

    List<Tweet> findByScheduledDateIsNullAndUserAndAddressedUsernameIsNullOrderByDateTimeDesc(User user);

    List<Tweet> findByUserAndAddressedUsernameIsNotNullOrderByDateTimeDesc(User user);
}
