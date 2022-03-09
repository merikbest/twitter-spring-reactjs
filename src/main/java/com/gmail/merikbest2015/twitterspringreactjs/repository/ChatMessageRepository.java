package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessageProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT cm.id AS id, cm.text AS text, cm.date AS date, cm.author AS author, cm.tweet AS tweet, cm.chat AS chat  " +
            "FROM ChatMessage cm " +
            "LEFT JOIN cm.chat.participants cp " +
            "WHERE cm.chat.id = :chatId " +
            "AND cp.user.id = :userId")
    List<ChatMessageProjection> getAllByChatId(Long chatId, Long userId);

    @Query("SELECT cm FROM ChatMessage cm WHERE cm.id = :messageId")
    ChatMessageProjection getChatMessageById(Long messageId);

    List<ChatMessage> findByTweet(Tweet tweet);
}
