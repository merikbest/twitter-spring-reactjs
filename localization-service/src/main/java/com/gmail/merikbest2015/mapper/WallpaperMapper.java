package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.WallpaperResponse;
import com.gmail.merikbest2015.model.Wallpaper;
import com.gmail.merikbest2015.service.WallpaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class WallpaperMapper {

    private final BasicMapper basicMapper;
    private final WallpaperService wallpaperService;

    public List<WallpaperResponse> getWallpapers() {
        List<Wallpaper> languages = wallpaperService.getWallpapers();
        return basicMapper.convertToResponseList(languages,WallpaperResponse.class);
    }
}
