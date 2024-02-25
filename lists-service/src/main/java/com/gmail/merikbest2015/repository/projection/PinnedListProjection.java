package com.gmail.merikbest2015.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface PinnedListProjection {
    Long getId();
    String getListName();
    String getAltWallpaper();
    String getWallpaper();
    boolean getIsPrivate();

    @Value("#{@listsServiceHelper.isListPinned(target.id)}")
    boolean getIsListPinned();
}
