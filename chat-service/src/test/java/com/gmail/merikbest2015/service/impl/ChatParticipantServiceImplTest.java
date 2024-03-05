package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.util.TestConstants;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;
import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;
import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_PARTICIPANT_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatParticipantServiceImplTest {

    @Autowired
    private ChatParticipantServiceImpl chatParticipantService;

    @MockBean
    private ChatRepository chatRepository;

    @MockBean
    private ChatParticipantRepository chatParticipantRepository;

    @MockBean
    private UserService userService;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getParticipant() {
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        ChatParticipant mockChatParticipant = ChatServiceTestHelper.createMockChatParticipant(mockAuthUser, new Chat());
        UserProjection userProjection = ChatServiceTestHelper.createUserProjection();
        when(chatRepository.isChatExists(TestConstants.CHAT_ID, TestConstants.USER_ID)).thenReturn(true);
        when(chatParticipantRepository.getChatParticipant(1L, TestConstants.CHAT_ID)).thenReturn(Optional.of(mockChatParticipant));
        when(userService.getUserProjectionById(TestConstants.USER_ID)).thenReturn(userProjection);
        assertEquals(userProjection, chatParticipantService.getParticipant(1L, TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).isChatExists(TestConstants.CHAT_ID, TestConstants.USER_ID);
        verify(chatParticipantRepository, times(1)).getChatParticipant(1L, TestConstants.CHAT_ID);
        verify(userService, times(1)).getUserProjectionById(TestConstants.USER_ID);
    }

    @Test
    public void getParticipant_ShouldReturnChatNotFound() {
        when(chatRepository.isChatExists(TestConstants.CHAT_ID, TestConstants.USER_ID)).thenReturn(false);
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatParticipantService.getParticipant(1L, TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void getParticipant_ShouldChatParticipantNotFound() {
        when(chatRepository.isChatExists(TestConstants.CHAT_ID, TestConstants.USER_ID)).thenReturn(true);
        when(chatParticipantRepository.getChatParticipant(1L, TestConstants.CHAT_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatParticipantService.getParticipant(1L, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void leaveFromConversation() {
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        ChatParticipant mockChatParticipant = ChatServiceTestHelper.createMockChatParticipant(mockAuthUser, new Chat());
        when(chatRepository.findById(TestConstants.CHAT_ID)).thenReturn(Optional.of(ChatServiceTestHelper.createMockChat(false)));
        when(chatParticipantRepository.getChatParticipant(1L, TestConstants.CHAT_ID)).thenReturn(Optional.of(mockChatParticipant));
        assertEquals("Successfully left the chat", chatParticipantService.leaveFromConversation(1L, TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).findById(TestConstants.CHAT_ID);
        verify(chatParticipantRepository, times(1)).getChatParticipant(1L, TestConstants.CHAT_ID);
    }

    @Test
    public void leaveFromConversation_ShouldDeleteChat() {
        User mockAuthUser = ChatServiceTestHelper.createMockUser(TestConstants.USER_ID);
        Chat mockChat = ChatServiceTestHelper.createMockChat(true);
        ChatParticipant mockChatParticipant = ChatServiceTestHelper.createMockChatParticipant(mockAuthUser, new Chat());
        when(chatRepository.findById(TestConstants.CHAT_ID)).thenReturn(Optional.of(mockChat));
        when(chatParticipantRepository.getChatParticipant(1L, TestConstants.CHAT_ID)).thenReturn(Optional.of(mockChatParticipant));
        assertEquals("Chat successfully deleted", chatParticipantService.leaveFromConversation(1L, TestConstants.CHAT_ID));
        verify(chatRepository, times(1)).findById(TestConstants.CHAT_ID);
        verify(chatParticipantRepository, times(1)).getChatParticipant(1L, TestConstants.CHAT_ID);
    }

    @Test
    public void leaveFromConversation_ShouldChatNotFound() {
        when(chatRepository.findById(TestConstants.CHAT_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatParticipantService.leaveFromConversation(1L, TestConstants.CHAT_ID));
        assertEquals(CHAT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void leaveFromConversation_ShouldChatParticipantNotFound() {
        when(chatRepository.findById(TestConstants.CHAT_ID)).thenReturn(Optional.of(ChatServiceTestHelper.createMockChat(false)));
        when(chatParticipantRepository.getChatParticipant(1L, TestConstants.CHAT_ID)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> chatParticipantService.leaveFromConversation(1L, TestConstants.CHAT_ID));
        assertEquals(CHAT_PARTICIPANT_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void searchUsersByUsername() {
        PageRequest pageable = PageRequest.of(0, 20);
        List<UserChatProjection> mockUserChatProjectionList = ChatServiceTestHelper.createMockUserChatProjectionList();
        Page<UserChatProjection> userChatProjections = new PageImpl<>(mockUserChatProjectionList, pageable, 20);
        when(userService.searchUsersByUsername("test username", pageable)).thenReturn(userChatProjections);
        assertEquals(userChatProjections, chatParticipantService.searchUsersByUsername("test username", pageable));
        verify(userService, times(1)).searchUsersByUsername("test username", pageable);
    }
}
