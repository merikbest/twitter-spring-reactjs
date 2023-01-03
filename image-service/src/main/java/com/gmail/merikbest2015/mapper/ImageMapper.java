package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.commons.models.Image;
import com.gmail.merikbest2015.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class ImageMapper {

    private final BasicMapper mapper;
    private final ImageService imageService;

    public ImageResponse uploadImage(MultipartFile file) {
        return mapper.convertToResponse(imageService.uploadImage(file), ImageResponse.class);
    }

    public Image saveImage(Image image) {
        return imageService.saveImage(image);
    }

    public void deleteImage(Image image) {
        imageService.deleteImage(image);
    }
}
