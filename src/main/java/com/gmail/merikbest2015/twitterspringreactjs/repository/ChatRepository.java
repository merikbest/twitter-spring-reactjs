package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    @Query("SELECT chat FROM Chat chat " +
            "JOIN chat.participants chatParticipant " +
            "WHERE chat.id = :chatId " +
            "AND chatParticipant.user.id = :userId")
    Optional<Chat> getChatByUserId(Long chatId, Long userId);
}
