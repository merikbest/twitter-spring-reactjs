package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByActiveTrueAndIdNot(Long id);

//    @Query("SELECT user FROM User user JOIN FETCH user.bookmarks bookmarks WHERE user.email = :email")
//    @EntityGraph(attributePaths = {"bookmarks", "tweets", "likedTweets", "retweets", "notifications", "tweets",
//            "userLists", "chats", "userMutedList", "userBlockedList", "unreadMessages", "followers", "following",
//            "followerRequests", "subscribers", "tweets"}, type = EntityGraph.EntityGraphType.FETCH)
    @EntityGraph(value = "user-entity-graph", type = EntityGraph.EntityGraphType.LOAD)
    User findByEmail(String email);

    List<User> findByFullNameOrUsernameContainingIgnoreCase(
            @Param("fullName") String fullName,
            @Param("username") String username);

    Optional<User> findByActivationCode(String code);

    Optional<User> findByPasswordResetCode(String code);

    List<User> findTop5ByActiveTrue();

    List<User> findByUnreadMessages_Tweet(Tweet tweet);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.followers follower " +
            "WHERE user.id = :userId " +
            "AND (user.privateProfile = false OR follower.id = :authUserId)")
    Optional<User> getValidUser(Long userId, Long authUserId);
}
