package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.commons.event.ListsNotificationDto;
import com.gmail.merikbest2015.commons.event.UserNotificationDto;
import com.gmail.merikbest2015.commons.mapper.BasicMapper;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class ListsProducerMapperTest {

    @InjectMocks
    private ListsProducerMapper listsProducerMapper;

    @Mock
    private BasicMapper basicMapper;

    @Test
    public void toUserDto() {
        User notifiedUser = new User();
        User user = new User();
        Lists lists = new Lists();
        listsProducerMapper.toListsNotificationEvent(notifiedUser, user, lists);
        verify(basicMapper, times(2)).convertToResponse(user, UserNotificationDto.class);
        verify(basicMapper, times(1)).convertToResponse(lists, ListsNotificationDto.class);
    }
}
