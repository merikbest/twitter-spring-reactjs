package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import com.gmail.merikbest2015.constants.ChatErrorMessage;
import com.gmail.merikbest2015.constants.ChatSuccessMessage;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.repository.projection.UserChatProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.service.ChatParticipantService;
import com.gmail.merikbest2015.service.UserService;
import com.gmail.merikbest2015.commons.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatParticipantServiceImpl implements ChatParticipantService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserProjection getParticipant(Long participantId, Long chatId) {
        if (!chatRepository.isChatExists(chatId, AuthUtil.getAuthenticatedUserId())) {
            throw new ApiRequestException(ChatErrorMessage.CHAT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        User user = chatParticipantRepository.getChatParticipant(participantId, chatId)
                .orElseThrow(() -> new ApiRequestException(ChatErrorMessage.CHAT_PARTICIPANT_NOT_FOUND, HttpStatus.NOT_FOUND))
                .getUser();
        return userService.getUserProjectionById(user.getId());
    }

    @Override
    @Transactional
    public String leaveFromConversation(Long participantId, Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ApiRequestException(ChatErrorMessage.CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        ChatParticipant chatParticipant = chatParticipantRepository.getChatParticipant(participantId, chatId)
                .orElseThrow(() -> new ApiRequestException(ChatErrorMessage.CHAT_PARTICIPANT_NOT_FOUND, HttpStatus.NOT_FOUND));
        chatParticipant.setLeftChat(true);

        if (chat.getParticipants().stream().allMatch(ChatParticipant::isLeftChat)) {
            chatRepository.delete(chat);
            return ChatSuccessMessage.CHAT_SUCCESSFULLY_DELETED;
        }
        return ChatSuccessMessage.SUCCESSFULLY_LEFT_THE_CHAT;
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UserChatProjection> searchUsersByUsername(String username, Pageable pageable) {
        return userService.searchUsersByUsername(username, pageable);
    }
}
