package com.gmail.merikbest2015;

import com.gmail.merikbest2015.repository.projection.BlockedUserProjection;
import com.gmail.merikbest2015.repository.projection.MutedUserProjection;
import com.gmail.merikbest2015.repository.projection.UserProjection;
import com.gmail.merikbest2015.util.TestConstants;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class UserServiceTestHelper {

    private static final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();
    private static final PageRequest pageable = PageRequest.of(0, 20);

    public static Page<BlockedUserProjection> createBlockedUserProjections() {
        BlockedUserProjection blockedUserProjection1 = factory.createProjection(
                BlockedUserProjection.class,
                Map.of(
                        "id", 1L,
                        "fullName", TestConstants.FULL_NAME,
                        "username", TestConstants.USERNAME,
                        "about", TestConstants.ABOUT,
                        "avatar", TestConstants.AVATAR_SRC_1,
                        "privateProfile", false,
                        "isUserBlocked", true
                ));
        BlockedUserProjection blockedUserProjection2 = factory.createProjection(
                BlockedUserProjection.class,
                Map.of(
                        "id", 2L,
                        "fullName", TestConstants.FULL_NAME,
                        "username", TestConstants.USERNAME,
                        "about", TestConstants.ABOUT,
                        "avatar", TestConstants.AVATAR_SRC_1,
                        "privateProfile", false,
                        "isUserBlocked", true
                ));
        return new PageImpl<>(Arrays.asList(blockedUserProjection1, blockedUserProjection2), pageable, 20);
    }

    public static Page<MutedUserProjection> createMutedUserProjections() {
        MutedUserProjection mutedUserProjection1 = factory.createProjection(
                MutedUserProjection.class,
                Map.of(
                        "id", 1L,
                        "fullName", TestConstants.FULL_NAME,
                        "username", TestConstants.USERNAME,
                        "about", TestConstants.ABOUT,
                        "avatar", TestConstants.AVATAR_SRC_1,
                        "privateProfile", false,
                        "isUserMuted", true
                ));
        MutedUserProjection mutedUserProjection2 = factory.createProjection(
                MutedUserProjection.class,
                Map.of(
                        "id", 2L,
                        "fullName", TestConstants.FULL_NAME,
                        "username", TestConstants.USERNAME,
                        "about", TestConstants.ABOUT,
                        "avatar", TestConstants.AVATAR_SRC_1,
                        "privateProfile", false,
                        "isUserMuted", true
                ));
        return new PageImpl<>(Arrays.asList(mutedUserProjection1, mutedUserProjection2), pageable, 20);
    }

    public static Page<UserProjection> createUserProjections() {
        UserProjection userProjection1 = factory.createProjection(
                UserProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
        UserProjection userProjection2 = factory.createProjection(
                UserProjection.class,
                new HashMap<>() {{
                    put("id", 1L);
                    put("fullName", TestConstants.FULL_NAME);
                    put("username", TestConstants.USERNAME);
                    put("about", TestConstants.ABOUT);
                    put("avatar", TestConstants.AVATAR_SRC_1);
                    put("privateProfile", false);
                    put("mutedDirectMessages", false);
                    put("isUserBlocked", false);
                    put("isMyProfileBlocked", false);
                    put("isWaitingForApprove", false);
                    put("isFollower", false);
                }});
        return new PageImpl<>(Arrays.asList(userProjection1, userProjection2), pageable, 20);
    }
}
