package com.gmail.merikbest2015.client.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Pageable;

@Data
@AllArgsConstructor
public class ChatSearchRequest {
    private String username;
    private Pageable pageable;
}
