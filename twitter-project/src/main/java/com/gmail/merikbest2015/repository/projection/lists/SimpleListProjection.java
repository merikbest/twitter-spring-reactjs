package com.gmail.merikbest2015.repository.projection.lists;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

public interface SimpleListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    ImageProjection getWallpaper();
    boolean getIsPrivate();
}
