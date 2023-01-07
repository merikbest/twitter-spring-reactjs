package com.gmail.merikbest2015.commons.util;

import com.gmail.merikbest2015.commons.exception.ApiRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

public class AuthUtil {

    public static Long getAuthenticatedUserId() {
        RequestAttributes attribs = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = ((ServletRequestAttributes) attribs).getRequest();
        String userId = request.getHeader("X-auth-user-id");

        if (userId == null) {
            throw new ApiRequestException("User not found", HttpStatus.NOT_FOUND);
        } else {
            return Long.parseLong(userId);
        }
    }
}
