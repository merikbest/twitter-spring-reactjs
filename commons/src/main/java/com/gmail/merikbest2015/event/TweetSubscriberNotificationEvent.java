package com.gmail.merikbest2015.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TweetSubscriberNotificationEvent {
    private TweetNotificationDto tweet;
    private UserNotificationDto user;
    private List<UserNotificationDto> subscribers;
}
