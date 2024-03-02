package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(
        name = "chat_messages",
        indexes = {
                @Index(name = "chat_messages_author_id_idx", columnList = "author_id"),
                @Index(name = "chat_messages_tweet_id_idx", columnList = "tweet_id"),
                @Index(name = "chat_messages_chat_id_idx", columnList = "chat_id"),
        })
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chat_messages_seq")
    @SequenceGenerator(name = "chat_messages_seq", sequenceName = "chat_messages_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime date = LocalDateTime.now();

    @Column(name = "is_unread", columnDefinition = "boolean default true")
    private boolean unread = true;

    @NonNull
    @Column(name = "tweet_id")
    private Long tweetId;

    @NonNull
    @OneToOne
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
}
