package com.example.demo.Error;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.example.demo.Entity.*;
@ControllerAdvice
@ResponseStatus
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler
{
@ExceptionHandler(GlobalExceptionHandling.class)
public ResponseEntity<ErrorMessage> notFoundException(GlobalExceptionHandling exception,WebRequest request) {
    ErrorMessage message=new ErrorMessage(HttpStatus.NOT_FOUND,exception.getMessage());
    System.out.println("Inside ResponseEntity");
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
   }
}
