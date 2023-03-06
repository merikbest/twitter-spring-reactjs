package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.dto.response.ChatMessageResponse;
import com.gmail.merikbest2015.feign.WebSocketClient;
import com.gmail.merikbest2015.mapper.ChatMessageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;
import static com.gmail.merikbest2015.constants.WebsocketConstants.TOPIC_CHAT;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_CHAT)
public class ChatMessageController {

    private final ChatMessageMapper chatMessageMapper;
    private final WebSocketClient webSocketClient;

    @GetMapping(CHAT_ID_MESSAGES)
    public ResponseEntity<List<ChatMessageResponse>> getChatMessages(@PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMessageMapper.getChatMessages(chatId));
    }

    @GetMapping(CHAT_ID_READ_MESSAGES)
    public ResponseEntity<Long> readChatMessages(@PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMessageMapper.readChatMessages(chatId));
    }

    @PostMapping(ADD_MESSAGE)
    public ResponseEntity<Void> addMessage(@RequestBody ChatMessageRequest request) {
        chatMessageMapper.addMessage(request)
                .forEach((userId, message) -> webSocketClient.send(TOPIC_CHAT + userId, message));
        return ResponseEntity.ok().build();
    }

    @PostMapping(ADD_MESSAGE_TWEET)
    public ResponseEntity<Void> addMessageWithTweet(@RequestBody MessageWithTweetRequest request) {
        chatMessageMapper.addMessageWithTweet(request)
                .forEach((userId, message) -> webSocketClient.send(TOPIC_CHAT + userId, message));
        return ResponseEntity.ok().build();
    }
}
