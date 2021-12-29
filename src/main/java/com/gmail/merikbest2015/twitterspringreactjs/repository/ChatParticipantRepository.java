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
    @Query(value = "UPDATE chats_participants SET left_chat = true WHERE id = ?1 AND chat_id = ?2", nativeQuery = true)
    int leaveFromConversation(Long participantId, Long chatId);
}
