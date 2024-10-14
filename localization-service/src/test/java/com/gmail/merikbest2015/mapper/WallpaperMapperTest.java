package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.dto.response.WallpaperResponse;
import com.gmail.merikbest2015.model.Wallpaper;
import com.gmail.merikbest2015.service.WallpaperService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class WallpaperMapperTest {

    @InjectMocks
    private WallpaperMapper wallpaperMapper;

    @Mock
    private WallpaperService wallpaperService;

    @Mock
    private BasicMapper basicMapper;

    @Test
    public void getWallpapers() {
        List<Wallpaper> wallpapers = List.of(new Wallpaper(), new Wallpaper());
        List<WallpaperResponse> wallpaperResponses = List.of(new WallpaperResponse(), new WallpaperResponse());
        when(wallpaperService.getWallpapers()).thenReturn(wallpapers);
        when(basicMapper.convertToResponseList(wallpapers, WallpaperResponse.class)).thenReturn(wallpaperResponses);
        assertEquals(wallpaperResponses, wallpaperMapper.getWallpapers());
        verify(wallpaperService, times(1)).getWallpapers();
        verify(basicMapper, times(1)).convertToResponseList(wallpapers, WallpaperResponse.class);
    }
}
