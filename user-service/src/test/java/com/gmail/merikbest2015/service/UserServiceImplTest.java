package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.request.SearchTermsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TagClient;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.repository.projection.CommonUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProfileProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.impl.UserServiceImpl;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.INCORRECT_USERNAME_LENGTH;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class UserServiceImplTest extends AbstractAuthTest {

    @Autowired
    private UserServiceImpl userService;

    @MockBean
    private AuthenticationService authenticationService;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private UserServiceHelper userServiceHelper;

    @MockBean
    private TweetClient tweetClient;

    @MockBean
    private TagClient tagClient;

    @Test
    public void getUserById_ShouldReturnUserProfileProjection() {
        UserProfileProjection userProfileProjection = UserServiceTestHelper.createUserProfileProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, UserProfileProjection.class))
                .thenReturn(Optional.of(userProfileProjection));
        assertEquals(userProfileProjection, userService.getUserById(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, UserProfileProjection.class);
    }

    @Test
    public void getUserById_ShouldThrowUserNotFoundException() {
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.getUserById(TestConstants.USER_ID));
        assertEquals(INCORRECT_USERNAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void getUsers_ShouldReturnUserProjectionList() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        when(userRepository.findByActiveTrueAndIdNot(TestConstants.USER_ID, pageable)).thenReturn(userProjections);
        assertEquals(userProjections, userService.getUsers(pageable));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).findByActiveTrueAndIdNot(TestConstants.USER_ID, pageable);
    }

    @Test
    public void getRelevantUsers_ShouldReturnUserProjectionList() {
        List<UserProjection> userProjections = UserServiceTestHelper.createUserProjections().getContent();
        when(userRepository.findTop5ByActiveTrue()).thenReturn(userProjections);
        assertEquals(userProjections, userService.getRelevantUsers());
        verify(userRepository, times(1)).findTop5ByActiveTrue();
    }

    @Test
    public void searchUsersByUsername_ShouldReturnUserProjectionList() {
        Page<UserProjection> userProjections = UserServiceTestHelper.createUserProjections();
        when(userRepository.searchUsersByUsername("test", pageable, UserProjection.class)).thenReturn(userProjections);
        assertEquals(userProjections, userService.searchUsersByUsername("test", pageable, UserProjection.class));
        verify(userRepository, times(1)).searchUsersByUsername("test", pageable, UserProjection.class);
    }

    @Test
    public void searchByText_ShouldReturnCommonUserProjectionListMap() {
        List<String> tags = List.of("#test1", "#test1");
        List<CommonUserProjection> commonUserProjectionList = List.of(UserServiceTestHelper.createCommonUserProjection());
        Map<String, Object> map = Map.of("tweetCount", TestConstants.TWEET_COUNT, "tags", tags, "users", commonUserProjectionList);
        when(tweetClient.getTweetCountByText("test")).thenReturn(TestConstants.TWEET_COUNT);
        when(tagClient.getTagsByText("test")).thenReturn(tags);
        when(userRepository.searchUserByText("test")).thenReturn(commonUserProjectionList);
        assertEquals(map, userService.searchByText("test"));
        verify(tweetClient, times(1)).getTweetCountByText("test");
        verify(tagClient, times(1)).getTagsByText("test");
        verify(userRepository, times(1)).searchUserByText("test");
    }

    @Test
    public void getSearchResults_ShouldReturnCommonUserProjectionList() {
        SearchTermsRequest request = new SearchTermsRequest();
        request.setUsers(List.of(1L));
        List<CommonUserProjection> commonUserProjectionList = List.of(UserServiceTestHelper.createCommonUserProjection());
        when(userRepository.getUsersByIds(request.getUsers(), CommonUserProjection.class)).thenReturn(commonUserProjectionList);
        assertEquals(commonUserProjectionList, userService.getSearchResults(request));
        verify(userRepository, times(1)).getUsersByIds(request.getUsers(), CommonUserProjection.class);
    }

    @Test
    public void startUseTwitter_ShouldReturnTrue() {
        when(authenticationService.getAuthenticatedUserId()).thenReturn(TestConstants.USER_ID);
        assertTrue(userService.startUseTwitter());
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).updateProfileStarted(TestConstants.USER_ID);
    }

    @Test
    public void updateUserProfile_ShouldReturnAuthUserProjection() {
        User user = new User();
        user.setId(TestConstants.USER_ID);
        User userInfo = new User();
        userInfo.setFullName(TestConstants.FULL_NAME);
        userInfo.setAvatar(TestConstants.AVATAR_SRC_1);
        userInfo.setWallpaper(TestConstants.WALLPAPER_SRC);
        userInfo.setAbout(TestConstants.ABOUT);
        userInfo.setLocation(TestConstants.LOCATION);
        userInfo.setWebsite(TestConstants.WEBSITE);
        userInfo.setProfileCustomized(true);
        AuthUserProjection authUserProjection = UserServiceTestHelper.createAuthUserProjection();
        when(authenticationService.getAuthenticatedUser()).thenReturn(user);
        when(userRepository.getUserById(TestConstants.USER_ID, AuthUserProjection.class)).thenReturn(Optional.of(authUserProjection));
        assertEquals(authUserProjection, userService.updateUserProfile(userInfo));
        verify(authenticationService, times(1)).getAuthenticatedUserId();
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, AuthUserProjection.class);
    }

    @Test
    public void updateUserProfile_ShouldThrowIncorrectUsernameLengthException() {
        User userInfo = new User();
        userInfo.setFullName("");
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userService.updateUserProfile(userInfo));
        assertEquals(INCORRECT_USERNAME_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
