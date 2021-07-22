package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import lombok.Data;

import java.util.List;

@Data
public class TweetRequest {
    private Long id;
    private String text;
    private String addressedUsername;
    private Long addressedId;
    private List<Image> images;
    private List<UserRequest> likes;
    private List<UserResponse> retweets;
}
