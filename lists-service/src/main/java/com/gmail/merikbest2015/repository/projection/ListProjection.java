package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.lists.ListOwnerResponse;
import org.springframework.beans.factory.annotation.Value;

public interface ListProjection {
    Long getId();
    String getName();
    String getDescription();
    String getAltWallpaper();
    String getWallpaper();
    Long getListOwnerId();

    @Value("#{@listsServiceImpl.getListOwnerById(target.listOwnerId)}")
    ListOwnerResponse getListOwner();

    @Value("#{@listsServiceImpl.isMyProfileFollowList(target.id)}")
    boolean getIsFollower();
}
