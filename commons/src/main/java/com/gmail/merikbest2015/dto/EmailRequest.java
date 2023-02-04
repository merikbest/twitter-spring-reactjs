package com.gmail.merikbest2015.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Map;

@Data
@AllArgsConstructor
public class EmailRequest {
    private String to;
    private String subject;
    private String template;
    private Map<String, Object> attributes;
}
