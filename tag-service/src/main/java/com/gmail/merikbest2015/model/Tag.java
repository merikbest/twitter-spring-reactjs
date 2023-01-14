package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode
@Table(name = "tags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tags_seq")
    @SequenceGenerator(name = "tags_seq", sequenceName = "tags_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "tag_name")
    private String tagName;

    @NonNull
    @Column(name = "tweets_quantity")
    private Long tweetsQuantity;
}
