package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.Wallpaper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class WallpaperServiceTest extends AbstractServiceTest {

    @Autowired
    private WallpaperService wallpaperService;

    @Test
    public void getWallpapers_ShouldReturnWallpapers() {
        List<Wallpaper> wallpapers = List.of(new Wallpaper(), new Wallpaper());
        when(wallpaperRepository.findAll()).thenReturn(wallpapers);
        assertEquals(wallpapers, wallpaperService.getWallpapers());
        verify(wallpaperRepository, times(1)).findAll();
    }
}
