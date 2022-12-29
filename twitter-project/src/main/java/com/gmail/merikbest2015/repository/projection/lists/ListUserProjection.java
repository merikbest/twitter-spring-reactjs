package com.gmail.merikbest2015.repository.projection.lists;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

import java.time.LocalDateTime;

public interface ListUserProjection {
    Long getId();
    String getName();
    String getDescription();
    LocalDateTime getPinnedDate();
    String getAltWallpaper();
    ImageProjection getWallpaper();
    ListOwnerProjection getListOwner();
    boolean getIsPrivate();
}
