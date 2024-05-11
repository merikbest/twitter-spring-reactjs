package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.*;

public interface UserHandlerService {

    void handleUpdateUser(UpdateUserEvent userEvent);

    void handleBlockUser(BlockUserEvent userEvent, String authId);

    void handleMuteUser(MuteUserEvent userEvent, String authId);

    void handleFollowUser(FollowUserEvent userEvent, String authId);

    void handleFollowUserRequest(FollowRequestUserEvent userEvent, String authId);
}
