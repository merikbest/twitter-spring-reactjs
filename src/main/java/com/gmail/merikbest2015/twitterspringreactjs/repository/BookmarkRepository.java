package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Bookmark;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.BookmarkProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {

    @Query("SELECT bookmark FROM Bookmark bookmark WHERE bookmark.user.id = :userId ORDER BY bookmark.bookmarkDate DESC")
    Page<BookmarkProjection> findByUser(Long userId, Pageable pageable);
}
