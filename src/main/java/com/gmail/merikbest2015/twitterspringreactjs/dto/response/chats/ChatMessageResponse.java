package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatMessageResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private ChatAuthorResponse author;
    private ChatTweetResponse tweet;
    private ChatResponse chat;

    @JsonIgnore
    private List<Long> chatParticipantsIds;

    @Getter
    @Setter
    static class ChatAuthorResponse {
        private Long id;
    }

    @Getter
    @Setter
    static class ChatTweetResponse {
        private Long id;
        private String text;
        private LocalDateTime dateTime;
        private TweetUserResponse user;

        @Getter
        @Setter
        static class TweetUserResponse {
            private Long id;
            private String fullName;
            private String username;
            private ImageProjection avatar;
        }
    }

    @Getter
    @Setter
    static class ChatResponse {
        private Long id;
    }
}
