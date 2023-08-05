package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.service.ChatParticipantService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatParticipantMapperTest {

    @Autowired
    private ChatParticipantMapper chatParticipantMapper;

    @MockBean
    private ChatParticipantService chatParticipantService;

    @Test
    public void getParticipant() {
        when(chatParticipantService.getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID)).thenReturn(new UserResponse());
        assertEquals(new UserResponse(), chatParticipantMapper.getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID));
        verify(chatParticipantService, times(1)).getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID);
    }

    @Test
    public void leaveFromConversation() {
        when(chatParticipantService.leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID)).thenReturn("Successfully left the chat");
        assertEquals("Successfully left the chat", chatParticipantMapper.leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID));
        verify(chatParticipantService, times(1)).leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID);
    }

    @Test
    public void searchParticipantsByUsername() {
        PageRequest pageable = PageRequest.of(0, 20);
        HeaderResponse<UserChatResponse> headerResponse = new HeaderResponse<>(
                List.of(new UserChatResponse(), new UserChatResponse()), new HttpHeaders());
        when(chatParticipantService.searchUsersByUsername(TestConstants.USERNAME, pageable)).thenReturn(headerResponse);
        assertEquals(headerResponse, chatParticipantMapper.searchParticipantsByUsername(TestConstants.USERNAME, pageable));
        verify(chatParticipantService, times(1)).searchUsersByUsername(TestConstants.USERNAME, pageable);
    }
}
