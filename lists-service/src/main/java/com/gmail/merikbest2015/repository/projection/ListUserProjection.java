package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.response.lists.ListOwnerResponse;
import org.springframework.beans.factory.annotation.Value;

public interface ListUserProjection {
    Long getId();
    String getName();
    String getDescription();
    String getAltWallpaper();
    String getWallpaper();
    Long getListOwnerId();
    boolean getIsPrivate();

    @Value("#{@listsServiceHelper.getListOwnerById(target.listOwnerId)}")
    ListOwnerResponse getListOwner();

    @Value("#{@listsServiceHelper.isListPinned(target.id)}")
    boolean getIsListPinned();
}
