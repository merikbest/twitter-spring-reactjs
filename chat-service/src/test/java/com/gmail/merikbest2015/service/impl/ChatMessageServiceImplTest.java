package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
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
    private final Chat mockChat = ChatServiceTestHelper.createMockChat(false);
    private final ChatMessageProjection chatMessageProjection = ChatServiceTestHelper.createMockChatMessageProjectionList().get(0);
    private final Map<Long, ChatMessageProjection> chatParticipants = Map.of(
            TestConstants.USER_ID, chatMessageProjection,
            1L, chatMessageProjection);
    private final List<Long> usersIds = List.of(1L, 2L, 3L);
    private final List<Long> validUserIds = List.of(1L, 2L);

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
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(mockChat));
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
                .thenReturn(Optional.of(mockChat));
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
                .thenReturn(Optional.of(mockChat));
        when(chatParticipantRepository.getChatParticipantId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(1L);
        when(userClient.isUserBlockedByMyProfile(TestConstants.USER_ID)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(true);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_BLOCKED, exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
    }

    @Test
    public void addMessageWithTweet() {
        when(tweetClient.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        when(userClient.validateChatUsersIds(new IdsRequest(usersIds))).thenReturn(validUserIds);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(mockChat);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(false);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 2L)).thenReturn(mockChat);
        when(userClient.isMyProfileBlockedByUser(2L)).thenReturn(false);
        when(chatMessageRepository.getChatMessageById(any())).thenReturn(Optional.of(chatMessageProjection));
        assertEquals(chatParticipants, chatMessageService.addMessageWithTweet("test text", TestConstants.TWEET_ID, usersIds));
        verify(tweetClient, times(1)).isTweetExists(TestConstants.TWEET_ID);
        verify(userClient, times(1)).validateChatUsersIds(new IdsRequest(usersIds));
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 2L);
        verify(userClient, times(2)).isMyProfileBlockedByUser(any());
        verify(chatMessageRepository, times(2)).save(any());
        verify(chatParticipantRepository, times(2)).updateParticipantWhoLeftChat(any(), any());
        verify(chatMessageRepository, times(2)).getChatMessageById(any());
    }

    @Test
    public void addMessageWithTweet_shouldCreateNewChat() {
        Chat newChat = new Chat();
        ChatParticipant authorParticipant = new ChatParticipant();
        authorParticipant.setId(11L);
        authorParticipant.setLeftChat(false);
        authorParticipant.setUserId(TestConstants.USER_ID);
        authorParticipant.setChat(newChat);
        ChatParticipant userParticipant = new ChatParticipant();
        userParticipant.setId(12L);
        userParticipant.setLeftChat(false);
        userParticipant.setUserId(1L);
        userParticipant.setChat(newChat);
        when(tweetClient.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        when(userClient.validateChatUsersIds(new IdsRequest(usersIds))).thenReturn(validUserIds);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(null);
        when(userClient.isMyProfileBlockedByUser(1L)).thenReturn(false);
        when(userClient.isMyProfileBlockedByUser(2L)).thenReturn(false);
        when(chatParticipantRepository.save(new ChatParticipant(TestConstants.USER_ID, newChat))).thenReturn(authorParticipant);
        when(chatParticipantRepository.save(new ChatParticipant(1L, newChat))).thenReturn(userParticipant);
        when(chatMessageRepository.getChatMessageById(any())).thenReturn(Optional.of(chatMessageProjection));
        assertEquals(chatParticipants, chatMessageService.addMessageWithTweet("test text", TestConstants.TWEET_ID, usersIds));
        verify(tweetClient, times(1)).isTweetExists(TestConstants.TWEET_ID);
        verify(userClient, times(1)).validateChatUsersIds(new IdsRequest(usersIds));
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 2L);
        verify(userClient, times(2)).isMyProfileBlockedByUser(any());
        verify(chatParticipantRepository, times(4)).save(any());
        verify(chatMessageRepository, times(2)).save(any());
        verify(chatMessageRepository, times(2)).getChatMessageById(any());
    }

    @Test
    public void addMessageWithTweet_shouldReturnTweetNotFoundException() {
        when(tweetClient.isTweetExists(TestConstants.TWEET_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessageWithTweet("test text", TestConstants.TWEET_ID, usersIds));
        assertEquals(TWEET_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
