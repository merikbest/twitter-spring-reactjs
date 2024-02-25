package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.model.User;
import org.springframework.beans.factory.annotation.Value;

public interface BaseListProjection {
    Long getId();
    String getListName();
    String getDescription();
    String getAltWallpaper();
    String getWallpaper();
    User getListOwner();
    boolean getIsPrivate();

    @Value("#{@listsMembersRepository.getMembersSize(target.id)}")
    Long getMembersSize();

    @Value("#{@listsFollowersRepository.getFollowersSize(target.id)}")
    Long getFollowersSize();

    @Value("#{@listsServiceHelper.isMyProfileFollowList(target.id)}")
    boolean getIsFollower();
}
