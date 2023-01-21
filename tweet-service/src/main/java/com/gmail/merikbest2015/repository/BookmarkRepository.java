package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Bookmark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT CASE WHEN count(bookmark) > 0 THEN true ELSE false END " +
            "FROM Bookmark bookmark " +
            "WHERE bookmark.userId = :userId " +
            "AND bookmark.tweetId = :tweetId")
    boolean isUserBookmarkedTweet(@Param("userId") Long userId, @Param("tweetId") Long tweetId);
}
