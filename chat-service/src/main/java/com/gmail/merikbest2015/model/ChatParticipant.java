package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(
        name = "chats_participants",
        indexes = {
                @Index(name = "chats_participants_chat_id_idx", columnList = "chat_id"),
                @Index(name = "chats_participants_user_id_idx", columnList = "user_id"),
        })
public class ChatParticipant {

    @EmbeddedId
    private ChatUserId chatUserId;

    @MapsId("chatId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "left_chat", columnDefinition = "boolean default false")
    private boolean leftChat;

    public ChatParticipant(Chat chat, User user) {
        this.chatUserId = new ChatUserId(chat.getId(), user.getId());
        this.chat = chat;
        this.user = user;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class ChatUserId implements Serializable {

        @Column(name = "chat_id", nullable = false)
        private Long chatId;

        @Column(name = "user_id", nullable = false)
        private Long userId;
    }
}
