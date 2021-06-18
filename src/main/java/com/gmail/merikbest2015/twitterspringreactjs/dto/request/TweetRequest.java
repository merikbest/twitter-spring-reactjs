package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import lombok.Data;

import java.util.List;

@Data
public class TweetRequest {
    private String text;
    private List<Image> images;
}
