package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.TweetClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.UserService;
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
    private UserService userService;

    @MockBean
    private TweetClient tweetClient;

    private ChatMessage chatMessage;
    private final Chat mockChat = ChatServiceTestHelper.createMockChat(false);
    private final ChatMessageProjection chatMessageProjection = ChatServiceTestHelper.createMockChatMessageProjectionList().get(0);
    private final Map<Long, ChatMessageProjection> chatParticipants = Map.of(
            1L, chatMessageProjection,
            3L, chatMessageProjection);
    private final List<Long> usersIds = List.of(1L, 2L, 3L);
    private final List<Long> validUserIds = List.of(1L, 3L);

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
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        ChatParticipant mockChatParticipant = ChatServiceTestHelper.createMockChatParticipant(mockAuthUser, mockChat);
        when(userService.getAuthUser()).thenReturn(mockAuthUser);
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(mockChat));
        when(chatParticipantRepository.getChatParticipantExcludeUserId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(Optional.of(mockChatParticipant));
        when(chatMessageRepository.getChatMessageById(chatMessage.getId())).thenReturn(Optional.of(chatMessageProjection));
        assertEquals(chatParticipants, chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        verify(userService, times(1)).getAuthUser();
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class);
        verify(chatMessageRepository, times(1)).save(chatMessage);
        verify(chatParticipantRepository, times(1)).updateParticipantWhoLeftChat(TestConstants.USER_ID, TestConstants.CHAT_ID);
        verify(chatMessageRepository, times(1)).getChatMessageById(chatMessage.getId());
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
        when(userService.getAuthUser()).thenReturn(ChatServiceTestHelper.createMockUser(TestConstants.USER_ID));
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void addMessage_shouldChatParticipantNotFound() {
        when(userService.getAuthUser()).thenReturn(ChatServiceTestHelper.createMockUser(TestConstants.USER_ID));
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, Chat.class))
                .thenReturn(Optional.of(mockChat));
        when(chatParticipantRepository.getChatParticipantExcludeUserId(TestConstants.USER_ID, TestConstants.CHAT_ID))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatMessageService.addMessage(chatMessage, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void addMessageWithTweet() {
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        List<User> mockUsers = List.of(
                ChatServiceTestHelper.createMockUser(1L),
                ChatServiceTestHelper.createMockUser(3L));
        when(tweetClient.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        when(userService.getAuthUser()).thenReturn(mockAuthUser);
        when(userService.getNotBlockedUsers(validUserIds)).thenReturn(mockUsers);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(mockChat);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 3L)).thenReturn(mockChat);
        when(chatMessageRepository.getChatMessageById(any())).thenReturn(Optional.of(chatMessageProjection));
        assertEquals(chatParticipants, chatMessageService.addMessageWithTweet("test text", TestConstants.TWEET_ID, validUserIds));
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 3L);
        verify(chatMessageRepository, times(2)).save(any());
        verify(chatParticipantRepository, times(2)).updateParticipantWhoLeftChat(any(), any());
    }

    @Test
    public void addMessageWithTweet_shouldCreateNewChat() {
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        List<User> mockUsers = List.of(
                ChatServiceTestHelper.createMockUser(1L),
                ChatServiceTestHelper.createMockUser(3L));
        Chat newChat = new Chat();
        ChatParticipant authorParticipant = new ChatParticipant();
        authorParticipant.setLeftChat(false);
        authorParticipant.setUser(ChatServiceTestHelper.createMockUser(1L));
        authorParticipant.setChat(newChat);
        ChatParticipant userParticipant = new ChatParticipant();
        userParticipant.setLeftChat(false);
        userParticipant.setUser(ChatServiceTestHelper.createMockUser(3L));
        userParticipant.setChat(newChat);
        when(tweetClient.isTweetExists(TestConstants.TWEET_ID)).thenReturn(true);
        when(userService.getAuthUser()).thenReturn(mockAuthUser);
        when(userService.getNotBlockedUsers(validUserIds)).thenReturn(mockUsers);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(null);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 3L)).thenReturn(newChat);
        when(chatMessageRepository.getChatMessageById(any())).thenReturn(Optional.of(chatMessageProjection));
        assertEquals(chatParticipants, chatMessageService.addMessageWithTweet("test text", TestConstants.TWEET_ID, validUserIds));
        verify(chatRepository, times(1)).save(any());
        verify(chatMessageRepository, times(2)).save(any());
        verify(chatParticipantRepository, times(1)).updateParticipantWhoLeftChat(any(), any());
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
