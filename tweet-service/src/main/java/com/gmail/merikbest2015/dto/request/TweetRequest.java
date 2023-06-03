package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.dto.response.TweetImageResponse;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.ReplyType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class TweetRequest {
    private Long id;
    private String text;
    private String addressedUsername;
    private Long addressedId;
    private Long listId;
    private ReplyType replyType;
    private LinkCoverSize linkCoverSize;
    private GifImageRequest gifImage;
    private List<TweetImageResponse> images;
    private String imageDescription;
    private List<Long> taggedImageUsers;
    private Long pollDateTime;
    private List<String> choices;
    private LocalDateTime scheduledDate;

    @Data
    static class GifImageRequest {
        private Long id;
        private String url;
        private Long width;
        private Long height;
    }
}
