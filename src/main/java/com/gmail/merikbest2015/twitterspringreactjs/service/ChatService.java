package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Chat;
import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;

import java.util.List;

public interface ChatService {

    List<Chat> getUserChats();

    Chat createChat(Long userId);

    List<ChatMessage> getChatMessages(Long chatId);

    User readChatMessages(Long chatId);

    ChatMessage addMessage(ChatMessage chatMessage, Long chatId);

    List<ChatMessage> addMessageWithTweet(String text, Tweet tweet, List<User> users);
}
