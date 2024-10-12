package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.constants.PathConstants;
import com.gmail.merikbest2015.dto.response.GifImageResponse;
import com.gmail.merikbest2015.mapper.GifImageMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(PathConstants.UI_V1_LOCALIZATION)
public class GifImageController {

    private final GifImageMapper gifImageMapper;

    @GetMapping(PathConstants.GIF_IMAGES)
    public ResponseEntity<List<GifImageResponse>> getGifImages() {
        return ResponseEntity.ok(gifImageMapper.getGifImages());
    }
}
