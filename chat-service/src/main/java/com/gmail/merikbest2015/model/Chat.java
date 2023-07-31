package com.gmail.merikbest2015.model;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "chats")
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "chats_seq")
    @SequenceGenerator(name = "chats_seq", sequenceName = "chats_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @Column(name = "creation_date", columnDefinition = "timestamp default current_timestamp")
    private LocalDateTime creationDate = LocalDateTime.now();

    @OneToMany(mappedBy = "chat")
    private List<ChatParticipant> participants = new ArrayList<>();

    @OneToMany(mappedBy = "chat")
    private List<ChatMessage> messages = new ArrayList<>();
}
