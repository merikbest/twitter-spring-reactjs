package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.commons.models.ChatParticipant;
import com.gmail.merikbest2015.commons.projection.UserProjection;
import com.gmail.merikbest2015.repository.projection.ChatParticipantProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT cp.id AS id, cp.leftChat AS leftChat, cp.chat AS chat, cp.user AS user " +
            "FROM User u LEFT JOIN u.chats cp WHERE u.id = :userId")
    List<ChatParticipantProjection> getChatParticipants(@Param("userId") Long userId);

    @Query("SELECT user FROM User user " +
            "LEFT JOIN user.chats participant " +
            "LEFT JOIN participant.chat chat " +
            "WHERE chat.id = :chatId " +
            "AND participant.id = :participantId")
    Optional<UserProjection> getChatParticipant(@Param("participantId") Long participantId, @Param("chatId") Long chatId);

    @Modifying
    @Transactional
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = true " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    int leaveFromConversation(@Param("participantId") Long participantId, @Param("chatId") Long chatId);
}
