package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatParticipant;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatParticipantProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT cp.id AS id, cp.leftChat AS leftChat, cp.chat AS chat, cp.user AS user " +
            "FROM User u LEFT JOIN u.chats cp WHERE u.id = :userId")
    List<ChatParticipantProjection> getChatParticipants(Long userId);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.chats participant " +
            "LEFT JOIN participant.chat chat " +
            "WHERE chat.id = :chatId " +
            "AND participant.id = :participantId")
    Optional<UserProjection> getChatParticipant(Long participantId, Long chatId);

    @Modifying
    @Transactional
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = true " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    int leaveFromConversation(Long participantId, Long chatId);
}
