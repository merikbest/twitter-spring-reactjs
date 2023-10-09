package com.gmail.merikbest2015.service;


import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.user.UserChatResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.service.impl.UserClientServiceImpl;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpHeaders;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserClientServiceImplTest extends AbstractAuthTest {

    @Autowired
    private UserClientServiceImpl userClientService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private FollowerUserRepository followerUserRepository;

    @MockBean
    private BlockUserRepository blockUserRepository;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private AuthenticationService authenticationService;

    @Before
    public void setUp() {
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
    }

    @Test
    public void getUserFollowersIds_ShouldReturnUserIds() {
        when(followerUserRepository.getUserFollowersIds(TestConstants.USER_ID)).thenReturn(ids);
        assertEquals(4, userClientService.getUserFollowersIds().size());
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(followerUserRepository, times(1)).getUserFollowersIds(TestConstants.USER_ID);
    }

    @Test
    public void searchUsersByUsername_ShouldReturnUserChatResponse() {
        UserChatProjection userChatProjection = UserServiceTestHelper.createUserChatProjection();
        PageImpl<UserChatProjection> userChatProjections = new PageImpl<>(List.of(userChatProjection), pageable, 20);
        HeaderResponse<UserChatResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserChatResponse(), new UserChatResponse()), new HttpHeaders());
        when(userRepository.searchUsersByUsername("test", pageable, UserChatProjection.class)).thenReturn(userChatProjections);
        when(basicMapper.getHeaderResponse(userChatProjections, UserChatResponse.class)).thenReturn(headerResponse);
        assertEquals(headerResponse, userClientService.searchUsersByUsername("test", pageable));
        verify(userRepository, times(1)).searchUsersByUsername("test", pageable, UserChatProjection.class);
        verify(basicMapper, times(1)).getHeaderResponse(userChatProjections, UserChatResponse.class);
    }
}
