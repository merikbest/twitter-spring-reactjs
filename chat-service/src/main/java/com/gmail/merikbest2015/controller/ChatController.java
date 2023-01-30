package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.UserResponse;
import com.gmail.merikbest2015.dto.request.ChatMessageRequest;
import com.gmail.merikbest2015.dto.request.MessageWithTweetRequest;
import com.gmail.merikbest2015.dto.response.ChatMessageResponse;
import com.gmail.merikbest2015.dto.response.ChatResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.mapper.ChatMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.gmail.merikbest2015.controller.PathConstants.UI_V1_CHAT;

@RestController
@RequiredArgsConstructor
@RequestMapping(UI_V1_CHAT)
public class ChatController {

    private final ChatMapper chatMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{chatId}")
    public ResponseEntity<ChatResponse> getChatById(@PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMapper.getChatById(chatId));
    }

    @GetMapping("/users")
    public ResponseEntity<List<ChatResponse>> getUserChats() {
        return ResponseEntity.ok(chatMapper.getUserChats());
    }

    @GetMapping("/create/{userId}")
    public ResponseEntity<ChatResponse> createChat(@PathVariable("userId") Long userId) {
        return ResponseEntity.ok(chatMapper.createChat(userId));
    }

    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<ChatMessageResponse>> getChatMessages(@PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMapper.getChatMessages(chatId));
    }

    @GetMapping("/{chatId}/read/messages")
    public ResponseEntity<Long> readChatMessages(@PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMapper.readChatMessages(chatId));
    }

    @PostMapping("/add/message")
    public ResponseEntity<Void> addMessage(@RequestBody ChatMessageRequest request) {
        chatMapper.addMessage(request)
                .forEach((userId, message) -> messagingTemplate.convertAndSend("/topic/chat/" + userId, message));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/add/message/tweet")
    public ResponseEntity<Void> addMessageWithTweet(@RequestBody MessageWithTweetRequest request) {
        chatMapper.addMessageWithTweet(request)
                .forEach((userId, message) -> messagingTemplate.convertAndSend("/topic/chat/" + userId, message));
        return ResponseEntity.ok().build();
    }

    @GetMapping("/participant/{participantId}/{chatId}")
    public ResponseEntity<UserResponse> getParticipant(@PathVariable("participantId") Long participantId,
                                                       @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMapper.getParticipant(participantId, chatId));
    }

    @GetMapping("/leave/{participantId}/{chatId}")
    public ResponseEntity<String> leaveFromConversation(@PathVariable("participantId") Long participantId,
                                                        @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatMapper.leaveFromConversation(participantId, chatId));
    }

    @GetMapping("/search/{username}")
    public ResponseEntity<List<UserChatResponse>> searchParticipantsByUsername(@PathVariable("username") String username,
                                                                               @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserChatResponse> response = chatMapper.searchParticipantsByUsername(username, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
