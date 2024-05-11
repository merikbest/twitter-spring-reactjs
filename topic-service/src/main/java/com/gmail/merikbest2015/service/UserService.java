package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.User;

public interface UserService {

    User getAuthUser();

    void validateUserProfile(Long userId);
}
