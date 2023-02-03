package com.gmail.merikbest2015.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImage(MultipartFile multipartFile);
}
