package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.ChatServiceTestHelper;
import com.gmail.merikbest2015.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.dto.response.ChatMessageResponse;
import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.service.ChatMessageService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class ChatMessageMapperTest {

    @Autowired
    private ChatMessageMapper chatMessageMapper;

    @MockBean
    private BasicMapper basicMapper;

    @MockBean
    private ChatMessageService chatMessageService;

    private final Map<Long, ChatMessageProjection> chatMessageProjection = getChatMessageProjection();
    private final Map<Long, ChatMessageResponse> chatMessageResponse = getChatMessageResponse();

    @Test
    public void getChatMessages() {
        List<ChatMessageProjection> mockChatMessageProjectionList = ChatServiceTestHelper.createMockChatMessageProjectionList();
        List<ChatMessageResponse> mockChatMessageResponseList = getMockChatMessageResponseList();
        when(chatMessageService.getChatMessages(TestConstants.CHAT_ID)).thenReturn(mockChatMessageProjectionList);
        when(basicMapper.convertToResponseList(mockChatMessageProjectionList, ChatMessageResponse.class))
                .thenReturn(mockChatMessageResponseList);
        assertEquals(mockChatMessageResponseList, chatMessageMapper.getChatMessages(TestConstants.CHAT_ID));
        verify(chatMessageService, times(1)).getChatMessages(TestConstants.CHAT_ID);
        verify(basicMapper, times(1)).convertToResponseList(mockChatMessageProjectionList, ChatMessageResponse.class);
    }

    @Test
    public void readChatMessages() {
        when(chatMessageService.readChatMessages(TestConstants.CHAT_ID)).thenReturn(0L);
        assertEquals(0L, chatMessageMapper.readChatMessages(TestConstants.CHAT_ID));
        verify(chatMessageService, times(1)).readChatMessages(TestConstants.CHAT_ID);
    }

    @Test
    public void addMessage() {
        ChatMessageRequest chatMessageRequest = new ChatMessageRequest(TestConstants.CHAT_ID, "text");
        when(chatMessageService.addMessage(new ChatMessage(), TestConstants.CHAT_ID)).thenReturn(chatMessageProjection);
        when(basicMapper.convertToResponse(chatMessageRequest, ChatMessage.class)).thenReturn(new ChatMessage());
        when(basicMapper.convertToResponse(chatMessageProjection.get(1L), ChatMessageResponse.class))
                .thenReturn(chatMessageResponse.get(1L));
        when(basicMapper.convertToResponse(chatMessageProjection.get(2L), ChatMessageResponse.class))
                .thenReturn(chatMessageResponse.get(2L));
        assertEquals(chatMessageResponse, chatMessageMapper.addMessage(chatMessageRequest));
        verify(chatMessageService, times(1)).addMessage(new ChatMessage(), TestConstants.CHAT_ID);
        verify(basicMapper, times(1)).convertToResponse(chatMessageRequest, ChatMessage.class);
        verify(basicMapper, times(1)).convertToResponse(chatMessageProjection.get(1L), ChatMessageResponse.class);
        verify(basicMapper, times(1)).convertToResponse(chatMessageProjection.get(2L), ChatMessageResponse.class);
    }

    @Test
    public void addMessageWithTweet() {
        MessageWithTweetRequest request = new MessageWithTweetRequest("test text", TestConstants.TWEET_ID, List.of(1L, 2L));
        when(chatMessageService.addMessageWithTweet(request.getText(), request.getTweetId(), request.getUsersIds()))
                .thenReturn(chatMessageProjection);
        when(basicMapper.convertToResponse(chatMessageProjection.get(1L), ChatMessageResponse.class))
                .thenReturn(chatMessageResponse.get(1L));
        when(basicMapper.convertToResponse(chatMessageProjection.get(2L), ChatMessageResponse.class))
                .thenReturn(chatMessageResponse.get(2L));
        assertEquals(chatMessageResponse, chatMessageMapper.addMessageWithTweet(request));
        verify(chatMessageService, times(1)).addMessageWithTweet(request.getText(), request.getTweetId(), request.getUsersIds());
        verify(basicMapper, times(1)).convertToResponse(chatMessageProjection.get(1L), ChatMessageResponse.class);
        verify(basicMapper, times(1)).convertToResponse(chatMessageProjection.get(2L), ChatMessageResponse.class);
    }

    private List<ChatMessageResponse> getMockChatMessageResponseList() {
        ChatMessageResponse messageResponse1 = new ChatMessageResponse();
        messageResponse1.setId(1L);
        messageResponse1.setText(TestConstants.CHAT_MESSAGE_TEXT);
        messageResponse1.setDate(LocalDateTime.now());
        messageResponse1.setAuthor(new ChatMessageResponse.AuthorResponse());
        messageResponse1.setTweet(new ChatTweetResponse());
        messageResponse1.setChat(new ChatMessageResponse.ChatResponse());
        ChatMessageResponse messageResponse2 = new ChatMessageResponse();
        messageResponse2.setId(2L);
        messageResponse2.setText(TestConstants.CHAT_MESSAGE_TEXT);
        messageResponse2.setDate(LocalDateTime.now());
        messageResponse2.setAuthor(new ChatMessageResponse.AuthorResponse());
        messageResponse2.setTweet(new ChatTweetResponse());
        messageResponse2.setChat(new ChatMessageResponse.ChatResponse());
        return List.of(messageResponse1, messageResponse2);
    }

    private Map<Long, ChatMessageProjection> getChatMessageProjection() {
        return Map.of(
                1L, ChatServiceTestHelper.createMockChatMessageProjectionList().get(0),
                2L, ChatServiceTestHelper.createMockChatMessageProjectionList().get(1)
        );
    }

    private Map<Long, ChatMessageResponse> getChatMessageResponse() {
        return Map.of(
                1L, getMockChatMessageResponseList().get(0),
                2L, getMockChatMessageResponseList().get(1)
        );
    }
}
