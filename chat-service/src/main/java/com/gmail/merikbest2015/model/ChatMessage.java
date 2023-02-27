package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@RequiredArgsConstructor
@Table(name = "chat_messages")
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_messages_seq")
    @SequenceGenerator(name = "chat_messages_seq", sequenceName = "chat_messages_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "text")
    private String text;

    @Column(name = "date")
    private LocalDateTime date = LocalDateTime.now();

    @Column(name = "is_unread", columnDefinition = "boolean default true")
    private boolean unread = true;

    @NonNull
    @Column(name = "tweet_id")
    private Long tweetId;

    @NonNull
    @Column(name = "author_id")
    private Long authorId;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;
}
