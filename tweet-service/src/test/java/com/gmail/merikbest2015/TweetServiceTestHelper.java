package com.gmail.merikbest2015;

import com.gmail.merikbest2015.constants.PathConstants;
import com.gmail.merikbest2015.dto.request.NotificationRequest;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.enums.LinkCoverSize;
import com.gmail.merikbest2015.enums.NotificationType;
import com.gmail.merikbest2015.enums.ReplyType;
import com.gmail.merikbest2015.model.GifImage;
import com.gmail.merikbest2015.model.Poll;
import com.gmail.merikbest2015.model.Tweet;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.time.LocalDateTime;
import java.util.*;

public class TweetServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static final PageRequest pageable = PageRequest.of(0, 20);

    public static <T> T createTweetProjection(boolean isDeleted, Class<T> type) {
        Map<String, Object> tweetMap = new HashMap<>();
        tweetMap.put("id", TestConstants.TWEET_ID);
        tweetMap.put("text", TestConstants.TWEET_TEXT);
        tweetMap.put("dateTime", LocalDateTime.now());
        tweetMap.put("scheduledDate", LocalDateTime.now());
        tweetMap.put("addressedUsername", TestConstants.USERNAME);
        tweetMap.put("addressedId", TestConstants.USER_ID);
        tweetMap.put("addressedTweetId", 123L);
        tweetMap.put("replyType", ReplyType.EVERYONE);
        tweetMap.put("link", TestConstants.LINK);
        tweetMap.put("linkTitle", TestConstants.LINK_TITLE);
        tweetMap.put("linkDescription", TestConstants.LINK_DESCRIPTION);
        tweetMap.put("linkCover", TestConstants.LINK_COVER);
        tweetMap.put("gifImage", new GifImage());
        tweetMap.put("linkCoverSize", LinkCoverSize.LARGE);
        tweetMap.put("author", createTweetAuthorProjection());
        tweetMap.put("listId", TestConstants.LIST_ID);
        tweetMap.put("images", new ArrayList<>());
        tweetMap.put("imageDescription", "");
        tweetMap.put("quoteTweet", new Tweet());
        tweetMap.put("poll", new Poll());
        tweetMap.put("deleted", isDeleted);
        tweetMap.put("user", new TweetAuthorResponse());
        tweetMap.put("tweetList", new TweetListResponse());
        tweetMap.put("taggedImageUsers", new ArrayList<>());
        tweetMap.put("isTweetLiked", false);
        tweetMap.put("isTweetRetweeted", false);
        tweetMap.put("isTweetBookmarked", false);
        tweetMap.put("isUserFollowByOtherUser", false);
        tweetMap.put("retweetsCount", 1);
        tweetMap.put("likedTweetsCount", 1);
        tweetMap.put("repliesCount", 0);
        tweetMap.put("quotesCount", 0);
        if (type.equals(TweetUserProjection.class)) {
            tweetMap.put("retweetsUserIds", List.of(1L, 2L));
        }
        return factory.createProjection(type, tweetMap);
    }

    public static TweetAuthorProjection createTweetAuthorProjection() {
        return factory.createProjection(
                TweetAuthorProjection.class,
                new HashMap<>() {{
                    put("id", TestConstants.USER_ID);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("isPrivateProfile", false);
                    put("isMutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
    }

    public static List<TweetUserProjection> createMockTweetUserProjectionList() {
        return Arrays.asList(
                TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class),
                TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class));
    }

    public static List<RetweetProjection> createMockRetweetProjectionList() {
        RetweetProjection retweetProjection1 = factory.createProjection(
                RetweetProjection.class,
                Map.of(
                        "id", 1L,
                        "retweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class)
                ));
        RetweetProjection retweetProjection2 = factory.createProjection(
                RetweetProjection.class,
                Map.of(
                        "id", 2L,
                        "retweetDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetUserProjection.class)
                ));
        return Arrays.asList(retweetProjection1, retweetProjection2);
    }

    public static List<ProfileTweetImageProjection> createMockProfileTweetImageProjections() {
        ProfileTweetImageProjection profileTweetImageProjection1 = factory.createProjection(
                ProfileTweetImageProjection.class,
                Map.of(
                        "tweetId", 1L,
                        "imageId", 1L,
                        "src", "test src"
                ));
        ProfileTweetImageProjection profileTweetImageProjection2 = factory.createProjection(
                ProfileTweetImageProjection.class,
                Map.of(
                        "tweetId", 2L,
                        "imageId", 2L,
                        "src", "test src"
                ));
        return Arrays.asList(profileTweetImageProjection1, profileTweetImageProjection2);
    }

    public static NotificationRequest createMockNotificationRequest(NotificationType notificationType, boolean notificationCondition) {
        return NotificationRequest.builder()
                .notificationType(notificationType)
                .notificationCondition(notificationCondition)
                .notifiedUserId(TestConstants.USER_ID)
                .userId(TestConstants.USER_ID)
                .tweetId(TestConstants.TWEET_ID)
                .build();
    }

    public static List<BookmarkProjection> createMockBookmarkProjectionList() {
        BookmarkProjection bookmarkProjection1 = factory.createProjection(
                BookmarkProjection.class,
                Map.of(
                        "id", 1L,
                        "bookmarkDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class)
                ));
        BookmarkProjection bookmarkProjection2 = factory.createProjection(
                BookmarkProjection.class,
                Map.of(
                        "id", 2L,
                        "bookmarkDate", LocalDateTime.now(),
                        "tweetId", TestConstants.TWEET_ID,
                        "tweet", TweetServiceTestHelper.createTweetProjection(false, TweetProjection.class)
                ));
        return Arrays.asList(bookmarkProjection1, bookmarkProjection2);
    }

    public static NotificationTweetProjection createNotificationTweetProjection() {
        return factory.createProjection(
                NotificationTweetProjection.class,
                Map.of("id", 1L,
                        "text", "test text",
                        "authorId", TestConstants.USER_ID));
    }

    public static ChatTweetProjection createChatTweetProjection() {
        return factory.createProjection(
                ChatTweetProjection.class,
                Map.of("id", 1L,
                        "text", "test text",
                        "dateTime", LocalDateTime.now(),
                        "user", new ChatTweetUserResponse(),
                        "authorId", TestConstants.USER_ID,
                        "deleted", false));
    }

    public static Page<UserProjection> createUserProjections() {
        UserProjection userProjection1 = factory.createProjection(
                UserProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
        UserProjection userProjection2 = factory.createProjection(
                UserProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
        return new PageImpl<>(Arrays.asList(userProjection1, userProjection2), pageable, 20);
    }

    public static void mockAuthenticatedUserId() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(PathConstants.AUTH_USER_ID_HEADER, 1L);
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
