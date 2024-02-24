package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.TopicTestHelper;
import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.model.Topic;
import com.gmail.merikbest2015.model.User;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.UserRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import com.gmail.merikbest2015.service.TopicService;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.*;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
import static com.gmail.merikbest2015.util.TestConstants.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(SpringRunner.class)
public class TopicServiceImplTest {

    @Autowired
    private TopicService topicService;

    @MockBean
    private TopicRepository topicRepository;

    @MockBean
    private UserRepository userRepository;

    @Before
    public void setUp() {
        TestUtil.mockAuthenticatedUserId();
    }

    @Test
    public void getTags() {
        List<Long> longs = Arrays.asList(1L, 2L);
        when(topicRepository.getTopicsByIds(longs)).thenReturn(TopicTestHelper.getMockTopicProjectionList());
        List<TopicProjection> topics = topicService.getTopicsByIds(longs);
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByIds(longs);
    }

    @Test
    public void getTopicsByCategories() {
        List<TopicProjection> topicProjections = TopicTestHelper.getMockTopicProjectionList();
        when(topicRepository.getTopicsByCategory(TopicCategory.TRAVEL)).thenReturn(List.of(topicProjections.get(0)));
        when(topicRepository.getTopicsByCategory(TopicCategory.FOOD)).thenReturn(List.of(topicProjections.get(1)));
        List<TopicsByCategoriesResponse> topics = topicService.getTopicsByCategories(
                Arrays.asList(TopicCategory.TRAVEL, TopicCategory.FOOD));
        assertEquals(2, topics.size());
        assertEquals(TopicCategory.TRAVEL, topics.get(0).getTopicCategory());
        assertEquals(TopicCategory.FOOD, topics.get(1).getTopicCategory());
        verify(topicRepository, times(2)).getTopicsByCategory(any());
    }

    @Test
    public void getFollowedTopics() {
        when(topicRepository.getTopicsByTopicFollowerId(USER_ID, FollowedTopicProjection.class))
                .thenReturn(TopicTestHelper.getMockFollowedTopicProjectionList());
        List<FollowedTopicProjection> topics = topicService.getFollowedTopics();
        assertEquals(2, topics.size());
    }

    @Test
    public void getFollowedTopicsByUserId() {
        when(userRepository.isUserExists(USER_ID)).thenReturn(true);
        when(topicRepository.getTopicsByTopicFollowerId(USER_ID, TopicProjection.class))
                .thenReturn(TopicTestHelper.getMockTopicProjectionList());
        List<TopicProjection> topics = topicService.getFollowedTopicsByUserId(USER_ID);
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByTopicFollowerId(USER_ID, TopicProjection.class);
        verify(userRepository, times(1)).isUserExists(USER_ID);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserIdNotFound() {
        when(userRepository.isUserExists(USER_ID)).thenReturn(false);
        validateProfileTest(USER_ID, String.format(USER_ID_NOT_FOUND, USER_ID), HttpStatus.NOT_FOUND);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserProfileBlocked() {
        when(userRepository.isUserExists(1L)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, USER_ID)).thenReturn(true);
        validateProfileTest(1L, USER_PROFILE_BLOCKED, HttpStatus.BAD_REQUEST);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserHavePrivateProfile() {
        when(userRepository.isUserExists(1L)).thenReturn(true);
        when(userRepository.isUserBlocked(1L, USER_ID)).thenReturn(false);
        when(userRepository.isUserHavePrivateProfile(1L, USER_ID)).thenReturn(false);
        validateProfileTest(1L, USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @Test
    public void getNotInterestedTopics() {
        when(topicRepository.getTopicsByNotInterestedUserId(USER_ID))
                .thenReturn(TopicTestHelper.getMockNotInterestedTopicProjectionList());
        List<NotInterestedTopicProjection> topics = topicService.getNotInterestedTopics();
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByNotInterestedUserId(USER_ID);
    }

    @Test
    public void processNotInterestedTopic_removeTopic() {
        User authUser = TopicTestHelper.mockAuthUser();
        Topic topic = mockTopic();
        topic.setTopicNotInterested(new HashSet<>(Set.of(authUser)));
        when(topicRepository.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        assertFalse(topicService.processNotInterestedTopic(TOPIC_ID));
        verify(topicRepository, times(1)).findById(TOPIC_ID);
        verify(userRepository, times(1)).findById(USER_ID);
    }

    @Test
    public void processNotInterestedTopic_addTopic() {
        User authUser = TopicTestHelper.mockAuthUser();
        Topic topic = mockTopic();
        topic.setTopicNotInterested(new HashSet<>());
        when(topicRepository.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        assertTrue(topicService.processNotInterestedTopic(TOPIC_ID));
        verify(topicRepository, times(1)).findById(TOPIC_ID);
        verify(userRepository, times(1)).findById(USER_ID);
    }

    @Test
    public void processNotInterestedTopic_topicNotFound() {
        when(topicRepository.isTopicExist(3L)).thenReturn(false);
        try {
            topicService.processNotInterestedTopic(3L);
        } catch (ApiRequestException exception) {
            assertEquals(TOPIC_NOT_FOUND, exception.getMessage());
            assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        }
    }

    @Test
    public void processFollowTopic_unfollowTopic() {
        User authUser = TopicTestHelper.mockAuthUser();
        Topic topic = mockTopic();
        topic.setTopicFollowers(new HashSet<>(Set.of(authUser)));
        when(topicRepository.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        assertFalse(topicService.processFollowTopic(TOPIC_ID));
        verify(topicRepository, times(1)).findById(TOPIC_ID);
        verify(userRepository, times(1)).findById(USER_ID);
    }

    @Test
    public void processFollowTopic_followTopic() {
        User authUser = TopicTestHelper.mockAuthUser();
        Topic topic = mockTopic();
        topic.setTopicFollowers(new HashSet<>());
        when(topicRepository.findById(TOPIC_ID)).thenReturn(Optional.of(topic));
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(authUser));
        assertTrue(topicService.processFollowTopic(TOPIC_ID));
        verify(topicRepository, times(1)).findById(TOPIC_ID);
        verify(userRepository, times(1)).findById(USER_ID);
    }

    @Test
    public void processFollowTopic_topicNotFound() {
        when(topicRepository.isTopicExist(3L)).thenReturn(false);
        try {
            topicService.processFollowTopic(3L);
        } catch (ApiRequestException exception) {
            assertEquals(TOPIC_NOT_FOUND, exception.getMessage());
            assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        }
    }

    private void validateProfileTest(Long userId, String testMessage, HttpStatus status) {
        try {
            topicService.getFollowedTopicsByUserId(userId);
        } catch (ApiRequestException exception) {
            assertEquals(testMessage, exception.getMessage());
            assertEquals(status, exception.getStatus());
        }
    }

    private Topic mockTopic() {
        Topic topic = new Topic();
        topic.setId(TOPIC_ID);
        topic.setTopicName(TOPIC_NAME);
        topic.setTopicCategory(TopicCategory.GAMING);
        return topic;
    }
}
