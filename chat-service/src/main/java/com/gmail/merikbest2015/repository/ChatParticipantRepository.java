package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ChatParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, ChatParticipant.ChatUserId> {

    @Query("""
            SELECT chatParticipant FROM ChatParticipant chatParticipant
            WHERE chatParticipant.user.id = :participantId
            AND chatParticipant.chat.id = :chatId
            """)
    Optional<ChatParticipant> getChatParticipant(@Param("participantId") Long participantId,
                                                 @Param("chatId") Long chatId);

    @Query("""
            SELECT chatParticipant FROM ChatParticipant chatParticipant
            WHERE chatParticipant.user.id <> :authUserId
            AND chatParticipant.chat.id = :chatId
            """)
    Optional<ChatParticipant> getChatParticipantExcludeUserId(@Param("authUserId") Long authUserId,
                                                              @Param("chatId") Long chatId);

    @Modifying
    @Query("""
            UPDATE ChatParticipant chatParticipant
            SET chatParticipant.leftChat = false
            WHERE chatParticipant.user.id = :userId
            AND chatParticipant.chat.id = :chatId
            """)
    void updateParticipantWhoLeftChat(@Param("userId") Long userId, @Param("chatId") Long chatId);
}
