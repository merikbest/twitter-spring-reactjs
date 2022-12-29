package com.gmail.merikbest2015.dto;

import lombok.Data;

import java.util.Map;

@Data
public class EmailRequest {
    private String to;
    private String subject;
    private String template;
    private Map<String, Object> attributes;
}
