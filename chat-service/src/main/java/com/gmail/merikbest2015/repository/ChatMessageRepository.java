package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("""
            SELECT chatMessage FROM ChatMessage chatMessage
            WHERE chatMessage.chat.id = :chatId
            ORDER BY chatMessage.date ASC
            """)
    List<ChatMessageProjection> getChatMessages(@Param("chatId") Long chatId);

    @Modifying
    @Query("""
            UPDATE ChatMessage chatMessage
            SET chatMessage.unread = false
            WHERE chatMessage.chat.id = :chatId
            AND chatMessage.author.id <> :userId
            """)
    void readChatMessages(@Param("chatId") Long chatId, @Param("userId") Long userId);

    @Query("""
            SELECT COUNT(chatMessage) FROM ChatMessage chatMessage
            WHERE chatMessage.chat.id IN (
               SELECT chat.id FROM Chat chat
               LEFT JOIN chat.participants participant
               WHERE participant.user.id = :userId
               AND participant.leftChat = false)
            AND chatMessage.unread = true
            AND chatMessage.author.id <> :userId
            """)
    Long getUnreadMessagesCount(@Param("userId") Long userId);

    @Query("SELECT chatMessage FROM ChatMessage chatMessage WHERE chatMessage.id = :messageId")
    Optional<ChatMessageProjection> getChatMessageById(@Param("messageId") Long messageId);
}
