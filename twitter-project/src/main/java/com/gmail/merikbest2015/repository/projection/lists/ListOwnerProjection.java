package com.gmail.merikbest2015.repository.projection.lists;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

public interface ListOwnerProjection {
    Long getId();
    String getFullName();
    String getUsername();
    ImageProjection getAvatar();
}
