package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.exception.ApiRequestException;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.model.TopicFollowers;
import com.gmail.merikbest2015.model.TopicNotInterested;
import com.gmail.merikbest2015.repository.TopicFollowersRepository;
import com.gmail.merikbest2015.repository.TopicNotInterestedRepository;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import com.gmail.merikbest2015.util.TestUtil;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.constants.ErrorMessage.*;
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
    private TopicFollowersRepository topicFollowersRepository;

    @MockBean
    private TopicNotInterestedRepository topicNotInterestedRepository;

    @MockBean
    private UserClient userClient;

    private final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    @Test
    public void getTags() {
        List<TopicProjection> topicProjections = getMockTopicProjectionList();
        List<Long> longs = Arrays.asList(1L, 2L);
        when(topicRepository.getTopicsByIds(longs)).thenReturn(topicProjections);
        List<TopicProjection> topics = topicService.getTopicsByIds(longs);
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByIds(longs);
    }

    @Test
    public void getTopicsByCategories() {
        List<TopicProjection> topicProjections = getMockTopicProjectionList();
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
        FollowedTopicProjection topic1 = factory.createProjection(
                FollowedTopicProjection.class,
                Map.of(
                        "id", 1L,
                        "topicName", "test topic 1",
                        "topicCategory", TopicCategory.TRAVEL,
                        "isTopicFollowed", true));
        FollowedTopicProjection topic2 = factory.createProjection(
                FollowedTopicProjection.class,
                Map.of(
                        "id", 2L,
                        "topicName", "test topic 2",
                        "topicCategory", TopicCategory.FOOD,
                        "isTopicFollowed", false));
        when(topicRepository.getTopicsByTopicFollowerId(1L, FollowedTopicProjection.class))
                .thenReturn(Arrays.asList(topic1, topic2));
        TestUtil.mockAuthenticatedUserId();
        List<FollowedTopicProjection> topics = topicService.getFollowedTopics();
        assertEquals(2, topics.size());
    }

    @Test
    public void getFollowedTopicsByUserId() {
        when(userClient.isUserExists(1L)).thenReturn(true);
        when(topicRepository.getTopicsByTopicFollowerId(1L, TopicProjection.class))
                .thenReturn(getMockTopicProjectionList());
        TestUtil.mockAuthenticatedUserId();
        List<TopicProjection> topics = topicService.getFollowedTopicsByUserId(1L);
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByTopicFollowerId(1L, TopicProjection.class);
        verify(userClient, times(1)).isUserExists(1L);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserIdNotFound() {
        when(userClient.isUserExists(1L)).thenReturn(false);
        validateProfileTest(1L, String.format(USER_ID_NOT_FOUND, 1L), HttpStatus.NOT_FOUND);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserProfileBlocked() {
        when(userClient.isUserExists(2L)).thenReturn(true);
        when(userClient.isMyProfileBlockedByUser(2L)).thenReturn(true);
        validateProfileTest(2L, USER_PROFILE_BLOCKED, HttpStatus.BAD_REQUEST);
    }

    @Test
    public void getFollowedTopicsByUserId_shouldUserHavePrivateProfile() {
        when(userClient.isUserExists(2L)).thenReturn(true);
        when(userClient.isMyProfileBlockedByUser(2L)).thenReturn(false);
        when(userClient.isUserHavePrivateProfile(2L)).thenReturn(true);
        validateProfileTest(2L, USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    @Test
    public void getNotInterestedTopics() {
        NotInterestedTopicProjection topic1 = factory.createProjection(
                NotInterestedTopicProjection.class,
                Map.of(
                        "id", 1L,
                        "topicName", "test topic 1",
                        "topicCategory", TopicCategory.TRAVEL,
                        "isTopicNotInterested", true));
        NotInterestedTopicProjection topic2 = factory.createProjection(
                NotInterestedTopicProjection.class,
                Map.of(
                        "id", 2L,
                        "topicName", "test topic 2",
                        "topicCategory", TopicCategory.FOOD,
                        "isTopicNotInterested", false));
        when(topicRepository.getTopicsByNotInterestedUserId(1L)).thenReturn(Arrays.asList(topic1, topic2));
        TestUtil.mockAuthenticatedUserId();
        List<NotInterestedTopicProjection> topics = topicService.getNotInterestedTopics();
        assertEquals(2, topics.size());
        verify(topicRepository, times(1)).getTopicsByNotInterestedUserId(1L);
    }

    @Test
    public void processNotInterestedTopic_deleteTopic() {
        when(topicRepository.isTopicExist(3L)).thenReturn(true);
        when(topicNotInterestedRepository.getNotInterestedByUserIdAndTopicId(1L, 3L)).thenReturn(new TopicNotInterested());
        TestUtil.mockAuthenticatedUserId();
        assertFalse(topicService.processNotInterestedTopic(3L));
        verify(topicRepository, times(1)).isTopicExist(3L);
        verify(topicNotInterestedRepository, times(1)).getNotInterestedByUserIdAndTopicId(1L, 3L);
        verify(topicNotInterestedRepository, times(1)).delete(new TopicNotInterested());
    }

    @Test
    public void processNotInterestedTopic_saveTopic() {
        when(topicRepository.isTopicExist(3L)).thenReturn(true);
        when(topicNotInterestedRepository.getNotInterestedByUserIdAndTopicId(1L, 3L)).thenReturn(null);
        TestUtil.mockAuthenticatedUserId();
        assertTrue(topicService.processNotInterestedTopic(3L));
        verify(topicRepository, times(1)).isTopicExist(3L);
        verify(topicNotInterestedRepository, times(1)).getNotInterestedByUserIdAndTopicId(1L, 3L);
        verify(topicFollowersRepository, times(1)).removeFollowedTopic(1L, 3L);
        verify(topicNotInterestedRepository, times(1)).save(new TopicNotInterested(1L, 3L));
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
    public void processFollowTopic_deleteTopic() {
        when(topicRepository.isTopicExist(3L)).thenReturn(true);
        when(topicFollowersRepository.getFollowerByUserIdAndTopicId(1L, 3L)).thenReturn(new TopicFollowers());
        TestUtil.mockAuthenticatedUserId();
        assertFalse(topicService.processFollowTopic(3L));
        verify(topicRepository, times(1)).isTopicExist(3L);
        verify(topicFollowersRepository, times(1)).getFollowerByUserIdAndTopicId(1L, 3L);
        verify(topicFollowersRepository, times(1)).delete(new TopicFollowers());
    }

    @Test
    public void processFollowTopic_saveTopic() {
        when(topicRepository.isTopicExist(3L)).thenReturn(true);
        when(topicFollowersRepository.getFollowerByUserIdAndTopicId(1L, 3L)).thenReturn(null);
        TestUtil.mockAuthenticatedUserId();
        assertTrue(topicService.processFollowTopic(3L));
        verify(topicRepository, times(1)).isTopicExist(3L);
        verify(topicFollowersRepository, times(1)).getFollowerByUserIdAndTopicId(1L, 3L);
        verify(topicNotInterestedRepository, times(1)).removeNotInterestedTopic(1L, 3L);
        verify(topicFollowersRepository, times(1)).save(new TopicFollowers(1L, 3L));
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
        TestUtil.mockAuthenticatedUserId();
        try {
            topicService.getFollowedTopicsByUserId(userId);
        } catch (ApiRequestException exception) {
            assertEquals(testMessage, exception.getMessage());
            assertEquals(status, exception.getStatus());
        }
    }

    private List<TopicProjection> getMockTopicProjectionList() {
        TopicProjection topic1 = factory.createProjection(
                TopicProjection.class,
                Map.of(
                        "id", 1L,
                        "topicName", "test topic 1",
                        "topicCategory", TopicCategory.TRAVEL));
        TopicProjection topic2 = factory.createProjection(
                TopicProjection.class,
                Map.of(
                        "id", 2L,
                        "topicName", "test topic 2",
                        "topicCategory", TopicCategory.FOOD));
        return Arrays.asList(topic1, topic2);
    }
}
