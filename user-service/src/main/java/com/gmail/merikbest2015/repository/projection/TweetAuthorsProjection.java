package com.gmail.merikbest2015.repository.projection;

public interface TweetAuthorsProjection {
    AuthorProjection getTweetAuthor();

    interface AuthorProjection {
        Long getId();
        String getUsername();
        String getFullName();
        String getAvatar();
    }
}
