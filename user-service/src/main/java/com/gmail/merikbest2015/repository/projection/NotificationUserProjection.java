package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface NotificationUserProjection {
    Long getId();
    String getUsername();
    String getFullName();
    String getAvatar();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
