package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.repository.projection.CommonUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;

import java.util.List;

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
}
