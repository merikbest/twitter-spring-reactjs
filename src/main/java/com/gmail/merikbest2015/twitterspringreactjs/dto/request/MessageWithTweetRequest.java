package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import lombok.Data;

import java.util.List;

@Data
public class MessageWithTweetRequest {
    private String text;
    private Tweet tweet;
    private List<User> users;
}
