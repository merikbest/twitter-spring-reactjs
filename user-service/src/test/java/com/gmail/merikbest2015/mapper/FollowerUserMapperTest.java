package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.constants.UserSuccessMessage;
import com.gmail.merikbest2015.dto.response.FollowerUserResponse;
import com.gmail.merikbest2015.dto.response.UserProfileResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.repository.projection.BaseUserProjection;
import com.gmail.merikbest2015.repository.projection.FollowerUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.FollowerUserService;
import com.gmail.merikbest2015.commons.util.TestConstants;
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
public class FollowerUserMapperTest {

    @InjectMocks
    private FollowerUserMapper followerUserMapper;

    @Mock
    private FollowerUserService followerUserService;

    @Mock
    private BasicMapper basicMapper;

    private static final PageRequest pageable = PageRequest.of(0, 20);

    @Test
    public void getFollowers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        when(followerUserService.getFollowers(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, UserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, followerUserMapper.getFollowers(TestConstants.USER_ID, pageable));
        verify(followerUserService, times(1)).getFollowers(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getFollowing() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        HeaderResponse<UserResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserResponse(), new UserResponse()), new HttpHeaders());
        when(followerUserService.getFollowing(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, UserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, followerUserMapper.getFollowing(TestConstants.USER_ID, pageable));
        verify(followerUserService, times(1)).getFollowing(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getFollowerRequests() {
        Page<FollowerUserProjection> userProjections = UserServiceTestHelper.createFollowerUserProjections();
        HeaderResponse<FollowerUserResponse> headerResponse = new HeaderResponse<>(
                List.of(new FollowerUserResponse(), new FollowerUserResponse()), new HttpHeaders());
        when(followerUserService.getFollowerRequests(pageable)).thenReturn(userProjections);
        when(basicMapper.getHeaderResponse(userProjections, FollowerUserResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, followerUserMapper.getFollowerRequests(pageable));
        verify(followerUserService, times(1)).getFollowerRequests(pageable);
    }

    @Test
    public void processFollow() {
        when(followerUserService.processFollow(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(followerUserMapper.processFollow(TestConstants.USER_ID));
        verify(followerUserService, times(1)).processFollow(TestConstants.USER_ID);
    }

    @Test
    public void overallFollowers() {
        List<BaseUserProjection> baseUserProjections = UserServiceTestHelper.createBaseUserProjections();
        List<UserResponse> userResponses = List.of(new UserResponse(), new UserResponse());
        when(followerUserService.overallFollowers(TestConstants.USER_ID)).thenReturn(baseUserProjections);
        when(basicMapper.convertToResponseList(baseUserProjections, UserResponse.class)).thenReturn(userResponses);
        assertEquals(userResponses, followerUserMapper.overallFollowers(TestConstants.USER_ID));
        verify(followerUserService, times(1)).overallFollowers(TestConstants.USER_ID);
    }

    @Test
    public void processFollowRequestToPrivateProfile() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        UserProfileResponse userProfileResponse = new UserProfileResponse();
        when(followerUserService.processFollowRequestToPrivateProfile(TestConstants.USER_ID)).thenReturn(userProfileProjection);
        when(basicMapper.convertToResponse(userProfileProjection, UserProfileResponse.class)).thenReturn(userProfileResponse);
        assertEquals(userProfileResponse, followerUserMapper.processFollowRequestToPrivateProfile(TestConstants.USER_ID));
        verify(followerUserService, times(1)).processFollowRequestToPrivateProfile(TestConstants.USER_ID);
    }

    @Test
    public void acceptFollowRequest() {
        String message = String.format(UserSuccessMessage.USER_ACCEPTED, TestConstants.USER_ID);
        when(followerUserService.acceptFollowRequest(TestConstants.USER_ID)).thenReturn(message);
        assertEquals(message, followerUserMapper.acceptFollowRequest(TestConstants.USER_ID));
        verify(followerUserService, times(1)).acceptFollowRequest(TestConstants.USER_ID);
    }

    @Test
    public void declineFollowRequest() {
        String message = String.format(UserSuccessMessage.USER_DECLINED, TestConstants.USER_ID);
        when(followerUserService.declineFollowRequest(TestConstants.USER_ID)).thenReturn(message);
        assertEquals(message, followerUserMapper.declineFollowRequest(TestConstants.USER_ID));
        verify(followerUserService, times(1)).declineFollowRequest(TestConstants.USER_ID);
    }
}
