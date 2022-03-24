package com.gmail.merikbest2015.twitterspringreactjs.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.validation.BindingResult;

import lombok.Getter;

@Getter
public class InputFieldException extends RuntimeException {

    private final BindingResult bindingResult;
    private final Map<String, String> errorsMap;

    public InputFieldException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
        this.errorsMap = handleErrors(bindingResult);
    }
    
    private Map<String, String> handleErrors(BindingResult bindingResult) {
        Map<String, String> map = new HashMap<>();
        bindingResult.getFieldErrors().forEach(fieldError -> map.put(fieldError.getField(), fieldError.getDefaultMessage()));
        return map;
    }
}
