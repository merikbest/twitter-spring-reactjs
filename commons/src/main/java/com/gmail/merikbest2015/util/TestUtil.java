package com.gmail.merikbest2015.util;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;

public class TestUtil {
    public static void mockAuthenticatedUserId() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(AUTH_USER_ID_HEADER, "1");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
    }
}
