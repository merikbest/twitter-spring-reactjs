package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserProjection;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final TweetRepository tweetRepository;
    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserServiceImpl userService;

    @Override
    public List<ChatProjection> getUserChats() {
        Long userId = authenticationService.getAuthenticatedUserId();
        List<ChatParticipantProjection> chatParticipants = chatParticipantRepository.getChatParticipants(userId);
        return chatParticipants.stream()
                .filter(participant -> !participant.getLeftChat() || !userService.isUserBlockedByMyProfile(participant.getUser().getId()))
                .map(ChatParticipantProjection::getChat)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ChatProjection createChat(Long userId) {
        User authUser = authenticationService.getAuthenticatedUser();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND));

        if (userService.isUserBlockedByMyProfile(user.getId())) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
        Optional<ChatParticipant> chatWithParticipant = getChatParticipant(user, userId);

        if (chatWithParticipant.isEmpty()) {
            Chat chat = new Chat();
            chatRepository.save(chat);
            ChatParticipant authUserParticipant = chatParticipantRepository.save(new ChatParticipant(authUser, chat));
            ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(user, chat));
            chat.setParticipants(Arrays.asList(authUserParticipant, userParticipant));
            return chatRepository.getChatById(chat.getId());
        }
        return chatRepository.getChatById(chatWithParticipant.get().getChat().getId());
    }

    @Override
    public List<ChatMessageProjection> getChatMessages(Long chatId) {
        Long userId = authenticationService.getAuthenticatedUserId();
        return chatMessageRepository.getAllByChatId(chatId, userId);
    }

    @Override
    @Transactional
    public Integer readChatMessages(Long chatId) {
        User user = authenticationService.getAuthenticatedUser();
        user.setUnreadMessages(user.getUnreadMessages().stream()
                .filter(message -> !message.getChat().getId().equals(chatId))
                .collect(Collectors.toList()));
        return user.getUnreadMessages().size();
    }

    @Override
    @Transactional
    public Map<String, Object> addMessage(ChatMessage chatMessage, Long chatId) {
        User author = authenticationService.getAuthenticatedUser();
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND));
        Optional<ChatParticipant> chatParticipant = chat.getParticipants().stream()
                .filter(participant -> participant.getUser().getId().equals(author.getId()))
                .findAny();

        if (chatParticipant.isEmpty()) {
            throw new ApiRequestException("Chat participant not found", HttpStatus.NOT_FOUND);
        }

        Optional<ChatParticipant> blockedChatParticipant = chat.getParticipants().stream()
                .filter(participant -> !participant.getUser().getId().equals(author.getId())
                        && userService.isUserBlockedByMyProfile(author.getId())
                        || userService.isMyProfileBlockedByUser(participant.getUser().getId()))
                .findFirst();

        if (blockedChatParticipant.isPresent()) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
        chatMessage.setAuthor(author);
        chatMessage.setChat(chat);
        updateParticipantWhoLeftChat(chat);
        chatMessageRepository.save(chatMessage);
        List<ChatMessage> messages = chat.getMessages();
        messages.add(chatMessage);
        notifyChatParticipants(chatMessage, author);

        List<Long> chatParticipantsIds = chat.getParticipants().stream()
                .map(participant -> participant.getUser().getId())
                .collect(Collectors.toList());
        ChatMessageProjection message = chatMessageRepository.getChatMessageById(chatMessage.getId());
        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", message);
    }

    @Override
    @Transactional
    public Map<String, Object> addMessageWithTweet(String text, Long tweetId, List<Long> usersIds) {
        User author = authenticationService.getAuthenticatedUser();
        Tweet tweet = tweetRepository.findById(tweetId)
                .orElseThrow(() -> new ApiRequestException("Tweet not found", HttpStatus.NOT_FOUND));
        List<User> users = userRepository.findByIdIn(usersIds);
        List<Long> chatParticipantsIds = new ArrayList<>();
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setAuthor(author);
        chatMessage.setText(text);
        chatMessage.setTweet(tweet);
        users.forEach(user -> {
            boolean participantBlocked = isParticipantBlocked(author, user);
            Optional<ChatParticipant> chatWithParticipant = getChatParticipant(author, user.getId());

            if (chatWithParticipant.isEmpty() && !participantBlocked) {
                Chat chat = new Chat();
                Chat newChat = chatRepository.save(chat);
                ChatParticipant authorParticipant = chatParticipantRepository.save(new ChatParticipant(author, chat));
                ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(user, chat));
                chat.setParticipants(Arrays.asList(authorParticipant, userParticipant));
                chatMessage.setChat(newChat);
                chatMessageRepository.save(chatMessage);
            } else if (!participantBlocked) {
                Chat participantsChat = chatWithParticipant.get().getChat();
                updateParticipantWhoLeftChat(participantsChat);
                chatMessage.setChat(participantsChat);
                ChatMessage newChatMessage = chatMessageRepository.save(chatMessage);
                List<ChatMessage> messages = participantsChat.getMessages();
                messages.add(newChatMessage);
                chatRepository.save(participantsChat);
            }
            chatParticipantsIds.add(user.getId());
            notifyChatParticipants(chatMessage, author);
        });
        ChatMessageProjection chatMessageProjection = chatMessageRepository.getChatMessageById(chatMessage.getId());
        return Map.of("chatParticipantsIds", chatParticipantsIds, "message", chatMessageProjection);
    }

    @Override
    public UserProjection getParticipant(Long participantId, Long chatId) {
        Long userId = authenticationService.getAuthenticatedUserId();

        if (!chatRepository.getChatByUserId(chatId, userId)) {
            throw new ApiRequestException("Chat not found", HttpStatus.NOT_FOUND);
        } else {
            return chatParticipantRepository.getChatParticipant(participantId, chatId)
                    .orElseThrow(() -> new ApiRequestException("Participant not found", HttpStatus.NOT_FOUND));
        }
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

    private boolean isParticipantBlocked(User user, User participant) {
        return user.getUserBlockedList().contains(participant);
    }

    private void updateParticipantWhoLeftChat(Chat chat) {
        chat.getParticipants().forEach(participant -> {
            if (participant.isLeftChat()) {
                participant.setLeftChat(false);
            }
        });
    }

    private Optional<ChatParticipant> getChatParticipant(User user, Long userId) {
        return user.getChats().stream()
                .filter(chatParticipant -> chatParticipant.getChat().getParticipants().stream()
                        .anyMatch(participant -> participant.getUser().getId().equals(userId)))
                .findFirst();
    }

    private void notifyChatParticipants(ChatMessage chatMessage, User author) {
        chatMessage.getChat().getParticipants()
                .forEach(participant -> {
                    if (!participant.getUser().getUsername().equals(author.getUsername())) {
                        List<ChatMessage> unread = participant.getUser().getUnreadMessages();
                        unread.add(chatMessage);
                        participant.getUser().setUnreadMessages(unread);
                        userRepository.save(participant.getUser());
                    }
                });
    }
}
