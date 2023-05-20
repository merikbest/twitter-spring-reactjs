package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.user.CommonUserResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;

import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;
import static com.gmail.merikbest2015.constants.PathConstants.*;

@FeignClient(name = USER_SERVICE, path = API_V1_USER, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_BLOCKED_USER_ID)
    Boolean isUserBlocked(@PathVariable("userId") Long userId,
                          @PathVariable("blockedUserId") Long blockedUserId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(LIST_OWNER_USER_ID)
    CommonUserResponse getListOwnerById(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE)
    @GetMapping(IS_PRIVATE_USER_ID)
    Boolean isUserHavePrivateProfile(@PathVariable("userId") Long userId);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyMemberList")
    @PostMapping(LIST_PARTICIPANTS)
    List<ListMemberResponse> getListParticipantsByIds(@RequestBody IdsRequest request);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyMemberList")
    @GetMapping(LIST_PARTICIPANTS_USERNAME)
    List<ListMemberResponse> searchListMembersByUsername(@PathVariable("username") String username);

    @CircuitBreaker(name = USER_SERVICE, fallbackMethod = "defaultEmptyIdsList")
    @PostMapping(VALID_IDS)
    List<Long> getValidUserIds(@RequestBody IdsRequest request);

    default ArrayList<ListMemberResponse> defaultEmptyMemberList(Throwable throwable) {
        return new ArrayList<>();
    }

    default ArrayList<Long> defaultEmptyIdsList(Throwable throwable) {
        return new ArrayList<>();
    }
}
