package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@NoArgsConstructor
@Entity
@Table(name = "chat_participants")
public class ChatParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "left_chat", columnDefinition = "boolean default false")
    private boolean leftChat;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public ChatParticipant(User user, Chat chat) {
        this.user = user;
        this.chat = chat;
    }
}
