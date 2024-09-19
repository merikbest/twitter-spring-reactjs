package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ChatErrorMessage;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.commons.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class ChatServiceImplTest extends AbstractServiceTest {

    @Autowired
    private ChatServiceImpl chatService;

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
        assertEquals(ChatErrorMessage.CHAT_NOT_FOUND, exception.getMessage());
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
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(mockAuthUser));
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L)).thenReturn(null);
        when(chatRepository.getChatById(newChat.getId())).thenReturn(ChatServiceTestHelper.createMockChatProjection());
        assertNull(chatService.createChat(1L));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(userRepository, times(1)).findById(1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).save(any());
    }

    @Test
    public void createChat_ShouldReturnChatProjection() {
        ChatProjection mockChatProjection = ChatServiceTestHelper.createMockChatProjection();
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        User mockUser = ChatServiceTestHelper.createMockUser(1L);
        when(userRepository.findById(TestConstants.USER_ID)).thenReturn(Optional.of(mockAuthUser));
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));
        when(chatRepository.getChatByParticipants(TestConstants.USER_ID, 1L))
                .thenReturn(ChatServiceTestHelper.createMockChat(false));
        when(chatRepository.getChatById(mockChatProjection.getId())).thenReturn(mockChatProjection);
        assertEquals(mockChatProjection, chatService.createChat(1L));
        verify(userRepository, times(1)).findById(TestConstants.USER_ID);
        verify(userRepository, times(1)).findById(1L);
        verify(chatRepository, times(1)).getChatByParticipants(TestConstants.USER_ID, 1L);
        verify(chatRepository, times(1)).getChatById(TestConstants.CHAT_ID);
    }
}
