package com.gmail.merikbest2015.twitterspringreactjs.dto.response.chat;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatTweetResponse {
    private Long id;
    private String text;
    private LocalDateTime dateTime;
    private String link;
    private String linkTitle;
    private String linkDescription;
    private String linkCover;
    private LinkCoverSize linkCoverSize;
    private ChatParticipantResponse user;
    private List<ImageResponse> images;
}
