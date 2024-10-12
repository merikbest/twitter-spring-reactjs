package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.WallpaperResponse;
import com.gmail.merikbest2015.mapper.WallpaperMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_LOCALIZATION)
public class WallpaperController {

    private final WallpaperMapper wallpaperMapper;

    @GetMapping(PathConstants.WALLPAPERS)
    public ResponseEntity<List<WallpaperResponse>> getWallpapers() {
        return ResponseEntity.ok(wallpaperMapper.getWallpapers());
    }
}
