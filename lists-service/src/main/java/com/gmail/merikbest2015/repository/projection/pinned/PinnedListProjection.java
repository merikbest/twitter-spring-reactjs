package com.gmail.merikbest2015.repository.projection.pinned;

import com.gmail.merikbest2015.commons.projection.ImageProjection;

public interface PinnedListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    ImageProjection getWallpaper();
    boolean getIsPrivate();
}
