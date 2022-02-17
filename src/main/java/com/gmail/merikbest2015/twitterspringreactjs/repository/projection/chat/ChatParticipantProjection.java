package com.gmail.merikbest2015.twitterspringreactjs.repository.projection.chat;

public interface ChatParticipantProjection {
    Long getId();
    boolean getLeftChat();
    ChatProjection getChat();
    ChatUserProjection getUser();

    interface ChatUserProjection {
        Long getId();
    }
}
