package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.UserRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.ImageResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final UserService userService;

    UserResponse convertToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    ImageResponse convertToImageResponse(Image image) {
        return modelMapper.map(image, ImageResponse.class);
    }

    private User convertToEntity(UserRequest userRequest) {
        return modelMapper.map(userRequest, User.class);
    }

    public UserResponse getUserById(Long userId) {
        return convertToUserResponse(userService.getUserById(userId));
    }

    public ImageResponse uploadImage(MultipartFile multipartFile) {
        return convertToImageResponse(userService.uploadImage(multipartFile));
    }
}
