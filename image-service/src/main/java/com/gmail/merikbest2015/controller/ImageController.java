package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import com.gmail.merikbest2015.mapper.ImageMapper;
import com.gmail.merikbest2015.commons.models.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import static com.gmail.merikbest2015.commons.controller.PathConstants.API_V1_IMAGE;

@RestController
@RequiredArgsConstructor
@RequestMapping(API_V1_IMAGE)
public class ImageController {

    private final ImageMapper imageMapper;

    @PostMapping("/upload")
    public ImageResponse uploadImage(@RequestPart("file") MultipartFile file) {
        return imageMapper.uploadImage(file);
    }

    @PostMapping("/save")
    public Image saveImage(@RequestBody Image image) {
        return imageMapper.saveImage(image);
    }

    @PostMapping("/delete")
    public void deleteImage(@RequestBody Image image) {
        imageMapper.deleteImage(image);
    }
}
