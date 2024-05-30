package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.response.notification.NotificationUserResponse;
import com.gmail.merikbest2015.dto.response.user.UserResponse;
import com.gmail.merikbest2015.service.UserClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.*;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_USER)
public class UserApiController {

    private final UserClientService userService;

    @GetMapping(USER_ID)
    public UserResponse getUserById(@PathVariable("userId") Long userId) {
        return userService.getUserResponseById(userId);
    }

    @GetMapping(SUBSCRIBERS)
    public List<NotificationUserResponse> getUsersWhichUserSubscribed() {
        return userService.getUsersWhichUserSubscribed();
    }

    @GetMapping(SUBSCRIBERS_IDS)
    public List<Long> getUserIdsWhichUserSubscribed() {
        return userService.getUserIdsWhichUserSubscribed();
    }
}
