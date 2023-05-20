package com.gmail.merikbest2015.repository.projection;

public interface CommonUserProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAvatar();
    boolean isPrivateProfile();
}
