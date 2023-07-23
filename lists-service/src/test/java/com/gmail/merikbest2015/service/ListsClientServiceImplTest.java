package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.ListsServiceTestHelper;
import com.gmail.merikbest2015.dto.response.notification.NotificationListResponse;
import com.gmail.merikbest2015.dto.response.tweet.TweetListResponse;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.projection.NotificationListProjection;
import com.gmail.merikbest2015.repository.projection.TweetListProjection;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ListsClientServiceImplTest {

    @Autowired
    private ListsClientService listsClientService;

    @MockBean
    private ListsRepository listsRepository;

    @MockBean
    private UserClient userClient;

    @MockBean
    private BasicMapper basicMapper;

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getAllTweetLists() {
        NotificationListProjection notificationList = factory.createProjection(
                NotificationListProjection.class,
                Map.of("id", 1L, "name", TestConstants.LIST_NAME));
        NotificationListResponse listResponse = new NotificationListResponse();
        listResponse.setId(1L);
        listResponse.setName(TestConstants.LIST_NAME);
        when(listsRepository.getListById(1L, NotificationListProjection.class)).thenReturn(notificationList);
        when(basicMapper.convertToResponse(notificationList, NotificationListResponse.class)).thenReturn(listResponse);
        assertEquals(listResponse, listsClientService.getNotificationList(1L));
        verify(listsRepository, times(1)).getListById(1L, NotificationListProjection.class);
        verify(basicMapper, times(1)).convertToResponse(notificationList, NotificationListResponse.class);
    }

    @Test
    public void getTweetList() {
        TweetListResponse tweetListResponse = new TweetListResponse();
        tweetListResponse.setId(1L);
        tweetListResponse.setName(TestConstants.LIST_NAME);
        tweetListResponse.setAltWallpaper(TestConstants.LIST_ALT_WALLPAPER);
        tweetListResponse.setWallpaper("");
        tweetListResponse.setListOwner(new CommonUserResponse());
        tweetListResponse.setPrivate(false);
        tweetListResponse.setMembersSize(1L);
        when(listsRepository.getListById(1L, USER_ID, TweetListProjection.class))
                .thenReturn(Optional.of(ListsServiceTestHelper.mockTweetListProjection()));
        when(userClient.isUserBlocked(TestConstants.LIST_USER_ID, USER_ID)).thenReturn(false);
        when(userClient.isUserHavePrivateProfile(TestConstants.LIST_USER_ID)).thenReturn(false);
        when(basicMapper.convertToResponse(1L, TweetListResponse.class)).thenReturn(tweetListResponse);
        assertEquals(tweetListResponse, listsClientService.getTweetList(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, TweetListProjection.class);
        verify(userClient, times(1)).isUserBlocked(TestConstants.LIST_USER_ID, USER_ID);
        verify(userClient, times(1)).isUserHavePrivateProfile(TestConstants.LIST_USER_ID);
        verify(basicMapper, times(1)).convertToResponse(1L, TweetListResponse.class);
    }

    @Test
    public void getTweetList_shouldReturnEmptyTweetListResponse() {
        when(listsRepository.getListById(1L, USER_ID, TweetListProjection.class)).thenReturn(Optional.empty());
        assertEquals(new TweetListResponse(), listsClientService.getTweetList(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, TweetListProjection.class);
    }

    @Test
    public void getTweetList_shouldUserBlockAndReturnEmptyTweetListResponse() {
        when(listsRepository.getListById(1L, USER_ID, TweetListProjection.class))
                .thenReturn(Optional.of(ListsServiceTestHelper.mockTweetListProjection()));
        when(userClient.isUserBlocked(TestConstants.LIST_USER_ID, USER_ID)).thenReturn(true);
        assertEquals(new TweetListResponse(), listsClientService.getTweetList(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, TweetListProjection.class);
        verify(userClient, times(1)).isUserBlocked(TestConstants.LIST_USER_ID, USER_ID);
    }

    @Test
    public void getTweetList_shouldUserHavePrivateProfileAndReturnEmptyTweetListResponse() {
        when(listsRepository.getListById(1L, USER_ID, TweetListProjection.class))
                .thenReturn(Optional.of(ListsServiceTestHelper.mockTweetListProjection()));
        when(userClient.isUserBlocked(TestConstants.LIST_USER_ID, USER_ID)).thenReturn(false);
        when(userClient.isUserHavePrivateProfile(TestConstants.LIST_USER_ID)).thenReturn(true);
        assertEquals(new TweetListResponse(), listsClientService.getTweetList(1L));
        verify(listsRepository, times(1)).getListById(1L, USER_ID, TweetListProjection.class);
        verify(userClient, times(1)).isUserBlocked(TestConstants.LIST_USER_ID, USER_ID);
        verify(userClient, times(1)).isUserHavePrivateProfile(TestConstants.LIST_USER_ID);
    }
}
