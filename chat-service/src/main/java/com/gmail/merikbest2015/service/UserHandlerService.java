package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.BlockUserEvent;
import com.gmail.merikbest2015.commons.event.FollowRequestUserEvent;
import com.gmail.merikbest2015.commons.event.FollowUserEvent;
import com.gmail.merikbest2015.commons.event.UpdateUserEvent;
import com.gmail.merikbest2015.model.User;

public interface UserHandlerService {

    User handleNewOrUpdateUser(UpdateUserEvent updateUserEvent);

    void handleBlockUser(BlockUserEvent blockUserEvent, String authId);

    void handleFollowUser(FollowUserEvent followUserEvent, String authId);

    void handleFollowUserRequest(FollowRequestUserEvent followRequestUserEvent, String authId);
}
