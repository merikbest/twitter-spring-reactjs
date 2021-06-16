package com.gmail.merikbest2015.twitterspringreactjs.service;

import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    User getUserById(Long userId);

    Image uploadImage(MultipartFile multipartFile);
}
