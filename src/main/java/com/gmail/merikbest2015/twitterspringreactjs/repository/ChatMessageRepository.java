package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatMessagesProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT cm AS message FROM ChatMessage cm " +
            "JOIN cm.chat.participants cp " +
            "WHERE cm.chat.id = :chatId " +
            "AND cp.user.id = :userId")
    List<ChatMessagesProjection> getAllByChatId(Long chatId, Long userId);

    List<ChatMessage> findByTweet(Tweet tweet);
}
