package com.gmail.merikbest2015.twitterspringreactjs.dto.request;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class RetweetRequest {
    private Long id;
    private LocalDateTime retweetDate;
    private Tweet tweet;
    private List<User> users;
}
