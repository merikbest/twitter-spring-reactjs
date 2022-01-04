package com.gmail.merikbest2015.twitterspringreactjs.repository.projection;

public interface UserPrincipalProjection {
    Long getId();
    String getEmail();
    String getPassword();
    String getActivationCode();
}
