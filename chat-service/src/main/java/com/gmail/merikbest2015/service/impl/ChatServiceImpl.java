package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.ChatTweetResponse;
import com.gmail.merikbest2015.dto.ChatUserParticipantResponse;
import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
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
import com.gmail.merikbest2015.service.ChatService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserClient userClient;
    private final TweetClient tweetClient;

    @Override
    public ChatProjection getChatById(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return chatRepository.getChatById(chatId, authUserId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<ChatProjection> getUserChats() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return chatRepository.getChatsByUserId(authUserId);
    }

    @Override
    @Transactional
    public ChatProjection createChat(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Boolean isUserExists = userClient.isUserExists(userId);
        if (!isUserExists) {
            throw new ApiRequestException("User not found", HttpStatus.BAD_REQUEST);
        }
        isParticipantBlocked(authUserId, userId);
        Long chatId = chatRepository.getChatIdByParticipants(authUserId, userId);

        if (chatId == null) {
            Chat chat = new Chat();
            chatRepository.save(chat);
            ChatParticipant authUserParticipant = chatParticipantRepository.save(new ChatParticipant(authUserId, chat));
            ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(userId, chat));
            chat.setParticipants(Arrays.asList(authUserParticipant, userParticipant));
            return chatRepository.getChatById(chat.getId());
        }
        return chatRepository.getChatById(chatId);
    }

    @Override
    public List<ChatMessageProjection> getChatMessages(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        chatRepository.getChatById(chatId, authUserId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
        return chatMessageRepository.getChatMessages(chatId);
    }

    @Override
    @Transactional
    public Long readChatMessages(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        chatMessageRepository.readChatMessages(chatId, authUserId);
        List<Long> chatIds = chatRepository.getChatIdsByUserId(authUserId);
        return chatMessageRepository.getUnreadMessagesCount(chatIds, authUserId);
    }

    @Override
    @Transactional
    public Map<String, Object> addMessage(ChatMessage chatMessage, Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
        ChatParticipant chatParticipant = chatParticipantRepository.getChatParticipant(chatId, authUserId)
                .orElseThrow(() -> new ApiRequestException("Participant in chat not found", HttpStatus.NOT_FOUND));
        isParticipantBlocked(authUserId, chatParticipant.getUserId());
        chatMessage.setAuthorId(authUserId);
        chatMessage.setChat(chat);
        chatMessageRepository.save(chatMessage);
        chatParticipantRepository.updateParticipantWhoLeftChat(chatParticipant.getUserId(), chatId);
        chat.getMessages().add(chatMessage);
        List<Long> chatParticipantsIds = chatParticipantRepository.getChatParticipantIds(chatId);
        ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId());
        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", message);
    }

    @Override
    @Transactional
    public Map<String, Object> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds) {
        if (!tweetClient.isTweetExists(tweetId)) {
            throw new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND);
        }
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        // TODO validate List<Long> usersIds
        List<Long> chatParticipantsIds = new ArrayList<>();
        ChatMessage chatMessage = new ChatMessage(text, tweetId, authUserId);
        usersIds.forEach(userId -> {
            ChatParticipant chatParticipant = chatParticipantRepository.getChatParticipant(userId);
            Boolean isUserBlockedByMyProfile = userClient.isUserBlockedByMyProfile(userId);
//            Boolean isUserBlockedByMyProfile = userClient.isMyProfileBlockedByUser(userId); <- use this

            if (chatParticipant == null && !isUserBlockedByMyProfile) {
                Chat chat = new Chat();
                chatRepository.save(chat);
                ChatParticipant authorParticipant = chatParticipantRepository.save(new ChatParticipant(authUserId, chat));
                ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(userId, chat));
                chat.setParticipants(Arrays.asList(authorParticipant, userParticipant));
                chatMessage.setChat(chat);
                chatMessageRepository.save(chatMessage);
            } else if (!isUserBlockedByMyProfile) {
                Chat chat = chatRepository.getUserChat(userId);
                chatParticipantRepository.updateParticipantWhoLeftChat(userId, chat.getId());
                chatMessage.setChat(chat);
                chatMessageRepository.save(chatMessage);
                chat.getMessages().add(chatMessage);
                chatRepository.save(chat);
            }
            chatParticipantsIds.add(userId);
        });
        ChatMessageProjection chatMessageProjection = chatMessageRepository.getChatMessageById(chatMessage.getId());
        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", chatMessageProjection);
    }

    @Override
    public UserResponse getParticipant(Long participantId, Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        boolean isChatExists = chatRepository.isChatExists(chatId, authUserId);

        if (!isChatExists) {
            throw new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND);
        }
        Long userId = chatParticipantRepository.getParticipantUserId(participantId, chatId)
                .orElseThrow(() -> new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND));
        return userClient.getUserResponseById(userId);
    }

    @Override
    @Transactional
    public String leaveFromConversation(Long participantId, Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
        int isChatParticipantUpdated = chatParticipantRepository.leaveFromConversation(participantId, chatId);

        if (isChatParticipantUpdated != 1) {
            throw new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND);
        }

        boolean isParticipantsLeftFromChat = chat.getParticipants().stream().allMatch(ChatParticipant::isLeftChat);

        if (isParticipantsLeftFromChat) {
            chatMessageRepository.deleteAll(chat.getMessages());
            chatParticipantRepository.deleteAll(chat.getParticipants());
            chatRepository.delete(chat);
            return "Chat successfully deleted";
        }
        return "Successfully left the chat";
    }

    @Override
    public HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable) {
        return userClient.searchUsersByUsername(username, pageable);
    }

    // NEW
    public ChatUserParticipantResponse getChatParticipant(Long userId) {
        return userClient.getChatParticipant(userId);
    }

    private void isParticipantBlocked(Long authUserId, Long userId) {
        Boolean isUserBlockedByMyProfile = userClient.isUserBlockedByMyProfile(authUserId);
        Boolean isMyProfileBlockedByUser = userClient.isMyProfileBlockedByUser(userId);

        if (isUserBlockedByMyProfile || isMyProfileBlockedByUser) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
    }

    public ChatTweetResponse getChatTweet(Long tweetId) {
        return tweetClient.getChatTweet(tweetId);
    }
}
