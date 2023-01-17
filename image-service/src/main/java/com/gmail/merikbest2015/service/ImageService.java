package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.commons.models.Image;
import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImage(MultipartFile multipartFile);

    Image saveImage(Image image);

    void deleteImage(Image image);
}
