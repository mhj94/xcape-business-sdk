package com.chadev.xcape.admin.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.chadev.xcape.core.exception.ErrorCode;
import com.chadev.xcape.core.exception.XcapeException;
import com.chadev.xcape.core.response.Response;

@Slf4j
@RestControllerAdvice
public class AdminControllerAdvice {

    @ExceptionHandler(XcapeException.class)
    public Response<ErrorCode> handleException(HttpServletRequest request, XcapeException e) {
        log.error(">>> {}: \"{}\" error: \n", request.getMethod(), request.getServletPath(), e);
        return Response.error(e);
    }
}
