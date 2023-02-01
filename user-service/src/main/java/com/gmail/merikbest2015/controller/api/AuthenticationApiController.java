package com.gmail.merikbest2015.controller.api;

import com.gmail.merikbest2015.dto.UserPrincipalResponse;
import com.gmail.merikbest2015.mapper.BasicMapper;
import com.gmail.merikbest2015.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.gmail.merikbest2015.controller.PathConstants.API_V1_AUTH;


@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_AUTH)
public class AuthenticationApiController {

    private final AuthenticationService authenticationService;
    private final BasicMapper mapper;

    @GetMapping("/user/{email}")
    public UserPrincipalResponse getUserPrincipalByEmail(@PathVariable("email") String email) {
        return mapper.convertToResponse(authenticationService.getUserPrincipalByEmail(email), UserPrincipalResponse.class);
    }

//    @GetMapping("/user/id")
//    public Long getAuthenticatedUserId() {
//        return authenticationService.getAuthenticatedUserId();
//    }
//
//    @GetMapping("/user")
//    public User getAuthenticatedUser() {
//        return authenticationService.getAuthenticatedUser();
//    }
//
//    @GetMapping("/users")
//    public User getAuthUser() {
//        return mapper.convertToResponse(authenticationService.getAuthenticatedUserProjection(), User.class);
//    }
}
