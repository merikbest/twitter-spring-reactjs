package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.model.GifImage;
import com.gmail.merikbest2015.repository.GifImageRepository;
import com.gmail.merikbest2015.service.GifImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GifImageServiceImpl implements GifImageService {

    private final GifImageRepository gifImageRepository;

    @Override
    public List<GifImage> getGifImages() {
        return gifImageRepository.findAll();
    }
}
