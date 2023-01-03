package com.gmail.merikbest2015.client.image;

import com.gmail.merikbest2015.commons.dto.ImageResponse;
import com.gmail.merikbest2015.commons.models.Image;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

@FeignClient("image-service")
public interface ImageClient {

    @PostMapping("/api/v1/image/upload")
    ImageResponse uploadImage(@RequestPart("file") MultipartFile file);

    @PostMapping("/api/v1/image/save")
    Image saveImage(@RequestBody Image image);

    @DeleteMapping("/api/v1/image/delete")
    void deleteImage(@RequestBody Image image);
}
