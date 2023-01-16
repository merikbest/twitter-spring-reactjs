package com.gmail.merikbest2015.repository.projection;

public interface ListMemberProjection {
    Long getId();
    String getFullName();
    String getUsername();
    String getAbout();
    ListsWallpaperProjection getAvatar();
    boolean getIsPrivateProfile();
}
