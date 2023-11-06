package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.FollowerUserService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;

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
}
