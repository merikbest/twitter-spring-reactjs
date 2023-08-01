package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(
        name = "chats_participants",
        indexes = {
                @Index(name = "chats_participants_user_id_idx", columnList = "user_id"),
                @Index(name = "chats_participants_chat_id_idx", columnList = "chat_id"),
        })
public class ChatParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chats_participants_seq")
    @SequenceGenerator(name = "chats_participants_seq", sequenceName = "chats_participants_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "left_chat", columnDefinition = "boolean default false")
    private boolean leftChat = false;

    @NonNull
    @Column(name = "user_id", nullable = false)
    private Long userId;

    @NonNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id", nullable = false)
    private Chat chat;
}
