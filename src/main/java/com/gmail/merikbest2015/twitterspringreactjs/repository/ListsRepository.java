package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Lists;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.TweetsProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.lists.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ListsRepository extends JpaRepository<Lists, Long> {

    @Query("SELECT l as list FROM Lists l WHERE l.isPrivate = false")
    List<ListsProjection> getAllTweetLists();

    @Query("SELECT l as list FROM Lists l LEFT JOIN l.listOwner listOwner WHERE listOwner.id = :ownerId")
    List<ListsUserProjection> getUserTweetLists(Long ownerId);

    @Query("SELECT l FROM Lists l WHERE l.id = :listId")
    ListUserProjection getUserTweetListById(Long listId);

    List<Lists> findByListOwner_Id(Long id);

    Optional<Lists> findByIdAndIsPrivateFalse(Long id);

    @Query("SELECT l as pinnedList FROM Lists l " +
            "WHERE l.listOwner.id = :userId " +
            "AND l.pinnedDate IS NOT NULL " +
            "ORDER BY l.pinnedDate DESC")
    List<PinnedListsProjection> getUserPinnedLists(Long userId);

    @Query("SELECT t as tweet FROM Lists l " +
            "LEFT JOIN l.members m " +
            "LEFT JOIN m.tweets t " +
            "WHERE l.id = :listId " +
            "AND t.addressedUsername IS NULL " +
            "ORDER BY t.dateTime DESC")
    List<TweetsProjection> getTweetsByListId(Long listId);

    @Query("SELECT lists FROM Lists lists " +
            "LEFT JOIN lists.followers listsFollower " +
            "WHERE lists.id = :listId AND listsFollower.id = :userId " +
            "OR lists.id = :listId AND lists.isPrivate = false " +
            "OR lists.id = :listId AND lists.listOwner.id = :userId")
    Optional<BaseListProjection> getListById(Long listId, Long userId);

    @Query("SELECT CASE WHEN count(follower) > 0 THEN true ELSE false END FROM Lists list " +
            "LEFT JOIN list.followers follower " +
            "WHERE list.id = :listId " +
            "AND follower.id = :userId")
    boolean isMyProfileFollowList(Long listId, Long userId);

    @Query("SELECT l as list FROM Lists l WHERE l.listOwner.id = :ownerId AND l.isPrivate = false")
    List<ListsProjection> findByListOwnerIdAndIsPrivateFalse(Long ownerId);

    @Query("SELECT l as list FROM Lists l LEFT JOIN l.members m WHERE m.id = :userId")
    List<ListsProjection> findByMembers_Id(Long userId);
}
