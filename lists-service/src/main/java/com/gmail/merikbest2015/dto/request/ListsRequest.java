package com.gmail.merikbest2015.dto.request;

import com.gmail.merikbest2015.dto.lists.ListOwnerResponse;
import com.gmail.merikbest2015.dto.response.ListsWallpaperResponse;
import lombok.Data;

@Data
public class ListsRequest {
    private Long id;
    private String name;
    private String description;
    private Boolean isPrivate;
    private ListOwnerResponse listOwner;
    private String altWallpaper;
    private ListsWallpaperResponse wallpaper;
}
