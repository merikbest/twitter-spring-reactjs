package com.gmail.merikbest2015.commons.dto.commons_new;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gmail.merikbest2015.commons.dto.ImageResponse;
import lombok.Data;

@Data
public class ChatUserParticipantResponse {
    private Long id;
    private String fullName;
    private String username;
    private ImageResponse avatar;

    @JsonProperty("isMutedDirectMessages")
    private boolean isMutedDirectMessages;

    @JsonProperty("isUserBlocked")
    private boolean isUserBlocked;

    @JsonProperty("isMyProfileBlocked")
    private boolean isMyProfileBlocked;
}
