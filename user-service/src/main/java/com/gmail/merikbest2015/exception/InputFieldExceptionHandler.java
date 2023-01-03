package com.gmail.merikbest2015.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
public class InputFieldExceptionHandler {

    @ExceptionHandler(InputFieldException.class)
    public ResponseEntity<Map<String, String>> handleInputFieldException(InputFieldException exception) {
        InputFieldException inputFieldException;
        
        if (exception.getBindingResult() != null) {
            inputFieldException = new InputFieldException(exception.getBindingResult());
        } else {
            inputFieldException = new InputFieldException(exception.getStatus(), exception.getErrorsMap());
        }
        return ResponseEntity.status(inputFieldException.getStatus()).body(inputFieldException.getErrorsMap());
    }
}
