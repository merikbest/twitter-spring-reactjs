package com.gmail.merikbest2015.repository.projection.pinned;

import com.gmail.merikbest2015.repository.projection.ListsWallpaperProjection;

public interface PinnedListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    ListsWallpaperProjection getWallpaper();
    boolean getIsPrivate();
}
