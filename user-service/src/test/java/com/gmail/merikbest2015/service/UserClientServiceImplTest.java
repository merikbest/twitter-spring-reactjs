package com.gmail.merikbest2015.service;


import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAdditionalInfoUserResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetAuthorResponse;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserChatResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.BlockUserRepository;
import com.gmail.merikbest2015.repository.FollowerUserRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.*;
import com.gmail.merikbest2015.service.impl.UserClientServiceImpl;
import com.gmail.merikbest2015.service.util.UserServiceHelper;
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
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
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

    @MockBean
    private UserServiceHelper userServiceHelper;

    @Before
    public void setUp() {
        super.setUp();
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

    @Test
    public void getSubscribersByUserId() {
        when(userRepository.getSubscribersByUserId(TestConstants.USER_ID)).thenReturn(ids);
        assertEquals(ids, userClientService.getSubscribersByUserId(TestConstants.USER_ID));
        verify(userRepository, times(1)).getSubscribersByUserId(TestConstants.USER_ID);
    }

    @Test
    public void isUserFollowByOtherUser() {
        when(userServiceHelper.isUserFollowByOtherUser(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userClientService.isUserFollowByOtherUser(TestConstants.USER_ID));
        verify(userServiceHelper, times(1)).isUserFollowByOtherUser(TestConstants.USER_ID);
    }

    @Test
    public void isUserHavePrivateProfile() {
        when(userServiceHelper.isUserHavePrivateProfile(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userClientService.isUserHavePrivateProfile(TestConstants.USER_ID));
        verify(userServiceHelper, times(1)).isUserHavePrivateProfile(TestConstants.USER_ID);
    }

    @Test
    public void isUserBlocked() {
        when(blockUserRepository.isUserBlocked(TestConstants.USER_ID, 1L)).thenReturn(true);
        assertTrue(userClientService.isUserBlocked(TestConstants.USER_ID, 1L));
        verify(blockUserRepository, times(1)).isUserBlocked(TestConstants.USER_ID, 1L);
    }

    @Test
    public void isUserBlockedByMyProfile() {
        when(userServiceHelper.isUserBlockedByMyProfile(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userClientService.isUserBlockedByMyProfile(TestConstants.USER_ID));
        verify(userServiceHelper, times(1)).isUserBlockedByMyProfile(TestConstants.USER_ID);
    }

    @Test
    public void isMyProfileBlockedByUser() {
        when(userServiceHelper.isMyProfileBlockedByUser(TestConstants.USER_ID)).thenReturn(true);
        assertTrue(userClientService.isMyProfileBlockedByUser(TestConstants.USER_ID));
        verify(userServiceHelper, times(1)).isMyProfileBlockedByUser(TestConstants.USER_ID);
    }

    @Test
    public void increaseNotificationsCount() {
        userClientService.increaseNotificationsCount(TestConstants.USER_ID);
        verify(userRepository, times(1)).increaseNotificationsCount(TestConstants.USER_ID);
    }

    @Test
    public void increaseMentionsCount() {
        userClientService.increaseMentionsCount(TestConstants.USER_ID);
        verify(userRepository, times(1)).increaseMentionsCount(TestConstants.USER_ID);
    }

    @Test
    public void updateLikeCount() {
        userClientService.updateLikeCount(true);
        verify(userRepository, times(1)).updateLikeCount(true, TestConstants.USER_ID);
    }

    @Test
    public void updateTweetCount() {
        userClientService.updateTweetCount(true);
        verify(userRepository, times(1)).updateTweetCount(true, TestConstants.USER_ID);
    }

    @Test
    public void updateMediaTweetCount() {
        userClientService.updateMediaTweetCount(true);
        verify(userRepository, times(1)).updateMediaTweetCount(true, TestConstants.USER_ID);
    }

    @Test
    public void getListOwnerById() {
        CommonUserResponse commonUserResponse = new CommonUserResponse();
        CommonUserProjection commonUserProjection = UserServiceTestHelper.createCommonUserProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, CommonUserProjection.class)).thenReturn(Optional.of(commonUserProjection));
        when(basicMapper.convertToResponse(commonUserProjection, CommonUserResponse.class)).thenReturn(commonUserResponse);
        assertEquals(commonUserResponse, userClientService.getListOwnerById(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, CommonUserProjection.class);
        verify(basicMapper, times(1)).convertToResponse(commonUserProjection, CommonUserResponse.class);
    }

    @Test
    public void getListParticipantsByIds() {
        List<ListMemberResponse> listMemberResponses = List.of(new ListMemberResponse(), new ListMemberResponse());
        List<ListMemberProjection> listMemberProjections = UserServiceTestHelper.createListMemberProjections();
        when(userRepository.getUsersByIds(ids, ListMemberProjection.class)).thenReturn(listMemberProjections);
        when(basicMapper.convertToResponseList(listMemberProjections, ListMemberResponse.class)).thenReturn(listMemberResponses);
        assertEquals(listMemberResponses, userClientService.getListParticipantsByIds(new IdsRequest(ids)));
        verify(userRepository, times(1)).getUsersByIds(ids, ListMemberProjection.class);
        verify(basicMapper, times(1)).convertToResponseList(listMemberProjections, ListMemberResponse.class);
    }

    @Test
    public void searchListMembersByUsername() {
        List<ListMemberResponse> listMemberResponses = List.of(new ListMemberResponse(), new ListMemberResponse());
        List<ListMemberProjection> listMemberProjections = UserServiceTestHelper.createListMemberProjections();
        when(userRepository.searchListMembersByUsername("test")).thenReturn(listMemberProjections);
        when(basicMapper.convertToResponseList(listMemberProjections, ListMemberResponse.class)).thenReturn(listMemberResponses);
        assertEquals(listMemberResponses, userClientService.searchListMembersByUsername("test"));
        verify(userRepository, times(1)).searchListMembersByUsername("test");
        verify(basicMapper, times(1)).convertToResponseList(listMemberProjections, ListMemberResponse.class);
    }

    @Test
    public void getNotificationUser() {
        NotificationUserResponse listMemberResponse = new NotificationUserResponse();
        NotificationUserProjection userProjection = UserServiceTestHelper.createNotificationUserProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, NotificationUserProjection.class)).thenReturn(Optional.of(userProjection));
        when(basicMapper.convertToResponse(userProjection, NotificationUserResponse.class)).thenReturn(listMemberResponse);
        assertEquals(listMemberResponse, userClientService.getNotificationUser(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, NotificationUserProjection.class);
        verify(basicMapper, times(1)).convertToResponse(listMemberResponse, NotificationUserResponse.class);
    }

    @Test
    public void getTweetAuthor() {
        TweetAuthorResponse tweetAuthorResponse = new TweetAuthorResponse();
        TweetAuthorProjection tweetAuthorProjection = UserServiceTestHelper.createTweetAuthorProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, TweetAuthorProjection.class)).thenReturn(Optional.of(tweetAuthorProjection));
        when(basicMapper.convertToResponse(tweetAuthorProjection, TweetAuthorResponse.class)).thenReturn(tweetAuthorResponse);
        assertEquals(tweetAuthorResponse, userClientService.getTweetAuthor(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, TweetAuthorProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetAuthorResponse, TweetAuthorResponse.class);
    }

    @Test
    public void getTweetAdditionalInfoUser() {
        TweetAdditionalInfoUserResponse infoUserResponse = new TweetAdditionalInfoUserResponse();
        TweetAdditionalInfoUserProjection tweetAdditionalInfoUserProjection = UserServiceTestHelper.createTweetAdditionalInfoUserProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, TweetAdditionalInfoUserProjection.class))
                .thenReturn(Optional.of(tweetAdditionalInfoUserProjection));
        when(basicMapper.convertToResponse(tweetAdditionalInfoUserProjection, TweetAdditionalInfoUserResponse.class))
                .thenReturn(infoUserResponse);
        assertEquals(infoUserResponse, userClientService.getTweetAdditionalInfoUser(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, TweetAdditionalInfoUserProjection.class);
        verify(basicMapper, times(1)).convertToResponse(tweetAdditionalInfoUserProjection, TweetAdditionalInfoUserResponse.class);
    }
}
