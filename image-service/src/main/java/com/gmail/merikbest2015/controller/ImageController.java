package com.gmail.merikbest2015.controller;

import com.gmail.merikbest2015.dto.ImageResponse;
import com.gmail.merikbest2015.mapper.ImageMapper;
import com.gmail.merikbest2015.models.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/image")
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
