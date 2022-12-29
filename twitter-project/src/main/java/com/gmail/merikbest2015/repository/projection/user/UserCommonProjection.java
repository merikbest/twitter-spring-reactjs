package com.gmail.merikbest2015.repository.projection.user;

public interface UserCommonProjection {
    Long getId();
    String getEmail();
    String getFullName();
    String getActivationCode();
    String getPasswordResetCode();
}
