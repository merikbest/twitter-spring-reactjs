package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.dto.request.UserRequest;
import com.gmail.merikbest2015.dto.response.AuthUserResponse;
import com.gmail.merikbest2015.dto.response.UserProfileResponse;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class UserMapperTest {

    @InjectMocks
    private UserMapper userMapper;

    @Mock
    private UserService userService;

    @Mock
    private BasicMapper basicMapper;

    private static final PageRequest pageable = PageRequest.of(0, 20);

    @Test
    public void getUserById() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        when(userService.getUserById(TestConstants.USER_ID)).thenReturn(userProfileProjection);
        when(basicMapper.convertToResponse(userProfileProjection, UserProfileResponse.class)).thenReturn(userProfileResponse);
        assertEquals(userProfileResponse, userMapper.getUserById(TestConstants.USER_ID));
        verify(userService, times(1)).getUserById(TestConstants.USER_ID);
    }

    @Test
    public void getUsers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        when(userService.getUsers(pageable)).thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, UserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, userMapper.getUsers(pageable));
        verify(userService, times(1)).getUsers(pageable);
    }

    @Test
    public void getRelevantUsers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        List<UserResponse> userResponses = List.of(new UserResponse(), new UserResponse());
        when(userService.getRelevantUsers()).thenReturn(userProjections.getContent());
        when(basicMapper.convertToResponseList(userProjections.getContent(), UserResponse.class)).thenReturn(userResponses);
        assertEquals(userResponses, userMapper.getRelevantUsers());
        verify(userService, times(1)).getRelevantUsers();
    }

    @Test
    public void searchUsersByUsername() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        when(userService.searchUsersByUsername(TestConstants.USERNAME, pageable, UserProjection.class))
                .thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, UserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, userMapper.searchUsersByUsername(TestConstants.USERNAME, pageable));
        verify(userService, times(1)).searchUsersByUsername(TestConstants.USERNAME, pageable, UserProjection.class);
    }

    @Test
    public void getSearchResults() {
        List<CommonUserProjection> commonUserProjectionList = List.of(UserServiceTestHelper.createCommonUserProjection());
        SearchTermsRequest request = new SearchTermsRequest();
        List<CommonUserResponse> userResponses = List.of(new CommonUserResponse(), new CommonUserResponse());
        when(userService.getSearchResults(request)).thenReturn(commonUserProjectionList);
        when(basicMapper.convertToResponseList(commonUserProjectionList, CommonUserResponse.class)).thenReturn(userResponses);
        assertEquals(userResponses, userMapper.getSearchResults(request));
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
        User user = new User();
        AuthUserResponse userResponses = new AuthUserResponse();
        when(basicMapper.convertToResponse(userRequest, User.class)).thenReturn(user);
        when(userService.updateUserProfile(user)).thenReturn(authUserProjection);
        when(basicMapper.convertToResponse(authUserProjection, AuthUserResponse.class)).thenReturn(userResponses);
        assertEquals(userResponses, userMapper.updateUserProfile(userRequest));
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
