package com.gmail.merikbest2015.repository.projection;

public interface ListMemberProjection { // DEL
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ListsWallpaperProjection getAvatar();
    boolean getIsPrivateProfile();
}
