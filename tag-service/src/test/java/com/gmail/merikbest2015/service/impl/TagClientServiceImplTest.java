package com.gmail.merikbest2015.service.impl;

import com.gmail.merikbest2015.service.TagClientService;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class TagClientServiceImplTest extends AbstractServiceTest {

    @Autowired
    private TagClientService tagClientService;

    @Test
    public void getTagsByText() {
        String mockText = "test_text";
        when(tagRepository.getTagsByText(mockText)).thenReturn(Arrays.asList(mockText, mockText));
        List<String> tags = tagClientService.getTagsByText(mockText);
        assertEquals(2, tags.size());
        verify(tagRepository, times(1)).getTagsByText(mockText);
    }
}
