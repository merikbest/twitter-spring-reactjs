package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.gmail.merikbest2015.twitterspringreactjs.model.Chat;
import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatMessageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ChatRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UserRepository userRepository;
    private final ChatMessageRepository chatMessageRepository;

    @Override
    public List<Chat> getUserChats() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        return user.getChats();
    }

    @Override
    public Chat createChat(Long userId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        User participant = userRepository.getOne(userId);
        Chat chat = new Chat();
        chat.setParticipants(Arrays.asList(user, participant));
        return chatRepository.save(chat);
    }

    @Override
    public List<ChatMessage> getChatMessages(Long chatId) {
        return chatMessageRepository.getAllByChatId(chatId);
    }

    @Override
    public ChatMessage addMessage(ChatMessage chatMessage, Long chatId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User author = userRepository.findByEmail(principal.getName());
        Chat chat = chatRepository.getOne(chatId);
        ChatMessage message = new ChatMessage();
        message.setAuthor(author);
        message.setChat(chat);
        chatMessageRepository.save(message);
        List<ChatMessage> messages = chat.getMessages();
        messages.add(message);
        chatRepository.save(chat);
        message.getChat().getParticipants()
                .forEach(user -> {
                    if (!user.getUsername().equals(author.getUsername())) {
                        List<ChatMessage> unread = user.getUnreadMessages();
                        unread.add(chatMessage);
                        user.setUnreadMessages(unread);
                        userRepository.save(user);
                    }
                });
        return message;
    }
}
