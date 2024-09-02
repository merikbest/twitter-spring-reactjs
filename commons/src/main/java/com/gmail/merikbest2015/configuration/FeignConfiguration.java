package com.gmail.merikbest2015.configuration;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpServletRequest;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

@Configuration
public class FeignConfiguration {

    @Bean
    public RequestInterceptor requestInterceptor() {
        return template -> {
            RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
            if (attributes != null) {
                HttpServletRequest request = ((ServletRequestAttributes) attributes).getRequest();
                template.header(AUTH_USER_ID_HEADER, request.getHeader(AUTH_USER_ID_HEADER));
            }
        };
    }
}
