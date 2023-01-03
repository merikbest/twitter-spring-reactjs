package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.commons.enums.LinkCoverSize;
import com.gmail.merikbest2015.commons.enums.ReplyType;
import com.gmail.merikbest2015.commons.models.Image;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetRequest {
    private Long id;
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
