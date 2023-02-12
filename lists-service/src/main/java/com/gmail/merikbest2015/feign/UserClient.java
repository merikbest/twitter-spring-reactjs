package com.gmail.merikbest2015.feign;

import com.gmail.merikbest2015.configuration.FeignConfiguration;
import com.gmail.merikbest2015.dto.response.lists.ListMemberResponse;
import com.gmail.merikbest2015.dto.response.lists.ListOwnerResponse;
import com.gmail.merikbest2015.dto.request.IdsRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import static com.gmail.merikbest2015.constants.PathConstants.API_V1_USER;
import static com.gmail.merikbest2015.constants.FeignConstants.USER_SERVICE;

@FeignClient(name = USER_SERVICE, contextId = "UserClient", configuration = FeignConfiguration.class)
public interface UserClient {

    @GetMapping(API_V1_USER + "/is_blocked/{userId}/{blockedUserId}")
    Boolean isUserBlocked(@PathVariable("userId") Long userId,
                          @PathVariable("blockedUserId") Long blockedUserId);

    @GetMapping(API_V1_USER + "/list/owner/{userId}")
    ListOwnerResponse getListOwnerById(@PathVariable("userId") Long userId);

    @GetMapping(API_V1_USER + "/is_private/{userId}")
    Boolean isUserHavePrivateProfile(@PathVariable("userId") Long userId);

    @PostMapping(API_V1_USER + "/list/participants")
    List<ListMemberResponse> getListParticipantsByIds(@RequestBody IdsRequest request);

    @GetMapping(API_V1_USER + "/list/participants/{username}")
    List<ListMemberResponse> searchListMembersByUsername(@PathVariable("username") String username);

    @PostMapping(API_V1_USER + "/valid/ids")
    List<Long> getValidUserIds(@RequestBody IdsRequest request);
}
