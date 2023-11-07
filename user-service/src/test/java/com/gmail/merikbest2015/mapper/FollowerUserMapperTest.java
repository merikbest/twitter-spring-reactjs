package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.repository.projection.BaseUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.FollowerUserService;
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

public class FollowerUserMapperTest extends AbstractAuthTest {

    @Autowired
    private FollowerUserMapper followerUserMapper;

    @MockBean
    private FollowerUserService followerUserService;

    @Test
    public void getFollowers() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(followerUserService.getFollowers(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        followerUserMapper.getFollowers(TestConstants.USER_ID, pageable);
        verify(followerUserService, times(1)).getFollowers(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getFollowing() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(followerUserService.getFollowing(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        followerUserMapper.getFollowing(TestConstants.USER_ID, pageable);
        verify(followerUserService, times(1)).getFollowing(TestConstants.USER_ID, pageable);
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
        when(followerUserService.overallFollowers(TestConstants.USER_ID)).thenReturn(baseUserProjections);
        followerUserMapper.overallFollowers(TestConstants.USER_ID);
        verify(followerUserService, times(1)).overallFollowers(TestConstants.USER_ID);
    }

    @Test
    public void processFollowRequestToPrivateProfile() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        when(followerUserService.processFollowRequestToPrivateProfile(TestConstants.USER_ID)).thenReturn(userProfileProjection);
        followerUserMapper.processFollowRequestToPrivateProfile(TestConstants.USER_ID);
        verify(followerUserService, times(1)).processFollowRequestToPrivateProfile(TestConstants.USER_ID);
    }

    @Test
    public void acceptFollowRequest() {
        String message = String.format("User (id:%s) accepted.", TestConstants.USER_ID);
        when(followerUserService.acceptFollowRequest(TestConstants.USER_ID)).thenReturn(message);
        assertEquals(message, followerUserMapper.acceptFollowRequest(TestConstants.USER_ID));
        verify(followerUserService, times(1)).acceptFollowRequest(TestConstants.USER_ID);
    }

    @Test
    public void declineFollowRequest() {
        String message = String.format("User (id:%s) declined.", TestConstants.USER_ID);
        when(followerUserService.declineFollowRequest(TestConstants.USER_ID)).thenReturn(message);
        assertEquals(message, followerUserMapper.declineFollowRequest(TestConstants.USER_ID));
        verify(followerUserService, times(1)).declineFollowRequest(TestConstants.USER_ID);
    }
}
