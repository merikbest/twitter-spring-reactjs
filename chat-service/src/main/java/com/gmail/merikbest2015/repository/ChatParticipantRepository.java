package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT chatParticipant.userId FROM ChatParticipant chatParticipant WHERE chatParticipant.chat.id = :chatId")
    List<Long> getChatParticipantIds(@Param("chatId") Long chatId);

    @Modifying
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = false " +
            "WHERE chatParticipant.userId = :userId " +
            "AND chatParticipant.chat.id = :chatId")
    void updateParticipantWhoLeftChat(@Param("userId") Long userId, @Param("chatId") Long chatId);

    @Query("SELECT chatParticipant.userId FROM ChatParticipant chatParticipant " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    Optional<Long> getParticipantUserId(@Param("participantId") Long participantId, @Param("chatId") Long chatId);

    @Query("SELECT chatParticipant.userId FROM ChatParticipant chatParticipant " +
            "WHERE chatParticipant.chat.id = :chatId " +
            "GROUP BY chatParticipant.userId " +
            "HAVING chatParticipant.userId <> :authUserId")
    Long getChatParticipantId(@Param("authUserId") Long authUserId, @Param("chatId") Long chatId);

    @Modifying
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = true " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    int leaveFromConversation(@Param("participantId") Long participantId, @Param("chatId") Long chatId);
}
