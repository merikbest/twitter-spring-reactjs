package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.event.*;
import com.gmail.merikbest2015.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProducerMapper {

    private final BasicMapper basicMapper;

    public UpdateUserEvent toUpdateUserEvent(User user) {
        return basicMapper.convertToResponse(user, UpdateUserEvent.class);
    }

    public BlockUserEvent toBlockUserEvent(User user, boolean hasUserBlocked) {
        BlockUserEvent blockUserEvent = basicMapper.convertToResponse(user, BlockUserEvent.class);
        blockUserEvent.setUserBlocked(hasUserBlocked);
        return blockUserEvent;
    }

    public FollowRequestUserEvent toFollowRequestUserEvent(User user, boolean hasUserFollowRequest) {
        FollowRequestUserEvent followRequestUserEvent = basicMapper.convertToResponse(user, FollowRequestUserEvent.class);
        followRequestUserEvent.setUserFollowRequest(hasUserFollowRequest);
        return followRequestUserEvent;
    }

    public FollowUserNotificationEvent toUserNotificationEvent(User authUser, User notifiedUser) {
        return FollowUserNotificationEvent.builder()
                .user(toUserDto(authUser))
                .userToFollow(toUserDto(notifiedUser))
                .notifiedUser(toUserDto(notifiedUser))
                .build();
    }

    public FollowUserEvent toFollowUserEvent(User user, boolean hasUserFollowed) {
        FollowUserEvent followUserEvent = basicMapper.convertToResponse(user, FollowUserEvent.class);
        followUserEvent.setUserFollow(hasUserFollowed);
        return followUserEvent;
    }

    public MuteUserEvent toMuteUserEvent(User user, boolean hasUserMuted) {
        MuteUserEvent muteUserEvent = basicMapper.convertToResponse(user, MuteUserEvent.class);
        muteUserEvent.setUserMuted(hasUserMuted);
        return muteUserEvent;
    }

    public TweetSubscriberNotificationEvent toTweetSubscriberNotificationEvent(TweetSubscriberNotificationEvent notificationEvent,
                                                                               List<User> subscribers) {
        List<UserNotificationDto> subscribersDto = subscribers.stream()
                .map(this::toUserDto)
                .toList();
        notificationEvent.setSubscribers(subscribersDto);
        return notificationEvent;
    }

    private UserNotificationDto toUserDto(User user) {
        return basicMapper.convertToResponse(user, UserNotificationDto.class);
    }
}
