package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.exception.ApiRequestException;
import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatMessageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final AuthenticationService authenticationService;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public List<Chat> getUserChats() {
        User user = authenticationService.getAuthenticatedUser();
        return user.getChats().stream()
                .filter(participant -> !participant.isLeftChat() || !isParticipantBlocked(user, participant.getUser()))
                .map(ChatParticipant::getChat)
                .collect(Collectors.toList());
    }

    @Override
    public Chat createChat(Long userId) {
        User authUser = authenticationService.getAuthenticatedUser();
        User user = userRepository.getOne(userId);

        if (isParticipantBlocked(authUser, user)) {
            throw new ApiRequestException("Participant is blocked", HttpStatus.BAD_REQUEST);
        }
        Optional<ChatParticipant> chatWithParticipant = getChatParticipant(user, userId);

        if (chatWithParticipant.isEmpty()) {
            Chat chat = new Chat();
            chatRepository.save(chat);
            ChatParticipant authUserParticipant = chatParticipantRepository.save(new ChatParticipant(authUser, chat));
            ChatParticipant userParticipant = chatParticipantRepository.save(new ChatParticipant(user, chat));
            chat.setParticipants(Arrays.asList(authUserParticipant, userParticipant));
            return chat;
        }
        return chatWithParticipant.get().getChat();
    }

    @Override
    public List<ChatMessage> getChatMessages(Long chatId) {
        User authUser = authenticationService.getAuthenticatedUser();
        List<ChatMessage> chatMessages = chatMessageRepository.getAllByChatId(chatId, authUser.getId());
        if (chatMessages.isEmpty()) {
            throw new ApiRequestException("Chat messages not found", HttpStatus.NOT_FOUND);
        }
        return chatMessages;
    }

    @Override
    public User readChatMessages(Long chatId) {
        User user = authenticationService.getAuthenticatedUser();
        user.setUnreadMessages(user.getUnreadMessages().stream()
                .filter(message -> !message.getChat().getId().equals(chatId))
                .collect(Collectors.toList()));
        return userRepository.save(user);
    }

    @Override
    public ChatMessage addMessage(ChatMessage chatMessage, Long chatId) {
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
                        && isParticipantBlocked(participant.getUser(), author)
                        || isParticipantBlocked(author, participant.getUser()))
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
        chatRepository.save(chat);
        notifyChatParticipants(chatMessage, author);
        return chatMessage;
    }

    @Override
    public List<ChatMessage> addMessageWithTweet(String text, Tweet tweet, List<User> users) {
        User author = authenticationService.getAuthenticatedUser();
        List<ChatMessage> chatMessages = new ArrayList<>();
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
            chatMessages.add(chatMessage);
            notifyChatParticipants(chatMessage, author);
        });
        return chatMessages;
    }

    @Override
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
