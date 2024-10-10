package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.Wallpaper;
import com.gmail.merikbest2015.repository.WallpaperRepository;
import com.gmail.merikbest2015.service.WallpaperService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WallpaperServiceImpl implements WallpaperService {

    private final WallpaperRepository wallpaperRepository;

    @Override
    public List<Wallpaper> getWallpapers() {
        return wallpaperRepository.findAll();
    }
}
