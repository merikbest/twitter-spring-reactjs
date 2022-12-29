package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.AuthUserResponse;
import com.gmail.merikbest2015.mapper.UserMapper;
import com.gmail.merikbest2015.models.User;
import com.gmail.merikbest2015.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
public class UserApiController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @GetMapping("/auth/{email}")
    public AuthUserResponse getAuthUserByEmail(@PathVariable String email) {
        return userMapper.getAuthUserByEmail(email);
    }
}
