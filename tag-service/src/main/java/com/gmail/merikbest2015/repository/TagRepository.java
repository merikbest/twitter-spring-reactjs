package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    Page<Tag> findByOrderByTweetsQuantityDesc(Pageable pageable);

    List<Tag> findTop5ByOrderByTweetsQuantityDesc();

    Optional<Tag> findByTagName(String tagName);

    @Query("SELECT tag.tagName FROM Tag tag WHERE UPPER(tag.tagName) LIKE UPPER(CONCAT('%',:text,'%'))")
    List<String> getTagsByText(@Param("text") String text);

    @Query("SELECT tag FROM Tag tag WHERE tag.id IN :tagIds")
    List<Tag> getTagsByIds(@Param("tagIds") List<Long> tagIds);

    @Modifying
    @Query("UPDATE Tag tag SET tag.tweetsQuantity = " +
            "CASE WHEN :increaseCount = true THEN (tag.tweetsQuantity + 1) " +
            "ELSE (tag.tweetsQuantity - 1) END " +
            "WHERE tag.id = :tagId")
    void updateTagQuantity(@Param("tagId") Long tagId, @Param("increaseCount") boolean increaseCount);
}
