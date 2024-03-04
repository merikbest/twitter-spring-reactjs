package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ChatRepository;
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

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatServiceImplTest {

    @Autowired
    private ChatServiceImpl chatService;

    @MockBean
    private ChatRepository chatRepository;

    @MockBean
    private UserService userService;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getChatById() {
        ChatProjection mockChatProjection = ChatServiceTestHelper.createMockChatProjection();
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.of(mockChatProjection));
        assertEquals(mockChatProjection, chatService.getChatById(TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class);
    }

    @Test
    public void getChatById_ShouldChatNotFound() {
        when(chatRepository.getChatById(TestConstants.CHAT_ID, TestConstants.USER_ID, ChatProjection.class))
                .thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatService.getChatById(TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getUserChats() {
        ChatProjection mockChatProjection1 = ChatServiceTestHelper.createMockChatProjection();
        ChatProjection mockChatProjection2 = ChatServiceTestHelper.createMockChatProjection();
        List<ChatProjection> mockChatProjections = List.of(mockChatProjection1, mockChatProjection2);
        when(chatRepository.getChatsByUserId(TestConstants.USER_ID)).thenReturn(mockChatProjections);
        assertEquals(mockChatProjections, chatService.getUserChats());
        verify(chatRepository, times(1)).getChatsByUserId(TestConstants.USER_ID);
    }

    @Test
    public void createChat() {
        Chat newChat = new Chat();
        newChat.setId(TestConstants.CHAT_ID);
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        User mockUser = ChatServiceTestHelper.createMockUser(1L);
        when(userService.getAuthUser()).thenReturn(mockAuthUser);
        when(userService.getUserById(1L)).thenReturn(mockUser);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(null);
        when(chatRepository.getChatById(newChat.getId())).thenReturn(ChatServiceTestHelper.createMockChatProjection());
        assertNull(chatService.createChat(1L));
        verify(userService, times(1)).getAuthUser();
        verify(userService, times(1)).getUserById(1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).save(any());
    }

    @Test
    public void createChat_ShouldReturnChatProjection() {
        ChatProjection mockChatProjection = ChatServiceTestHelper.createMockChatProjection();
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        User mockUser = ChatServiceTestHelper.createMockUser(1L);
        when(userService.getAuthUser()).thenReturn(mockAuthUser);
        when(userService.getUserById(1L)).thenReturn(mockUser);
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L))
                .thenReturn(ChatServiceTestHelper.createMockChat(false));
        when(chatRepository.getChatById(mockChatProjection.getId())).thenReturn(mockChatProjection);
        assertEquals(mockChatProjection, chatService.createChat(1L));
        verify(userService, times(1)).getAuthUser();
        verify(userService, times(1)).getUserById(1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID);
    }
}
