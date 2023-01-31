package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

public interface AuthNotificationUserProjection {
    Long getId();
    String getUsername();
    String getFullName();
    ImageProjection getAvatar();
    @Value("#{false}")
    boolean getIsFollower();
}
