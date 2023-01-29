package com.gmail.merikbest2015.commons.dto.commons_new;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import lombok.Data;

@Data
public class ChatTweetUserResponse {
    private Long id;
    private String fullName;
    private String username;
    private ImageResponse avatar;
}
