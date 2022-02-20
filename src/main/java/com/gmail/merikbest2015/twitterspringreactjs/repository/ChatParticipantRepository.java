package com.gmail.merikbest2015.twitterspringreactjs.repository;

import com.gmail.merikbest2015.twitterspringreactjs.model.ChatParticipant;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat.ChatParticipantsProjection;
import com.gmail.merikbest2015.twitterspringreactjs.repository.projection.user.BaseUserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    @Query("SELECT cp as participant FROM User u LEFT JOIN u.chats cp WHERE u.id = :userId")
    List<ChatParticipantsProjection> getChatParticipants(Long userId);

    @Query("SELECT u.id as id, u.fullName as fullName, u.username as username, u.about as about, " +
            "u.privateProfile as isPrivateProfile, u.avatar.id as img_id, u.avatar.src as img_src " +
            "FROM Chat c " +
            "LEFT JOIN c.participants p " +
            "LEFT JOIN p.user u " +
            "WHERE c.id = :chatId " +
            "AND p.id = :participantId")
    Optional<BaseUserProjection> getChatParticipant(Long participantId, Long chatId);

    @Modifying
    @Transactional
    @Query("UPDATE ChatParticipant chatParticipant " +
            "SET chatParticipant.leftChat = true " +
            "WHERE chatParticipant.id = :participantId " +
            "AND chatParticipant.chat.id = :chatId")
    int leaveFromConversation(Long participantId, Long chatId);
}
