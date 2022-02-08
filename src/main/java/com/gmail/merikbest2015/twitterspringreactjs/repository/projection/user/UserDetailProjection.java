package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user;

import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.ImageProjection;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

public interface UserDetailProjection extends BaseUserProjection {
    @Value("#{target.followers.size()}")
    Integer getFollowersSize();

    @Value("#{target.following.size()}")
    Integer getFollowingSize();

    List<SameFollower> sameFollowers();

    interface SameFollower {
        Long getId();
        String getFullName();
        ImageProjection getAvatar();
    }
}
