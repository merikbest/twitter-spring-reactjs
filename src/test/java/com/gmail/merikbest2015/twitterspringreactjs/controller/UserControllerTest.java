package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.ReplyType;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.FileInputStream;

import static com.gmail.merikbest2015.twitterspringreactjs.util.TestConstants.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource("/application-test.properties")
@Sql(value = {"/sql/populate-table-before.sql"}, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(value = {"/sql/populate-table-after.sql"}, executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/1 - Get user by id")
    public void getUserById() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.fullName").value(USERNAME2))
                .andExpect(jsonPath("$.username").value(USERNAME2))
                .andExpect(jsonPath("$.location").value("Kyiv"))
                .andExpect(jsonPath("$.about").value(ABOUT2))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.birthday").isEmpty())
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(0))
                .andExpect(jsonPath("$.avatar.id").value(11L))
                .andExpect(jsonPath("$.wallpaper.id").value(22L))
                .andExpect(jsonPath("$.pinnedTweetId").value(0L))
                .andExpect(jsonPath("$.followersSize").value(2L))
                .andExpect(jsonPath("$.followingSize").value(1L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(1)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(false))
                .andExpect(jsonPath("$.isUserMuted").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(true))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/99 - Should user Not Found by id")
    public void getUserById_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/all - Get users")
    public void getUsers() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/relevant - Get relevant users")
    public void getRelevantUsers() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/relevant"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(5)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/search/MrCat - Search users by username")
    public void searchUsersByUsername() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/search/" + USERNAME))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(6)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/search/test - Search users by username Not Found")
    public void searchUsersByUsername_NotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/search/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/start - Start use twitter")
    public void startUseTwitter() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/start"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/2/tweets - Get user tweets by id")
    public void getUserTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/tweets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(8)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].text").isNotEmpty())
                .andExpect(jsonPath("$[*].dateTime").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedUsername").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedId").isNotEmpty())
                .andExpect(jsonPath("$[*].addressedTweetId").isNotEmpty())
                .andExpect(jsonPath("$[*].replyType").isNotEmpty())
                .andExpect(jsonPath("$[*].link").isNotEmpty())
                .andExpect(jsonPath("$[*].linkTitle").isNotEmpty())
                .andExpect(jsonPath("$[*].linkDescription").isNotEmpty())
                .andExpect(jsonPath("$[*].linkCover").isNotEmpty())
                .andExpect(jsonPath("$[*].linkCoverSize").isNotEmpty())
                .andExpect(jsonPath("$[*].quoteTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].poll").isNotEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[*].retweetsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].likedTweetsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].repliesCount").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetLiked").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetRetweeted").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserFollowByOtherUser").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetDeleted").isNotEmpty())
                .andExpect(jsonPath("$[*].isTweetBookmarked").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/99/tweets - Should user Not Found by id")
    public void getUserTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/99/tweets"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/2/liked - Get user liked tweets by id")
    public void getUserLikedTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/liked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].user.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/99/liked - Should user Not Found by id")
    public void getUserLikedTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/99/liked"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/2/media - Get user media tweets by id")
    public void getUserMediaTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/media"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(42L))
                .andExpect(jsonPath("$[0].text").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:33:36"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").value(YOUTUBE_LINK))
                .andExpect(jsonPath("$[0].linkTitle").value(YOUTUBE_LINK_TITLE))
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").value(YOUTUBE_LINK_COVER))
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].user.id").value(2L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images").isNotEmpty())
                .andExpect(jsonPath("$[0].retweetsCount").value(0L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(0L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/99/media - Should user Not Found by id")
    public void getUserMediaTweets_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/99/media"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/2/replies - Get user retweets and replies by id")
    public void getUserRetweetsAndReplies() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/replies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(45L))
                .andExpect(jsonPath("$[0].text").value("media tweet test"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:38:51"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet.id").value(40L))
                .andExpect(jsonPath("$[0].user.id").value(1L))
                .andExpect(jsonPath("$[0].poll").isEmpty())
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(0L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(true))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(true))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(true))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/99/replies - Should user Not Found by id")
    public void getUserRetweetsAndReplies_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/99/replies"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/notifications - Get user notifications")
    public void getUserNotifications() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/notifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.notifications[*]", hasSize(3)))
                .andExpect(jsonPath("$.tweetAuthors[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/notifications/37 - Get user notification by id")
    public void getUserNotificationById() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/notifications/37"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(37L))
                .andExpect(jsonPath("$.date").value("2021-10-03T20:31:44"))
                .andExpect(jsonPath("$.notificationType").value("LIKE"))
                .andExpect(jsonPath("$.user.id").value(1L))
                .andExpect(jsonPath("$.tweet.id").value(40L));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/notifications/99 - Should notification Not Found by id")
    public void getUserNotificationById_ShouldNotificationNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/notifications/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Notification not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/notifications/39 - Should other user notification Not Found by id")
    public void getUserNotificationById_ShouldOtherUserNotificationNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/notifications/39"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Notification not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/bookmarks - Get user bookmarks")
    public void getUserBookmarks() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(40L))
                .andExpect(jsonPath("$[0].text").value("test tweet"))
                .andExpect(jsonPath("$[0].dateTime").value("2021-10-03T20:29:03"))
                .andExpect(jsonPath("$[0].scheduledDate").isEmpty())
                .andExpect(jsonPath("$[0].addressedUsername").isEmpty())
                .andExpect(jsonPath("$[0].addressedId").isEmpty())
                .andExpect(jsonPath("$[0].addressedTweetId").isEmpty())
                .andExpect(jsonPath("$[0].replyType").value(ReplyType.EVERYONE.toString()))
                .andExpect(jsonPath("$[0].link").isEmpty())
                .andExpect(jsonPath("$[0].linkTitle").isEmpty())
                .andExpect(jsonPath("$[0].linkDescription").isEmpty())
                .andExpect(jsonPath("$[0].linkCover").isEmpty())
                .andExpect(jsonPath("$[0].linkCoverSize").isEmpty())
                .andExpect(jsonPath("$[0].quoteTweet").isEmpty())
                .andExpect(jsonPath("$[0].user.id").value(2L))
                .andExpect(jsonPath("$[0].poll.id").value(2L))
                .andExpect(jsonPath("$[*].images", hasSize(1)))
                .andExpect(jsonPath("$[0].retweetsCount").value(1L))
                .andExpect(jsonPath("$[0].likedTweetsCount").value(1L))
                .andExpect(jsonPath("$[0].repliesCount").value(1L))
                .andExpect(jsonPath("$[0].isTweetLiked").value(false))
                .andExpect(jsonPath("$[0].isTweetRetweeted").value(false))
                .andExpect(jsonPath("$[0].isUserFollowByOtherUser").value(false))
                .andExpect(jsonPath("$[0].isTweetDeleted").value(false))
                .andExpect(jsonPath("$[0].isTweetBookmarked").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/bookmarks/43 - Add tweet to bookmarks")
    public void processUserBookmarks_addBookmark() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/bookmarks/40 - Remove tweet from bookmarks")
    public void processUserBookmarks_removeBookmark() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/bookmarks/99 - Should Tweet Not Found")
    public void processUserBookmarks_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] PUT /api/v1/user - Update user profile")
    public void updateUserProfile() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setUsername("test");
        userRequest.setAbout("test");
        userRequest.setLocation("test");
        userRequest.setWebsite("test");

        mockMvc.perform(put(URL_USER_BASIC)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value("test"))
                .andExpect(jsonPath("$.location").value("test"))
                .andExpect(jsonPath("$.about").value("test"))
                .andExpect(jsonPath("$.website").value("test"))
                .andExpect(jsonPath("$.countryCode").value(COUNTRY))
                .andExpect(jsonPath("$.phone").value(PHONE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.gender").value(GENDER))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.active").value(true))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.backgroundColor").value(BACKGROUND_COLOR))
                .andExpect(jsonPath("$.colorScheme").value(COLOR_SCHEME))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.pinnedTweetId").value(PINNED_TWEET_ID))
                .andExpect(jsonPath("$.followersSize").value(2L))
                .andExpect(jsonPath("$.followingSize").value(1L))
                .andExpect(jsonPath("$.followerRequestsSize").isEmpty())
                .andExpect(jsonPath("$.unreadMessagesSize").value(1L))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/user - Should username length is 0")
    public void updateUserProfile_ShouldUsernameLengthIs0() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setUsername("");

        mockMvc.perform(put(URL_USER_BASIC)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] PUT /api/v1/user - Should username length more than 50")
    public void updateUserProfile_ShouldUsernameLengthMoreThan50() throws Exception {
        UserRequest userRequest = new UserRequest();
        userRequest.setUsername(LINK_DESCRIPTION);

        mockMvc.perform(put(URL_USER_BASIC)
                        .content(mapper.writeValueAsString(userRequest))
                        .contentType(MediaType.APPLICATION_JSON_VALUE))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("Incorrect username length")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] POST /api/v1/user/upload - Upload user image to S3 bucket")
    public void uploadImage() throws Exception {
        FileInputStream inputFile = new FileInputStream("src/test/resources/test.png");
        MockMultipartFile file = new MockMultipartFile("file", "test.png", MediaType.MULTIPART_FORM_DATA_VALUE, inputFile);
        MockMvc mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        // TODO create new s3 bucket
//        mockMvc.perform(multipart(URL_USER_BASIC + "/upload")
//                .file(file))
//                .andExpect(status().isOk());
    }
    
    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/images/1 - Get user tweets with images")
    public void getUserTweetImages() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/images/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].tweetId").value(45L))
                .andExpect(jsonPath("$[0].imageId").value(1L))
                .andExpect(jsonPath("$[0].src").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/followers/1 - Get followers by user id")
    public void getFollowers() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/followers/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/followers/99 - Should user Not Found by id")
    public void getFollowers_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/followers/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] GET /api/v1/user/followers/5 - Should user blocked by other user")
    public void getFollowers_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/followers/5"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User (id:2) is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/following/4 - Get following by user id")
    public void getFollowing() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/following/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/following/99 - Should user Not Found by id")
    public void getFollowing_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/following/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[400] GET /api/v1/user/following/6 - Should user blocked by other user")
    public void getFollowing_ShouldUserBlockedByOtherUser() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/following/6"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$", is("User (id:2) is blocked")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follower-requests - Follow user by id")
    public void getFollowerRequests() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follower-requests"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(7L))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar.id").value(AVATAR_ID));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/3 - Follow user by id")
    public void processFollow() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.isFollower").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/1 - Unfollow user by id")
    public void processUnfollow() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.fullName").value(USERNAME2))
                .andExpect(jsonPath("$.username").value(USERNAME2))
                .andExpect(jsonPath("$.avatar.id").value(11L))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/follow/99 - Should user Not Found by id")
    public void processFollow_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/overall/1 - Get overall followers if exist")
    public void overallFollowers_exist() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/overall/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].isPrivateProfile").isNotEmpty())
                .andExpect(jsonPath("$[*].isMutedDirectMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].isUserBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isMyProfileBlocked").isNotEmpty())
                .andExpect(jsonPath("$[*].isWaitingForApprove").isNotEmpty())
                .andExpect(jsonPath("$[*].isFollower").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/overall/7 - Get overall followers if not exist")
    public void overallFollowers_NotExist() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/overall/7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/follow/overall/99 - Should user Not Found by id")
    public void overallFollowers_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/overall/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User (id:99) not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/private/4 - Follow request from private profile")
    public void followRequestToPrivateProfile() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/private/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(4L))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.avatar.id").value(33L))
                .andExpect(jsonPath("$.wallpaper.id").value(44L))
                .andExpect(jsonPath("$.pinnedTweetId").value(0L))
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(2L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(true))
                .andExpect(jsonPath("$.isUserMuted").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(true))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(true))
                .andExpect(jsonPath("$.isFollower").value(true))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/follow/private/5 - Unfollow request to private profile")
    public void unfollowRequestToPrivateProfile() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/private/5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(5L))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.country").value(COUNTRY))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.mediaTweetCount").value(MEDIA_TWEET_COUNT))
                .andExpect(jsonPath("$.likeCount").value(LIKE_TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.avatar.id").value(33L))
                .andExpect(jsonPath("$.wallpaper.id").value(44L))
                .andExpect(jsonPath("$.pinnedTweetId").value(0L))
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(0L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isMutedDirectMessages").value(true))
                .andExpect(jsonPath("$.isPrivateProfile").value(true))
                .andExpect(jsonPath("$.isUserMuted").value(false))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(true))
                .andExpect(jsonPath("$.isWaitingForApprove").value(false))
                .andExpect(jsonPath("$.isFollower").value(false))
                .andExpect(jsonPath("$.isSubscriber").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/follow/private/99 - Should user Not Found by id")
    public void processFollowRequestToPrivateProfile_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/private/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails("test2018@test.test")
    @DisplayName("[200] GET /api/v1/user/follow/accept/2 - Accept follow request")
    public void acceptFollowRequest() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/accept/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("User (id:2) accepted."));
    }

    @Test
    @WithUserDetails("test2018@test.test")
    @DisplayName("[404] GET /api/v1/user/follow/accept/99 - Should user Not Found by id")
    public void acceptFollowRequest_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/accept/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails("test2018@test.test")
    @DisplayName("[200] GET /api/v1/user/follow/decline/2 - Decline follow request")
    public void declineFollowRequest() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/decline/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value("User (id:2) declined."));
    }

    @Test
    @WithUserDetails("test2018@test.test")
    @DisplayName("[404] GET /api/v1/user/follow/decline/99 - Should user Not Found by id")
    public void declineFollowRequest_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/decline/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/subscribe/1 - Subscribe to notifications")
    public void subscribeToNotifications() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/subscribe/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails("merikbest2015@gmail.com")
    @DisplayName("[200] GET /api/v1/user/subscribe/1 - Unsubscribe from notifications")
    public void unsubscribeToNotifications() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/subscribe/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/subscribe/99 - Should user Not Found by id")
    public void processSubscribeToNotifications_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/subscribe/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/pin/tweet/43 - Pin tweet to profile by id")
    public void processPinTweet() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/pin/tweet/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(43)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/pin/tweet/40 - Unpin tweet from profile by id")
    public void processUnpinTweet() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/pin/tweet/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/pin/tweet/99 - Should tweet Not Found by id")
    public void processPinTweet_ShouldTweetNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/pin/tweet/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("Tweet not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/blocked - Get blocked users")
    public void getBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(4L))
                .andExpect(jsonPath("$[0].fullName").value(FULL_NAME))
                .andExpect(jsonPath("$[0].username").value(FULL_NAME))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].avatar.id").value(33L))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(true))
                .andExpect(jsonPath("$[0].isUserBlocked").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/blocked/3 - Add user to block list by id")
    public void addToBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/blocked/4 - Remove user from block list by id")
    public void removeFromBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked/4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/blocked/99 - Should user Not Found by id")
    public void processBlockList_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/muted - Get muted list")
    public void getMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].fullName").value(USERNAME2))
                .andExpect(jsonPath("$[0].username").value(USERNAME2))
                .andExpect(jsonPath("$[0].about").value(ABOUT2))
                .andExpect(jsonPath("$[0].avatar.id").value(11L))
                .andExpect(jsonPath("$[0].isPrivateProfile").value(false))
                .andExpect(jsonPath("$[0].isUserMuted").value(true));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/muted/3 - Mute user by id")
    public void addToMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/muted/1 - Unmute user by id")
    public void removeFromMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(false)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/muted/99 - Should user Not Found by id")
    public void addToMutedList_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[200] GET /api/v1/user/details/1 - Get user details by id")
    public void getUserDetails() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/details/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3L))
                .andExpect(jsonPath("$.fullName").value(USERNAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.followersSize").value(0L))
                .andExpect(jsonPath("$.followingSize").value(0L))
                .andExpect(jsonPath("$.sameFollowers[*]", hasSize(0)))
                .andExpect(jsonPath("$.isPrivateProfile").value(true))
                .andExpect(jsonPath("$.isUserBlocked").value(false))
                .andExpect(jsonPath("$.isMyProfileBlocked").value(false))
                .andExpect(jsonPath("$.isWaitingForApprove").value(true))
                .andExpect(jsonPath("$.isFollower").value(false));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    @DisplayName("[404] GET /api/v1/user/details/99 - Should user details Not Found by id")
    public void getUserDetails_ShouldUserNotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/details/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$", is("User not found")));
    }
}
