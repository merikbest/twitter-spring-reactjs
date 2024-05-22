package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.event.ListsNotificationDto;
import com.gmail.merikbest2015.model.Lists;
import com.gmail.merikbest2015.service.AbstractServiceTest;
import com.gmail.merikbest2015.service.ListsHandlerService;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class ListsHandlerServiceImplTest extends AbstractServiceTest {

    @Autowired
    private ListsHandlerService listsHandlerService;

    @Test
    public void getOrCreateList_getList() {
        ListsNotificationDto listsNotificationDto = ListsNotificationDto.builder()
                .id(TestConstants.LIST_ID)
                .listName(TestConstants.LIST_NAME)
                .build();
        Lists lists = new Lists();
        lists.setId(TestConstants.LIST_ID);
        lists.setListName(TestConstants.LIST_NAME);
        when(listsRepository.findById(TestConstants.LIST_ID)).thenReturn(Optional.of(lists));
        assertEquals(lists, listsHandlerService.getOrCreateList(listsNotificationDto));
    }

    @Test
    public void getOrCreateList_createList() {
        ListsNotificationDto listsNotificationDto = ListsNotificationDto.builder()
                .id(TestConstants.LIST_ID)
                .listName(TestConstants.LIST_NAME)
                .build();
        Lists lists = new Lists();
        lists.setId(TestConstants.LIST_ID);
        lists.setListName(TestConstants.LIST_NAME);
        when(listsRepository.findById(TestConstants.LIST_ID)).thenReturn(Optional.empty());
        listsHandlerService.getOrCreateList(listsNotificationDto);
        verify(listsRepository, times(1)).save(lists);
    }
}
