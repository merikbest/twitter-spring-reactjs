package com.gmail.merikbest2015.model;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(of = "id")
@Table(name = "tags", indexes = @Index(name = "tags_tag_name_idx", columnList = "tag_name"))
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tags_seq")
    @SequenceGenerator(name = "tags_seq", sequenceName = "tags_seq", initialValue = 100, allocationSize = 1)
    private Long id;

    @NonNull
    @Column(name = "tag_name", nullable = false)
    private String tagName;

    @Column(name = "tweets_quantity", columnDefinition = "int8 default 1")
    private Long tweetsQuantity = 1L;
}
