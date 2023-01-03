package com.gmail.merikbest2015.commons.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpHeaders;

import java.util.List;

@Data
@AllArgsConstructor
public class HeaderResponse<T> {
    private List<T> items;
    private HttpHeaders headers;
}
