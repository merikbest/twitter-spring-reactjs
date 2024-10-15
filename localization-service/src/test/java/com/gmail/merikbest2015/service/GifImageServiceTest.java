package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.model.GifImage;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class GifImageServiceTest extends AbstractServiceTest {

    @Autowired
    private GifImageService gifImageService;

    @Test
    public void getGifImages_ShouldReturnGifImages() {
        List<GifImage> gifImages = List.of(new GifImage(), new GifImage());
        when(gifImageRepository.findAll()).thenReturn(gifImages);
        assertEquals(gifImages, gifImageService.getGifImages());
        verify(gifImageRepository, times(1)).findAll();
    }
}
