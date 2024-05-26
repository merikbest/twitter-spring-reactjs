package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.ChatParticipantService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class ChatParticipantMapperTest {

    @InjectMocks
    private ChatParticipantMapper chatParticipantMapper;

    @Mock
    private BasicMapper basicMapper;

    @Mock
    private ChatParticipantService chatParticipantService;

    @Test
    public void getParticipant() {
        UserProjection userProjection = ChatServiceTestHelper.createUserProjection();
        when(chatParticipantService.getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID)).thenReturn(userProjection);
        when(basicMapper.convertToResponse(userProjection, UserResponse.class)).thenReturn(new UserResponse());
        assertNotNull(chatParticipantMapper.getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID));
        verify(chatParticipantService, times(1)).getParticipant(TestConstants.CHAT_ID, TestConstants.CHAT_ID);
    }

    @Test
    public void leaveFromConversation() {
        when(chatParticipantService.leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID)).thenReturn("Successfully left the chat");
        assertEquals("Successfully left the chat", chatParticipantMapper.leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID));
        verify(chatParticipantService, times(1)).leaveFromConversation(TestConstants.CHAT_ID, TestConstants.CHAT_ID);
    }
}
