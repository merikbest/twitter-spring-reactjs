package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.event.*;
import com.gmail.merikbest2015.model.User;

public interface UserHandlerService {

    User handleNewOrUpdateUser(UpdateUserEvent userEvent);

    void handleBlockUser(BlockUserEvent userEvent, String authId);

    void handleMuteUser(MuteUserEvent userEvent, String authId);

    void handleFollowUser(FollowUserEvent userEvent, String authId);

    void handleFollowUserRequest(FollowRequestUserEvent userEvent, String authId);
}
