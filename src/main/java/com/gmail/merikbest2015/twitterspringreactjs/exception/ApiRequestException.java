package com.gmail.merikbest2015.twitterspringreactjs.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class ApiRequestException extends RuntimeException {
    private final HttpStatus status;

    public ApiRequestException(String message, HttpStatus status) {
        super(message);
        this.status = status;
    }
}
