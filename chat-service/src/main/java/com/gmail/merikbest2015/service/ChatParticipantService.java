package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChatParticipantService {

    User getParticipant(Long participantId, Long chatId);

    String leaveFromConversation(Long participantId, Long chatId);

    Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable);
}
