package com.gmail.merikbest2015.repository.projection.lists;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

public interface ListMemberProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ImageProjection getAvatar();
    boolean getIsPrivateProfile();
}
