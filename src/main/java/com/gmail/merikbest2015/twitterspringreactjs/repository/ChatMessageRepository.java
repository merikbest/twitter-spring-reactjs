package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatMessage;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    @Query("SELECT chatMessage FROM ChatMessage chatMessage " +
            "JOIN chatMessage.chat.participants chatParticipant " +
            "WHERE chatMessage.chat.id = :chatId " +
            "AND chatParticipant.user.id = :userId")
    List<ChatMessage> getAllByChatId(Long chatId, Long userId);

    List<ChatMessage> findByTweet(Tweet tweet);
}
