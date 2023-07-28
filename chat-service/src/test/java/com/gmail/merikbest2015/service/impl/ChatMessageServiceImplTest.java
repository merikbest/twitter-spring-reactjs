package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.util.ChatServiceHelper;
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

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatMessageServiceImplTest {

    @Autowired
    private ChatMessageServiceImpl chatMessageService;

    @MockBean
    private ChatRepository chatRepository;

    @MockBean
    private ChatParticipantRepository chatParticipantRepository;

    @MockBean
    private ChatMessageRepository chatMessageRepository;

    @MockBean
    private ChatServiceHelper chatServiceHelper;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getChatMessages() {
        List<ChatMessageProjection> mockChatMessages = ChatServiceTestHelper.createMockChatMessageProjectionList();
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.of(ChatServiceTestHelper.createMockChatProjection()));
        when(chatMessageRepository.getChatMessages(TestConstants.CHAT_ID)).thenReturn(mockChatMessages);
        assertEquals(mockChatMessages, chatMessageService.getChatMessages(TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class);
        verify(chatMessageRepository, times(1)).getChatMessages(TestConstants.CHAT_ID);
    }

    @Test
    public void getChatMessages_shouldChatNotFound() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.getChatMessages(TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void readChatMessages() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.of(ChatServiceTestHelper.createMockChatProjection()));
        when(chatMessageRepository.getUnreadMessagesCount(TestConstants.USER_ID)).thenReturn(123L);
        assertEquals(123L, chatMessageService.readChatMessages(TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class);
        verify(chatMessageRepository, times(1)).readChatMessages(TestConstants.CHAT_ID, TestConstants.USER_ID);
        verify(chatMessageRepository, times(1)).getUnreadMessagesCount(TestConstants.USER_ID);
    }

    @Test
    public void readChatMessages_shouldChatNotFound() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.readChatMessages(TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }





}
