package com.gmail.merikbest2015.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final AmazonS3 amazonS3client;

    @Value("${amazon.s3.bucket.name}")
    private String bucketName;

    @Override
    public String uploadImage(MultipartFile multipartFile) {
        String image = null;
        if (multipartFile != null) {
            File file = new File(multipartFile.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
            amazonS3client.putObject(new PutObjectRequest(bucketName, fileName, file));
            image = amazonS3client.getUrl(bucketName, fileName).toString();
            file.delete();
        }
        return image;
    }
}
