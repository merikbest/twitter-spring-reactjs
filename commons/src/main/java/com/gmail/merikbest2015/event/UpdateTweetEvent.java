package com.gmail.merikbest2015.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTweetEvent {
    private Long id;
    private String text;
    // private User author;
}
