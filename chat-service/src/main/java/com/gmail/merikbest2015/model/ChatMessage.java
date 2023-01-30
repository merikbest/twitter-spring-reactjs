package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
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
    private boolean unread = true;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    public ChatMessage(String text, Long tweetId, Long authorId) {
        this.text = text;
        this.tweetId = tweetId;
        this.authorId = authorId;
    }
}
