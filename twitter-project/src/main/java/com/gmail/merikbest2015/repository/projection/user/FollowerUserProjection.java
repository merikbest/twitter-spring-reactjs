package com.gmail.merikbest2015.repository.projection.user;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

public interface FollowerUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
}
