package com.gmail.merikbest2015.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatMessageRequest {
    private Long chatId;
    private String text;
}
