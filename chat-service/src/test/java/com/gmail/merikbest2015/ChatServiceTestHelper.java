package com.gmail.merikbest2015;

import com.gmail.merikbest2015.dto.response.chat.ChatTweetResponse;
import com.gmail.merikbest2015.dto.response.chat.ChatUserParticipantResponse;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.time.LocalDateTime;
import java.util.*;

public class ChatServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public static Chat createMockChat(boolean isLeftChat) {
        Chat chat = new Chat();
        chat.setId(TestConstants.CHAT_ID);
        chat.setCreationDate(LocalDateTime.now());

        ChatParticipant chatParticipant1 = new ChatParticipant();
        chatParticipant1.setLeftChat(isLeftChat);
        chatParticipant1.setUser(createMockUser(TestConstants.USER_ID));
        chatParticipant1.setChat(chat);

        ChatParticipant chatParticipant2 = new ChatParticipant();
        chatParticipant2.setLeftChat(isLeftChat);
        chatParticipant2.setUser(createMockUser(1L));
        chatParticipant2.setChat(chat);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setId(1L);
        chatMessage.setText("test text");
        chatMessage.setDate(LocalDateTime.now());
        chatMessage.setUnread(false);
        chatMessage.setTweetId(1L);
        chatMessage.setAuthor(createMockUser(TestConstants.USER_ID));
        chatMessage.setChat(chat);

        chat.setParticipants(new HashSet<>(Arrays.asList(chatParticipant1, chatParticipant2)));
        chat.setMessages(new HashSet<>(List.of(chatMessage)));
        return chat;
    }

    public static ChatParticipant createMockChatParticipant(User user, Chat newChat) {
        ChatParticipant chatParticipant = new ChatParticipant();
        chatParticipant.setLeftChat(false);
        chatParticipant.setUser(user);
        chatParticipant.setChat(newChat);
        return chatParticipant;
    }

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

    public static List<UserChatProjection> createMockUserChatProjectionList() {
        UserChatProjection userChatProjection1 = factory.createProjection(
                UserChatProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                    put("isUserChatParticipant", false);
                }});
        UserChatProjection userChatProjection2 = factory.createProjection(
                UserChatProjection.class,
                new HashMap<>() {{
                    put("id", 2L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                    put("isUserChatParticipant", false);
                }});
        return Arrays.asList(userChatProjection1, userChatProjection2);
    }

    public static UserProjection createUserProjection() {
        return factory.createProjection(
                UserProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
    }

    public static User createMockUser(Long userId) {
        User user = new User();
        user.setId(userId);
        user.setUsername(TestConstants.FULL_NAME);
        user.setFullName(TestConstants.USERNAME);
        user.setAbout(TestConstants.ABOUT);
        user.setAvatar(TestConstants.AVATAR_SRC_1);
        user.setPrivateProfile(false);
        user.setActive(true);
        user.setMutedDirectMessages(false);
        return user;
    }
}
