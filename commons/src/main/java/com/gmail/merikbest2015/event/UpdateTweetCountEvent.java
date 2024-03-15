package com.gmail.merikbest2015.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UpdateTweetCountEvent {
    private boolean updateTweetsCount;
}
