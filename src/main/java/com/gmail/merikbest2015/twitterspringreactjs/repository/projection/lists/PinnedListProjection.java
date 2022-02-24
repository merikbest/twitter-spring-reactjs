package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;

import java.time.LocalDateTime;

public interface PinnedListProjection {
    Long getId();
    String getName();
    LocalDateTime getPinnedDate();
    String getAltWallpaper();
    ImageProjection getWallpaper();
    boolean getIsPrivate();
}
