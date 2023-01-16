package com.gmail.merikbest2015.commons.projection.commons_new;

import com.gmail.merikbest2015.commons.projection.ImageProjection;

public interface ListOwnerProjection {
    Long getId();
    String getFullName();
    String getUsername();
    ImageProjection getAvatar();
}
