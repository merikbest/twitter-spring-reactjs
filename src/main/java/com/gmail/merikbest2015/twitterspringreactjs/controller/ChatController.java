package com.gmail.merikbest2015.twitterspringreactjs.controller;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.BaseUserProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatMessageProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.chats.ChatProjectionResponse;
import com.gmail.merikbest2015.twitterspringreactjs.mapper.ChatMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/chat")
public class ChatController {

    private final ChatMapper chatMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/users")
    public ResponseEntity<List<ChatProjectionResponse>> getUserChats() {
        return ResponseEntity.ok(chatMapper.getUserChats());
    }

    @GetMapping("/create/{userId}")
    public ResponseEntity<ChatProjectionResponse> createChat(@PathVariable Long userId) {
        return ResponseEntity.ok(chatMapper.createChat(userId));
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<ChatMessageProjectionResponse>> getChatMessages(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatMapper.getChatMessages(chatId));
    }

    @GetMapping("/{chatId}/read/messages")
    public ResponseEntity<Integer> readChatMessages(@PathVariable Long chatId) {
        return ResponseEntity.ok(chatMapper.readChatMessages(chatId));
    }

    @PostMapping("/add/message")
    public ResponseEntity<ChatMessageProjectionResponse> addMessage(@RequestBody ChatMessageRequest chatMessage) {
        ChatMessageProjectionResponse message = chatMapper.addMessage(chatMessage);
        message.getChatParticipantsIds()
                .forEach(userId -> messagingTemplate.convertAndSend("/topic/chat/" + userId, message));
        return ResponseEntity.ok(message);
    }

    @PostMapping("/add/message/tweet")
    public ResponseEntity<List<ChatMessageProjectionResponse>> addMessageWithTweet(@RequestBody MessageWithTweetRequest request) {
        List<ChatMessageProjectionResponse> chatMessages = chatMapper.addMessageWithTweet(request);
        chatMessages.forEach(chatMessage -> chatMessage.getChatParticipantsIds()
                .forEach(userId -> messagingTemplate.convertAndSend("/topic/chat/" + userId, chatMessage)));
        return ResponseEntity.ok(chatMessages);
    }

    @GetMapping("/participant/{participantId}/{chatId}")
    public ResponseEntity<BaseUserProjectionResponse> getParticipant(@PathVariable Long participantId, @PathVariable Long chatId) {
        return ResponseEntity.ok(chatMapper.getParticipant(participantId, chatId));
    }

    @GetMapping("/leave/{participantId}/{chatId}")
    public ResponseEntity<String> leaveFromConversation(@PathVariable Long participantId, @PathVariable Long chatId) {
        return ResponseEntity.ok(chatMapper.leaveFromConversation(participantId, chatId));
    }
}
