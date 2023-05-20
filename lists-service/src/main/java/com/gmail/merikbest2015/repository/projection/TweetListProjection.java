package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import org.springframework.beans.factory.annotation.Value;

public interface TweetListProjection {
    Long getId();
    String getName();
    String getAltWallpaper();
    String getWallpaper();
    Long getListOwnerId();
    boolean getIsPrivate();

    @Value("#{@listsServiceHelper.getListOwnerById(target.listOwnerId)}")
    CommonUserResponse getListOwner();

    @Value("#{@listsMembersRepository.getMembersSize(target.id)}")
    Long getMembersSize();
}
