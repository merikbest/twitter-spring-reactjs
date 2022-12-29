package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.models.User;
import com.gmail.merikbest2015.repository.projection.AuthUserProjection;

public interface UserService {

    User getUserById(Long userId);

    AuthUserProjection getAuthUserByEmail(String email);
}
