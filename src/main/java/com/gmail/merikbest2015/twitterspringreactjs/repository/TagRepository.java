package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {

    List<Tag> findByOrderByTweetsQuantityDesc();

    List<Tag> findTop5ByOrderByTweetsQuantityDesc();

    Tag findByTagName(String tagName);

    List<Tag> findByTweets_Id(Long id);

    List<Tag> findByTagNameContaining(String tagName);
}
