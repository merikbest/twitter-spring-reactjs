package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
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

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatMessageServiceImplTest {

    @Autowired
    private ChatMessageServiceImpl chatMessageService;

    @Autowired
    private ChatServiceHelper chatServiceHelper;

    @MockBean
    private ChatRepository chatRepository;

    @MockBean
    private ChatParticipantRepository chatParticipantRepository;

    @MockBean
    private ChatMessageRepository chatMessageRepository;

    @MockBean
    private UserClient userClient;

    @MockBean
    private TweetClient tweetClient;

    private ChatMessage chatMessage;

    @Before
    public void setUp() {
        chatMessage = new ChatMessage();
        chatMessage.setId(2L);
        chatMessage.setText("test text");
        chatMessage.setDate(LocalDateTime.now());
        chatMessage.setUnread(false);
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

    @Test
    public void addMessage() {
        ChatMessageProjection chatMessageProjection = ChatServiceTestHelper.createMockChatMessageProjectionList().get(0);
        Map<Long, ChatMessageProjection> chatParticipants = Map.of(
                TestConstants.USER_ID, chatMessageProjection,
                1L, chatMessageProjection);
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(ChatServiceTestHelper.createMockChat()));
        when(chatParticipantRepository.getChatParticipantId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(1L);
        when(userClient.isUserBlockedByMyProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(false);
        when(chatMessageRepository.getChatMessageById(chatMessage.getId())).thenReturn(Optional.of(chatMessageProjection));
        when(chatParticipantRepository.getChatParticipantIds(TestConstants.CHAT_ID))
                .thenReturn(Arrays.asList(TestConstants.USER_ID, 1L));
        assertEquals(chatParticipants, chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class);
        verify(chatParticipantRepository, times(1)).getChatParticipantId(TestConstants.USER_ID, TestConstants.CHAT_ID);
        verify(userClient, times(1)).isUserBlockedByMyProfile(TestConstants.USER_ID);
        verify(userClient, times(1)).isMyProfileBlockedByUser(1L);
        verify(chatMessageRepository, times(1)).save(chatMessage);
        verify(chatMessageRepository, times(1)).getChatMessageById(chatMessage.getId());
        verify(chatParticipantRepository, times(1)).updateParticipantWhoLeftChat(1L, TestConstants.CHAT_ID);
        verify(chatParticipantRepository, times(1)).getChatParticipantIds(TestConstants.CHAT_ID);
    }

    @Test
    public void addMessage_shouldReturnIncorrectChatMessageLength() {
        chatMessage.setText("");
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(INCORRECT_CHAT_MESSAGE_LENGTH, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void addMessage_shouldChatNotFound() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void addMessage_shouldUserBlockedByMyProfile() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(ChatServiceTestHelper.createMockChat()));
        when(chatParticipantRepository.getChatParticipantId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(1L);
        when(userClient.isUserBlockedByMyProfile(TestConstants.USER_ID)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void addMessage_shouldMyProfileBlockedByUser() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(ChatServiceTestHelper.createMockChat()));
        when(chatParticipantRepository.getChatParticipantId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(1L);
        when(userClient.isUserBlockedByMyProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }
}
