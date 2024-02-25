package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.model.User;
import org.springframework.beans.factory.annotation.Value;

public interface ListProjection {
    Long getId();
    String getListName();
    String getDescription();
    String getAltWallpaper();
    String getWallpaper();
    User getListOwner();

    @Value("#{@listsServiceHelper.isMyProfileFollowList(target.id)}")
    boolean getIsFollower();

    @Value("#{@listsServiceHelper.isListPinned(target.id)}")
    boolean getIsListPinned();
}
