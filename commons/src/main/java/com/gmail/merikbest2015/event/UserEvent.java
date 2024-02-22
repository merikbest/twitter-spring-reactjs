package com.gmail.merikbest2015.event;

public interface UserEvent {
    Long getId();
    String getFullName();
    String getUsername();
    boolean isPrivateProfile();
}
