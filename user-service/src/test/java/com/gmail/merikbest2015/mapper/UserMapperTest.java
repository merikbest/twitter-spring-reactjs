package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.dto.request.UserRequest;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class UserMapperTest extends AbstractAuthTest {

    @Autowired
    private UserMapper userMapper;

    @MockBean
    private UserService userService;

    @Test
    public void getUserById() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(userProfileProjection);
        userMapper.getUserById(TestConstants.USER_ID);
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
    }

    @Test
    public void getUsers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(userService.getUsers(pageable)).thenReturn(userProjections);
        userMapper.getUsers(pageable);
        verify(userService, times(1)).getUsers(pageable);
    }

    @Test
    public void getRelevantUsers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(userService.getRelevantUsers()).thenReturn(userProjections.getContent());
        userMapper.getRelevantUsers();
        verify(userService, times(1)).getRelevantUsers();
    }

    @Test
    public void searchUsersByUsername() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(userService.searchUsersByUsername(TestConstants.USERNAME, pageable, UserProjection.class))
                .thenReturn(userProjections);
        userMapper.searchUsersByUsername(TestConstants.USERNAME, pageable);
        verify(userService, times(1)).searchUsersByUsername(TestConstants.USERNAME, pageable, UserProjection.class);
    }

    @Test
    public void getSearchResults() {
        List<CommonUserProjection> commonUserProjectionList = List.of(UserServiceTestHelper.createCommonUserProjection());
        SearchTermsRequest request = new SearchTermsRequest();
        when(userService.getSearchResults(request)).thenReturn(commonUserProjectionList);
        userMapper.getSearchResults(request);
        verify(userService, times(1)).getSearchResults(request);
    }

    @Test
    public void startUseTwitter() {
        when(userService.startUseTwitter()).thenReturn(true);
        assertTrue(userService.startUseTwitter());
        verify(userService, times(1)).startUseTwitter();
    }

    @Test
    public void updateUserProfile() {
        UserRequest userRequest = new UserRequest();
        userRequest.setFullName(TestConstants.FULL_NAME);
        userRequest.setAbout(TestConstants.ABOUT);
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        when(userService.updateUserProfile(any())).thenReturn(authUserProjection);
        userMapper.updateUserProfile(userRequest);
        verify(userService, times(1)).updateUserProfile(any());
    }

    @Test
    public void processSubscribeToNotifications() {
        when(userService.processSubscribeToNotifications(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userService.processSubscribeToNotifications(TestConstants.USER_ID));
        verify(userService, times(1)).processSubscribeToNotifications(TestConstants.USER_ID);
    }

    @Test
    public void processPinTweet() {
        when(userService.processPinTweet(TestConstants.TWEET_ID)).thenReturn(TestConstants.TWEET_ID);
        assertEquals(TestConstants.TWEET_ID, userService.processPinTweet(TestConstants.TWEET_ID));
        verify(userService, times(1)).processPinTweet(TestConstants.TWEET_ID);
    }

    @Test
    public void getUserDetails() {
        UserDetailProjection userDetailProjection = UserServiceTestHelper.createUserDetailProjection();
        when(userService.getUserDetails(TestConstants.USER_ID)).thenReturn(userDetailProjection);
        userService.getUserDetails(TestConstants.USER_ID);
        verify(userService, times(1)).getUserDetails(TestConstants.USER_ID);
    }
}
