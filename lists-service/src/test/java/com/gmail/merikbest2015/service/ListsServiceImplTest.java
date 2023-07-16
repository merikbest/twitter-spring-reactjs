package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.ListsServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.repository.ListsFollowersRepository;
import com.gmail.merikbest2015.repository.ListsMembersRepository;
import com.gmail.merikbest2015.repository.ListsRepository;
import com.gmail.merikbest2015.repository.PinnedListsRepository;
import com.gmail.merikbest2015.repository.projection.BaseListProjection;
import com.gmail.merikbest2015.repository.projection.ListUserProjection;
import com.gmail.merikbest2015.service.util.ListsServiceHelper;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.ListsServiceTestHelper.createMockLists;
import static com.gmail.merikbest2015.constants.ErrorMessage.LIST_NOT_FOUND;
import static com.gmail.merikbest2015.util.TestConstants.LIST_USER_ID;
import static com.gmail.merikbest2015.util.TestConstants.USER_ID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ListsServiceImplTest {

    @Autowired
    private ListsService listsService;

    @MockBean
    private ListsRepository listsRepository;

    @MockBean
    private ListsFollowersRepository listsFollowersRepository;

    @MockBean
    private ListsMembersRepository listsMembersRepository;

    @MockBean
    private PinnedListsRepository pinnedListsRepository;

    @MockBean
    private ListsServiceHelper listsServiceHelper;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getAllTweetLists() {
        List<Long> listOwnerIds = List.of(1L, 2L, 3L);
        List<Long> validListUserIds = List.of(1L, 2L);
        when(listsRepository.getListOwnerIds()).thenReturn(listOwnerIds);
        when(userClient.getValidUserIds(new IdsRequest(listOwnerIds))).thenReturn(validListUserIds);
        when(listsRepository.getAllTweetLists(validListUserIds))
                .thenReturn(ListsServiceTestHelper.createMockListProjectionList());
        assertEquals(2, listsService.getAllTweetLists().size());
        verify(listsRepository, times(1)).getListOwnerIds();
        verify(userClient, times(1)).getValidUserIds(new IdsRequest(listOwnerIds));
        verify(listsRepository, times(1)).getAllTweetLists(validListUserIds);
    }

    @Test
    public void getUserTweetLists() {
        when(listsRepository.getUserTweetLists(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockListUserProjectionList());
        assertEquals(2, listsService.getUserTweetLists().size());
        verify(listsRepository, times(1)).getUserTweetLists(USER_ID);
    }

    @Test
    public void getUserPinnedLists() {
        when(listsRepository.getUserPinnedLists(USER_ID))
                .thenReturn(ListsServiceTestHelper.createMockPinnedListProjectionList());
        assertEquals(2, listsService.getUserPinnedLists().size());
        verify(listsRepository, times(1)).getUserPinnedLists(USER_ID);
    }
}
