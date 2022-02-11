package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Table(name = "chats_participants")
public class ChatParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chats_participants_seq")
    @SequenceGenerator(name = "chats_participants_seq", sequenceName = "chats_participants_seq", initialValue = 100, allocationSize = 1)
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
