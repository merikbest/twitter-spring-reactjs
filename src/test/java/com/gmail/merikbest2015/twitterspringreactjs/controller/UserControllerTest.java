package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
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
    public void getUserById() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUsers() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].email").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].location").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].website").isNotEmpty())
                .andExpect(jsonPath("$[*].birthday").isNotEmpty())
                .andExpect(jsonPath("$[*].registrationDate").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetCount").isNotEmpty())
                .andExpect(jsonPath("$[*].notificationsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].bookmarks").isNotEmpty())
                .andExpect(jsonPath("$[*].avatar.id").isNotEmpty())
                .andExpect(jsonPath("$[*].wallpaper.id").isNotEmpty())
                .andExpect(jsonPath("$[*].profileCustomized").isNotEmpty())
                .andExpect(jsonPath("$[*].profileStarted").isNotEmpty())
                .andExpect(jsonPath("$[*].unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty())
                .andExpect(jsonPath("$[*].following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getRelevantUsers() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/relevant"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].email").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].location").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].website").isNotEmpty())
                .andExpect(jsonPath("$[*].birthday").isNotEmpty())
                .andExpect(jsonPath("$[*].registrationDate").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetCount").isNotEmpty())
                .andExpect(jsonPath("$[*].notificationsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].bookmarks").isNotEmpty())
                .andExpect(jsonPath("$[*].avatar.id").isNotEmpty())
                .andExpect(jsonPath("$[*].wallpaper.id").isNotEmpty())
                .andExpect(jsonPath("$[*].profileCustomized").isNotEmpty())
                .andExpect(jsonPath("$[*].profileStarted").isNotEmpty())
                .andExpect(jsonPath("$[*].unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty())
                .andExpect(jsonPath("$[*].following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void searchUsersByUsername() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/search/" + USERNAME))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(USER_ID))
                .andExpect(jsonPath("$[0].email").value(USER_EMAIL))
                .andExpect(jsonPath("$[0].fullName").value(FULL_NAME))
                .andExpect(jsonPath("$[0].username").value(USERNAME))
                .andExpect(jsonPath("$[0].location").value(LOCATION))
                .andExpect(jsonPath("$[0].about").value(ABOUT))
                .andExpect(jsonPath("$[0].website").value(WEBSITE))
                .andExpect(jsonPath("$[0].birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$[0].registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$[0].tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$[0].notificationsCount").value(3))
                .andExpect(jsonPath("$[0].pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$[0].bookmarks").isNotEmpty())
                .andExpect(jsonPath("$[0].avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$[0].wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$[0].profileCustomized").value(true))
                .andExpect(jsonPath("$[0].profileStarted").value(true))
                .andExpect(jsonPath("$[0].unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$[0].followers").isNotEmpty())
                .andExpect(jsonPath("$[0].following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void searchUsersByUsername_NotFound() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/search/test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void startUseTwitter() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/start"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/tweets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(5)))
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
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserLikedTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/liked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
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
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserMediaTweets() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/media"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(0)));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserRetweetsAndReplies() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/" + USER_ID + "/replies"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
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
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserNotifications() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/notifications"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(3)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].date").isNotEmpty())
                .andExpect(jsonPath("$[*].notificationType").isNotEmpty())
                .andExpect(jsonPath("$[*].user").isNotEmpty())
                .andExpect(jsonPath("$[*].userToFollow").isNotEmpty())
                .andExpect(jsonPath("$[*].tweet").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getUserBookmarks() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
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
                .andExpect(jsonPath("$[*].likedTweets").isNotEmpty())
                .andExpect(jsonPath("$[*].retweets").isNotEmpty())
                .andExpect(jsonPath("$[*].replies").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void processUserBookmarks_addBookmark() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks[1].tweet.id").value(43))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void processUserBookmarks_removeBookmark() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/bookmarks/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
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
    public void processFollow() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(3))
                .andExpect(jsonPath("$.email").value("test2016@test.test"))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.followers").isEmpty())
                .andExpect(jsonPath("$.following[0].id").value(2));
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void processUnfollow() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/follow/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.email").value("merikbest2015@gmail.com"))
                .andExpect(jsonPath("$.fullName").value("Vbhjckfd1"))
                .andExpect(jsonPath("$.username").value("Vbhjckfd1"))
                .andExpect(jsonPath("$.location").value("Kyiv"))
                .andExpect(jsonPath("$.about").value("Hello2"))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").isEmpty())
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(126))
                .andExpect(jsonPath("$.avatar.id").value(11))
                .andExpect(jsonPath("$.wallpaper.id").value(22))
                .andExpect(jsonPath("$.followers[0].id").value(2))
                .andExpect(jsonPath("$.following").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void processPinTweet() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/pin/tweet/43"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet.id").value(43))
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void processUnpinTweet() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/pin/tweet/40"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].email").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].location").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].website").isNotEmpty())
                .andExpect(jsonPath("$[*].birthday").isNotEmpty())
                .andExpect(jsonPath("$[*].registrationDate").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetCount").isNotEmpty())
                .andExpect(jsonPath("$[*].notificationsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].bookmarks").isNotEmpty())
                .andExpect(jsonPath("$[*].avatar.id").isNotEmpty())
                .andExpect(jsonPath("$[*].wallpaper.id").isNotEmpty())
                .andExpect(jsonPath("$[*].profileCustomized").isNotEmpty())
                .andExpect(jsonPath("$[*].profileStarted").isNotEmpty())
                .andExpect(jsonPath("$[*].unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty())
                .andExpect(jsonPath("$[*].following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void addToBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty())
                .andExpect(jsonPath("$.userMutedList").isNotEmpty())
                .andExpect(jsonPath("$.userBlockedList").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void removeFromBlockList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/blocked/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isEmpty())
                .andExpect(jsonPath("$.following").isEmpty())
                .andExpect(jsonPath("$.userMutedList").isNotEmpty())
                .andExpect(jsonPath("$.userBlockedList").isEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void getMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[*]", hasSize(1)))
                .andExpect(jsonPath("$[*].id").isNotEmpty())
                .andExpect(jsonPath("$[*].email").isNotEmpty())
                .andExpect(jsonPath("$[*].fullName").isNotEmpty())
                .andExpect(jsonPath("$[*].username").isNotEmpty())
                .andExpect(jsonPath("$[*].location").isNotEmpty())
                .andExpect(jsonPath("$[*].about").isNotEmpty())
                .andExpect(jsonPath("$[*].website").isNotEmpty())
                .andExpect(jsonPath("$[*].birthday").isNotEmpty())
                .andExpect(jsonPath("$[*].registrationDate").isNotEmpty())
                .andExpect(jsonPath("$[*].tweetCount").isNotEmpty())
                .andExpect(jsonPath("$[*].notificationsCount").isNotEmpty())
                .andExpect(jsonPath("$[*].pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$[*].bookmarks").isNotEmpty())
                .andExpect(jsonPath("$[*].avatar.id").isNotEmpty())
                .andExpect(jsonPath("$[*].wallpaper.id").isNotEmpty())
                .andExpect(jsonPath("$[*].profileCustomized").isNotEmpty())
                .andExpect(jsonPath("$[*].profileStarted").isNotEmpty())
                .andExpect(jsonPath("$[*].unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$[*].followers").isNotEmpty())
                .andExpect(jsonPath("$[*].following").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void addToMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty())
                .andExpect(jsonPath("$.userMutedList").isNotEmpty())
                .andExpect(jsonPath("$.userBlockedList").isNotEmpty());
    }

    @Test
    @WithUserDetails(USER_EMAIL)
    public void removeFromMutedList() throws Exception {
        mockMvc.perform(get(URL_USER_BASIC + "/muted/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(USER_ID))
                .andExpect(jsonPath("$.email").value(USER_EMAIL))
                .andExpect(jsonPath("$.fullName").value(FULL_NAME))
                .andExpect(jsonPath("$.username").value(USERNAME))
                .andExpect(jsonPath("$.location").value(LOCATION))
                .andExpect(jsonPath("$.about").value(ABOUT))
                .andExpect(jsonPath("$.website").value(WEBSITE))
                .andExpect(jsonPath("$.birthday").value(BIRTHDAY))
                .andExpect(jsonPath("$.registrationDate").value(REGISTRATION_DATE))
                .andExpect(jsonPath("$.tweetCount").value(TWEET_COUNT))
                .andExpect(jsonPath("$.notificationsCount").value(3))
                .andExpect(jsonPath("$.pinnedTweet").isNotEmpty())
                .andExpect(jsonPath("$.bookmarks").isNotEmpty())
                .andExpect(jsonPath("$.avatar.id").value(AVATAR_ID))
                .andExpect(jsonPath("$.wallpaper.id").value(WALLPAPER_ID))
                .andExpect(jsonPath("$.profileCustomized").value(true))
                .andExpect(jsonPath("$.profileStarted").value(true))
                .andExpect(jsonPath("$.unreadMessages").isNotEmpty())
                .andExpect(jsonPath("$.followers").isNotEmpty())
                .andExpect(jsonPath("$.following").isNotEmpty())
                .andExpect(jsonPath("$.userMutedList").isEmpty())
                .andExpect(jsonPath("$.userBlockedList").isNotEmpty());
    }
}
