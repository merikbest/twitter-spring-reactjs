package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface ChatMessageProjection {
    Long getId();
    String getText();
    LocalDateTime getDate();
    ChatAuthorProjection getAuthor();
    ChatTweetProjection getTweet();
    ChatProjection getChat();

    interface ChatAuthorProjection {
        Long getId();
    }

    interface ChatTweetProjection {
        @Value("#{target.isDeleted ? null : target.id}")
        Long getId();

        @Value("#{target.isDeleted ? null : target.text}")
        String getText();

        @Value("#{target.isDeleted ? null : target.dateTime}")
        LocalDateTime getDateTime();

        @Value("#{target.isDeleted ? null : target.user}")
        TweetUserProjection getUser();

        boolean isDeleted();

        interface TweetUserProjection {
            Long getId();
            String getFullName();
            String getUsername();
            ImageProjection getAvatar();
        }
    }

    interface ChatProjection {
        Long getId();
    }
}
