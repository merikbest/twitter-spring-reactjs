package com.gmail.merikbest2015.dto.request;

import lombok.Data;

@Data
public class ChatMessageRequest {
    private Long chatId;
    private String text;
}
