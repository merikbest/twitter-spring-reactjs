package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

import org.springframework.beans.factory.annotation.Value;

public interface UserSubscribersProjection {
    Long getId();
    String getEmail();
    String getUsername();
    String getFullName();

    @Value("#{target.followers.size()}")
    Long getFollowers();

    @Value("#{target.following.size()}")
    Long getFollowings();
}
