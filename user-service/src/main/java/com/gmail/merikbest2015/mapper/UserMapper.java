package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.dto.AuthUserResponse;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final BasicMapper mapper;
    private final UserService userService;

    public AuthUserResponse getAuthUserByEmail(String email) {
        return mapper.convertToResponse(userService.getAuthUserByEmail(email), AuthUserResponse.class);
    }


}
