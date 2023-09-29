package com.gmail.merikbest2015.mapper;

import com.gmail.merikbest2015.service.BookmarkService;
import com.gmail.merikbest2015.util.AbstractAuthTest;
import com.gmail.merikbest2015.util.TestConstants;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

public class BookmarkMapperTest extends AbstractAuthTest {

    @Autowired
    private BookmarkMapper bookmarkMapper;

    @MockBean
    private BookmarkService bookmarkService;

    @Test
    public void processUserBookmarks() {
        when(bookmarkService.processUserBookmarks(TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(bookmarkMapper.processUserBookmarks(TestConstants.TWEET_ID));
        verify(bookmarkService, times(1)).processUserBookmarks(TestConstants.TWEET_ID);
    }

    @Test
    public void getIsTweetBookmarked() {
        when(bookmarkService.getIsTweetBookmarked(TestConstants.TWEET_ID)).thenReturn(true);
        assertTrue(bookmarkMapper.getIsTweetBookmarked(TestConstants.TWEET_ID));
        verify(bookmarkService, times(1)).getIsTweetBookmarked(TestConstants.TWEET_ID);
    }
}
