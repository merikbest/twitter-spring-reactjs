package com.gmail.merikbest2015.feign;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient("user-service")
public interface UserClient {

//    @GetMapping("/api/v1/user/{userId}")
//    User getUserById(@PathVariable Long userId);
//
//    @GetMapping("/api/v1/user/auth/{email}")
//    AuthUserResponse getAuthUserByEmail(@PathVariable String email);
//
//    @GetMapping("/api/v1/user/email/{email}")
//    Optional<User> getUserByEmail(@PathVariable String email);
}
