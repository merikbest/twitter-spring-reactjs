package com.gmail.merikbest2015.twitterspringreactjs.dto.response.projection.chats;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ChatMessageProjectionResponse {
    private Long id;
    private String text;
    private LocalDateTime date;
    private ChatAuthorProjectionResponse author;
    private ChatTweetProjectionResponse tweet;
    @JsonIgnore
    private List<Long> chatParticipantsIds;

    @Getter
    @Setter
    static class ChatAuthorProjectionResponse {
        private Long id;
    }

    @Getter
    @Setter
    static class ChatTweetProjectionResponse {
        private Long id;
        private String text;
        private LocalDateTime dateTime;
        private TweetUserProjectionResponse user;

        @Getter
        @Setter
        static class TweetUserProjectionResponse {
            private Long id;
            private String fullName;
            private String username;
            private ImageProjection avatar;
        }
    }
}
