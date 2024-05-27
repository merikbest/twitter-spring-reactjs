package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.TopicTestHelper;
import com.gmail.merikbest2015.dto.response.TopicResponse;
import com.gmail.merikbest2015.dto.response.TopicsByCategoriesResponse;
import com.gmail.merikbest2015.enums.TopicCategory;
import com.gmail.merikbest2015.repository.projection.FollowedTopicProjection;
import com.gmail.merikbest2015.repository.projection.NotInterestedTopicProjection;
import com.gmail.merikbest2015.repository.projection.TopicProjection;
import com.gmail.merikbest2015.service.TopicService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class TopicMapperTest {

    @InjectMocks
    private TopicMapper topicMapper;

    @Mock
    private BasicMapper basicMapper;

    @Mock
    private TopicService topicService;

    @Test
    public void getTopicsByIds() {
        List<TopicProjection> topics = TopicTestHelper.getMockTopicProjectionList();
        List<Long> topicsIds = Arrays.asList(1L, 2L);
        when(topicService.getTopicsByIds(topicsIds)).thenReturn(topics);
        when(basicMapper.convertToResponseList(topics, TopicResponse.class)).thenReturn(getTopicResponseList());
        assertEquals(2, topicMapper.getTopicsByIds(topicsIds).size());
        verify(topicService, times(1)).getTopicsByIds(topicsIds);
        verify(basicMapper, times(1)).convertToResponseList(topics, TopicResponse.class);
    }

    @Test
    public void getTopicsByCategories() {
        List<TopicProjection> topics = TopicTestHelper.getMockTopicProjectionList();
        List<TopicCategory> categories = Arrays.asList(TopicCategory.FOOD, TopicCategory.TRAVEL);
        TopicsByCategoriesResponse categoriesResponse1 = new TopicsByCategoriesResponse(
                TopicCategory.FOOD,
                Collections.singletonList(topics.get(0)));
        TopicsByCategoriesResponse categoriesResponse2 = new TopicsByCategoriesResponse(
                TopicCategory.TRAVEL,
                Collections.singletonList(topics.get(1)));
        when(topicService.getTopicsByCategories(categories))
                .thenReturn(Arrays.asList(categoriesResponse1, categoriesResponse2));
        assertEquals(2, topicMapper.getTopicsByCategories(categories).size());
        verify(topicService, times(1)).getTopicsByCategories(categories);
    }

    @Test
    public void getFollowedTopics() {
        List<FollowedTopicProjection> topics = TopicTestHelper.getMockFollowedTopicProjectionList();
        when(topicService.getFollowedTopics()).thenReturn(topics);
        when(basicMapper.convertToResponseList(topics, TopicResponse.class)).thenReturn(getTopicResponseList());
        assertEquals(2, topicMapper.getFollowedTopics().size());
        verify(topicService, times(1)).getFollowedTopics();
        verify(basicMapper, times(1)).convertToResponseList(topics, TopicResponse.class);
    }

    @Test
    public void getFollowedTopicsByUserId() {
        List<TopicProjection> topics = TopicTestHelper.getMockTopicProjectionList();
        when(topicService.getFollowedTopicsByUserId(1L)).thenReturn(topics);
        when(basicMapper.convertToResponseList(topics, TopicResponse.class)).thenReturn(getTopicResponseList());
        assertEquals(2, topicMapper.getFollowedTopicsByUserId(1L).size());
        verify(topicService, times(1)).getFollowedTopicsByUserId(1L);
        verify(basicMapper, times(1)).convertToResponseList(topics, TopicResponse.class);
    }

    @Test
    public void getNotInterestedTopics() {
        List<NotInterestedTopicProjection> topics = TopicTestHelper.getMockNotInterestedTopicProjectionList();
        when(topicService.getNotInterestedTopics()).thenReturn(topics);
        when(basicMapper.convertToResponseList(topics, TopicResponse.class)).thenReturn(getTopicResponseList());
        assertEquals(2, topicMapper.getNotInterestedTopics().size());
        verify(topicService, times(1)).getNotInterestedTopics();
        verify(basicMapper, times(1)).convertToResponseList(topics, TopicResponse.class);
    }

    @Test
    public void processNotInterestedTopic() {
        when(topicService.processNotInterestedTopic(1L)).thenReturn(true);
        assertTrue(topicMapper.processNotInterestedTopic(1L));
        verify(topicService, times(1)).processNotInterestedTopic(1L);
    }

    @Test
    public void processFollowTopic() {
        when(topicService.processFollowTopic(1L)).thenReturn(true);
        assertTrue(topicMapper.processFollowTopic(1L));
        verify(topicService, times(1)).processFollowTopic(1L);
    }

    private List<TopicResponse> getTopicResponseList() {
        TopicResponse topicResponse1 = new TopicResponse();
        topicResponse1.setId(1L);
        topicResponse1.setTopicName("test topic 1");
        topicResponse1.setTopicCategory(TopicCategory.TRAVEL);
        topicResponse1.setTopicFollowed(false);
        topicResponse1.setTopicNotInterested(false);
        TopicResponse topicResponse2 = new TopicResponse();
        topicResponse2.setId(2L);
        topicResponse2.setTopicName("test topic 2");
        topicResponse2.setTopicCategory(TopicCategory.FOOD);
        topicResponse2.setTopicFollowed(false);
        topicResponse2.setTopicNotInterested(false);
        return Arrays.asList(topicResponse1, topicResponse2);
    }
}
