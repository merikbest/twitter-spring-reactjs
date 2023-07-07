package com.gmail.merikbest2015.service;

import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.feign.UserClient;
import com.gmail.merikbest2015.repository.TopicFollowersRepository;
import com.gmail.merikbest2015.repository.TopicNotInterestedRepository;
import com.gmail.merikbest2015.repository.TopicRepository;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static com.gmail.merikbest2015.constants.PathConstants.AUTH_USER_ID_HEADER;
import static org.junit.jupiter.api.Assertions.assertEquals;
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
        mockAuthenticatedUserId();
        List<FollowedTopicProjection> topics = topicService.getFollowedTopics();
        assertEquals(2, topics.size());
    }

    private void mockAuthenticatedUserId() {
        MockHttpServletRequest mockRequest = new MockHttpServletRequest();
        mockRequest.addHeader(AUTH_USER_ID_HEADER, "1");
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(mockRequest));
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
