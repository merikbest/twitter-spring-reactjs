package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Modifying
    @Transactional
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = true " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    int leaveFromConversation(Long participantId, Long chatId);
}
