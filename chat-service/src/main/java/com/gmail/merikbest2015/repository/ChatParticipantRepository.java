package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT chatParticipant FROM ChatParticipant chatParticipant " +
            "WHERE chatParticipant.userId = :userId")
    ChatParticipant getChatParticipant(@Param("userId") Long userId);

    @Query("SELECT chatParticipant FROM ChatParticipant chatParticipant " +
            "WHERE chatParticipant.chat.id = :chatId " +
            "AND chatParticipant.userId <> :authUserId")
    Optional<ChatParticipant> getChatParticipant(@Param("chatId") Long chatId, @Param("authUserId") Long authUserId);

    @Query("SELECT chatParticipant.id FROM ChatParticipant chatParticipant WHERE chatParticipant.chat.id = :chatId")
    List<Long> getChatParticipantIds(@Param("chatId") Long chatId);

//    @Query("SELECT cp.id AS id, cp.leftChat AS leftChat, cp.chat AS chat, cp.user AS user " +
//            "FROM User u LEFT JOIN u.chats cp WHERE u.id = :userId")
//    List<ChatParticipantProjection> getChatParticipants(@Param("userId") Long userId);
//
//
//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.chats participant " +
//            "LEFT JOIN participant.chat chat " +
//            "WHERE chat.id = :chatId " +
//            "AND participant.id = :participantId")
//    Optional<UserProjection> getChatParticipant(@Param("participantId") Long participantId, @Param("chatId") Long chatId);
//
//
//    @Query("SELECT user FROM User user " +
//            "LEFT JOIN user.chats participant " +
//            "LEFT JOIN participant.chat chat " +
//            "WHERE chat.id = :chatId " +
//            "AND participant.id = :participantId")
//    Optional<UserProjection> getChatParticipant(@Param("participantId") Long participantId, @Param("chatId") Long chatId);
//
//    @Modifying
//    @Transactional
//    @Query("UPDATE ChatParticipant chatParticipant " +
//            "SET chatParticipant.leftChat = true " +
//            "WHERE chatParticipant.id = :participantId " +
//            "AND chatParticipant.chat.id = :chatId")
//    int leaveFromConversation(@Param("participantId") Long participantId, @Param("chatId") Long chatId);
}
