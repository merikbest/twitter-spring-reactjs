package com.gmail.merikbest2015.repository.projection;

public interface SimpleListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    ListsWallpaperProjection getWallpaper();
    boolean getIsPrivate();
}
