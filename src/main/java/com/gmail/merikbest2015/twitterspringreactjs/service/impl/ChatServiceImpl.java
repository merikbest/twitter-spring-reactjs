package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.*;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatMessageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.AuthenticationService;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final AuthenticationService authenticationService;
    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public List<Chat> getUserChats() {
        User user = authenticationService.getAuthenticatedUser();
        List<Chat> chats = user.getChats();
        chats.forEach(chat -> {
            if (chat.getParticipants().get(1).getUser().getId().equals(user.getId())) {
                Collections.swap(chat.getParticipants(), 1, 0);
            }
        });
        return chats;
    }

    @Override
    public Chat createChat(Long userId) {
        User authUser = authenticationService.getAuthenticatedUser();
        User user = userRepository.getOne(userId);
        Optional<Chat> chatWithParticipant = authUser.getChats().stream()
                .filter(chat -> chat.getParticipants().stream()
                        .anyMatch(participant -> participant.getUser().getId().equals(participant.getId())))
                .findFirst();

        if (chatWithParticipant.isEmpty()) {
            Chat chat = new Chat();
            chatRepository.save(chat);
            chat.setParticipants(Arrays.asList(new ChatParticipant(authUser, chat), new ChatParticipant(user, chat)));
            return chat;
        }
        return chatWithParticipant.get();
    }

    @Override
    public List<ChatMessage> getChatMessages(Long chatId) {
        return chatMessageRepository.getAllByChatId(chatId);
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
        Chat chat = chatRepository.getOne(chatId);
        chatMessage.setAuthor(author);
        chatMessage.setChat(chat);
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
            Optional<Chat> chatWithParticipant = author.getChats().stream()
                    .filter(chat -> chat.getParticipants().stream()
                            .anyMatch(participant -> participant.getChat().getId().equals(user.getId())))
                    .findFirst();

            if (chatWithParticipant.isEmpty()) {
                Chat chat = new Chat();
                Chat newChat = chatRepository.save(chat);
//                chat.setParticipants(Arrays.asList(author, user));
                chat.setParticipants(Arrays.asList(new ChatParticipant(author, chat), new ChatParticipant(user, chat)));
                chatMessage.setChat(newChat);
                chatMessageRepository.save(chatMessage);
            } else {
                chatMessage.setChat(chatWithParticipant.get());
                ChatMessage newChatMessage = chatMessageRepository.save(chatMessage);
                List<ChatMessage> messages = chatWithParticipant.get().getMessages();
                messages.add(newChatMessage);
                chatRepository.save(chatWithParticipant.get());
            }
            chatMessages.add(chatMessage);
            notifyChatParticipants(chatMessage, author);
        });
        return chatMessages;
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
