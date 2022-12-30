package com.gmail.merikbest2015.client.user;

import com.gmail.merikbest2015.models.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient("user-service")
public interface UserClient {

    @GetMapping("/api/v1/user/ids")
    List<Long> getUserFollowersIds();

    @PostMapping("/api/v1/user")
    void saveUser(User user);
}
