package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.client.image.ImageClient;
import com.gmail.merikbest2015.client.tweet.TweetClient;
import com.gmail.merikbest2015.client.tweet.TweetPageableRequest;
import com.gmail.merikbest2015.commons.enums.NotificationType;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.commons.models.Bookmark;
import com.gmail.merikbest2015.commons.models.Notification;
import com.gmail.merikbest2015.commons.models.Tweet;
import com.gmail.merikbest2015.commons.models.User;
import com.gmail.merikbest2015.commons.projection.*;
import com.gmail.merikbest2015.commons.repository.LikeTweetRepository;
import com.gmail.merikbest2015.commons.repository.NotificationRepository;
import com.gmail.merikbest2015.commons.repository.RetweetRepository;
import com.gmail.merikbest2015.commons.projection.*;
import com.gmail.merikbest2015.repository.*;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.AuthenticationService;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.support.PagedListHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final BookmarkRepository bookmarkRepository;
    private final RetweetRepository retweetRepository;
    private final LikeTweetRepository likeTweetRepository;
    private final NotificationRepository notificationRepository;
    private final TweetClient tweetClient;
    private final ImageClient imageClient;

    @Override
    public UserProfileProjection getUserById(Long userId) {
        return userRepository.getUserProfileById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<UserProjection> getUsers(Pageable pageable) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return userRepository.findByActiveTrueAndIdNot(userId, pageable);
    }

    @Override
    public List<UserProjection> getRelevantUsers() {
        return userRepository.findTop5ByActiveTrue();
    }

    @Override
    public <T> Page<T> searchUsersByUsername(String text, Pageable pageable, Class<T> type) {
        return userRepository.findByFullNameOrUsername(text, pageable, type);
    }

    @Override
    public Boolean startUseTwitter() {
        Long userId = authenticationService.getAuthenticatedUserId();
        userRepository.updateProfileStarted(userId);
        return true;
    }

    @Override
    public Page<TweetUserProjection> getUserTweets(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        List<TweetUserProjection> tweets = tweetClient.getTweetsByUserId(userId).stream()
                .map(TweetsUserProjection::getTweet)
                .collect(Collectors.toList());
        List<RetweetProjection> retweets = retweetRepository.findRetweetsByUserId(userId).stream()
                .map(RetweetsProjection::getRetweet)
                .collect(Collectors.toList());
        List<TweetUserProjection> userTweets = combineTweetsArrays(tweets, retweets);
        Optional<TweetsUserProjection> pinnedTweet = tweetClient.getPinnedTweetByUserId(userId);

        if (pinnedTweet.isPresent()) {
            boolean isTweetExist = userTweets.removeIf(tweet -> tweet.getId().equals(pinnedTweet.get().getTweet().getId()));

            if (isTweetExist) {
                userTweets.add(0, pinnedTweet.get().getTweet());
            }
        }
        return getPageableTweetProjectionList(pageable, userTweets, tweets.size() + retweets.size());
    }

    @Override
    public Page<LikeTweetProjection> getUserLikedTweets(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        return likeTweetRepository.getUserLikedTweets(userId, pageable);
    }

    @Override
    public Page<TweetProjection> getUserMediaTweets(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        return tweetClient.getAllUserMediaTweets(new TweetPageableRequest(userId, pageable));
    }

    @Override
    public Page<TweetUserProjection> getUserRetweetsAndReplies(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        List<TweetUserProjection> replies = tweetClient.getRepliesByUserId(userId).stream()
                .map(TweetsUserProjection::getTweet)
                .collect(Collectors.toList());
        List<RetweetProjection> retweets = retweetRepository.findRetweetsByUserId(userId).stream()
                .map(RetweetsProjection::getRetweet)
                .collect(Collectors.toList());
        List<TweetUserProjection> userTweets = combineTweetsArrays(replies, retweets);
        return getPageableTweetProjectionList(pageable, userTweets, replies.size() + retweets.size());
    }

    @Override
    public Page<NotificationProjection> getUserNotifications(Pageable pageable) {
        User user = authenticationService.getAuthenticatedUser();
        user.setNotificationsCount(0L);
        return notificationRepository.getNotificationsByUserId(user.getId(), pageable);
    }

    @Override
    public List<TweetAuthorProjection> getTweetAuthorsNotifications() {
        User user = authenticationService.getAuthenticatedUser();
        user.setNotificationsCount(0L);
        return userRepository.getNotificationsTweetAuthors(user.getId());
    }

    @Override
    public NotificationInfoProjection getUserNotificationById(Long notificationId) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return notificationRepository.getUserNotificationById(userId, notificationId)
                .orElseThrow(() -> new ApiRequestException("Notification not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<TweetProjection> getUserMentions(Pageable pageable) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return tweetClient.getUserMentions(new TweetPageableRequest(userId, pageable));
    }

    @Override
    public Page<TweetsProjection> getNotificationsFromTweetAuthors(Pageable pageable) {
        Long userId = authenticationService.getAuthenticatedUserId();
        List<TweetsProjection> tweets = tweetClient.getNotificationsFromTweetAuthors(userId);
        return getPageableTweetProjectionList(pageable, tweets, tweets.size());
    }

    @Override
    public Page<BookmarkProjection> getUserBookmarks(Pageable pageable) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return bookmarkRepository.getUserBookmarks(userId, pageable);
    }

    @Override
    @Transactional
    public Boolean processUserBookmarks(Long tweetId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetClient.getTweetById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        List<Bookmark> bookmarks = user.getBookmarks();
        Optional<Bookmark> bookmark = bookmarks.stream()
                .filter(b -> b.getTweet().getId().equals(tweet.getId()))
                .findFirst();

        if (bookmark.isPresent()) {
            bookmarks.remove(bookmark.get());
            bookmarkRepository.delete(bookmark.get());
            return false;
        } else {
            Bookmark newBookmark = new Bookmark();
            newBookmark.setTweet(tweet);
            newBookmark.setUser(user);
            bookmarkRepository.save(newBookmark);
            bookmarks.add(newBookmark);
            return true;
        }
    }

    @Override
    public List<TweetImageProjection> getUserTweetImages(Long userId) {
        return tweetClient.getUserTweetImages(new TweetPageableRequest(userId, PageRequest.of(0, 6)));
    }

    @Override
    @Transactional
    public AuthUserProjection updateUserProfile(User userInfo) {
        if (userInfo.getUsername().length() == 0 || userInfo.getUsername().length() > 50) {
            throw new ApiRequestException("Incorrect username length", HttpStatus.BAD_REQUEST);
        }
        User user = authenticationService.getAuthenticatedUser();

        if (userInfo.getAvatar() != null) {
            user.setAvatar(userInfo.getAvatar());
            imageClient.saveImage(userInfo.getAvatar());
        }
        if (userInfo.getWallpaper() != null) {
            user.setWallpaper(userInfo.getWallpaper());
            imageClient.saveImage(userInfo.getWallpaper());
        }
        user.setUsername(userInfo.getUsername());
        user.setAbout(userInfo.getAbout());
        user.setLocation(userInfo.getLocation());
        user.setWebsite(userInfo.getWebsite());
        user.setProfileCustomized(true);
        return userRepository.findAuthUserById(user.getId()).get();
    }

    @Override
    public Page<UserProjection> getFollowers(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        checkIsUserBlocked(userId);
        return userRepository.getFollowersById(userId, pageable);
    }

    @Override
    public Page<UserProjection> getFollowing(Long userId, Pageable pageable) {
        checkIsUserExist(userId);
        checkIsUserBlocked(userId);
        return userRepository.getFollowingById(userId, pageable);
    }

    @Override
    @Transactional
    public Map<String, Object> processFollow(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        List<User> followers = user.getFollowers();
        Optional<User> follower = followers.stream()
                .filter(f -> f.getId().equals(currentUser.getId()))
                .findFirst();
        boolean isFollower;

        if (follower.isPresent()) {
            followers.remove(follower.get());
            List<User> subscribers = currentUser.getSubscribers();
            Optional<User> subscriber = subscribers.stream()
                    .filter(s -> s.getId().equals(user.getId()))
                    .findFirst();
            subscriber.ifPresent(subscribers::remove);
            isFollower = false;
        } else {
            followers.add(currentUser);
            isFollower = true;
        }

        Notification notification = new Notification();
        notification.setNotificationType(NotificationType.FOLLOW);
        notification.setUser(user);
        notification.setUserToFollow(currentUser);
        notification.setNotifiedUser(currentUser);

        if (!currentUser.getId().equals(user.getId())) {
            Optional<Notification> userNotification = currentUser.getNotifications().stream()
                    .filter(n -> n.getNotificationType().equals(NotificationType.FOLLOW)
                            && n.getUser().getId().equals(user.getId()))
                    .findFirst();

            if (userNotification.isEmpty()) {
                Notification newNotification = notificationRepository.save(notification);
                currentUser.setNotificationsCount(currentUser.getNotificationsCount() + 1);
                List<Notification> notifications = currentUser.getNotifications();
                notifications.add(newNotification);
                return Map.of("notification", newNotification, "isFollower", isFollower);
            }
        }
        return Map.of("notification", notification, "isFollower", isFollower);
    }

    @Override
    public List<BaseUserProjection> overallFollowers(Long userId) {
        checkIsUserExist(userId);
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getSameFollowers(userId, authUserId, BaseUserProjection.class);
    }

    @Override
    @Transactional
    public UserProfileProjection processFollowRequestToPrivateProfile(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        List<User> followerRequests = currentUser.getFollowerRequests();
        Optional<User> followerRequest = currentUser.getFollowerRequests().stream()
                .filter(follower -> follower.getId().equals(user.getId()))
                .findFirst();

        if (followerRequest.isPresent()) {
            followerRequests.remove(followerRequest.get());
        } else {
            followerRequests.add(user);
        }
        return userRepository.getUserProfileById(userId).get();
    }

    @Override
    @Transactional
    public String acceptFollowRequest(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        user.getFollowerRequests().remove(currentUser);
        user.getFollowers().add(currentUser);
        return "User (id:" + userId + ") accepted.";
    }

    @Override
    @Transactional
    public String declineFollowRequest(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        user.getFollowerRequests().remove(currentUser);
        return "User (id:" + userId + ") declined.";
    }

    @Override
    @Transactional
    public Boolean processSubscribeToNotifications(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        return processUserList(user, currentUser.getSubscribers());
    }

    @Override
    @Transactional
    public Long processPinTweet(Long tweetId) {
        User user = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetClient.getTweetById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));

        if (user.getPinnedTweet() == null || !user.getPinnedTweet().getId().equals(tweet.getId())) {
            user.setPinnedTweet(tweet);
            return tweet.getId();
        } else {
            user.setPinnedTweet(null);
            return 0L;
        }
    }

    @Override
    public Page<BlockedUserProjection> getBlockList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getUserBlockListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processBlockList(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        List<User> userBlockedList = user.getUserBlockedList();
        Optional<User> userFromList = userBlockedList.stream()
                .filter(blockedUser -> blockedUser.getId().equals(currentUser.getId()))
                .findFirst();

        if (userFromList.isPresent()) {
            userBlockedList.remove(userFromList.get());
            return false;
        } else {
            userBlockedList.add(currentUser);
            user.getFollowers().removeIf(follower -> follower.getId().equals(currentUser.getId()));
            user.getFollowing().removeIf(following -> following.getId().equals(currentUser.getId()));
            // TODO get lists by user id instead of user.getLists()
//            user.getLists().removeIf(list -> list.getMembers().stream()
//                    .anyMatch(member -> member.getId().equals(currentUser.getId())));
            return true;
        }
    }

    @Override
    public Page<MutedUserProjection> getMutedList(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getUserMuteListById(authUserId, pageable);
    }

    @Override
    @Transactional
    public Boolean processMutedList(Long userId) {
        User user = authenticationService.getAuthenticatedUser();
        User currentUser = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
        return processUserList(currentUser, user.getUserMutedList());
    }

    @Override
    public UserDetailProjection getUserDetails(Long userId) {
        return userRepository.getUserDetails(userId)
                .orElseThrow(() -> new ApiRequestException("User not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public Page<FollowerUserProjection> getFollowerRequests(Pageable pageable) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getFollowerRequests(authUserId, pageable);
    }

    private void checkIsUserExist(Long userId) {
        boolean userExist = userRepository.isUserExist(userId);

        if (!userExist) {
            throw new ApiRequestException("User (id:" + userId + ") not found", HttpStatus.NOT_FOUND);
        }
    }

    private void checkIsUserBlocked(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        boolean userBlocked = userRepository.isUserBlocked(userId, authUserId);

        if (userBlocked) {
            throw new ApiRequestException("User (id:" + authUserId + ") is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    public boolean isUserFollowByOtherUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserFollowByOtherUser(authUserId, userId);
    }

    public boolean isUserBlockedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserBlocked(authUserId, userId);
    }

    public boolean isUserMutedByMyProfile(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserMuted(authUserId, userId);
    }

    public boolean isMyProfileBlockedByUser(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserBlocked(userId, authUserId);
    }

    public boolean isMyProfileWaitingForApprove(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileWaitingForApprove(userId, authUserId);
    }

    public boolean isMyProfileSubscribed(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isMyProfileSubscribed(userId, authUserId);
    }

    public boolean isUserChatParticipant(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.isUserChatParticipant(userId, authUserId);
    }

    public List<SameFollower> getSameFollowers(Long userId) {
        Long authUserId = authenticationService.getAuthenticatedUserId();
        return userRepository.getSameFollowers(userId, authUserId, SameFollower.class);
    }

    private Boolean processUserList(User currentUser, List<User> userLists) {
        Optional<User> userFromList = userLists.stream()
                .filter(user -> user.getId().equals(currentUser.getId()))
                .findFirst();

        if (userFromList.isPresent()) {
            userLists.remove(userFromList.get());
            return false;
        } else {
            userLists.add(currentUser);
            return true;
        }
    }

    private <T> Page<T> getPageableTweetProjectionList(Pageable pageable, List<T> tweets, int totalPages) {
        PagedListHolder<T> page = new PagedListHolder<>(tweets);
        page.setPage(pageable.getPageNumber());
        page.setPageSize(pageable.getPageSize());
        return new PageImpl<>(page.getPageList(), pageable, totalPages);
    }

    private List<TweetUserProjection> combineTweetsArrays(List<TweetUserProjection> tweets, List<RetweetProjection> retweets) {
        List<TweetUserProjection> allTweets = new ArrayList<>();
        int i = 0;
        int j = 0;

        while (i < tweets.size() && j < retweets.size()) {
            if (tweets.get(i).getDateTime().isAfter(retweets.get(j).getRetweetDate())) {
                allTweets.add(tweets.get(i));
                i++;
            } else {
                allTweets.add(retweets.get(j).getTweet());
                j++;
            }
        }
        while (i < tweets.size()) {
            allTweets.add(tweets.get(i));
            i++;
        }
        while (j < retweets.size()) {
            allTweets.add(retweets.get(j).getTweet());
            j++;
        }
        return allTweets;
    }
}
