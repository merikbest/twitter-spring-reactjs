package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

public interface NotificationUserProjection {
    Long getId();
    String getUsername();
    String getFullName();
    ImageProjection getAvatar();

    @Value("#{@userServiceImpl.isUserFollowByOtherUser(target.id)}")
    boolean getIsFollower();
}
