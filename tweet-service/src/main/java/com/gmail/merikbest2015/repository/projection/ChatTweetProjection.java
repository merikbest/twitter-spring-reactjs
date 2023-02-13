package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;

public interface ChatTweetProjection {

    @Value("#{target.isDeleted ? null : target.id}")
    Long getId();

    @Value("#{target.isDeleted ? null : target.text}")
    String getText();

    @Value("#{target.isDeleted ? null : target.dateTime}")
    LocalDateTime getDateTime();

    @Value("#{target.isDeleted ? null : @tweetProjectionHelper.getChatTweetUser(target.authorId)}")
    ChatTweetUserResponse getUser();

    Long getAuthorId();

    boolean isDeleted();
}
