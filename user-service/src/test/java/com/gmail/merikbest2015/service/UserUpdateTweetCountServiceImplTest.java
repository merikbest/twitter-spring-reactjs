package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.event.UpdateTweetCountEvent;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Before;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import java.util.Optional;

import static com.gmail.merikbest2015.constants.ErrorMessage.USER_NOT_FOUND;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

public class UserUpdateTweetCountServiceImplTest extends AbstractServiceTest {

    @Autowired
    private UserUpdateTweetCountService userUpdateTweetCountService;

    private User user;

    @Before
    public void setUp() {
        super.setUp();
        user = new User();
        user.setId(TestConstants.USER_ID);
    }

    @Test
    public void handleUpdateTweetCount_ShouldIncreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateTweetCount(new UpdateTweetCountEvent(true), "2");
        userRepository.updateTweetCount(true, user.getId());
    }

    @Test
    public void handleUpdateTweetCount_ShouldDecreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateTweetCount(new UpdateTweetCountEvent(false), "2");
        userRepository.updateTweetCount(false, user.getId());
    }

    @Test
    public void handleUpdateTweetCount_ShouldThrowUserNotFoundException() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userUpdateTweetCountService.handleUpdateTweetCount(new UpdateTweetCountEvent(false), "2"));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void handleUpdateLikeTweetCount_ShouldIncreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateLikeTweetCount(new UpdateTweetCountEvent(true), "2");
        userRepository.updateLikeCount(true, user.getId());
    }

    @Test
    public void handleUpdateLikeTweetCount_ShouldDecreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateLikeTweetCount(new UpdateTweetCountEvent(false), "2");
        userRepository.updateLikeCount(false, user.getId());
    }

    @Test
    public void handleUpdateLikeTweetCount_ShouldThrowUserNotFoundException() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userUpdateTweetCountService.handleUpdateLikeTweetCount(new UpdateTweetCountEvent(false), "2"));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }

    @Test
    public void handleUpdateMediaTweetCount_ShouldIncreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateMediaTweetCount(new UpdateTweetCountEvent(true), "2");
        userRepository.updateMediaTweetCount(true, user.getId());

    }

    @Test
    public void handleUpdateMediaTweetCount_ShouldDecreaseTweetCount() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.of(user));
        userUpdateTweetCountService.handleUpdateMediaTweetCount(new UpdateTweetCountEvent(false), "2");
        userRepository.updateMediaTweetCount(false, user.getId());
    }

    @Test
    public void handleUpdateMediaTweetCount_ShouldThrowUserNotFoundException() {
        when(userRepository.getUserById(TestConstants.USER_ID, User.class)).thenReturn(Optional.empty());
        ApiRequestException exception = assertThrows(ApiRequestException.class,
                () -> userUpdateTweetCountService.handleUpdateMediaTweetCount(new UpdateTweetCountEvent(false), "2"));
        assertEquals(USER_NOT_FOUND, exception.getMessage());
        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
    }
}
