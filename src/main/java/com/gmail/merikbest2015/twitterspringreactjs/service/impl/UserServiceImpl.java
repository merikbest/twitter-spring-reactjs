package com.gmail.merikbest2015.twitterspringreactjs.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.gmail.merikbest2015.twitterspringreactjs.model.Image;
import com.gmail.merikbest2015.twitterspringreactjs.model.Tweet;
import com.gmail.merikbest2015.twitterspringreactjs.model.User;
import com.gmail.merikbest2015.twitterspringreactjs.repository.ImageRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.TweetRepository;
import com.gmail.merikbest2015.twitterspringreactjs.repository.UserRepository;
import com.gmail.merikbest2015.twitterspringreactjs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.security.Principal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TweetRepository tweetRepository;
    private final ImageRepository imageRepository;
    private final AmazonS3 amazonS3client;

    @Value("${amazon.s3.bucket.name}")
    private String bucketName;

    @Override
    public User getUserById(Long userId) {
        return userRepository.getOne(userId);
    }

    @Override
    public List<User> getUsers() {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        List<User> users = userRepository.findAll();
        users.remove(user);
        return users;
    }

    @Override
    public List<User> getRelevantUsers() {
        return userRepository.findTop5By();
    }

    @Override
    public List<User> searchUsersByUsername(String text) {
        return userRepository.findByFullNameOrUsernameContaining(text, text);
    }

    @Override
    public List<Tweet> getUserTweets(Long userId) {
        User user = userRepository.getOne(userId);
        return user.getTweets().stream()
                .filter(tweet -> tweet.getAddressedUsername() == null)
                .collect(Collectors.toList());
    }

    @Override
    public List<Tweet> getUserLikedTweets(Long userId) {
        User user = userRepository.getOne(userId);
        return user.getLikedTweets();
    }

    @Override
    public List<Tweet> getUserMediaTweets(Long userId) {
        User user = userRepository.getOne(userId);
        return tweetRepository.findByImagesIsNotNullAndUserOrderByDateTimeDesc(user);
    }

    @Override
    public Image uploadImage(MultipartFile multipartFile) {
        Image image = new Image();
        if (multipartFile != null) {
            File file = new File(multipartFile.getOriginalFilename());
            try (FileOutputStream fos = new FileOutputStream(file)) {
                fos.write(multipartFile.getBytes());
            } catch (IOException e) {
                e.printStackTrace();
            }
            String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
            amazonS3client.putObject(new PutObjectRequest(bucketName, fileName, file));
            image.setSrc(amazonS3client.getUrl(bucketName, fileName).toString());
            file.delete();
        }
        return imageRepository.save(image);
    }

    @Override
    public User updateUserProfile(User userInfo) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());

        if (userInfo.getAvatar() != null) {
            user.setAvatar(userInfo.getAvatar());
        }
        if (userInfo.getWallpaper() != null) {
            user.setWallpaper(userInfo.getWallpaper());
        }
        user.setUsername(userInfo.getUsername());
        user.setAbout(userInfo.getAbout());
        user.setLocation(userInfo.getLocation());
        user.setWebsite(userInfo.getWebsite());
        return userRepository.save(user);
    }

    @Override
    public User follow(Long userId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        User currentUser = userRepository.getOne(userId);
        user.getFollowers().add(currentUser);
        userRepository.save(user);
        return currentUser;
    }

    @Override
    public User unfollow(Long userId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        User user = userRepository.findByEmail(principal.getName());
        User currentUser = userRepository.getOne(userId);
        user.getFollowers().remove(currentUser);
        userRepository.save(user);
        return currentUser;
    }
}
