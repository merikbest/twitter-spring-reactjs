package com.gmail.merikbest2015.repository.projection;

import com.gmail.merikbest2015.model.User;
import org.springframework.beans.factory.annotation.Value;

public interface TweetListProjection {
    Long getId();
    String getListName();
    String getAltWallpaper();
    String getWallpaper();
    boolean getIsPrivate();
    User getListOwner();

    @Value("#{@listsRepository.getMembersSize(target.id)}")
    Long getMembersSize();
}
