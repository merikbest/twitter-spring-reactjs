package com.gmail.merikbest2015.twitterspringreactjs.mapper;

import com.gmail.merikbest2015.twitterspringreactjs.dto.request.RegistrationRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.request.TweetRequest;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.TweetResponse;
import com.gmail.merikbest2015.twitterspringreactjs.dto.response.UserResponse;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class UserMapper {

    private final ModelMapper modelMapper;
    private final UserService userService;

    public UserResponse convertToUserResponse(User user) {
        return modelMapper.map(user, UserResponse.class);
    }

    User convertToEntity(RegistrationRequest registrationRequest) {
        return modelMapper.map(registrationRequest, User.class);
    }

    public UserResponse getUserById(Long userId) {
        return convertToUserResponse(userService.getUserById(userId));
    }
}
