package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_messages_seq")
    @SequenceGenerator(name = "chat_messages_seq", sequenceName = "chat_messages_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "text")
    private String text;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

    @Column(name = "tweet_id")
    private Long tweetId;

    @Column(name = "author_id")
    private Long authorId;

    @Column(name = "is_unread", columnDefinition = "boolean default true")
    private boolean unread;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
