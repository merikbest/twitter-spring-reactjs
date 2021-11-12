package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.LinkCoverSize;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetRequest {
    private String text;
    private String addressedUsername;
    private Long addressedId;
    private ReplyType replyType;
    private LinkCoverSize linkCoverSize;
    private List<Image> images;
    private Long pollDateTime;
    private List<String> choices;
    private LocalDateTime scheduledDate;
}
