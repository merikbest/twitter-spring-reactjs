package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import org.springframework.data.domain.Pageable;

public interface ChatParticipantService {

    UserResponse getParticipant(Long participantId, Long chatId);

    String leaveFromConversation(Long participantId, Long chatId);

    HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable);
}
