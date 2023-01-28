package com.gmail.merikbest2015.repository;

import com.gmail.merikbest2015.model.ChatMessage;
import com.gmail.merikbest2015.repository.projection.ChatMessageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

//    @Query("SELECT cm.id AS id, cm.text AS text, cm.date AS date, a AS author, t AS tweet, c AS chat  " +
//            "FROM ChatMessage cm " +
//            "LEFT JOIN cm.chat c " +
//            "LEFT JOIN cm.author a " +
//            "LEFT JOIN cm.tweet t " +
//            "LEFT JOIN c.participants cp " +
//            "WHERE cm.chat.id = :chatId " +
//            "AND cp.user.id = :userId")
//    List<ChatMessageProjection> getAllByChatId(@Param("chatId") Long chatId, @Param("userId") Long userId);

    @Query("SELECT chatMessage FROM ChatMessage chatMessage " +
            "WHERE chatMessage.chat.id = :chatId")
    List<ChatMessageProjection> getChatMessages(@Param("chatId") Long chatId);

    @Modifying
    @Query("UPDATE ChatMessage chatMessage " +
            "SET chatMessage.unread = false " +
            "WHERE chatMessage.chat.id = :chatId " +
            "AND chatMessage.authorId <> :userId")
    void readChatMessages(@Param("chatId") Long chatId, @Param("userId") Long userId);

    @Query("SELECT COUNT(chatMessage) FROM ChatMessage chatMessage " +
            "WHERE chatMessage.chat.id IN :chatIds " +
            "AND chatMessage.unread = true " +
            "AND chatMessage.authorId <> :userId")
    Long getUnreadMessagesCount(@Param("chatIds") List<Long> chatIds, @Param("userId") Long userId);

    @Query("SELECT COUNT(chatMessage) FROM ChatMessage chatMessage " +
            "LEFT JOIN chatMessage.chat chat " +
            "LEFT JOIN chat.participants participant " +
            "WHERE participant.userId = :userId " +
            "AND participant.leftChat = false " +
            "AND chatMessage.unread = true " +
            "AND chatMessage.authorId <> :userId")
    Long getUnreadMessagesCount(@Param("userId") Long userId);

    @Query("SELECT chatMessage FROM ChatMessage chatMessage WHERE chatMessage.id = :messageId")
    ChatMessageProjection getChatMessageById(@Param("messageId") Long messageId);
}
