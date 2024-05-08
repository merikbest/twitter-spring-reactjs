package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.UserServiceTestHelper;
import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.repository.projection.NotificationUserProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class UserClientServiceImplTest extends AbstractServiceTest {

    @Autowired
    private UserClientService userClientService;

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
    public void getNotificationUser() {
        NotificationUserResponse listMemberResponse = new NotificationUserResponse();
        NotificationUserProjection userProjection = UserServiceTestHelper.createNotificationUserProjection();
        when(userRepository.getUserById(TestConstants.USER_ID, NotificationUserProjection.class)).thenReturn(Optional.of(userProjection));
        when(basicMapper.convertToResponse(userProjection, NotificationUserResponse.class)).thenReturn(listMemberResponse);
        assertEquals(listMemberResponse, userClientService.getNotificationUser(TestConstants.USER_ID));
        verify(userRepository, times(1)).getUserById(TestConstants.USER_ID, NotificationUserProjection.class);
        verify(basicMapper, times(1)).convertToResponse(userProjection, NotificationUserResponse.class);
    }

    @Test
    public void getUsersWhichUserSubscribed() {
        NotificationUserProjection userProjection = UserServiceTestHelper.createNotificationUserProjection();
        List<NotificationUserProjection> notificationUserProjections = List.of(userProjection);
        List<NotificationUserResponse> notificationUserResponses = List.of(new NotificationUserResponse());
        when(userRepository.getUsersWhichUserSubscribed(TestConstants.USER_ID)).thenReturn(notificationUserProjections);
        when(basicMapper.convertToResponseList(notificationUserProjections, NotificationUserResponse.class)).thenReturn(notificationUserResponses);
        assertEquals(notificationUserResponses, userClientService.getUsersWhichUserSubscribed());
        verify(userRepository, times(1)).getUsersWhichUserSubscribed(TestConstants.USER_ID);
        verify(basicMapper, times(1)).convertToResponseList(notificationUserProjections, NotificationUserResponse.class);
    }

    @Test
    public void getUserIdsWhichUserSubscribed() {
        when(userRepository.getUserIdsWhichUserSubscribed(TestConstants.USER_ID)).thenReturn(ids);
        assertEquals(ids, userClientService.getUserIdsWhichUserSubscribed());
        verify(userRepository, times(1)).getUserIdsWhichUserSubscribed(TestConstants.USER_ID);
    }

    @Test
    public void resetNotificationCount() {
        userClientService.resetNotificationCount();
        verify(userRepository, times(1)).resetNotificationCount(TestConstants.USER_ID);
    }

    @Test
    public void resetMentionCount() {
        userClientService.resetMentionCount();
        verify(userRepository, times(1)).resetMentionCount(TestConstants.USER_ID);
    }
}
