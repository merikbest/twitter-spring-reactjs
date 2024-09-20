package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.commons.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.commons.dto.response.user.UserResponse;
import com.gmail.merikbest2015.mapper.ChatParticipantMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_CHAT)
public class ChatParticipantController {

    private final ChatParticipantMapper chatParticipantMapper;

    @GetMapping(PathConstants.PARTICIPANT_CHAT_ID)
    public ResponseEntity<UserResponse> getParticipant(@PathVariable("participantId") Long participantId,
                                                       @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatParticipantMapper.getParticipant(participantId, chatId));
    }

    @GetMapping(PathConstants.LEAVE_CHAT_ID)
    public ResponseEntity<String> leaveFromConversation(@PathVariable("participantId") Long participantId,
                                                        @PathVariable("chatId") Long chatId) {
        return ResponseEntity.ok(chatParticipantMapper.leaveFromConversation(participantId, chatId));
    }

    @GetMapping(PathConstants.SEARCH_USERNAME)
    public ResponseEntity<List<UserChatResponse>> searchParticipantsByUsername(@PathVariable("username") String username,
                                                                               @PageableDefault(size = 15) Pageable pageable) {
        HeaderResponse<UserChatResponse> response = chatParticipantMapper.searchParticipantsByUsername(username, pageable);
        return ResponseEntity.ok().headers(response.getHeaders()).body(response.getItems());
    }
}
