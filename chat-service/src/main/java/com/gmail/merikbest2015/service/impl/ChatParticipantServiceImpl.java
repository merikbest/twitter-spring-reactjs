package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.dto.HeaderResponse;
import com.gmail.merikbest2015.dto.response.UserChatResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.Chat;
import com.gmail.merikbest2015.model.ChatParticipant;
import com.gmail.merikbest2015.repository.ChatMessageRepository;
import com.gmail.merikbest2015.repository.ChatParticipantRepository;
import com.gmail.merikbest2015.repository.ChatRepository;
import com.gmail.merikbest2015.service.ChatParticipantService;
import com.gmail.merikbest2015.util.AuthUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_NOT_FOUND;
import static com.gmail.merikbest2015.constants.ErrorMessage.CHAT_PARTICIPANT_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class ChatParticipantServiceImpl implements ChatParticipantService {

    private final ChatRepository chatRepository;
    private final ChatParticipantRepository chatParticipantRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final UserClient userClient;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getParticipant(Long participantId, Long chatId) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();

        if (!chatRepository.isChatExists(chatId, authUserId)) {
            throw new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        Long userId = chatParticipantRepository.getParticipantUserId(participantId, chatId)
                .orElseThrow(() -> new ApiRequestException(CHAT_PARTICIPANT_NOT_FOUND, HttpStatus.NOT_FOUND));
        return userClient.getUserResponseById(userId);
    }

    @Override
    @Transactional
    public String leaveFromConversation(Long participantId, Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new ApiRequestException(CHAT_NOT_FOUND, HttpStatus.NOT_FOUND));
        if (chatParticipantRepository.leaveFromConversation(participantId, chatId) != 1) {
            throw new ApiRequestException(CHAT_PARTICIPANT_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        boolean isParticipantsLeftFromChat = chat.getParticipants().stream()
                .allMatch(ChatParticipant::isLeftChat);

        if (isParticipantsLeftFromChat) {
            chatMessageRepository.deleteAll(chat.getMessages());
            chatParticipantRepository.deleteAll(chat.getParticipants());
            chatRepository.delete(chat);
            return "Chat successfully deleted";
        }
        return "Successfully left the chat";
    }

    @Override
    @Transactional(readOnly = true)
    public HeaderResponse<UserChatResponse> searchUsersByUsername(String username, Pageable pageable) {
        Long authUserId = AuthUtil.getAuthenticatedUserId();
        HeaderResponse<UserChatResponse> users = userClient.searchUsersByUsername(username, pageable);
        List<UserChatResponse> usersResponse = users.getItems().stream()
                .peek(user -> {
                    Chat chat = chatRepository.getChatByParticipants(authUserId, user.getId());

                    if (chat != null) {
                        user.setUserChatParticipant(true);
                    }
                }).toList();
        users.setItems(usersResponse);
        return users;
    }
}
