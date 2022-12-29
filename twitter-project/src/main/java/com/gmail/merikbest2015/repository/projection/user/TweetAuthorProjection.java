package com.gmail.merikbest2015.repository.projection.user;

import com.gmail.merikbest2015.repository.projection.ImageProjection;

public interface TweetAuthorProjection {
    AuthorProjection getTweetAuthor();

    interface AuthorProjection {
        Long getId();
        String getUsername();
        String getFullName();
        ImageProjection getAvatar();
    }
}
