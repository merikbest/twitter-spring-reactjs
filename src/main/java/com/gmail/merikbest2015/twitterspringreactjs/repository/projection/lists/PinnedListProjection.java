package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;

public interface PinnedListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    ImageProjection getWallpaper();
}
