package com.gmail.merikbest2015.twitterspringreactjs.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InputFieldException extends RuntimeException {
    private final HttpStatus status;
    private final Map<String, String> errorsMap;
    private final BindingResult bindingResult;

    public InputFieldException(BindingResult bindingResult) {
        this.status = HttpStatus.BAD_REQUEST;
        this.errorsMap = handleErrors(bindingResult);
        this.bindingResult = bindingResult;
    }

    public InputFieldException(HttpStatus status, Map<String, String> errorsMap) {
        this.status = status;
        this.errorsMap = errorsMap;
        this.bindingResult = null;
    }
    
    private Map<String, String> handleErrors(BindingResult bindingResult) {
        Map<String, String> map = new HashMap<>();
        bindingResult.getFieldErrors().forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
        return map;
    }
}
