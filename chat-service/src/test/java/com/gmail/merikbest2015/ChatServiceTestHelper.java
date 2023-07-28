package com.gmail.merikbest2015;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

public class ChatServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public static ChatProjection createMockChatProjection() {
        ChatProjection.ChatParticipantProjection chatParticipant1 = factory.createProjection(
                ChatProjection.ChatParticipantProjection.class,
                Map.of(
                        "id", 1L,
                        "userId", TestConstants.USER_ID,
                        "user", new ChatUserParticipantResponse(),
                        "leftChat", false
                ));
        ChatProjection.ChatParticipantProjection chatParticipant2 = factory.createProjection(
                ChatProjection.ChatParticipantProjection.class,
                Map.of(
                        "id", 2L,
                        "userId", 1L,
                        "user", new ChatUserParticipantResponse(),
                        "leftChat", false
                ));
        return factory.createProjection(
                ChatProjection.class,
                Map.of(
                        "id", TestConstants.CHAT_ID,
                        "date", LocalDateTime.now(),
                        "participants", Arrays.asList(chatParticipant1, chatParticipant2)
                ));
    }

    public static List<ChatMessageProjection> createMockChatMessageProjectionList() {
        ChatMessageProjection chatMessage1 = factory.createProjection(
                ChatMessageProjection.class,
                Map.of(
                        "id", 1L,
                        "text", TestConstants.CHAT_MESSAGE_TEXT,
                        "date", LocalDateTime.now(),
                        "authorId", TestConstants.CHAT_MESSAGE_AUTHOR_ID,
                        "tweetId", 1L,
                        "tweet", new ChatTweetResponse(),
                        "chat", (ChatMessageProjection.ChatProjection) () -> TestConstants.CHAT_ID
                ));
        ChatMessageProjection chatMessage2 = factory.createProjection(
                ChatMessageProjection.class,
                Map.of(
                        "id", 2L,
                        "text", TestConstants.CHAT_MESSAGE_TEXT,
                        "date", LocalDateTime.now(),
                        "authorId", TestConstants.CHAT_MESSAGE_AUTHOR_ID,
                        "tweetId", 1L,
                        "tweet", new ChatTweetResponse(),
                        "chat", (ChatMessageProjection.ChatProjection) () -> TestConstants.CHAT_ID
                ));
        return Arrays.asList(chatMessage1, chatMessage2);
    }
}
