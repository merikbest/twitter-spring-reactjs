package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.ChatUserParticipantResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import com.gmail.merikbest2015.repository.projection.ChatParticipantProjection;
import com.gmail.merikbest2015.repository.projection.ChatProjection;
import com.gmail.merikbest2015.service.ChatService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserClient userClient;

//    private final AuthenticationClient authenticationClient;
//    private final TweetClient tweetClient;

    @Override
    public ChatProjection getChatById(Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return chatRepository.getChatById(chatId, authUserId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
    }

    @Override
    public List<ChatProjection> getUserChats() {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        return chatRepository.getChatByUserId(authUserId);
    }

    @Override
    @Transactional
    public ChatProjection createChat(Long userId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        Boolean isUserExists = userClient.isUserExists(userId);
        if (!isUserExists) {
            throw new ApiRequestException("User not found", HttpStatus.BAD_REQUEST);
        }
        Boolean isUserBlockedByMyProfile = userClient.isUserBlockedByMyProfile(userId);
        if (isUserBlockedByMyProfile) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
        ChatParticipant chatWithParticipant = chatParticipantRepository.getChatParticipant(userId);

        if (chatWithParticipant == null) {
            Chat chat = new Chat();
            chatRepository.save(chat);
            ChatParticipant authUserParticipant = chatParticipantRepository.save(new ChatParticipant(authUserId, chat));
            ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(userId, chat));
            chat.setParticipants(Arrays.asList(authUserParticipant, userParticipant));
            return chatRepository.getChatById(chat.getId());
        }
        return chatRepository.getChatById(chatWithParticipant.getChat().getId());
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
        Boolean isUserBlockedByMyProfile = userClient.isUserBlockedByMyProfile(authUserId);
        Boolean isMyProfileBlockedByUser = userClient.isMyProfileBlockedByUser(chatParticipant.getUserId());

        if (isUserBlockedByMyProfile || isMyProfileBlockedByUser) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
        chatMessage.setAuthorId(authUserId);
        chatMessage.setChat(chat);
//        updateParticipantWhoLeftChat(chat);
        chatMessageRepository.save(chatMessage);
        List<ChatMessage> messages = chat.getMessages();
        messages.add(chatMessage);
//        notifyChatParticipants(chatMessage, author);

        List<Long> chatParticipantsIds = chatParticipantRepository.getChatParticipantIds(chatId);
        ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId());
        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", message);
    }

//    @Override
//    @Transactional
//    public Map<String, Object> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds) {
//        User author = authenticationClient.getAuthenticatedUser();
//        Tweet tweet = tweetClient.getTweetById(tweetId)
//                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
//        List<User> users = userClient.getUsersByIds(new UserIdsRequest(usersIds));
//        List<Long> chatParticipantsIds = new ArrayList<>();
//        ChatMessage chatMessage = new ChatMessage();
//        chatMessage.setAuthor(author);
//        chatMessage.setText(text);
//        chatMessage.setTweet(tweet);
//        users.forEach(user -> {
//            boolean participantBlocked = isParticipantBlocked(author, user);
//            Optional<ChatParticipant> chatWithParticipant = getChatParticipant(author, user.getId());
//
//            if (chatWithParticipant.isEmpty() && !participantBlocked) {
//                Chat chat = new Chat();
//                Chat newChat = chatRepository.save(chat);
//                ChatParticipant authorParticipant = chatParticipantRepository.save(new ChatParticipant(author, chat));
//                ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(user, chat));
//                chat.setParticipants(Arrays.asList(authorParticipant, userParticipant));
//                chatMessage.setChat(newChat);
//                chatMessageRepository.save(chatMessage);
//            } else if (!participantBlocked) {
//                Chat participantsChat = chatWithParticipant.get().getChat();
//                updateParticipantWhoLeftChat(participantsChat);
//                chatMessage.setChat(participantsChat);
//                ChatMessage newChatMessage = chatMessageRepository.save(chatMessage);
//                List<ChatMessage> messages = participantsChat.getMessages();
//                messages.add(newChatMessage);
//                chatRepository.save(participantsChat);
//            }
//            chatParticipantsIds.add(user.getId());
//            notifyChatParticipants(chatMessage, author);
//        });
//        ChatMessageProjection chatMessageProjection = chatMessageRepository.getChatMessageById(chatMessage.getId());
//        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", chatMessageProjection);
//    }
//
//    @Override
//    public UserProjection getParticipant(Long participantId, Long chatId) {
//        Long userId = authenticationClient.getAuthenticatedUserId();
//
//        if (!chatRepository.getChatByUserId(chatId, userId)) {
//            throw new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND);
//        } else {
//            return chatParticipantRepository.getChatParticipant(participantId, chatId)
//                    .orElseThrow(() -> new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND));
//        }
//    }
//
//    @Override
//    @Transactional
//    public String leaveFromConversation(Long participantId, Long chatId) {
//        Chat chat = chatRepository.findById(chatId)
//                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
//        int isChatParticipantUpdated = chatParticipantRepository.leaveFromConversation(participantId, chatId);
//
//        if (isChatParticipantUpdated != 1) {
//            throw new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND);
//        }
//
//        boolean isParticipantsLeftFromChat = chat.getParticipants().stream().allMatch(ChatParticipant::isLeftChat);
//
//        if (isParticipantsLeftFromChat) {
//            chatMessageRepository.deleteAll(chat.getMessages());
//            chatParticipantRepository.deleteAll(chat.getParticipants());
//            chatRepository.delete(chat);
//            return "Chat successfully deleted";
//        }
//        return "Successfully left the chat";
//    }
//
//    @Override
//    public Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable) {
//        return userClient.searchUsersByUsername(username, pageable);
//    }
//
//    private boolean isParticipantBlocked(User user, User participant) {
//        return user.getUserBlockedList().contains(participant);
//    }
//
//    private void updateParticipantWhoLeftChat(Chat chat) {
//        chat.getParticipants().forEach(participant -> {
//            if (participant.isLeftChat()) {
//                participant.setLeftChat(false);
//            }
//        });
//    }

//    private Optional<ChatParticipant> getChatParticipant(User user, Long userId) {
//        return user.getChats().stream()
//                .filter(chatParticipant -> chatParticipant.getChat().getParticipants().stream()
//                        .anyMatch(participant -> participant.getUser().getId().equals(userId)))
//                .findFirst();
//    }

//    private void notifyChatParticipants(ChatMessage chatMessage, User author) {
//        chatMessage.getChat().getParticipants()
//                .forEach(participant -> {
//                    if (!participant.getUser().getUsername().equals(author.getUsername())) {
//                        List<ChatMessage> unread = participant.getUser().getUnreadMessages();
//                        unread.add(chatMessage);
//                        participant.getUser().setUnreadMessages(unread);
//                        userClient.saveUser(participant.getUser());
//                    }
//                });
//    }

    // NEW
    public ChatUserParticipantResponse getChatParticipant(Long userId) {
        return userClient.getChatParticipant(userId);
    }
}
