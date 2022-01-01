package com.gmail.merikbest2015.twitterspringreactjs.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@EqualsAndHashCode(of = {"id"})
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "creation_date")
    private LocalDateTime creationDate;

    @OneToMany(mappedBy = "chat")
    private Set<ChatParticipant> participants;

    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL)
    private Set<ChatMessage> messages;

    public Chat() {
        this.participants = new HashSet<>();
        this.messages = new HashSet<>();
        this.creationDate = LocalDateTime.now().withNano(0);
    }
}
