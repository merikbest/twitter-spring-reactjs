package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.commons.projection.ImageProjection;
import java.time.LocalDateTime;

public interface PinnedListProjection {
    Long getId();
    String getName();
    LocalDateTime getPinnedDate();
    String getAltWallpaper();
    ImageProjection getWallpaper();
    boolean getIsPrivate();
}
